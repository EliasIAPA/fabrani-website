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
} from "./closerDb";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";

// ===== MIDDLEWARE: Closer autenticado =====
// Closers usam o sistema de auth do Manus (users table) mas verificamos se o closer existe
// Alternativa: closers têm seu próprio login com JWT

const CLOSER_COOKIE = "closer_session";

// Helper para criar JWT para closer
async function createCloserToken(closerId: number, name: string): Promise<string> {
  // Usamos um token simples baseado em JWT_SECRET
  const payload = JSON.stringify({ closerId, name, exp: Date.now() + ONE_YEAR_MS });
  const secret = process.env.JWT_SECRET || "fabrani-closer-secret";
  const hmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(payload).toString("base64") + "." + hmac;
}

// Helper para verificar token closer
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

// Helper middleware para extrair closer do cookie
function getCloserFromContext(ctx: any): { closerId: number; name: string } | null {
  const token = ctx.req.cookies?.[CLOSER_COOKIE] || ctx.req.headers?.["x-closer-token"];
  if (!token) return null;
  return verifyCloserToken(token);
}

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
      // Force secure: true when sameSite is 'none' (required by browsers)
      const finalCookieOptions = {
        ...cookieOptions,
        maxAge: ONE_YEAR_MS,
        secure: cookieOptions.sameSite === "none" ? true : cookieOptions.secure,
      };
      ctx.res.cookie(CLOSER_COOKIE, token, finalCookieOptions);

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

  logout: publicProcedure.mutation(({ ctx }) => {
    const cookieOptions = getSessionCookieOptions(ctx.req);
    ctx.res.clearCookie(CLOSER_COOKIE, { ...cookieOptions, maxAge: -1 });
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
      // Verificar se é admin
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });
      const currentCloser = await getCloserById(session.closerId);
      if (!currentCloser || currentCloser.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores podem cadastrar closers" });
      }

      // Verificar se email já existe
      const existing = await getCloserByEmail(input.email);
      if (existing) {
        throw new TRPCError({ code: "CONFLICT", message: "Email já cadastrado" });
      }

      return await createCloser(input);
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
      return await updateCloser(id, data);
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

      return await createClient({
        ...input,
        closerId: session.closerId,
      });
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
        closerId: isAdmin ? undefined : session.closerId, // Admin vê todos, closer vê só os seus
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
      return await updateClient(id, data as any);
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
        // Pagamento
        paymentMethod: z.enum(["cartao_credito", "pix", "boleto"]).optional(),
        installments: z.number().optional(),
        downPayment: z.string().optional(),
        installmentValue: z.string().optional(),
        // Pagamento Misto
        mixedPaymentEnabled: z.enum(["yes", "no"]).optional(),
        pixDownPayment: z.string().optional(),
        cardInstallments: z.number().optional(),
        cardInstallmentValue: z.string().optional(),
        boletoInstallments: z.number().optional(),
        boletoInstallmentValue: z.string().optional(),
        // Calendário
        proposalSentDate: z.date().optional(),
        expectedPaymentDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = getCloserFromContext(ctx);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });

      return await createProposal({
        ...input,
        closerId: session.closerId,
      });
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

      return await updateProposalStatus(input.id, input.status);
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
        // Pagamento
        paymentMethod: z.enum(["cartao_credito", "pix", "boleto"]).optional(),
        installments: z.number().optional(),
        downPayment: z.string().optional(),
        installmentValue: z.string().optional(),
        // Pagamento Misto
        mixedPaymentEnabled: z.enum(["yes", "no"]).optional(),
        pixDownPayment: z.string().optional(),
        cardInstallments: z.number().optional(),
        cardInstallmentValue: z.string().optional(),
        boletoInstallments: z.number().optional(),
        boletoInstallmentValue: z.string().optional(),
        // Calendário
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
      return await updateProposal(id, data as any);
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

      return await createSale({
        ...input,
        closerId: session.closerId,
      });
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
      return await updateSale(id, data as any);
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

      return await deleteSale(input.id);
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

      return await deleteProposal(input.id);
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

      return {
        proposal,
        client,
        closer,
      };
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
  /** Lista closers ativos (para selects) */
  activeClosers: publicProcedure.query(async ({ ctx }) => {
    const session = getCloserFromContext(ctx);
    if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Faça login primeiro" });
    return await listClosers(true);
  }),
});
