import { STORAGE_KEYS } from "@/constants";
import {
  AuthError,
  type AuthService,
  type AuthUser,
  type LoginCredentials,
  type MockAuthSession,
} from "./auth-service";

interface MockUserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
}

const MOCK_USERS: MockUserRecord[] = [
  {
    id: "1",
    name: "Garvit Siwach",
    email: "garvit@bhaikisite.dev",
    password: "garvit123",
    role: "Founder",
    firstName: "Garvit",
    lastName: "Siwach",
  },
  {
    id: "2",
    name: "Aarush",
    email: "aarush@bhaikisite.dev",
    password: "aarush123",
    role: "Founder",
    firstName: "Aarush",
    lastName: "",
  },
];

function isBrowser(): boolean {
  return typeof window !== "undefined";
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

function readSession(): MockAuthSession | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.mockSession);
    if (!raw) return null;
    const session = JSON.parse(raw) as MockAuthSession;
    return session.isAuthenticated ? session : null;
  } catch {
    return null;
  }
}

function writeSession(session: MockAuthSession): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.mockSession, JSON.stringify(session));
  setSessionCookie(true);
}

function clearSession(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.mockSession);
  setSessionCookie(false);
}

function toAuthUser(record: MockUserRecord): AuthUser {
  return {
    id: record.id,
    email: record.email,
    firstName: record.firstName,
    lastName: record.lastName || null,
    name: record.name,
    role: record.role,
  };
}

function sessionToAuthUser(session: MockAuthSession): AuthUser {
  const record = MOCK_USERS.find((u) => u.id === session.id);
  if (record) return toAuthUser(record);
  const [firstName, ...rest] = session.name.split(" ");
  return {
    id: session.id,
    email: session.email,
    firstName,
    lastName: rest.join(" ") || null,
    name: session.name,
    role: session.role,
  };
}

export const MOCK_AUTH_CREDENTIALS = MOCK_USERS.map(
  ({ name, email, password }) => ({
    name,
    email,
    password,
  }),
);

export class MockAuthService implements AuthService {
  login(credentials: LoginCredentials): Promise<AuthUser> {
    const email = credentials.email.trim().toLowerCase();
    const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email);

    if (!user || user.password !== credentials.password) {
      return Promise.reject(new AuthError("Invalid credentials"));
    }

    const session: MockAuthSession = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAuthenticated: true,
      loginTime: new Date().toISOString(),
    };

    writeSession(session);
    return Promise.resolve(toAuthUser(user));
  }

  logout(): Promise<void> {
    clearSession();
    return Promise.resolve();
  }

  getCurrentUser(): Promise<AuthUser | null> {
    const session = readSession();
    return Promise.resolve(session ? sessionToAuthUser(session) : null);
  }

  isAuthenticated(): boolean {
    return readSession() !== null;
  }
}
