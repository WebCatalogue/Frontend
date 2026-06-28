"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService, isMockAuthEnabled } from "@/services/auth";
import { queryKeys } from "@/lib/query/keys";
import type { LoginRequest, User } from "@/types/api";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (payload: LoginRequest) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

function mapAuthUser(
  user: Awaited<ReturnType<typeof authService.getCurrentUser>>,
): User | null {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    name: user.name,
    role: user.role,
  };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    setSessionActive(authService.isAuthenticated());
    setIsInitialized(true);
  }, []);

  const meQuery = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => mapAuthUser(await authService.getCurrentUser()),
    enabled: isInitialized && sessionActive,
    retry: false,
  });

  useEffect(() => {
    if (!isMockAuthEnabled() && meQuery.error) {
      void authService.logout().then(() => setSessionActive(false));
    }
  }, [meQuery.error]);

  const login = useCallback(
    async (payload: LoginRequest) => {
      const user = await authService.login(payload);
      setSessionActive(true);
      const mapped = mapAuthUser(user)!;
      queryClient.setQueryData(queryKeys.auth.me, mapped);

      if (!isMockAuthEnabled()) {
        await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
        await queryClient.invalidateQueries({
          queryKey: queryKeys.tenant.current,
        });
        await queryClient.invalidateQueries({
          queryKey: queryKeys.businesses.all,
        });
      }

      return mapped;
    },
    [queryClient],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setSessionActive(false);
      queryClient.clear();
      router.push("/login");
    }
  }, [queryClient, router]);

  const refreshUser = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
  }, [queryClient]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: meQuery.data ?? null,
      isAuthenticated: sessionActive && Boolean(meQuery.data),
      isLoading:
        !isInitialized ||
        (sessionActive && (meQuery.isLoading || meQuery.isFetching)),
      isInitialized,
      login,
      logout,
      refreshUser,
    }),
    [
      isInitialized,
      login,
      logout,
      meQuery.data,
      meQuery.isFetching,
      meQuery.isLoading,
      refreshUser,
      sessionActive,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
