/**
 * Geolocalização por IP usando ip-api.com (gratuito, sem API key)
 * Limite: 45 requests/minuto
 */

export interface GeoIpResult {
  city: string | null;
  region: string | null;
  country: string | null;
  lat: string | null;
  lon: string | null;
  isp: string | null;
}

const EMPTY_RESULT: GeoIpResult = {
  city: null,
  region: null,
  country: null,
  lat: null,
  lon: null,
  isp: null,
};

// Cache simples em memória para evitar chamadas repetidas
const geoCache = new Map<string, { data: GeoIpResult; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hora

export async function getGeoFromIp(ip: string): Promise<GeoIpResult> {
  // IPs locais/privados não têm geolocalização
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.") || ip.startsWith("172.")) {
    return { ...EMPTY_RESULT, city: "Local", region: "Local", country: "Local" };
  }

  // Verificar cache
  const cached = geoCache.get(ip);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,city,regionName,country,lat,lon,isp&lang=pt-BR`, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.warn(`[GeoIP] HTTP error for IP ${ip}: ${response.status}`);
      return EMPTY_RESULT;
    }

    const data = await response.json();

    if (data.status !== "success") {
      console.warn(`[GeoIP] Lookup failed for IP ${ip}: ${data.message || "unknown"}`);
      return EMPTY_RESULT;
    }

    const result: GeoIpResult = {
      city: data.city || null,
      region: data.regionName || null,
      country: data.country || null,
      lat: data.lat?.toString() || null,
      lon: data.lon?.toString() || null,
      isp: data.isp || null,
    };

    // Salvar no cache
    geoCache.set(ip, { data: result, timestamp: Date.now() });

    return result;
  } catch (error) {
    console.error(`[GeoIP] Error looking up IP ${ip}:`, error);
    return EMPTY_RESULT;
  }
}
