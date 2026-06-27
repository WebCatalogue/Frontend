"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QueryLoadingState } from "@/components/shared/query-state";
import { useAuth } from "@/providers/auth-provider";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized && !isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isInitialized, isLoading, router]);

  if (!isInitialized || isLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-6">
        <QueryLoadingState
          label="Checking your session…"
          className="w-full max-w-md"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
