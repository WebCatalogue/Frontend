import { ApiAuthService } from "./api-auth-service";
import { MockAuthService } from "./mock-auth-service";
import type { AuthService } from "./auth-service";

export type {
  AuthService,
  AuthUser,
  LoginCredentials,
  MockAuthSession,
} from "./auth-service";
export { AuthError } from "./auth-service";
export { MockAuthService, MOCK_AUTH_CREDENTIALS } from "./mock-auth-service";
export { ApiAuthService } from "./api-auth-service";

export function isMockAuthEnabled(): boolean {
  return process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "true";
}

function createAuthService(): AuthService {
  if (isMockAuthEnabled()) {
    return new MockAuthService();
  }
  return new ApiAuthService();
}

/** Singleton — UI and providers import this only. */
export const authService = createAuthService();
