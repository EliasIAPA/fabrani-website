import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
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
