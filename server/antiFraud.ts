import { eq, and, gte, sql, desc, count, like, or } from "drizzle-orm";
import { getDb } from "./db";
import { leadSubmissions, blockedIps } from "../drizzle/schema";
import { notifyOwner } from "./_core/notification";
import { getGeoFromIp } from "./geoip";

// ===== CONFIGURAÇÃO =====
const MAX_SUBMISSIONS_PER_HOUR = 3; // Máximo de submissões por IP por hora
const MAX_SUBMISSIONS_PER_DAY = 5; // Máximo de submissões por IP por dia
const AUTO_BLOCK_THRESHOLD = 6; // Bloquear automaticamente após N submissões em 24h

// ===== HELPERS =====

/** Extrai o IP real do request (considerando proxies/load balancers) */
export function getClientIp(req: any): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    const ips = typeof forwarded === "string" ? forwarded : forwarded[0];
    return ips.split(",")[0].trim();
  }
  const realIp = req.headers["x-real-ip"];
  if (realIp) {
    return typeof realIp === "string" ? realIp : realIp[0];
  }
  return req.socket?.remoteAddress || req.ip || "unknown";
}

// ===== VERIFICAÇÕES =====

/** Verifica se um IP está bloqueado */
export async function isIpBlocked(ip: string): Promise<{ blocked: boolean; reason?: string }> {
  const db = await getDb();
  if (!db) return { blocked: false };

  try {
    const result = await db
      .select()
      .from(blockedIps)
      .where(and(eq(blockedIps.ip, ip), eq(blockedIps.isActive, "yes")))
      .limit(1);

    if (result.length > 0) {
      return { blocked: true, reason: result[0].reason || "IP bloqueado por atividade suspeita" };
    }
    return { blocked: false };
  } catch (error) {
    console.error("[AntiFraud] Erro ao verificar IP bloqueado:", error);
    return { blocked: false };
  }
}

/** Conta submissões de um IP em um período */
export async function countSubmissions(
  ip: string,
  hoursBack: number
): Promise<number> {
  const db = await getDb();
  if (!db) return 0;

  try {
    const since = new Date(Date.now() - hoursBack * 60 * 60 * 1000);
    const result = await db
      .select({ total: count() })
      .from(leadSubmissions)
      .where(and(eq(leadSubmissions.ip, ip), gte(leadSubmissions.createdAt, since)));

    return result[0]?.total || 0;
  } catch (error) {
    console.error("[AntiFraud] Erro ao contar submissões:", error);
    return 0;
  }
}

/** Verifica rate limit para um IP */
export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  submissionsLastHour: number;
  submissionsLast24h: number;
  message?: string;
}> {
  // Primeiro verifica se está bloqueado
  const blockCheck = await isIpBlocked(ip);
  if (blockCheck.blocked) {
    return {
      allowed: false,
      submissionsLastHour: 0,
      submissionsLast24h: 0,
      message: blockCheck.reason,
    };
  }

  const submissionsLastHour = await countSubmissions(ip, 1);
  const submissionsLast24h = await countSubmissions(ip, 24);

  if (submissionsLastHour >= MAX_SUBMISSIONS_PER_HOUR) {
    return {
      allowed: false,
      submissionsLastHour,
      submissionsLast24h,
      message: `Limite de ${MAX_SUBMISSIONS_PER_HOUR} submissões por hora atingido. Tente novamente mais tarde.`,
    };
  }

  if (submissionsLast24h >= MAX_SUBMISSIONS_PER_DAY) {
    return {
      allowed: false,
      submissionsLastHour,
      submissionsLast24h,
      message: `Limite de ${MAX_SUBMISSIONS_PER_DAY} submissões por dia atingido. Tente novamente amanhã.`,
    };
  }

  return {
    allowed: true,
    submissionsLastHour,
    submissionsLast24h,
  };
}

// ===== REGISTRO =====

