import { Request, Response, Express } from "express";
import { recordSubmission, getClientIp } from "./antiFraud";
import { createOrUpdateContact } from "./brevo";
import { notifyOwner } from "./_core/notification";

/**
 * Webhook endpoint para receber leads do GoHighLevel.
 * 
 * O GHL envia um POST com os dados do lead quando o formulário é submetido.
 * Formatos possíveis do payload GHL:
 * - Formato padrão: { contact: { firstName, email, phone, ... }, ... }
 * - Formato alternativo: { first_name, email, phone, ... }
 * - Formato webhook custom: { firstName, email, phone, ... }
 * 
 * Este endpoint:
 * 1. Extrai nome, email, telefone do payload
 * 2. Registra no sistema anti-fraude (lead_submissions)
 * 3. Cria/atualiza contato na Brevo (lista S01-A01 | Lead #15)
 * 4. Retorna 200 OK para o GHL
 */

// Token de segurança para validar que o webhook vem do GHL
const WEBHOOK_SECRET = process.env.GHL_WEBHOOK_SECRET || "";

interface GHLWebhookPayload {
  // Formato padrão GHL
  contact?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    phone?: string;
    tags?: string[];
    source?: string;
    ip?: string;
    country?: string;
    city?: string;
    state?: string;
  };
  // Formato alternativo (campos no root)
  first_name?: string;
  firstName?: string;
  last_name?: string;
  lastName?: string;
  full_name?: string;
  name?: string;
  email?: string;
  phone?: string;
  ip?: string;
  // Campos GHL específicos
  location?: {
    id?: string;
    name?: string;
  };
  form_id?: string;
  formId?: string;
  page_url?: string;
  pageUrl?: string;
  source?: string;
  type?: string;
  // Campos customizados do formulário
  customData?: Record<string, any>;
  [key: string]: any;
}

/** Extrai o nome do lead do payload GHL (vários formatos possíveis) */
function extractName(payload: GHLWebhookPayload): string {
  // Tentar do objeto contact
  if (payload.contact) {
    if (payload.contact.name) return payload.contact.name;
    if (payload.contact.firstName) {
      return payload.contact.lastName
        ? `${payload.contact.firstName} ${payload.contact.lastName}`
        : payload.contact.firstName;
    }
  }
  // Tentar do root
  if (payload.full_name) return payload.full_name;
  if (payload.name) return payload.name;
  if (payload.firstName || payload.first_name) {
    const first = payload.firstName || payload.first_name || "";
    const last = payload.lastName || payload.last_name || "";
    return last ? `${first} ${last}` : first;
  }
  return "";
}

/** Extrai o email do lead do payload GHL */
function extractEmail(payload: GHLWebhookPayload): string {
  return payload.contact?.email || payload.email || "";
}

/** Extrai o telefone do lead do payload GHL */
function extractPhone(payload: GHLWebhookPayload): string {
  return payload.contact?.phone || payload.phone || "";
}

/** Extrai o IP do lead do payload GHL ou do request */
function extractIp(payload: GHLWebhookPayload, req: Request): string {
  // GHL pode enviar o IP do lead no payload
  const payloadIp = payload.contact?.ip || payload.ip;
  if (payloadIp && payloadIp !== "unknown") return payloadIp;
  // Fallback: IP do request (será o IP do servidor GHL)
  return getClientIp(req);
}

/** Extrai a página de origem */
function extractPage(payload: GHLWebhookPayload): string {
  return payload.page_url || payload.pageUrl || payload.source || "/mec";
}

