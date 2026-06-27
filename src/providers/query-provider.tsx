"use client";

import {
  QueryClient,
  QueryClientProvider,
  type DefaultOptions,
} from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { API_STALE_TIME_MS } from "@/lib/config";

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: API_STALE_TIME_MS,
    gcTime: API_STALE_TIME_MS * 5,
    retry: (failureCount, error) => {
      const status =
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        typeof (error as { status: unknown }).status === "number"
          ? (error as { status: number }).status
          : 0;

      if (status === 401 || status === 403 || status === 404) return false;
      return failureCount < 2;
    },
    refetchOnWindowFocus: true,
  },
  mutations: {
    retry: false,
  },
};

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions,
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
