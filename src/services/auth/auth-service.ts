/** Auth service contract — UI consumes this interface only. */

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
  role?: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface MockAuthSession {
  id: string;
  name: string;
  email: string;
  role: string;
  isAuthenticated: boolean;
  loginTime: string;
}

export interface AuthService {
  login(credentials: LoginCredentials): Promise<AuthUser>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AuthUser | null>;
  isAuthenticated(): boolean;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}
