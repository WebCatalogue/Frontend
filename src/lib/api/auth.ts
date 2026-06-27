import { apiClient, unwrapApiData } from "@/lib/api/client";
import type {
  AuthTokens,
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  User,
} from "@/types/api";

export async function login(payload: LoginRequest): Promise<AuthTokens> {
  const { data } = await apiClient.post("/auth/login", {
    email: payload.email.trim(),
    password: payload.password,
  });
  return unwrapApiData<AuthTokens>(data);
}

export async function refreshToken(
  payload: RefreshTokenRequest,
): Promise<AuthTokens> {
  const { data } = await apiClient.post("/auth/refresh", payload);
  return unwrapApiData<AuthTokens>(data);
}

export async function logout(payload: LogoutRequest): Promise<void> {
  await apiClient.post("/auth/logout", payload);
}

export async function getCurrentUser(): Promise<User> {
  const { data } = await apiClient.get("/me");
  return unwrapApiData<User>(data);
}
