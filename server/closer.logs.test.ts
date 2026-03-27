import { describe, it, expect, vi, beforeEach } from "vitest";

// ===== MOCK DO BANCO DE DADOS =====
// Usar factory functions dentro do vi.mock para evitar hoisting issues
let mockInsert: ReturnType<typeof vi.fn>;
let mockSelect: ReturnType<typeof vi.fn>;

vi.mock("./db", () => ({
  getDb: vi.fn().mockImplementation(async () => ({
    insert: (...args: any[]) => mockInsert?.(...args) ?? { values: vi.fn().mockResolvedValue(undefined) },
    select: (...args: any[]) => mockSelect?.(...args),
  })),
}));

vi.mock("../drizzle/schema", () => ({
  closerLogs: { id: "id", closerId: "closerId", action: "action", entityType: "entityType", createdAt: "createdAt" },
  closers: {},
  closerClients: {},
  closerProposals: {},
  closerSales: {},
}));

vi.mock("drizzle-orm", () => ({
  eq: vi.fn((col: any, val: any) => ({ col, val, type: "eq" })),
  desc: vi.fn((col: any) => ({ col, type: "desc" })),
  and: vi.fn((...conditions: any[]) => ({ conditions, type: "and" })),
  like: vi.fn((col: any, val: any) => ({ col, val, type: "like" })),
  or: vi.fn((...conditions: any[]) => ({ conditions, type: "or" })),
  sql: vi.fn(),
  count: vi.fn(() => "count()"),
}));

import { createLog, listLogs } from "./closerDb";

