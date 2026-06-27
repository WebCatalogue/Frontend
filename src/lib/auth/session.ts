import type { AuthTokens } from "@/types/api";

const ACCESS_TOKEN_KEY = "aurevia_access_token";
const REFRESH_TOKEN_KEY = "aurevia_refresh_token";
const TOKEN_EXPIRY_KEY = "aurevia_token_expiry";
const SESSION_COOKIE = "aurevia_has_session";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getTokenExpiry(): number | null {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(TOKEN_EXPIRY_KEY);
  return raw ? Number(raw) : null;
}

export function isAccessTokenExpired(bufferMs = 30_000): boolean {
  const expiry = getTokenExpiry();
  if (!expiry) return false;
  return Date.now() >= expiry - bufferMs;
}

function setSessionCookie(active: boolean): void {
  if (!isBrowser()) return;
  if (active) {
    document.cookie = `${SESSION_COOKIE}=1; path=/; max-age=2592000; samesite=lax`;
  } else {
    document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
  }
}

export function saveAuthSession(tokens: AuthTokens): void {
  if (!isBrowser()) return;

  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  setSessionCookie(true);

  if (tokens.expiresIn) {
    localStorage.setItem(
      TOKEN_EXPIRY_KEY,
      String(Date.now() + tokens.expiresIn * 1000),
    );
  }
}

export function clearAuthSession(): void {
  if (!isBrowser()) return;

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
  setSessionCookie(false);
}

export function hasAuthSession(): boolean {
  return Boolean(getAccessToken() && getRefreshToken());
}
