import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createOrUpdateContact } from "./brevo";

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
