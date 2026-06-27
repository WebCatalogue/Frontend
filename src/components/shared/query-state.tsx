"use client";

import { AlertCircle, CloudOff, Loader2, ServerCrash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getErrorTitle, parseApiError } from "@/lib/errors/api-error";
import { cn } from "@/lib/utils";

interface QueryStateProps {
  title?: string;
  description?: string;
  error?: unknown;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
}

function getIcon(error: ReturnType<typeof parseApiError>) {
  if (error.isNetworkError || error.isTimeout) return CloudOff;
  if (error.isColdStart || error.isServerError) return ServerCrash;
  return AlertCircle;
}

export function QueryErrorState({
  title,
  description,
  error,
  onRetry,
  isRetrying = false,
  className,
}: QueryStateProps) {
  const apiError = error ? parseApiError(error) : null;
  const Icon = apiError ? getIcon(apiError) : AlertCircle;

  return (
    <div
      className={cn(
        "surface-2 border-border flex flex-col items-center rounded-[var(--radius-2xl)] border px-6 py-12 text-center",
        className,
      )}
      role="alert"
    >
      <div className="bg-error-muted mb-4 flex size-12 items-center justify-center rounded-full">
        <Icon className="text-error size-5" strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="type-heading-sm text-foreground font-medium">
        {title ?? (apiError ? getErrorTitle(apiError) : "Something went wrong")}
      </h3>
      <p className="type-body-sm text-foreground-muted mt-2 max-w-md">
        {description ??
          apiError?.message ??
          "We couldn't load this data. Please try again."}
      </p>
      {apiError?.isColdStart && (
        <p className="type-body-sm text-foreground-subtle mt-2 max-w-md">
          The server may be waking from sleep on Render. This usually takes a
          few seconds.
        </p>
      )}
      {onRetry && (
        <Button
          className="mt-6"
          variant="outline"
          onClick={onRetry}
          isLoading={isRetrying}
        >
          Try again
        </Button>
      )}
    </div>
  );
}

export function QueryEmptyState({
  title = "Nothing here yet",
  description = "There is no data to display.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "surface-2 border-border flex flex-col items-center rounded-[var(--radius-2xl)] border border-dashed px-6 py-12 text-center",
        className,
      )}
    >
      <h3 className="type-heading-sm text-foreground font-medium">{title}</h3>
      <p className="type-body-sm text-foreground-muted mt-2 max-w-md">
        {description}
      </p>
    </div>
  );
}

export function QueryLoadingState({
  label = "Loading",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "surface-2 border-border flex flex-col items-center justify-center rounded-[var(--radius-2xl)] border px-6 py-16",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <Loader2
        className="text-accent size-8 animate-spin"
        strokeWidth={1.75}
        aria-hidden
      />
      <p className="type-body-sm text-foreground-muted mt-4">{label}</p>
    </div>
  );
}
