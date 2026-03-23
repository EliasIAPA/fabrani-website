import { eq, desc, and, like, or, sql, count } from "drizzle-orm";
import { getDb } from "./db";
import {
  closers,
  closerClients,
  closerProposals,
  closerSales,
  InsertCloser,
  InsertCloserClient,
  InsertCloserProposal,
  InsertCloserSale,
} from "../drizzle/schema";
import * as crypto from "crypto";

// ===== HELPERS DE HASH =====
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// ===== CLOSERS =====

export async function createCloser(data: {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: "closer" | "admin";
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const passwordHash = hashPassword(data.password);
  await db.insert(closers).values({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    passwordHash,
    role: data.role || "closer",
  });

  const result = await db
    .select()
    .from(closers)
    .where(eq(closers.email, data.email))
    .limit(1);
  return result[0];
}

export async function getCloserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(closers)
    .where(eq(closers.email, email))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getCloserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(closers)
    .where(eq(closers.id, id))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function listClosers(onlyActive = true) {
  const db = await getDb();
  if (!db) return [];
  const conditions = onlyActive ? eq(closers.isActive, "yes") : undefined;
  const result = await db
    .select({
      id: closers.id,
      name: closers.name,
      email: closers.email,
      phone: closers.phone,
      role: closers.role,
      isActive: closers.isActive,
      createdAt: closers.createdAt,
    })
    .from(closers)
    .where(conditions)
    .orderBy(desc(closers.createdAt));
  return result;
}

export async function updateCloser(
  id: number,
  data: { name?: string; email?: string; phone?: string; role?: "closer" | "admin"; isActive?: "yes" | "no"; password?: string }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateSet: Record<string, unknown> = {};
  if (data.name) updateSet.name = data.name;
  if (data.email) updateSet.email = data.email;
  if (data.phone !== undefined) updateSet.phone = data.phone;
  if (data.role) updateSet.role = data.role;
  if (data.isActive) updateSet.isActive = data.isActive;
  if (data.password) updateSet.passwordHash = hashPassword(data.password);

  if (Object.keys(updateSet).length > 0) {
    await db.update(closers).set(updateSet).where(eq(closers.id, id));
  }
  return await getCloserById(id);
}

// ===== CLIENTES =====

export async function createClient(data: InsertCloserClient) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(closerClients).values(data);
  // Retornar o último inserido
  const result = await db
    .select()
    .from(closerClients)
    .orderBy(desc(closerClients.id))
    .limit(1);
  return result[0];
}

