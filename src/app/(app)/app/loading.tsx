"use client";

import { QueryLoadingState } from "@/components/shared/query-state";

export default function AppLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6">
      <QueryLoadingState
        label="Loading workspace…"
        className="w-full max-w-md"
      />
    </div>
  );
}
