import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import crypto from "crypto";
import { z } from "zod";
import {
  createCloser,
  getCloserByEmail,
  getCloserById,
  listClosers,
  updateCloser,
  verifyPassword,
  createClient,
  getClientById,
  listClients,
  updateClient,
  createProposal,
  getProposalById,
  listProposals,
  updateProposalStatus,
  updateProposal,
  deleteProposal,
  createSale,
  listSales,
  updateSale,
  deleteSale,
  getDashboardStats,
  getCloserRanking,
  createLog,
  listLogs,
} from "./closerDb";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";

// ===== MIDDLEWARE: Closer autenticado =====

const CLOSER_COOKIE = "closer_session";

async function createCloserToken(closerId: number, name: string): Promise<string> {
  const payload = JSON.stringify({ closerId, name, exp: Date.now() + ONE_YEAR_MS });
  const secret = process.env.JWT_SECRET || "fabrani-closer-secret";
  const hmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(payload).toString("base64") + "." + hmac;
}

function verifyCloserToken(token: string): { closerId: number; name: string } | null {
  try {
    const [payloadB64, hmac] = token.split(".");
    if (!payloadB64 || !hmac) return null;

    const secret = process.env.JWT_SECRET || "fabrani-closer-secret";
    const expectedHmac = crypto.createHmac("sha256", secret).update(Buffer.from(payloadB64, "base64").toString()).digest("hex");
    if (hmac !== expectedHmac) return null;

    const payload = JSON.parse(Buffer.from(payloadB64, "base64").toString());
    if (payload.exp < Date.now()) return null;

    return { closerId: payload.closerId, name: payload.name };
  } catch {
    return null;
  }
}

function getCloserFromContext(ctx: any): { closerId: number; name: string } | null {
  const token = ctx.req.cookies?.[CLOSER_COOKIE] || ctx.req.headers?.["x-closer-token"];
  if (!token) return null;
  return verifyCloserToken(token);
}

// ===== LABELS LEGÍVEIS =====
const PROJECT_LABELS: Record<string, string> = {
  certificacao_mec: "Certificação MEC",
  projeto_alianca: "Projeto Aliança",
  pos_mba_parceiros: "Pós/MBA Parceiros",
  mentoria_ni1: "Mentoria NI1",
};

