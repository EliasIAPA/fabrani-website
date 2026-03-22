import { describe, it, expect, vi, beforeEach } from "vitest";
import { getClientIp } from "./antiFraud";

describe("Anti-Fraud System", () => {
  describe("getClientIp", () => {
    it("should extract IP from x-forwarded-for header", () => {
      const req = {
        headers: { "x-forwarded-for": "203.0.113.50, 70.41.3.18, 150.172.238.178" },
        socket: { remoteAddress: "127.0.0.1" },
      };
      expect(getClientIp(req)).toBe("203.0.113.50");
    });

    it("should extract IP from x-real-ip header", () => {
      const req = {
        headers: { "x-real-ip": "203.0.113.50" },
        socket: { remoteAddress: "127.0.0.1" },
      };
      expect(getClientIp(req)).toBe("203.0.113.50");
    });

    it("should fallback to socket remoteAddress", () => {
      const req = {
        headers: {},
        socket: { remoteAddress: "192.168.1.100" },
      };
      expect(getClientIp(req)).toBe("192.168.1.100");
    });

    it("should fallback to req.ip", () => {
      const req = {
        headers: {},
        socket: {},
        ip: "10.0.0.1",
      };
      expect(getClientIp(req)).toBe("10.0.0.1");
    });

    it("should return 'unknown' when no IP is available", () => {
      const req = {
        headers: {},
        socket: {},
      };
      expect(getClientIp(req)).toBe("unknown");
    });

    it("should handle x-forwarded-for with single IP", () => {
      const req = {
        headers: { "x-forwarded-for": "203.0.113.50" },
        socket: { remoteAddress: "127.0.0.1" },
      };
      expect(getClientIp(req)).toBe("203.0.113.50");
    });

    it("should trim whitespace from forwarded IPs", () => {
      const req = {
        headers: { "x-forwarded-for": "  203.0.113.50  , 70.41.3.18" },
        socket: { remoteAddress: "127.0.0.1" },
      };
      expect(getClientIp(req)).toBe("203.0.113.50");
    });

    it("should prioritize x-forwarded-for over x-real-ip", () => {
      const req = {
        headers: {
          "x-forwarded-for": "203.0.113.50",
          "x-real-ip": "10.0.0.1",
        },
        socket: { remoteAddress: "127.0.0.1" },
      };
      expect(getClientIp(req)).toBe("203.0.113.50");
    });

    it("should handle IPv6 addresses", () => {
      const req = {
        headers: { "x-forwarded-for": "2001:db8::1" },
        socket: { remoteAddress: "::1" },
      };
      expect(getClientIp(req)).toBe("2001:db8::1");
    });
  });
});
