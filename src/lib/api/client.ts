import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { API_RETRY_COUNT, API_TIMEOUT_MS, getApiBaseUrl } from "@/lib/config";
import {
  clearAuthSession,
  getAccessToken,
  getRefreshToken,
  saveAuthSession,
} from "@/lib/auth/session";
import { ApiError, parseApiError } from "@/lib/errors/api-error";
import type { ApiEnvelope, ApiSuccessEnvelope, AuthTokens } from "@/types/api";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  _retryCount?: number;
};

const PUBLIC_AUTH_PATHS = ["/auth/login", "/auth/refresh"] as const;

let refreshPromise: Promise<string | null> | null = null;

function isPublicAuthRoute(url?: string): boolean {
  if (!url) return false;
  return PUBLIC_AUTH_PATHS.some((path) => url.includes(path));
}

function isSafeToRetry(method?: string): boolean {
  const verb = method?.toUpperCase() ?? "GET";
  return verb === "GET" || verb === "HEAD" || verb === "OPTIONS";
}

function attachAuthHeader(
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  if (isPublicAuthRoute(config.url)) return config;
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

function normalizeAuthTokens(data: unknown): AuthTokens {
  if (!data || typeof data !== "object") {
    throw new ApiError(
      "Unexpected authentication response.",
      500,
      "INVALID_RESPONSE",
    );
  }

  const record = data as Record<string, unknown>;
  const nested =
    record.data && typeof record.data === "object"
      ? (record.data as Record<string, unknown>)
      : record;

  const accessToken =
    (nested.accessToken as string | undefined) ??
    (nested.token as string | undefined);

  const refreshToken = nested.refreshToken as string | undefined;

  if (!accessToken || !refreshToken) {
    throw new ApiError(
      "Authentication response missing tokens.",
      500,
      "INVALID_RESPONSE",
    );
  }

  return {
    accessToken,
    refreshToken,
    expiresIn: Number(nested.expiresIn ?? 900),
    tokenType: String(nested.tokenType ?? "Bearer"),
  };
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  const response = await axios.post<ApiEnvelope<AuthTokens>>(
    `${getApiBaseUrl()}/auth/refresh`,
    { refreshToken },
    {
      timeout: API_TIMEOUT_MS,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  const tokens = normalizeAuthTokens(response.data);
  saveAuthSession(tokens);
  return tokens.accessToken;
}

export function unwrapApiData<T>(payload: unknown): T {
  if (
    payload &&
    typeof payload === "object" &&
    "success" in payload &&
    (payload as ApiSuccessEnvelope<T>).success === true &&
    "data" in payload
  ) {
    return (payload as ApiSuccessEnvelope<T>).data;
  }

  return payload as T;
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: API_TIMEOUT_MS,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

apiClient.interceptors.request.use((config) => attachAuthHeader(config));

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const apiError = parseApiError(error);
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const requestUrl = originalRequest?.url ?? "";

    const isAuthRoute =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/refresh") ||
      requestUrl.includes("/auth/logout");

    if (
      apiError.isUnauthorized &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthRoute &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null;
          });
        }

        const nextToken = await refreshPromise;
        if (!nextToken) {
          clearAuthSession();
          return Promise.reject(apiError);
        }

        originalRequest.headers.Authorization = `Bearer ${nextToken}`;
        return apiClient(originalRequest);
      } catch {
        clearAuthSession();
        return Promise.reject(apiError);
      }
    }

    if (
      originalRequest &&
      isSafeToRetry(originalRequest.method) &&
      (apiError.isNetworkError ||
        apiError.isTimeout ||
        apiError.isColdStart ||
        apiError.isServerError)
    ) {
      const retryCount = originalRequest._retryCount ?? 0;
      if (retryCount < API_RETRY_COUNT) {
        originalRequest._retryCount = retryCount + 1;
        const delay = 800 * (retryCount + 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return apiClient(originalRequest);
      }
    }

    if (apiError.isUnauthorized && !isAuthRoute) {
      clearAuthSession();
    }

    return Promise.reject(apiError);
  },
);

export { ApiError, parseApiError };
