import * as authApi from "@/lib/api/auth";
import {
  clearAuthSession,
  getRefreshToken,
  hasAuthSession,
  saveAuthSession,
} from "@/lib/auth/session";
import type { User } from "@/types/api";
import {
  AuthError,
  type AuthService,
  type AuthUser,
  type LoginCredentials,
} from "./auth-service";

function mapUser(user: User): AuthUser {
  const name =
    user.name ??
    ([user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
      user.email);

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    name,
    role: user.role ?? undefined,
  };
}

export class ApiAuthService implements AuthService {
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    try {
      const tokens = await authApi.login(credentials);
      saveAuthSession(tokens);
      const user = await authApi.getCurrentUser();
      return mapUser(user);
    } catch (error) {
      clearAuthSession();
      throw error instanceof AuthError
        ? error
        : new AuthError("Invalid credentials");
    }
  }

  async logout(): Promise<void> {
    const refreshToken = getRefreshToken();
    try {
      if (refreshToken) {
        await authApi.logout({ refreshToken });
      }
    } finally {
      clearAuthSession();
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    if (!hasAuthSession()) return null;
    try {
      const user = await authApi.getCurrentUser();
      return mapUser(user);
    } catch {
      clearAuthSession();
      return null;
    }
  }

  isAuthenticated(): boolean {
    return hasAuthSession();
  }
}
