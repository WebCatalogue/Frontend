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
import * as authApi from "@/lib/api/auth";
import {
  clearAuthSession,
  getRefreshToken,
  hasAuthSession,
  saveAuthSession,
} from "@/lib/auth/session";
import { queryKeys } from "@/lib/query/keys";
import type { LoginRequest, User } from "@/types/api";
import { ApiError } from "@/lib/errors/api-error";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    setSessionActive(hasAuthSession());
    setIsInitialized(true);
  }, []);

  const meQuery = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authApi.getCurrentUser,
    enabled: isInitialized && sessionActive,
    retry: false,
  });

  useEffect(() => {
    if (meQuery.error instanceof ApiError && meQuery.error.isUnauthorized) {
      clearAuthSession();
      setSessionActive(false);
    }
  }, [meQuery.error]);

  const login = useCallback(
    async (payload: LoginRequest) => {
      const tokens = await authApi.login(payload);
      saveAuthSession(tokens);
      setSessionActive(true);
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.tenant.current,
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.businesses.all,
      });
    },
    [queryClient],
  );

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken();
    try {
      if (refreshToken) {
        await authApi.logout({ refreshToken });
      }
    } catch {
      // Clear local session even if remote logout fails.
    } finally {
      clearAuthSession();
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
