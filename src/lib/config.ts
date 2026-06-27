const DEFAULT_API_URL = "https://aurevia-backend-nmnv.onrender.com/api/v1";

export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
  return url.replace(/\/$/, "");
}

export const API_TIMEOUT_MS = 30_000;
export const API_RETRY_COUNT = 2;
export const API_STALE_TIME_MS = 60_000;
