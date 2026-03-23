import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ===== SISTEMA ANTI-FRAUDE =====

/** Registra cada submissão de formulário com IP e fingerprint para detecção de fraude */
export const leadSubmissions = mysqlTable("lead_submissions", {
  id: int("id").autoincrement().primaryKey(),
  ip: varchar("ip", { length: 45 }).notNull(), // IPv4 ou IPv6
  fingerprint: varchar("fingerprint", { length: 64 }), // Browser fingerprint hash
  page: varchar("page", { length: 100 }).notNull().default("/mec"), // Página de origem
  userAgent: text("userAgent"),
  // Dados capturados (se disponíveis)
  leadName: varchar("leadName", { length: 255 }),
  leadEmail: varchar("leadEmail", { length: 320 }),
  leadPhone: varchar("leadPhone", { length: 30 }),
  // Geolocalização por IP
  city: varchar("city", { length: 100 }),
  region: varchar("region", { length: 100 }),
  country: varchar("country", { length: 100 }),
  lat: varchar("lat", { length: 20 }),
  lon: varchar("lon", { length: 20 }),
  isp: varchar("isp", { length: 200 }),
  // Metadados
  isSuspicious: mysqlEnum("isSuspicious", ["no", "yes"]).default("no").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LeadSubmission = typeof leadSubmissions.$inferSelect;
export type InsertLeadSubmission = typeof leadSubmissions.$inferInsert;

/** IPs bloqueados (manual ou automaticamente) */
export const blockedIps = mysqlTable("blocked_ips", {
  id: int("id").autoincrement().primaryKey(),
  ip: varchar("ip", { length: 45 }).notNull().unique(),
  reason: text("reason"), // Motivo do bloqueio
  totalSubmissions: int("totalSubmissions").default(0).notNull(),
  blockedBy: mysqlEnum("blockedBy", ["auto", "manual"]).default("auto").notNull(),
  isActive: mysqlEnum("isActive", ["yes", "no"]).default("yes").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlockedIp = typeof blockedIps.$inferSelect;
export type InsertBlockedIp = typeof blockedIps.$inferInsert;

// ===== PAINEL CLOSER =====

/** Closers (vendedores) cadastrados no sistema */
export const closers = mysqlTable("closers", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phone: varchar("phone", { length: 30 }),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["closer", "admin"]).default("closer").notNull(),
  isActive: mysqlEnum("isActive", ["yes", "no"]).default("yes").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Closer = typeof closers.$inferSelect;
export type InsertCloser = typeof closers.$inferInsert;

/** Clientes cadastrados pelos closers */
export const closerClients = mysqlTable("closer_clients", {
  id: int("id").autoincrement().primaryKey(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  mainPartner: varchar("mainPartner", { length: 255 }).notNull(), // Sócio principal
  cnpj: varchar("cnpj", { length: 20 }),
  cpf: varchar("cpf", { length: 14 }),
  rg: varchar("rg", { length: 20 }),
  // Endereço completo
  street: varchar("street", { length: 255 }),
  number: varchar("number", { length: 20 }),
  complement: varchar("complement", { length: 100 }),
  neighborhood: varchar("neighborhood", { length: 100 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 2 }),
  zipCode: varchar("zipCode", { length: 10 }),
  whatsapp: varchar("whatsapp", { length: 30 }).notNull(),
  closerId: int("closerId").notNull(), // FK para closers
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CloserClient = typeof closerClients.$inferSelect;
export type InsertCloserClient = typeof closerClients.$inferInsert;

/** Propostas enviadas pelos closers */
export const closerProposals = mysqlTable("closer_proposals", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").notNull(), // FK para closer_clients
  closerId: int("closerId").notNull(), // FK para closers
  projectType: mysqlEnum("projectType", [
    "certificacao_mec",
    "projeto_alianca",
    "pos_mba_parceiros",
    "mentoria_ni1",
  ]).notNull(),
  value: varchar("value", { length: 20 }).notNull(), // Valor em centavos como string
  status: mysqlEnum("status", ["enviada", "fechada", "perdida"]).default("enviada").notNull(),
  numberOfCourses: int("numberOfCourses").default(1),
  observation: text("observation"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CloserProposal = typeof closerProposals.$inferSelect;
export type InsertCloserProposal = typeof closerProposals.$inferInsert;

/** Vendas realizadas (propostas fechadas com detalhes de pagamento) */
export const closerSales = mysqlTable("closer_sales", {
  id: int("id").autoincrement().primaryKey(),
  proposalId: int("proposalId").notNull(), // FK para closer_proposals
  clientId: int("clientId").notNull(), // FK para closer_clients
  closerId: int("closerId").notNull(), // FK para closers
  projectType: mysqlEnum("projectType", [
    "certificacao_mec",
    "projeto_alianca",
    "pos_mba_parceiros",
    "mentoria_ni1",
  ]).notNull(),
  totalValue: varchar("totalValue", { length: 20 }).notNull(), // Valor total em centavos
  paymentMethod: mysqlEnum("paymentMethod", [
    "cartao_credito",
    "pix",
    "boleto",
  ]).notNull(),
  installments: int("installments").default(1), // Quantidade de parcelas
  downPayment: varchar("downPayment", { length: 20 }), // Valor da entrada
  installmentValue: varchar("installmentValue", { length: 20 }), // Valor de cada parcela
  numberOfCourses: int("numberOfCourses").default(1),
  observation: text("observation"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CloserSale = typeof closerSales.$inferSelect;
export type InsertCloserSale = typeof closerSales.$inferInsert;