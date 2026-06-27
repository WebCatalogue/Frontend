import { STORAGE_KEYS } from "@/constants";
import type { AuthTokens } from "@/types/api";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(STORAGE_KEYS.accessToken);
}

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(STORAGE_KEYS.refreshToken);
}

export function getTokenExpiry(): number | null {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(STORAGE_KEYS.tokenExpiry);
  return raw ? Number(raw) : null;
}

export function isAccessTokenExpired(bufferMs = 30_000): boolean {
  const expiry = getTokenExpiry();
  if (!expiry) return false;
  return Date.now() >= expiry - bufferMs;
}

function setSessionCookie(active: boolean): void {
  if (!isBrowser()) return;
  const key = STORAGE_KEYS.sessionCookie;
  if (active) {
    document.cookie = `${key}=1; path=/; max-age=2592000; samesite=lax`;
  } else {
    document.cookie = `${key}=; path=/; max-age=0; samesite=lax`;
  }
}

export function saveAuthSession(tokens: AuthTokens): void {
  if (!isBrowser()) return;

  localStorage.setItem(STORAGE_KEYS.accessToken, tokens.accessToken);
  localStorage.setItem(STORAGE_KEYS.refreshToken, tokens.refreshToken);
  setSessionCookie(true);

  if (tokens.expiresIn) {
    localStorage.setItem(
      STORAGE_KEYS.tokenExpiry,
      String(Date.now() + tokens.expiresIn * 1000),
    );
  }
}

export function clearAuthSession(): void {
  if (!isBrowser()) return;

  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
  localStorage.removeItem(STORAGE_KEYS.tokenExpiry);
  setSessionCookie(false);
}

export function hasAuthSession(): boolean {
  return Boolean(getAccessToken() && getRefreshToken());
}
