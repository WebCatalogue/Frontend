"use client";

import { QueryErrorState } from "@/components/shared/query-state";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6">
      <QueryErrorState
        title="Something went wrong"
        description={
          error.message || "An unexpected error occurred in the dashboard."
        }
        onRetry={reset}
        className="w-full max-w-lg"
      />
    </div>
  );
}
