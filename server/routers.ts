import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getUserByEmail } from "./db";
import { sdk } from "./_core/sdk";
import { createOrUpdateContact } from "./brevo";
import {
  getClientIp,
  isIpBlocked,
  checkRateLimit,
  recordSubmission,
  getSuspiciousIps,
  getBlockedIpsList,
  blockIpManually,
  unblockIp,
  getSubmissionsByIp,
  getAllLeads,
} from "./antiFraud";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    /** Login admin por email/senha - verifica se é admin e cria sessão */
    adminLogin: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(1),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Verificar senha admin (armazenada como env)
        const adminPassword = process.env.ADMIN_PASSWORD || "fabrani@2026";
        if (input.password !== adminPassword) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Credenciais inválidas" });
        }

        // Buscar usuário por email
        const user = await getUserByEmail(input.email);
        if (!user || user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Acesso restrito a administradores" });
        }

        // Criar sessão JWT
        const sessionToken = await sdk.createSessionToken(user.openId, {
          name: user.name || "Admin",
          expiresInMs: ONE_YEAR_MS,
        });

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

        return { success: true, user: { name: user.name, email: user.email, role: user.role } };
      }),
  }),

  // ===== ANTI-FRAUDE =====
  antiFraud: router({
    /** Verifica se o IP do visitante está bloqueado ou rate-limited */
    checkIp: publicProcedure.query(async ({ ctx }) => {
      const ip = getClientIp(ctx.req);
      const blockCheck = await isIpBlocked(ip);
      if (blockCheck.blocked) {
        return { allowed: false, blocked: true, ip, message: blockCheck.reason };
      }
      const rateCheck = await checkRateLimit(ip);
      return {
        allowed: rateCheck.allowed,
        blocked: false,
        ip,
        submissionsLastHour: rateCheck.submissionsLastHour,
        submissionsLast24h: rateCheck.submissionsLast24h,
        message: rateCheck.message,
      };
    }),

    /** Registra uma submissão de formulário (chamado pelo client após detectar submit do GHL) */
    recordSubmission: publicProcedure
      .input(
        z.object({
          fingerprint: z.string().optional(),
          page: z.string().optional(),
          leadName: z.string().optional(),
          leadEmail: z.string().optional(),
          leadPhone: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const ip = getClientIp(ctx.req);
        const userAgent = ctx.req.headers["user-agent"] as string | undefined;
        const result = await recordSubmission({
          ip,
          fingerprint: input.fingerprint,
          page: input.page || "/mec",
          userAgent: userAgent || undefined,
          leadName: input.leadName,
          leadEmail: input.leadEmail,
          leadPhone: input.leadPhone,
        });
        return { ...result, ip };
      }),

    // ----- ADMIN -----
    /** Lista IPs suspeitos (admin) */
    suspiciousIps: adminProcedure.query(async () => {
      return await getSuspiciousIps();
    }),

    /** Lista IPs bloqueados (admin) */
    blockedIps: adminProcedure.query(async () => {
      return await getBlockedIpsList();
    }),

    /** Bloquear IP manualmente (admin) */
    blockIp: adminProcedure
      .input(
        z.object({
          ip: z.string().min(1),
          reason: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        const success = await blockIpManually(input.ip, input.reason);
        return { success };
      }),

    /** Desbloquear IP (admin) */
    unblockIp: adminProcedure
      .input(z.object({ ip: z.string().min(1) }))
      .mutation(async ({ input }) => {
        const success = await unblockIp(input.ip);
        return { success };
      }),

    /** Histórico de submissões de um IP (admin) */
    ipHistory: adminProcedure
      .input(z.object({ ip: z.string().min(1) }))
      .query(async ({ input }) => {
        return await getSubmissionsByIp(input.ip);
      }),

    /** Lista todas as leads capturadas com dados completos (admin) */
    allLeads: adminProcedure
      .input(
        z.object({
          search: z.string().optional(),
          page: z.number().min(1).optional(),
          limit: z.number().min(1).max(100).optional(),
        }).optional()
      )
      .query(async ({ input }) => {
        return await getAllLeads({
          search: input?.search,
          page: input?.page || 1,
          limit: input?.limit || 50,
        });
      }),
  }),

  brevo: router({
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email("E-mail inválido"),
          nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
          whatsapp: z.string().min(10, "WhatsApp inválido"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const result = await createOrUpdateContact({
            email: input.email,
            attributes: {
              NOME: input.nome,
              WHATSAPP: input.whatsapp,
            },
            updateEnabled: true,
          });

          return {
            success: true,
            message: "Cadastro realizado com sucesso!",
          };
        } catch (error: any) {
          console.error("[Brevo Router] Erro:", error);
          throw new Error(error.message || "Erro ao processar cadastro");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
