import { describe, expect, it, vi, beforeEach } from "vitest";
import type { TrpcContext } from "./_core/context";
import crypto from "crypto";

// Mock the closerDb module
vi.mock("./closerDb", () => ({
  getCloserByEmail: vi.fn(),
  getCloserById: vi.fn(),
  listClosers: vi.fn(),
  updateCloser: vi.fn(),
  createCloser: vi.fn(),
  verifyPassword: vi.fn(),
  createClient: vi.fn(),
  getClientById: vi.fn(),
  listClients: vi.fn(),
  updateClient: vi.fn(),
  createProposal: vi.fn(),
  getProposalById: vi.fn(),
  listProposals: vi.fn(),
  updateProposalStatus: vi.fn(),
  updateProposal: vi.fn(),
  deleteProposal: vi.fn(),
  createSale: vi.fn(),
  listSales: vi.fn(),
  updateSale: vi.fn(),
  deleteSale: vi.fn(),
  getDashboardStats: vi.fn(),
  getCloserRanking: vi.fn(),
  // Logs
  createLog: vi.fn().mockResolvedValue(undefined),
  listLogs: vi.fn().mockResolvedValue({ logs: [], total: 0 }),
  hashPassword: vi.fn(),
}));

import {
  getCloserById,
  getClientById,
  updateClient,
  getProposalById,
  updateSale,
} from "./closerDb";

import { closerRouter } from "./closerRouter";

// Helper para criar token de closer (mesmo padrão do closerRouter.ts)
function makeCloserToken(closerId: number, name: string): string {
  const payload = JSON.stringify({ closerId, name, exp: Date.now() + 86400000 });
  const secret = process.env.JWT_SECRET || "fabrani-closer-secret";
  const hmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(payload).toString("base64") + "." + hmac;
}

function createMockContext(closerToken?: string): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: closerToken ? { "x-closer-token": closerToken } : {},
      cookies: closerToken ? { closer_session: closerToken } : {},
    } as any,
    res: {
      cookie: vi.fn(),
      clearCookie: vi.fn(),
    } as any,
  };
}

describe("closer.updateClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows admin to update client data", async () => {
    const adminCloser = { id: 1, name: "Admin", email: "admin@test.com", role: "admin", isActive: "yes", passwordHash: "" };
    const existingClient = { id: 10, companyName: "Old Corp", mainPartner: "Old Partner", closerId: 1, whatsapp: "11999999999" };
    const updatedClient = { ...existingClient, companyName: "New Corp", mainPartner: "New Partner" };

    vi.mocked(getCloserById).mockResolvedValue(adminCloser as any);
    vi.mocked(getClientById).mockResolvedValue(existingClient as any);
    vi.mocked(updateClient).mockResolvedValue(updatedClient as any);

    const token = makeCloserToken(1, "Admin");
    const ctx = createMockContext(token);
    const caller = closerRouter.createCaller(ctx);

    const result = await caller.updateClient({
      id: 10,
      companyName: "New Corp",
      mainPartner: "New Partner",
    });

    expect(updateClient).toHaveBeenCalledWith(10, expect.objectContaining({
      companyName: "New Corp",
      mainPartner: "New Partner",
    }));
    expect(result.companyName).toBe("New Corp");
  });

  it("rejects non-admin from updating another closer's client", async () => {
    const regularCloser = { id: 2, name: "Closer", email: "closer@test.com", role: "closer", isActive: "yes", passwordHash: "" };
    const existingClient = { id: 10, companyName: "Corp", mainPartner: "Partner", closerId: 1, whatsapp: "11999999999" };

    vi.mocked(getCloserById).mockResolvedValue(regularCloser as any);
    vi.mocked(getClientById).mockResolvedValue(existingClient as any);

    const token = makeCloserToken(2, "Closer");
    const ctx = createMockContext(token);
    const caller = closerRouter.createCaller(ctx);

    await expect(
      caller.updateClient({ id: 10, companyName: "Hacked Corp" })
    ).rejects.toThrow("Sem permissão");
  });
});

describe("closer.updateSale", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows admin to update sale payment status", async () => {
    const adminCloser = { id: 1, name: "Admin", email: "admin@test.com", role: "admin", isActive: "yes", passwordHash: "" };
    const updatedSale = { id: 5, paymentStatus: "completed", paymentPlatform: "Hotmart", paymentId: "TXN123" };

    vi.mocked(getCloserById).mockResolvedValue(adminCloser as any);
    vi.mocked(updateSale).mockResolvedValue(updatedSale as any);

    const token = makeCloserToken(1, "Admin");
    const ctx = createMockContext(token);
    const caller = closerRouter.createCaller(ctx);

    const result = await caller.updateSale({
      id: 5,
      paymentStatus: "completed",
      paymentPlatform: "Hotmart",
      paymentId: "TXN123",
    });

    expect(updateSale).toHaveBeenCalledWith(5, expect.objectContaining({
      paymentStatus: "completed",
      paymentPlatform: "Hotmart",
      paymentId: "TXN123",
    }));
    expect(result.paymentStatus).toBe("completed");
  });

  it("rejects non-admin from updating sale", async () => {
    const regularCloser = { id: 2, name: "Closer", email: "closer@test.com", role: "closer", isActive: "yes", passwordHash: "" };

    vi.mocked(getCloserById).mockResolvedValue(regularCloser as any);

    const token = makeCloserToken(2, "Closer");
    const ctx = createMockContext(token);
    const caller = closerRouter.createCaller(ctx);

    await expect(
      caller.updateSale({ id: 5, paymentStatus: "completed" })
    ).rejects.toThrow("Apenas administradores podem editar vendas");
  });
});

describe("closer.exportProposalPDF", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns proposal, client and closer data for PDF generation", async () => {
    const adminCloser = { id: 1, name: "Admin", email: "admin@test.com", role: "admin", isActive: "yes", passwordHash: "" };
    const proposal = { id: 3, clientId: 10, closerId: 1, projectType: "certificacao_mec", value: "5000", status: "enviada", createdAt: new Date() };
    const client = { id: 10, companyName: "Test Corp", mainPartner: "Test Partner", closerId: 1, whatsapp: "11999999999" };

    vi.mocked(getCloserById).mockResolvedValue(adminCloser as any);
    vi.mocked(getProposalById).mockResolvedValue(proposal as any);
    vi.mocked(getClientById).mockResolvedValue(client as any);

    const token = makeCloserToken(1, "Admin");
    const ctx = createMockContext(token);
    const caller = closerRouter.createCaller(ctx);

    const result = await caller.exportProposalPDF({ id: 3 });

    expect(result.proposal.id).toBe(3);
    expect(result.client?.companyName).toBe("Test Corp");
    expect(result.closer?.name).toBe("Admin");
  });

  it("rejects non-admin from exporting PDF", async () => {
    const regularCloser = { id: 2, name: "Closer", email: "closer@test.com", role: "closer", isActive: "yes", passwordHash: "" };

    vi.mocked(getCloserById).mockResolvedValue(regularCloser as any);

    const token = makeCloserToken(2, "Closer");
    const ctx = createMockContext(token);
    const caller = closerRouter.createCaller(ctx);

    await expect(
      caller.exportProposalPDF({ id: 3 })
    ).rejects.toThrow("Apenas administradores podem exportar propostas");
  });
});
