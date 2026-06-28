import type { AuthService, AuthUser, LoginCredentials } from "./auth-service";

const NOT_IMPLEMENTED = "Backend authentication not implemented.";

/** Placeholder for Aarush's backend — swap in real API calls when ready. */
export class ApiAuthService implements AuthService {
  login(_credentials: LoginCredentials): Promise<AuthUser> {
    return Promise.reject(new Error(NOT_IMPLEMENTED));
  }

  logout(): Promise<void> {
    return Promise.reject(new Error(NOT_IMPLEMENTED));
  }

  getCurrentUser(): Promise<AuthUser | null> {
    return Promise.reject(new Error(NOT_IMPLEMENTED));
  }

  isAuthenticated(): boolean {
    return false;
  }
}