export const closerRouter = router({
  // ===== AUTH =====
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const closer = await getCloserByEmail(input.email);
      if (!closer) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Credenciais inválidas" });
      }
      if (closer.isActive !== "yes") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Conta desativada. Contate o administrador." });
      }
      if (!verifyPassword(input.password, closer.passwordHash)) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Credenciais inválidas" });
      }

      const token = await createCloserToken(closer.id, closer.name);
      const cookieOptions = getSessionCookieOptions(ctx.req);
      const finalCookieOptions = {
        ...cookieOptions,
        maxAge: ONE_YEAR_MS,
        secure: cookieOptions.sameSite === "none" ? true : cookieOptions.secure,
      };
      ctx.res.cookie(CLOSER_COOKIE, token, finalCookieOptions);

      // Log de login
      await createLog({
        closerId: closer.id,
        closerName: closer.name,
        action: "login",
        entityType: "session",
        entityId: null,
        description: `${closer.name} fez login no sistema`,
        metadata: JSON.stringify({ email: closer.email, role: closer.role }),
      });

      return {
        success: true,
        closer: {
          id: closer.id,
          name: closer.name,
          email: closer.email,
          role: closer.role,
        },
      };
    }),

  logout: publicProcedure.mutation(async ({ ctx }) => {
    const session = getCloserFromContext(ctx);
    const cookieOptions = getSessionCookieOptions(ctx.req);
    ctx.res.clearCookie(CLOSER_COOKIE, { ...cookieOptions, maxAge: -1 });

    // Log de logout (se havia sessão)
    if (session) {
      const closer = await getCloserById(session.closerId);
      if (closer) {
        await createLog({
          closerId: closer.id,
          closerName: closer.name,
          action: "logout",
          entityType: "session",
          entityId: null,
          description: `${closer.name} saiu do sistema`,
          metadata: null,
        });
      }
    }

    return { success: true };
  }),

  me: publicProcedure.query(async ({ ctx }) => {
    const closerSession = getCloserFromContext(ctx);
    if (!closerSession) return null;

    const closer = await getCloserById(closerSession.closerId);
    if (!closer || closer.isActive !== "yes") return null;

    return {
      id: closer.id,
      name: closer.name,
      email: closer.email,
      role: closer.role,
    };
  }),

  // ===== CLOSERS CRUD (admin only) =====
  createCloser: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        password: z.string().min(6),
        role: z.enum(["closer", "admin"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });
      const currentCloser = await getCloserById(session.closerId);
      if (!currentCloser || currentCloser.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores podem cadastrar closers" });
      }

      const existing = await getCloserByEmail(input.email);
      if (existing) {
        throw new TRPCError({ code: "CONFLICT", message: "Email já cadastrado" });
      }

      const newCloser = await createCloser(input);

      await createLog({
        closerId: session.closerId,
        closerName: session.name,
        action: "closer_created",
        entityType: "closer",
        entityId: newCloser?.id ?? null,
        description: `Closer "${input.name}" (${input.email}) cadastrado por ${session.name}`,
        metadata: JSON.stringify({ name: input.name, email: input.email, role: input.role || "closer" }),
      });

      return newCloser;
    }),

  listClosers: publicProcedure.query(async ({ ctx }) => {
    const session = getCloserFromContext(ctx);
    if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });
    const currentCloser = await getCloserById(session.closerId);
    if (!currentCloser || currentCloser.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores" });
    }
    return await listClosers(false);
  }),

  updateCloser: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        role: z.enum(["closer", "admin"]).optional(),
        isActive: z.enum(["yes", "no"]).optional(),
        password: z.string().min(6).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });
      const currentCloser = await getCloserById(session.closerId);
      if (!currentCloser || currentCloser.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores" });
      }
      const { id, ...data } = input;
      const updated = await updateCloser(id, data);

      const changes: string[] = [];
      if (data.name) changes.push(`nome: "${data.name}"`);
      if (data.email) changes.push(`email: "${data.email}"`);
      if (data.role) changes.push(`perfil: "${data.role}"`);
      if (data.isActive) changes.push(`ativo: "${data.isActive}"`);
      if (data.password) changes.push("senha alterada");

      await createLog({
        closerId: session.closerId,
        closerName: session.name,
        action: "closer_updated",
        entityType: "closer",
        entityId: id,
        description: `Closer #${id} atualizado por ${session.name}${changes.length ? `: ${changes.join(", ")}` : ""}`,
        metadata: JSON.stringify({ updatedFields: Object.keys(data) }),
      });

      return updated;
    }),

  // ===== CLIENTES =====
  createClient: publicProcedure
    .input(
      z.object({
        companyName: z.string().min(1),
        mainPartner: z.string().min(1),
        cnpj: z.string().optional(),
        cpf: z.string().optional(),
        rg: z.string().optional(),
        street: z.string().optional(),
        number: z.string().optional(),
        complement: z.string().optional(),
        neighborhood: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        whatsapp: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const newClient = await createClient({
        ...input,
        closerId: session.closerId,
      });

      await createLog({
        closerId: session.closerId,
        closerName: session.name,
        action: "client_created",
        entityType: "client",
        entityId: newClient?.id ?? null,
        description: `Cliente "${input.companyName}" (${input.mainPartner}) cadastrado por ${session.name}`,
        metadata: JSON.stringify({ companyName: input.companyName, mainPartner: input.mainPartner, whatsapp: input.whatsapp }),
      });

      return newClient;
    }),

  listClients: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        page: z.number().optional(),
        limit: z.number().optional(),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const currentCloser = await getCloserById(session.closerId);
      const isAdmin = currentCloser?.role === "admin";

      return await listClients({
        closerId: isAdmin ? undefined : session.closerId,
        search: input?.search,
        page: input?.page,
        limit: input?.limit,
      });
    }),

  getClient: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const client = await getClientById(input.id);
      if (!client) throw new TRPCError({ code: "NOT_FOUND", message: "Cliente não encontrado" });

      const currentCloser = await getCloserById(session.closerId);
      if (currentCloser?.role !== "admin" && client.closerId !== session.closerId) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Sem permissão" });
      }

      return client;
    }),

  updateClient: publicProcedure
    .input(
      z.object({
        id: z.number(),
        companyName: z.string().optional(),
        mainPartner: z.string().optional(),
        cnpj: z.string().optional(),
        cpf: z.string().optional(),
        rg: z.string().optional(),
        street: z.string().optional(),
        number: z.string().optional(),
        complement: z.string().optional(),
        neighborhood: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        whatsapp: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const client = await getClientById(input.id);
      if (!client) throw new TRPCError({ code: "NOT_FOUND", message: "Cliente não encontrado" });

      const currentCloser = await getCloserById(session.closerId);
      if (currentCloser?.role !== "admin" && client.closerId !== session.closerId) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Sem permissão" });
      }

      const { id, ...data } = input;
      const updated = await updateClient(id, data as any);

      await createLog({
        closerId: session.closerId,
        closerName: session.name,
        action: "client_updated",
        entityType: "client",
        entityId: id,
        description: `Cliente #${id} "${client.companyName}" atualizado por ${session.name}`,
        metadata: JSON.stringify({ updatedFields: Object.keys(data), before: { companyName: client.companyName, mainPartner: client.mainPartner } }),
      });

      return updated;
    }),

  // ===== PROPOSTAS =====
  createProposal: publicProcedure
    .input(
      z.object({
        clientId: z.number(),
        projectType: z.enum(["certificacao_mec", "projeto_alianca", "pos_mba_parceiros", "mentoria_ni1"]),
        value: z.string().min(1),
        numberOfCourses: z.number().optional(),
        observation: z.string().optional(),
        paymentMethod: z.enum(["cartao_credito", "pix", "boleto"]).optional(),
        installments: z.number().optional(),
        downPayment: z.string().optional(),
        installmentValue: z.string().optional(),
        mixedPaymentEnabled: z.enum(["yes", "no"]).optional(),
        pixDownPayment: z.string().optional(),
        cardInstallments: z.number().optional(),
        cardInstallmentValue: z.string().optional(),
        boletoInstallments: z.number().optional(),
        boletoInstallmentValue: z.string().optional(),
        proposalSentDate: z.date().optional(),
        expectedPaymentDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const newProposal = await createProposal({
        ...input,
        closerId: session.closerId,
      });

      await createLog({
        closerId: session.closerId,
        closerName: session.name,
        action: "proposal_created",
        entityType: "proposal",
        entityId: newProposal?.id ?? null,
        description: `Proposta "${PROJECT_LABELS[input.projectType] || input.projectType}" (R$ ${input.value}) criada por ${session.name} para cliente #${input.clientId}`,
        metadata: JSON.stringify({ projectType: input.projectType, value: input.value, clientId: input.clientId }),
      });

      return newProposal;
    }),

  listProposals: publicProcedure
    .input(
      z.object({
        status: z.enum(["enviada", "fechada", "perdida"]).optional(),
        page: z.number().optional(),
        limit: z.number().optional(),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const currentCloser = await getCloserById(session.closerId);
      const isAdmin = currentCloser?.role === "admin";

      return await listProposals({
        closerId: isAdmin ? undefined : session.closerId,
        status: input?.status,
        page: input?.page,
        limit: input?.limit,
      });
    }),

  getProposal: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const proposal = await getProposalById(input.id);
      if (!proposal) throw new TRPCError({ code: "NOT_FOUND", message: "Proposta não encontrada" });

      const currentCloser = await getCloserById(session.closerId);
      if (currentCloser?.role !== "admin" && proposal.closerId !== session.closerId) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Sem permissão" });
      }

      return proposal;
    }),

  updateProposalStatus: publicProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["enviada", "fechada", "perdida"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const proposal = await getProposalById(input.id);
      if (!proposal) throw new TRPCError({ code: "NOT_FOUND", message: "Proposta não encontrada" });

      const currentCloser = await getCloserById(session.closerId);
      if (currentCloser?.role !== "admin" && proposal.closerId !== session.closerId) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Sem permissão" });
      }

      const updated = await updateProposalStatus(input.id, input.status);

      const statusLabels: Record<string, string> = { enviada: "Enviada", fechada: "Fechada", perdida: "Perdida" };
      await createLog({
        closerId: session.closerId,
        closerName: session.name,
        action: "proposal_status_changed",
        entityType: "proposal",
        entityId: input.id,
        description: `Status da proposta #${input.id} alterado de "${statusLabels[proposal.status]}" para "${statusLabels[input.status]}" por ${session.name}`,
        metadata: JSON.stringify({ before: proposal.status, after: input.status }),
      });

      return updated;
    }),

  updateProposal: publicProcedure
    .input(
      z.object({
        id: z.number(),
        clientId: z.number().optional(),
        projectType: z.enum(["certificacao_mec", "projeto_alianca", "pos_mba_parceiros", "mentoria_ni1"]).optional(),
        value: z.string().optional(),
        numberOfCourses: z.number().optional(),
        observation: z.string().optional(),
        status: z.enum(["enviada", "fechada", "perdida"]).optional(),
        paymentMethod: z.enum(["cartao_credito", "pix", "boleto"]).optional(),
        installments: z.number().optional(),
        downPayment: z.string().optional(),
        installmentValue: z.string().optional(),
        mixedPaymentEnabled: z.enum(["yes", "no"]).optional(),
        pixDownPayment: z.string().optional(),
        cardInstallments: z.number().optional(),
        cardInstallmentValue: z.string().optional(),
        boletoInstallments: z.number().optional(),
        boletoInstallmentValue: z.string().optional(),
        proposalSentDate: z.date().optional(),
        expectedPaymentDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const proposal = await getProposalById(input.id);
      if (!proposal) throw new TRPCError({ code: "NOT_FOUND", message: "Proposta não encontrada" });

      const currentCloser = await getCloserById(session.closerId);
      if (currentCloser?.role !== "admin" && proposal.closerId !== session.closerId) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Sem permissão" });
      }

      const { id, ...data } = input;
      const updated = await updateProposal(id, data as any);

      await createLog({
        closerId: session.closerId,
        closerName: session.name,
        action: "proposal_updated",
        entityType: "proposal",
        entityId: id,
        description: `Proposta #${id} "${PROJECT_LABELS[proposal.projectType] || proposal.projectType}" editada por ${session.name}`,
        metadata: JSON.stringify({ updatedFields: Object.keys(data), before: { value: proposal.value, status: proposal.status } }),
      });

      return updated;
    }),

  deleteProposal: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const currentCloser = await getCloserById(session.closerId);
      if (currentCloser?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores podem deletar propostas" });
      }

      const proposal = await getProposalById(input.id);

      await createLog({
        closerId: session.closerId,
        closerName: session.name,
        action: "proposal_deleted",
        entityType: "proposal",
        entityId: input.id,
        description: `Proposta #${input.id} "${proposal ? (PROJECT_LABELS[proposal.projectType] || proposal.projectType) : "desconhecida"}" deletada por ${session.name}`,
        metadata: proposal ? JSON.stringify({ projectType: proposal.projectType, value: proposal.value, status: proposal.status }) : null,
      });

      return await deleteProposal(input.id);
    }),

  // ===== VENDAS =====
  createSale: publicProcedure
    .input(
      z.object({
        proposalId: z.number(),
        clientId: z.number(),
        projectType: z.enum(["certificacao_mec", "projeto_alianca", "pos_mba_parceiros", "mentoria_ni1"]),
        totalValue: z.string().min(1),
        paymentMethod: z.enum(["cartao_credito", "pix", "boleto"]),
        installments: z.number().optional(),
        downPayment: z.string().optional(),
        installmentValue: z.string().optional(),
        numberOfCourses: z.number().optional(),
        observation: z.string().optional(),
        mixedPaymentEnabled: z.enum(["yes", "no"]).optional(),
        pixDownPayment: z.string().optional(),
        cardInstallments: z.number().optional(),
        cardInstallmentValue: z.string().optional(),
        boletoInstallments: z.number().optional(),
        boletoInstallmentValue: z.string().optional(),
        proposalSentDate: z.date().optional(),
        expectedPaymentDate: z.date().optional(),
        paymentReceivedDate: z.date().optional(),
        paymentPlatform: z.string().optional(),
        paymentId: z.string().optional(),
        paymentStatus: z.enum(["pending", "processing", "completed", "failed", "refunded"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const newSale = await createSale({
        ...input,
        closerId: session.closerId,
      });

      await createLog({
        closerId: session.closerId,
        closerName: session.name,
        action: "sale_created",
        entityType: "sale",
        entityId: newSale?.id ?? null,
        description: `Venda "${PROJECT_LABELS[input.projectType] || input.projectType}" (R$ ${input.totalValue}) registrada por ${session.name} — proposta #${input.proposalId}`,
        metadata: JSON.stringify({ projectType: input.projectType, totalValue: input.totalValue, paymentMethod: input.paymentMethod, proposalId: input.proposalId }),
      });

      return newSale;
    }),

  listSales: publicProcedure
    .input(
      z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const currentCloser = await getCloserById(session.closerId);
      const isAdmin = currentCloser?.role === "admin";

      return await listSales({
        closerId: isAdmin ? undefined : session.closerId,
        page: input?.page,
        limit: input?.limit,
      });
    }),

  updateSale: publicProcedure
    .input(
      z.object({
        id: z.number(),
        mixedPaymentEnabled: z.enum(["yes", "no"]).optional(),
        pixDownPayment: z.string().optional(),
        cardInstallments: z.number().optional(),
        cardInstallmentValue: z.string().optional(),
        boletoInstallments: z.number().optional(),
        boletoInstallmentValue: z.string().optional(),
        proposalSentDate: z.date().optional(),
        expectedPaymentDate: z.date().optional(),
        paymentReceivedDate: z.date().optional(),
        paymentPlatform: z.string().optional(),
        paymentId: z.string().optional(),
        paymentStatus: z.enum(["pending", "processing", "completed", "failed", "refunded"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const currentCloser = await getCloserById(session.closerId);
      if (currentCloser?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores podem editar vendas" });
      }

      const { id, ...data } = input;
      const updated = await updateSale(id, data as any);

      const changes: string[] = [];
      if (data.paymentStatus) changes.push(`status: "${data.paymentStatus}"`);
      if (data.paymentPlatform) changes.push(`plataforma: "${data.paymentPlatform}"`);
      if (data.paymentId) changes.push(`ID transação: "${data.paymentId}"`);

      await createLog({
        closerId: session.closerId,
        closerName: session.name,
        action: "sale_updated",
        entityType: "sale",
        entityId: id,
        description: `Venda #${id} atualizada por ${session.name}${changes.length ? `: ${changes.join(", ")}` : ""}`,
        metadata: JSON.stringify({ updatedFields: Object.keys(data) }),
      });

      return updated;
    }),

  deleteSale: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const currentCloser = await getCloserById(session.closerId);
      if (currentCloser?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores podem deletar vendas" });
      }

      await createLog({
        closerId: session.closerId,
        closerName: session.name,
        action: "sale_deleted",
        entityType: "sale",
        entityId: input.id,
        description: `Venda #${input.id} deletada por ${session.name}`,
        metadata: null,
      });

      return await deleteSale(input.id);
    }),

  // ===== EXPORTAR PDF =====
  exportProposalPDF: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faca login primeiro" });

      const currentCloser = await getCloserById(session.closerId);
      if (currentCloser?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores podem exportar propostas" });
      }

      const proposal = await getProposalById(input.id);
      if (!proposal) throw new TRPCError({ code: "NOT_FOUND", message: "Proposta nao encontrada" });

      const client = await getClientById(proposal.clientId);
      const closer = await getCloserById(proposal.closerId);

      await createLog({
        closerId: session.closerId,
        closerName: session.name,
        action: "proposal_pdf_exported",
        entityType: "proposal",
        entityId: input.id,
        description: `PDF da proposta #${input.id} "${PROJECT_LABELS[proposal.projectType] || proposal.projectType}" exportado por ${session.name}`,
        metadata: JSON.stringify({ projectType: proposal.projectType, value: proposal.value }),
      });

      return { proposal, client, closer };
    }),

  // ===== LOGS (admin only) =====
  listLogs: publicProcedure
    .input(
      z.object({
        closerId: z.number().optional(),
        action: z.string().optional(),
        entityType: z.string().optional(),
        page: z.number().optional(),
        limit: z.number().optional(),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      const currentCloser = await getCloserById(session.closerId);
      if (currentCloser?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores podem visualizar logs" });
      }

      return await listLogs({
        closerId: input?.closerId,
        action: input?.action,
        entityType: input?.entityType,
        page: input?.page,
        limit: input?.limit,
      });
    }),

  // ===== DASHBOARD =====
  stats: publicProcedure.query(async ({ ctx }) => {
    const session = getCloserFromContext(ctx);
    if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

    const currentCloser = await getCloserById(session.closerId);
    const isAdmin = currentCloser?.role === "admin";

    return await getDashboardStats(isAdmin ? undefined : session.closerId);
  }),

  ranking: publicProcedure.query(async ({ ctx }) => {
    const session = getCloserFromContext(ctx);
    if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

    const currentCloser = await getCloserById(session.closerId);
    if (currentCloser?.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores" });
    }

    return await getCloserRanking();
  }),

  // ===== LISTAS AUXILIARES =====
  activeClosers: publicProcedure.query(async ({ ctx }) => {
    const session = getCloserFromContext(ctx);
    if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });
    return await listClosers(true);
  }),
});
