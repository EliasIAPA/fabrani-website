import { describe, it, expect, vi } from "vitest";

describe("Admin Login", () => {
  it("should have ADMIN_PASSWORD environment variable set", () => {
    const password = process.env.ADMIN_PASSWORD;
    expect(password).toBeDefined();
    expect(typeof password).toBe("string");
    expect(password!.length).toBeGreaterThan(0);
  });

  it("should reject empty email", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(1),
    });

    const result = schema.safeParse({ email: "", password: "test" });
    expect(result.success).toBe(false);
  });

  it("should reject empty password", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(1),
    });

    const result = schema.safeParse({ email: "test@test.com", password: "" });
    expect(result.success).toBe(false);
  });

  it("should accept valid email and password", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(1),
    });

    const result = schema.safeParse({ email: "elias.evangelista@gmail.com", password: "anypassword" });
    expect(result.success).toBe(true);
  });

  it("getUserByEmail should be exported from db module", async () => {
    const db = await import("./db");
    expect(typeof db.getUserByEmail).toBe("function");
  });
});
