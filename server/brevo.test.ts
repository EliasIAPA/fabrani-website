import { describe, expect, it } from "vitest";
import { testBrevoConnection } from "./brevo";

describe("Brevo API Integration", () => {
  it("should successfully connect to Brevo API with valid credentials", async () => {
    const result = await testBrevoConnection();
    
    if (!result.success) {
      console.error("[Brevo Test] Connection failed:", result.error);
    }
    
    expect(result.success).toBe(true);
    expect(result.accountEmail).toBeDefined();
    expect(result.error).toBeUndefined();
    
    console.log(`[Brevo Test] Connected successfully to account: ${result.accountEmail}`);
  }, 10000);
});
