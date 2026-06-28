"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { WIZARD_TOTAL_STEPS } from "./constants";

interface WizardProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  label?: string;
}

export function WizardProgressBar({
  currentStep,
  totalSteps = WIZARD_TOTAL_STEPS,
  label = "Build Your Website",
}: WizardProgressBarProps) {
  const percent = Math.round(
    (Math.min(currentStep, totalSteps) / totalSteps) * 100,
  );
  const remaining = Math.max(0, totalSteps - currentStep);

  return (
    <div className="space-y-3" aria-live="polite">
      <div className="flex items-center justify-between gap-4">
        <p className="type-heading-sm font-medium">{label}</p>
        <p className="type-body-sm text-foreground-muted tabular-nums">
          {percent}% complete
        </p>
      </div>

      <div
        className="bg-muted h-2 overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Wizard progress: ${percent}%`}
      >
        <motion.div
          className="bg-accent h-full rounded-full"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="type-body-sm text-foreground-muted">
          Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}
        </p>
        {remaining > 0 && (
          <p className="type-label text-foreground-subtle">
            ~{remaining} step{remaining === 1 ? "" : "s"} remaining
          </p>
        )}
      </div>
    </div>
  );
}

interface WizardAutosaveIndicatorProps {
  isSaving: boolean;
  isDirty: boolean;
  lastSavedAt?: string;
  error?: string | null;
  className?: string;
}

export function WizardAutosaveIndicator({
  isSaving,
  isDirty,
  lastSavedAt,
  error,
  className,
}: WizardAutosaveIndicatorProps) {
  return (
    <div
      className={cn(
        "type-body-sm flex items-center gap-2 transition-colors",
        error
          ? "text-destructive"
          : isSaving
            ? "text-foreground-muted"
            : isDirty
              ? "text-warning"
              : "text-success",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      {error ? (
        <span>Save failed — {error}</span>
      ) : isSaving ? (
        <span className="flex items-center gap-2">
          <span className="bg-accent size-2 animate-pulse rounded-full" />
          Saving…
        </span>
      ) : isDirty ? (
        <span>Unsaved changes</span>
      ) : lastSavedAt ? (
        <span className="flex items-center gap-1.5">
          <span aria-hidden>✔</span>
          Saved {formatRelative(lastSavedAt)}
        </span>
      ) : null}
    </div>
  );
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60_000) return "just now";
  const mins = Math.floor(diff / 60_000);
  return `${mins} min ago`;
}
