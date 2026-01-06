import axios from "axios";

const BREVO_API_URL = "https://api.brevo.com/v3";
const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
  console.warn("[Brevo] API key not configured");
}

interface BrevoContact {
  email: string;
  attributes?: {
    NOME?: string;
    WHATSAPP?: string;
    [key: string]: string | number | boolean | undefined;
  };
  listIds?: number[];
  updateEnabled?: boolean;
}

/**
 * Cria ou atualiza um contato na Brevo
 * Documentação: https://developers.brevo.com/reference/createcontact
 */
export async function createOrUpdateContact(data: BrevoContact): Promise<{ success: boolean; message: string }> {
  if (!BREVO_API_KEY) {
    throw new Error("Brevo API key not configured");
  }

  try {
    const response = await axios.post(
      `${BREVO_API_URL}/contacts`,
      {
        email: data.email,
        attributes: data.attributes || {},
        listIds: data.listIds || [],
        updateEnabled: data.updateEnabled ?? true, // Atualiza se o contato já existir
      },
      {
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    return {
      success: true,
      message: "Contato criado/atualizado com sucesso",
    };
  } catch (error: any) {
    // Erro 400 pode significar que o contato já existe (dependendo da configuração)
    if (error.response?.status === 400 && error.response?.data?.code === "duplicate_parameter") {
      return {
        success: true,
        message: "Contato já existe e foi atualizado",
      };
    }

    console.error("[Brevo] Erro ao criar contato:", error.response?.data || error.message);
    
    throw new Error(
      error.response?.data?.message || "Erro ao salvar contato na Brevo"
    );
  }
}

/**
 * Testa a conexão com a API da Brevo
 * Documentação: https://developers.brevo.com/reference/getaccount
 */
export async function testBrevoConnection(): Promise<{ success: boolean; accountEmail?: string; error?: string }> {
  if (!BREVO_API_KEY) {
    return { success: false, error: "API key not configured" };
  }

  try {
    const response = await axios.get(`${BREVO_API_URL}/account`, {
      headers: {
        "api-key": BREVO_API_KEY,
      },
      timeout: 5000,
    });

    return {
      success: true,
      accountEmail: response.data.email,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
}
