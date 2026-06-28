"use client";

import { AgencyStoreProvider } from "@/features/agency";

export function AgencyProviders({ children }: { children: React.ReactNode }) {
  return <AgencyStoreProvider>{children}</AgencyStoreProvider>;
}