describe("Sistema de Logs do Closer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Inicializar mocks após clearAllMocks
    mockInsert = vi.fn().mockReturnValue({ values: vi.fn().mockResolvedValue(undefined) });
    mockSelect = vi.fn();
  });

  describe("createLog", () => {
    it("deve criar um log de login sem lançar erro", async () => {
      const mockValues = vi.fn().mockResolvedValue(undefined);
      mockInsert.mockReturnValue({ values: mockValues });

      await expect(
        createLog({
          closerId: 1,
          closerName: "João Silva",
          action: "login",
          entityType: "session",
          entityId: null,
          description: "João Silva fez login no sistema",
          metadata: JSON.stringify({ email: "joao@fabrani.com", role: "closer" }),
        })
      ).resolves.not.toThrow();

      expect(mockInsert).toHaveBeenCalledOnce();
      expect(mockValues).toHaveBeenCalledWith(
        expect.objectContaining({
          closerId: 1,
          closerName: "João Silva",
          action: "login",
          entityType: "session",
          description: "João Silva fez login no sistema",
        })
      );
    });

    it("deve criar um log de criação de cliente", async () => {
      const mockValues = vi.fn().mockResolvedValue(undefined);
      mockInsert.mockReturnValue({ values: mockValues });

      await expect(
        createLog({
          closerId: 2,
          closerName: "Maria Santos",
          action: "client_created",
          entityType: "client",
          entityId: 15,
          description: 'Cliente "Clínica ABC" (Dr. Pedro) cadastrado por Maria Santos',
          metadata: JSON.stringify({ companyName: "Clínica ABC", mainPartner: "Dr. Pedro" }),
        })
      ).resolves.not.toThrow();

      expect(mockValues).toHaveBeenCalledWith(
        expect.objectContaining({
          closerId: 2,
          action: "client_created",
          entityType: "client",
          entityId: 15,
        })
      );
    });

    it("deve criar um log de alteração de status de proposta", async () => {
      const mockValues = vi.fn().mockResolvedValue(undefined);
      mockInsert.mockReturnValue({ values: mockValues });

      await expect(
        createLog({
          closerId: 1,
          closerName: "João Silva",
          action: "proposal_status_changed",
          entityType: "proposal",
          entityId: 42,
          description: 'Status da proposta #42 alterado de "Enviada" para "Fechada" por João Silva',
          metadata: JSON.stringify({ before: "enviada", after: "fechada" }),
        })
      ).resolves.not.toThrow();
    });

    it("deve criar um log de exportação de PDF", async () => {
      const mockValues = vi.fn().mockResolvedValue(undefined);
      mockInsert.mockReturnValue({ values: mockValues });

      await expect(
        createLog({
          closerId: 3,
          closerName: "Admin FABRANI",
          action: "proposal_pdf_exported",
          entityType: "proposal",
          entityId: 7,
          description: 'PDF da proposta #7 "Certificação MEC" exportado por Admin FABRANI',
          metadata: JSON.stringify({ projectType: "certificacao_mec", value: "15000" }),
        })
      ).resolves.not.toThrow();
    });

    it("deve silenciar erros de banco sem propagar exceção", async () => {
      mockInsert.mockReturnValue({
        values: vi.fn().mockRejectedValue(new Error("DB connection failed")),
      });

      // createLog nunca deve lançar erro — falhas de log não devem quebrar a operação principal
      await expect(
        createLog({
          closerId: 1,
          closerName: "Test",
          action: "login",
          entityType: "session",
          entityId: null,
          description: "Test log",
          metadata: null,
        })
      ).resolves.not.toThrow();
    });
  });

  describe("listLogs", () => {
    const mockLogs = [
      {
        id: 1,
        closerId: 1,
        closerName: "João Silva",
        action: "login",
        entityType: "session",
        entityId: null,
        description: "João Silva fez login no sistema",
        metadata: null,
        createdAt: new Date("2026-03-27T10:00:00Z"),
      },
      {
        id: 2,
        closerId: 1,
        closerName: "João Silva",
        action: "client_created",
        entityType: "client",
        entityId: 5,
        description: 'Cliente "Hospital São Lucas" cadastrado por João Silva',
        metadata: JSON.stringify({ companyName: "Hospital São Lucas" }),
        createdAt: new Date("2026-03-27T10:05:00Z"),
      },
      {
        id: 3,
        closerId: 2,
        closerName: "Maria Admin",
        action: "proposal_pdf_exported",
        entityType: "proposal",
        entityId: 12,
        description: 'PDF da proposta #12 exportado por Maria Admin',
        metadata: null,
        createdAt: new Date("2026-03-27T11:00:00Z"),
      },
    ];

    beforeEach(() => {
      // Configura o mock para retornar logs e contagem
      mockSelect.mockImplementation(() => {
        let callCount = 0;
        const chain = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          offset: vi.fn().mockImplementation(() => {
            callCount++;
            if (callCount === 1) return Promise.resolve(mockLogs);
            return Promise.resolve([{ "count()": 3 }]);
          }),
        };
        return chain;
      });
    });

    it("deve retornar logs com estrutura correta", async () => {
      // Mock simplificado para listLogs
      const mockChain = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        offset: vi.fn().mockResolvedValue(mockLogs),
      };
      const mockCountChain = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockResolvedValue([{ "count()": 3 }]),
      };

      let selectCallCount = 0;
      mockSelect.mockImplementation(() => {
        selectCallCount++;
        return selectCallCount === 1 ? mockChain : mockCountChain;
      });

      const result = await listLogs({ page: 1, limit: 50 });

      expect(result).toHaveProperty("logs");
      expect(result).toHaveProperty("total");
    });

    it("deve retornar objeto vazio quando banco não está disponível", async () => {
      const { getDb } = await import("./db");
      vi.mocked(getDb).mockResolvedValueOnce(null as any);

      const result = await listLogs({});
      expect(result).toEqual({ logs: [], total: 0 });
    });

    it("deve aceitar filtros opcionais sem erro", async () => {
      const mockChain = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        offset: vi.fn().mockResolvedValue([]),
      };
      const mockCountChain = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockResolvedValue([{ "count()": 0 }]),
      };

      let selectCallCount = 0;
      mockSelect.mockImplementation(() => {
        selectCallCount++;
        return selectCallCount === 1 ? mockChain : mockCountChain;
      });

      await expect(
        listLogs({ closerId: 1, action: "login", entityType: "session", page: 2, limit: 10 })
      ).resolves.not.toThrow();
    });
  });

  describe("Validação de tipos de ação", () => {
    it("deve aceitar todos os tipos de ação definidos no schema", async () => {
      const mockValues = vi.fn().mockResolvedValue(undefined);
      mockInsert.mockReturnValue({ values: mockValues });

      const validActions = [
        "client_created", "client_updated", "client_deleted",
        "proposal_created", "proposal_updated", "proposal_status_changed",
        "proposal_deleted", "proposal_pdf_exported",
        "sale_created", "sale_updated", "sale_deleted",
        "closer_created", "closer_updated", "closer_deleted",
        "login", "logout",
      ] as const;

      for (const action of validActions) {
        await expect(
          createLog({
            closerId: 1,
            closerName: "Test User",
            action,
            entityType: "session",
            entityId: null,
            description: `Ação: ${action}`,
            metadata: null,
          })
        ).resolves.not.toThrow();
      }

      expect(mockInsert).toHaveBeenCalledTimes(validActions.length);
    });

    it("deve aceitar todos os tipos de entidade definidos no schema", async () => {
      const mockValues = vi.fn().mockResolvedValue(undefined);
      mockInsert.mockReturnValue({ values: mockValues });

      const validEntityTypes = ["client", "proposal", "sale", "closer", "session"] as const;

      for (const entityType of validEntityTypes) {
        await expect(
          createLog({
            closerId: 1,
            closerName: "Test User",
            action: "login",
            entityType,
            entityId: entityType !== "session" ? 1 : null,
            description: `Entidade: ${entityType}`,
            metadata: null,
          })
        ).resolves.not.toThrow();
      }
    });
  });

  describe("Integridade do metadata JSON", () => {
    it("deve armazenar metadata como string JSON válida", async () => {
      const mockValues = vi.fn().mockResolvedValue(undefined);
      mockInsert.mockReturnValue({ values: mockValues });

      const metadata = {
        before: { status: "enviada", value: "15000" },
        after: { status: "fechada" },
        updatedFields: ["status"],
      };

      await createLog({
        closerId: 1,
        closerName: "Admin",
        action: "proposal_updated",
        entityType: "proposal",
        entityId: 5,
        description: "Proposta #5 editada por Admin",
        metadata: JSON.stringify(metadata),
      });

      const calledWith = mockValues.mock.calls[0][0];
      expect(() => JSON.parse(calledWith.metadata)).not.toThrow();
      const parsed = JSON.parse(calledWith.metadata);
      expect(parsed.before.status).toBe("enviada");
      expect(parsed.after.status).toBe("fechada");
    });

    it("deve aceitar metadata nulo", async () => {
      const mockValues = vi.fn().mockResolvedValue(undefined);
      mockInsert.mockReturnValue({ values: mockValues });

      await createLog({
        closerId: 1,
        closerName: "Admin",
        action: "logout",
        entityType: "session",
        entityId: null,
        description: "Admin saiu do sistema",
        metadata: null,
      });

      const calledWith = mockValues.mock.calls[0][0];
      expect(calledWith.metadata).toBeNull();
    });
  });
});