/** Registra uma submissão de lead e verifica se deve bloquear automaticamente */
export async function recordSubmission(data: {
  ip: string;
  fingerprint?: string;
  page?: string;
  userAgent?: string;
  leadName?: string;
  leadEmail?: string;
  leadPhone?: string;
}): Promise<{ recorded: boolean; autoBlocked: boolean }> {
  const db = await getDb();
  if (!db) return { recorded: false, autoBlocked: false };

  try {
    const submissionsLast24h = await countSubmissions(data.ip, 24);
    const isSuspicious = submissionsLast24h >= MAX_SUBMISSIONS_PER_HOUR ? "yes" : "no";

    // Buscar geolocalização do IP
    const geo = await getGeoFromIp(data.ip);

    // Registrar a submissão
    await db.insert(leadSubmissions).values({
      ip: data.ip,
      fingerprint: data.fingerprint || null,
      page: data.page || "/mec",
      userAgent: data.userAgent || null,
      leadName: data.leadName || null,
      leadEmail: data.leadEmail || null,
      leadPhone: data.leadPhone || null,
      city: geo.city,
      region: geo.region,
      country: geo.country,
      lat: geo.lat,
      lon: geo.lon,
      isp: geo.isp,
      isSuspicious: isSuspicious as "yes" | "no",
    });

    // Verificar se deve bloquear automaticamente
    const newTotal = submissionsLast24h + 1;
    let autoBlocked = false;

    if (newTotal >= AUTO_BLOCK_THRESHOLD) {
      // Bloquear automaticamente
      const existing = await db
        .select()
        .from(blockedIps)
        .where(eq(blockedIps.ip, data.ip))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(blockedIps).values({
          ip: data.ip,
          reason: `Bloqueio automático: ${newTotal} submissões em 24h. Possível atividade fraudulenta.`,
          totalSubmissions: newTotal,
          blockedBy: "auto",
          isActive: "yes",
        });
        autoBlocked = true;

        // Notificar o owner
        try {
          await notifyOwner({
            title: "⚠️ ALERTA ANTI-FRAUDE: IP Bloqueado Automaticamente",
            content: `O IP ${data.ip} foi bloqueado automaticamente após ${newTotal} submissões em 24h na página ${data.page || "/mec"}.\n\nÚltimos dados:\n- Nome: ${data.leadName || "N/A"}\n- Email: ${data.leadEmail || "N/A"}\n- Telefone: ${data.leadPhone || "N/A"}\n- User Agent: ${data.userAgent || "N/A"}\n\nAcesse o painel anti-fraude para gerenciar IPs bloqueados.`,
          });
        } catch (e) {
          console.warn("[AntiFraud] Falha ao notificar owner:", e);
        }
      } else {
        // Atualizar contagem
        await db
          .update(blockedIps)
          .set({ totalSubmissions: newTotal, isActive: "yes" })
          .where(eq(blockedIps.ip, data.ip));
        autoBlocked = true;
      }
    } else if (isSuspicious === "yes") {
      // Notificar atividade suspeita (mas ainda não bloqueada)
      try {
        await notifyOwner({
          title: "⚠️ Atividade Suspeita Detectada na /mec",
          content: `O IP ${data.ip} já tem ${newTotal} submissões em 24h (limite para bloqueio: ${AUTO_BLOCK_THRESHOLD}).\n\nDados da submissão:\n- Nome: ${data.leadName || "N/A"}\n- Email: ${data.leadEmail || "N/A"}\n- Telefone: ${data.leadPhone || "N/A"}\n\nMonitore no painel anti-fraude.`,
        });
      } catch (e) {
        console.warn("[AntiFraud] Falha ao notificar owner:", e);
      }
    }

    return { recorded: true, autoBlocked };
  } catch (error) {
    console.error("[AntiFraud] Erro ao registrar submissão:", error);
    return { recorded: false, autoBlocked: false };
  }
}

// ===== ADMIN =====

/** Lista IPs suspeitos com contagem de submissões (últimas 24h) */
export async function getSuspiciousIps(): Promise<
  Array<{
    ip: string;
    totalSubmissions: number;
    lastSubmission: Date | null;
    lastLeadName: string | null;
    lastLeadEmail: string | null;
    lastLeadPhone: string | null;
    isBlocked: boolean;
  }>
> {
  const db = await getDb();
  if (!db) return [];

  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Buscar IPs com mais de 1 submissão nas últimas 24h
    const submissions = await db
      .select({
        ip: leadSubmissions.ip,
        totalSubmissions: count(),
        lastSubmission: sql<Date>`MAX(${leadSubmissions.createdAt})`,
        lastLeadName: sql<string>`(SELECT leadName FROM lead_submissions ls2 WHERE ls2.ip = ${leadSubmissions.ip} ORDER BY createdAt DESC LIMIT 1)`,
        lastLeadEmail: sql<string>`(SELECT leadEmail FROM lead_submissions ls2 WHERE ls2.ip = ${leadSubmissions.ip} ORDER BY createdAt DESC LIMIT 1)`,
        lastLeadPhone: sql<string>`(SELECT leadPhone FROM lead_submissions ls2 WHERE ls2.ip = ${leadSubmissions.ip} ORDER BY createdAt DESC LIMIT 1)`,
      })
      .from(leadSubmissions)
      .where(gte(leadSubmissions.createdAt, since))
      .groupBy(leadSubmissions.ip)
      .having(sql`COUNT(*) > 1`)
      .orderBy(sql`COUNT(*) DESC`);

    // Buscar IPs bloqueados
    const blocked = await db
      .select({ ip: blockedIps.ip })
      .from(blockedIps)
      .where(eq(blockedIps.isActive, "yes"));

    const blockedSet = new Set(blocked.map((b) => b.ip));

    return submissions.map((s) => ({
      ip: s.ip,
      totalSubmissions: s.totalSubmissions,
      lastSubmission: s.lastSubmission,
      lastLeadName: s.lastLeadName,
      lastLeadEmail: s.lastLeadEmail,
      lastLeadPhone: s.lastLeadPhone,
      isBlocked: blockedSet.has(s.ip),
    }));
  } catch (error) {
    console.error("[AntiFraud] Erro ao buscar IPs suspeitos:", error);
    return [];
  }
}