export async function getClientById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(closerClients)
    .where(eq(closerClients.id, id))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function listClients(opts: {
  closerId?: number;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const db = await getDb();
  if (!db) return { clients: [], total: 0 };

  const page = opts.page || 1;
  const limit = opts.limit || 50;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (opts.closerId) {
    conditions.push(eq(closerClients.closerId, opts.closerId));
  }
  if (opts.search) {
    const searchTerm = `%${opts.search}%`;
    conditions.push(
      or(
        like(closerClients.companyName, searchTerm),
        like(closerClients.mainPartner, searchTerm),
        like(closerClients.cnpj, searchTerm),
        like(closerClients.cpf, searchTerm),
        like(closerClients.whatsapp, searchTerm)
      )
    );
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [clients, totalResult] = await Promise.all([
    db
      .select()
      .from(closerClients)
      .where(whereClause)
      .orderBy(desc(closerClients.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: count() })
      .from(closerClients)
      .where(whereClause),
  ]);

  return { clients, total: totalResult[0]?.count || 0 };
}

export async function updateClient(id: number, data: Partial<InsertCloserClient>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { id: _, ...updateData } = data as any;
  await db.update(closerClients).set(updateData).where(eq(closerClients.id, id));
  return await getClientById(id);
}

// ===== PROPOSTAS =====

export async function createProposal(data: InsertCloserProposal) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(closerProposals).values(data);
  const result = await db
    .select()
    .from(closerProposals)
    .orderBy(desc(closerProposals.id))
    .limit(1);
  return result[0];
}

export async function getProposalById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(closerProposals)
    .where(eq(closerProposals.id, id))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function listProposals(opts: {
  closerId?: number;
  status?: "enviada" | "fechada" | "perdida";
  page?: number;
  limit?: number;
}) {
  const db = await getDb();
  if (!db) return { proposals: [], total: 0 };

  const page = opts.page || 1;
  const limit = opts.limit || 50;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (opts.closerId) {
    conditions.push(eq(closerProposals.closerId, opts.closerId));
  }
  if (opts.status) {
    conditions.push(eq(closerProposals.status, opts.status));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [proposals, totalResult] = await Promise.all([
    db
      .select()
      .from(closerProposals)
      .where(whereClause)
      .orderBy(desc(closerProposals.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: count() })
      .from(closerProposals)
      .where(whereClause),
  ]);

  return { proposals, total: totalResult[0]?.count || 0 };
}

export async function updateProposalStatus(
  id: number,
  status: "enviada" | "fechada" | "perdida"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(closerProposals)
    .set({ status })
    .where(eq(closerProposals.id, id));
  return await getProposalById(id);
}

export async function updateProposal(id: number, data: Partial<InsertCloserProposal>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { id: _, ...updateData } = data as any;
  await db.update(closerProposals).set(updateData).where(eq(closerProposals.id, id));
  return await getProposalById(id);
}

// ===== VENDAS =====

export async function createSale(data: InsertCloserSale) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(closerSales).values(data);
  // Atualizar status da proposta para "fechada"
  if (data.proposalId) {
    await db
      .update(closerProposals)
      .set({ status: "fechada" })
      .where(eq(closerProposals.id, data.proposalId));
  }
  const result = await db
    .select()
    .from(closerSales)
    .orderBy(desc(closerSales.id))
    .limit(1);
  return result[0];
}

export async function listSales(opts: {
  closerId?: number;
  page?: number;
  limit?: number;
}) {
  const db = await getDb();
  if (!db) return { sales: [], total: 0 };

  const page = opts.page || 1;
  const limit = opts.limit || 50;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (opts.closerId) {
    conditions.push(eq(closerSales.closerId, opts.closerId));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [sales, totalResult] = await Promise.all([
    db
      .select()
      .from(closerSales)
      .where(whereClause)
      .orderBy(desc(closerSales.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: count() })
      .from(closerSales)
      .where(whereClause),
  ]);

  return { sales, total: totalResult[0]?.count || 0 };
}

// ===== DASHBOARD STATS =====

export async function getDashboardStats(closerId?: number) {
  const db = await getDb();
  if (!db) return null;

  const proposalCondition = closerId ? eq(closerProposals.closerId, closerId) : undefined;
  const saleCondition = closerId ? eq(closerSales.closerId, closerId) : undefined;
  const clientCondition = closerId ? eq(closerClients.closerId, closerId) : undefined;

  const [
    totalProposals,
    proposalsByStatus,
    totalSales,
    totalRevenue,
    totalClients,
  ] = await Promise.all([
    db.select({ count: count() }).from(closerProposals).where(proposalCondition),
    db
      .select({
        status: closerProposals.status,
        count: count(),
      })
      .from(closerProposals)
      .where(proposalCondition)
      .groupBy(closerProposals.status),
    db.select({ count: count() }).from(closerSales).where(saleCondition),
    db
      .select({
        total: sql<string>`COALESCE(SUM(CAST(${closerSales.totalValue} AS DECIMAL(15,2))), 0)`,
      })
      .from(closerSales)
      .where(saleCondition),
    db.select({ count: count() }).from(closerClients).where(clientCondition),
  ]);

  const statusMap: Record<string, number> = {};
  proposalsByStatus.forEach((row) => {
    statusMap[row.status] = row.count;
  });

  return {
    totalProposals: totalProposals[0]?.count || 0,
    proposalsEnviadas: statusMap["enviada"] || 0,
    proposalsFechadas: statusMap["fechada"] || 0,
    proposalsPerdidas: statusMap["perdida"] || 0,
    totalSales: totalSales[0]?.count || 0,
    totalRevenue: totalRevenue[0]?.total || "0",
    totalClients: totalClients[0]?.count || 0,
    conversionRate:
      (totalProposals[0]?.count || 0) > 0
        ? (((statusMap["fechada"] || 0) / (totalProposals[0]?.count || 1)) * 100).toFixed(1)
        : "0.0",
  };
}

export async function getCloserRanking() {
  const db = await getDb();
  if (!db) return [];

  const result = await db
    .select({
      closerId: closerSales.closerId,
      closerName: closers.name,
      totalSales: count(),
      totalRevenue: sql<string>`COALESCE(SUM(CAST(${closerSales.totalValue} AS DECIMAL(15,2))), 0)`,
    })
    .from(closerSales)
    .innerJoin(closers, eq(closerSales.closerId, closers.id))
    .groupBy(closerSales.closerId, closers.name)
    .orderBy(desc(sql`totalRevenue`));

  return result;
}