/** Registra as rotas de webhook no Express */
export function registerWebhookRoutes(app: Express) {
  // Endpoint principal do webhook GHL
  app.post("/api/webhook/ghl-lead", async (req: Request, res: Response) => {
    try {
      const payload = req.body as GHLWebhookPayload;

      // Log do payload para debug (remover em produção estável)
      console.log("[GHL Webhook] Payload recebido:", JSON.stringify(payload, null, 2));

      // Validação básica de segurança (opcional - se WEBHOOK_SECRET estiver configurado)
      if (WEBHOOK_SECRET) {
        const authHeader = req.headers["authorization"] || req.headers["x-webhook-secret"];
        const querySecret = req.query.secret;
        if (authHeader !== `Bearer ${WEBHOOK_SECRET}` && authHeader !== WEBHOOK_SECRET && querySecret !== WEBHOOK_SECRET) {
          console.warn("[GHL Webhook] Token de segurança inválido");
          return res.status(401).json({ error: "Unauthorized" });
        }
      }

      // Extrair dados do lead
      const leadName = extractName(payload);
      const leadEmail = extractEmail(payload);
      const leadPhone = extractPhone(payload);
      const ip = extractIp(payload, req);
      const page = extractPage(payload);

      console.log(`[GHL Webhook] Lead capturado: nome=${leadName}, email=${leadEmail}, phone=${leadPhone}, ip=${ip}, page=${page}`);

      // 1. Registrar no sistema anti-fraude
      const antiFraudResult = await recordSubmission({
        ip,
        page,
        leadName: leadName || undefined,
        leadEmail: leadEmail || undefined,
        leadPhone: leadPhone || undefined,
        userAgent: req.headers["user-agent"] as string | undefined,
      });

      console.log(`[GHL Webhook] Anti-fraude: recorded=${antiFraudResult.recorded}, autoBlocked=${antiFraudResult.autoBlocked}`);

      // 2. Integrar com Brevo (criar contato e adicionar à lista Lead #15)
      let brevoResult = { success: false, message: "Não processado" };
      if (leadEmail) {
        try {
          brevoResult = await createOrUpdateContact({
            email: leadEmail,
            attributes: {
              NOME: leadName || undefined,
              WHATSAPP: leadPhone || undefined,
            },
            listIds: [15], // S01-A01 | Lead #15
            updateEnabled: true,
          });
          console.log(`[GHL Webhook] Brevo: ${brevoResult.message}`);
        } catch (brevoError: any) {
          console.error("[GHL Webhook] Erro Brevo:", brevoError.message);
          brevoResult = { success: false, message: brevoError.message };
        }
      }

      // 3. Notificar owner sobre nova lead (opcional - pode ser removido se muito frequente)
      if (leadEmail && !antiFraudResult.autoBlocked) {
        try {
          await notifyOwner({
            title: "📋 Nova Lead Capturada via /mec",
            content: `Nova lead registrada:\n- Nome: ${leadName || "N/A"}\n- Email: ${leadEmail}\n- Telefone: ${leadPhone || "N/A"}\n- IP: ${ip}\n- Página: ${page}\n\nBrevo: ${brevoResult.message}`,
          });
        } catch (e) {
          // Silenciar erro de notificação para não bloquear o webhook
        }
      }

      // Responder 200 OK para o GHL
      return res.status(200).json({
        success: true,
        message: "Lead registrada com sucesso",
        data: {
          antiFraud: {
            recorded: antiFraudResult.recorded,
            autoBlocked: antiFraudResult.autoBlocked,
          },
          brevo: {
            success: brevoResult.success,
          },
        },
      });
    } catch (error: any) {
      console.error("[GHL Webhook] Erro ao processar webhook:", error);
      // Retornar 200 mesmo em erro para evitar que GHL reenvie
      return res.status(200).json({
        success: false,
        error: error.message || "Erro interno",
      });
    }
  });

  // Endpoint de teste/health check do webhook
  app.get("/api/webhook/ghl-lead", (_req: Request, res: Response) => {
    return res.status(200).json({
      status: "active",
      message: "Webhook GHL Lead está ativo. Envie um POST com os dados do lead.",
      expectedFields: ["contact.firstName", "contact.email", "contact.phone", "contact.ip"],
    });
  });

  console.log("[GHL Webhook] Rotas registradas: POST/GET /api/webhook/ghl-lead");
}