/** Lista todos os IPs bloqueados */
export async function getBlockedIpsList(): Promise<
  Array<{
    id: number;
    ip: string;
    reason: string | null;
    totalSubmissions: number;
    blockedBy: string;
    isActive: string;
    createdAt: Date;
  }>
> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(blockedIps)
      .orderBy(desc(blockedIps.createdAt));
  } catch (error) {
    console.error("[AntiFraud] Erro ao listar IPs bloqueados:", error);
    return [];
  }
}

/** Bloquear IP manualmente */
export async function blockIpManually(ip: string, reason: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    const existing = await db
      .select()
      .from(blockedIps)
      .where(eq(blockedIps.ip, ip))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(blockedIps)
        .set({ isActive: "yes", reason, blockedBy: "manual" })
        .where(eq(blockedIps.ip, ip));
    } else {
      await db.insert(blockedIps).values({
        ip,
        reason,
        totalSubmissions: 0,
        blockedBy: "manual",
        isActive: "yes",
      });
    }
    return true;
  } catch (error) {
    console.error("[AntiFraud] Erro ao bloquear IP:", error);
    return false;
  }
}

/** Desbloquear IP */
export async function unblockIp(ip: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db
      .update(blockedIps)
      .set({ isActive: "no" })
      .where(eq(blockedIps.ip, ip));
    return true;
  } catch (error) {
    console.error("[AntiFraud] Erro ao desbloquear IP:", error);
    return false;
  }
}

/** Lista todas as leads capturadas com dados completos */
export async function getAllLeads(opts?: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{
  leads: Array<{
    id: number;
    ip: string;
    leadName: string | null;
    leadEmail: string | null;
    leadPhone: string | null;
    city: string | null;
    region: string | null;
    country: string | null;
    lat: string | null;
    lon: string | null;
    isp: string | null;
    page: string;
    isSuspicious: string;
    createdAt: Date;
  }>;
  total: number;
}> {
  const db = await getDb();
  if (!db) return { leads: [], total: 0 };

  const limit = opts?.limit || 50;
  const offset = ((opts?.page || 1) - 1) * limit;

  try {
    let whereClause;
    if (opts?.search && opts.search.trim()) {
      const s = `%${opts.search.trim()}%`;
      whereClause = or(
        like(leadSubmissions.ip, s),
        like(leadSubmissions.leadName, s),
        like(leadSubmissions.leadEmail, s),
        like(leadSubmissions.leadPhone, s),
        like(leadSubmissions.city, s),
        like(leadSubmissions.region, s),
        like(leadSubmissions.country, s),
        like(leadSubmissions.isp, s)
      );
    }

    const [leads, totalResult] = await Promise.all([
      db
        .select({
          id: leadSubmissions.id,
          ip: leadSubmissions.ip,
          leadName: leadSubmissions.leadName,
          leadEmail: leadSubmissions.leadEmail,
          leadPhone: leadSubmissions.leadPhone,
          city: leadSubmissions.city,
          region: leadSubmissions.region,
          country: leadSubmissions.country,
          lat: leadSubmissions.lat,
          lon: leadSubmissions.lon,
          isp: leadSubmissions.isp,
          page: leadSubmissions.page,
          isSuspicious: leadSubmissions.isSuspicious,
          createdAt: leadSubmissions.createdAt,
        })
        .from(leadSubmissions)
        .where(whereClause)
        .orderBy(desc(leadSubmissions.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ total: count() })
        .from(leadSubmissions)
        .where(whereClause),
    ]);

    return {
      leads,
      total: totalResult[0]?.total || 0,
    };
  } catch (error) {
    console.error("[AntiFraud] Erro ao listar leads:", error);
    return { leads: [], total: 0 };
  }
}

/** Buscar histórico de submissões de um IP específico */
export async function getSubmissionsByIp(ip: string): Promise<
  Array<{
    id: number;
    ip: string;
    fingerprint: string | null;
    page: string;
    userAgent: string | null;
    leadName: string | null;
    leadEmail: string | null;
    leadPhone: string | null;
    isSuspicious: string;
    createdAt: Date;
  }>
> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(leadSubmissions)
      .where(eq(leadSubmissions.ip, ip))
      .orderBy(desc(leadSubmissions.createdAt))
      .limit(50);
  } catch (error) {
    console.error("[AntiFraud] Erro ao buscar submissões por IP:", error);
    return [];
  }
}
