"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBusinesses } from "@/hooks/use-api-queries";
import { getIndustryPreset } from "@/features/platform/industry-presets";
import { formatSavedTime } from "@/features/visualise-wizard/draft-utils";
import type { WizardDraft } from "@/features/visualise-wizard/types";

interface WizardResumePromptProps {
  draft: WizardDraft;
  onContinue: () => void;
  onStartNew: () => void;
}

export function WizardResumePrompt({
  draft,
  onContinue,
  onStartNew,
}: WizardResumePromptProps) {
  const preset = getIndustryPreset(draft.settings.industryId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md space-y-6 text-center"
    >
      <div className="bg-accent-muted mx-auto flex size-14 items-center justify-center rounded-full">
        <FileText className="text-accent size-7" aria-hidden />
      </div>
      <div>
        <h2 className="type-heading-lg font-medium">Welcome back!</h2>
        <p className="type-body-md text-foreground-muted mt-2">
          You have an unfinished website draft for{" "}
          <strong>{draft.websiteName}</strong>
          {preset ? ` (${preset.name})` : ""}.
        </p>
        <p className="type-body-sm text-foreground-subtle mt-1">
          {draft.settings.completionPercent}% complete
          {draft.settings.lastSavedAt
            ? ` · Saved ${formatSavedTime(draft.settings.lastSavedAt)}`
            : ""}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button size="lg" onClick={onContinue} className="gap-2">
          Continue Draft
          <ArrowRight className="size-4" aria-hidden />
        </Button>
        <Button size="lg" variant="outline" onClick={onStartNew}>
          <Sparkles className="size-4" aria-hidden />
          Start New Website
        </Button>
      </div>
    </motion.div>
  );
}

interface WizardStartFormProps {
  onStart: (businessId: string, websiteName: string) => void;
  isLoading?: boolean;
}

export function WizardStartForm({ onStart, isLoading }: WizardStartFormProps) {
  const businessesQuery = useBusinesses();
  const businesses = businessesQuery.data ?? [];
  const [businessId, setBusinessId] = useState(businesses[0]?.id ?? "");
  const [websiteName, setWebsiteName] = useState("My New Website");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md space-y-6"
    >
      <div className="text-center">
        <p className="text-3xl" aria-hidden>
          ✨
        </p>
        <h2 className="type-heading-lg mt-3 font-medium">
          Start a new website
        </h2>
        <p className="type-body-sm text-foreground-muted mt-2">
          We&apos;ll guide you step by step — no technical knowledge needed.
        </p>
      </div>

      <div className="surface-2 border-border space-y-4 rounded-[var(--radius-2xl)] border p-6">
        <Input
          label="Website name"
          value={websiteName}
          onChange={(e) => setWebsiteName(e.target.value)}
          placeholder="e.g. Sunrise Café"
        />
        <div>
          <label
            className="type-body-sm mb-2 block font-medium"
            htmlFor="wizard-business"
          >
            Business
          </label>
          <select
            id="wizard-business"
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            className="border-input bg-surface-1 h-11 w-full rounded-[var(--radius-lg)] border px-3 text-sm"
          >
            <option value="">Select business…</option>
            {businesses.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <Button
          className="w-full"
          size="lg"
          disabled={!businessId || !websiteName.trim()}
          isLoading={isLoading}
          onClick={() => onStart(businessId, websiteName.trim())}
        >
          Begin building
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </motion.div>
  );
}
