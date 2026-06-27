"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-background flex min-h-screen items-center justify-center p-6 antialiased">
        <div className="surface-2 border-border max-w-md rounded-[var(--radius-2xl)] border p-8 text-center">
          <h1 className="type-heading-md font-medium">Application error</h1>
          <p className="type-body-sm text-foreground-muted mt-3">
            {error.message || "A critical error occurred."}
          </p>
          <Button className="mt-6" onClick={reset}>
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
