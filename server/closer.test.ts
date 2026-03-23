import { describe, expect, it, beforeAll, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { hashPassword, createCloser, getCloserByEmail } from "./closerDb";

// ===== HELPERS =====

type CookieCall = {
  name: string;
  value?: string;
  options: Record<string, unknown>;
};

function createMockContext(closerToken?: string): {
  ctx: TrpcContext;
  setCookies: CookieCall[];
  clearedCookies: CookieCall[];
} {
  const setCookies: CookieCall[] = [];
  const clearedCookies: CookieCall[] = [];

  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: closerToken
        ? { "x-closer-token": closerToken }
        : {},
      cookies: closerToken ? { closer_session: closerToken } : {},
    } as any,
    res: {
      cookie: (name: string, value: string, options: Record<string, unknown>) => {
        setCookies.push({ name, value, options });
      },
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as any,
  };

  return { ctx, setCookies, clearedCookies };
}

// Helper to create a valid closer token for testing
async function createTestToken(closerId: number, name: string): Promise<string> {
  const crypto = await import("crypto");
  const payload = JSON.stringify({
    closerId,
    name,
    exp: Date.now() + 365 * 24 * 60 * 60 * 1000,
  });
  const secret = process.env.JWT_SECRET || "fabrani-closer-secret";
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return Buffer.from(payload).toString("base64") + "." + hmac;
}

// ===== TESTES =====

describe("closer.hashPassword", () => {
  it("should hash a password consistently", () => {
    const hash1 = hashPassword("test123");
    const hash2 = hashPassword("test123");
    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64); // SHA-256 hex
  });

  it("should produce different hashes for different passwords", () => {
    const hash1 = hashPassword("test123");
    const hash2 = hashPassword("test456");
    expect(hash1).not.toBe(hash2);
  });
});

describe("closer.login", () => {
  it("should reject login with invalid email", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.closer.login({
        email: "nonexistent@test.com",
        password: "password123",
      })
    ).rejects.toThrow("Credenciais inválidas");
  });
});

describe("closer.me", () => {
  it("should return null when no token is provided", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.closer.me();
    expect(result).toBeNull();
  });

  it("should return null for invalid token", async () => {
    const { ctx } = createMockContext("invalid.token.here");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.closer.me();
    expect(result).toBeNull();
  });
});

describe("closer.logout", () => {
  it("should clear the closer session cookie", async () => {
    const { ctx, clearedCookies } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.closer.logout();
    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe("closer_session");
  });
});

describe("closer.createCloser (auth required)", () => {
  it("should reject unauthenticated requests", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.closer.createCloser({
        name: "Test Closer",
        email: "test@closer.com",
        password: "password123",
      })
    ).rejects.toThrow("Faça login primeiro");
  });
});

describe("closer.listClients (auth required)", () => {
  it("should reject unauthenticated requests", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.closer.listClients()).rejects.toThrow(
      "Faça login primeiro"
    );
  });
});

describe("closer.createProposal (auth required)", () => {
  it("should reject unauthenticated requests", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.closer.createProposal({
        clientId: 1,
        projectType: "certificacao_mec",
        value: "10000",
      })
    ).rejects.toThrow("Faça login primeiro");
  });
});

describe("closer.createSale (auth required)", () => {
  it("should reject unauthenticated requests", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.closer.createSale({
        proposalId: 1,
        clientId: 1,
        projectType: "certificacao_mec",
        totalValue: "10000",
        paymentMethod: "pix",
      })
    ).rejects.toThrow("Faça login primeiro");
  });
});

describe("closer.stats (auth required)", () => {
  it("should reject unauthenticated requests", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.closer.stats()).rejects.toThrow("Faça login primeiro");
  });
});

describe("closer.ranking (auth required)", () => {
  it("should reject unauthenticated requests", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.closer.ranking()).rejects.toThrow(
      "Faça login primeiro"
    );
  });
});

describe("closer.listClosers (admin required)", () => {
  it("should reject unauthenticated requests", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.closer.listClosers()).rejects.toThrow(
      "Faça login primeiro"
    );
  });
});
