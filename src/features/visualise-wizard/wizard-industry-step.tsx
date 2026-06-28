"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { INDUSTRY_PRESETS } from "@/features/platform/industry-presets";
import { cn } from "@/lib/utils";

interface WizardIndustryStepProps {
  value: string;
  onChange: (industryId: string) => void;
}

export function WizardIndustryStep({
  value,
  onChange,
}: WizardIndustryStepProps) {
  const presets = INDUSTRY_PRESETS.slice(0, 6);

  return (
    <div
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      role="radiogroup"
      aria-label="Business type"
    >
      {presets.map((preset, index) => {
        const selected = value === preset.id;
        return (
          <motion.button
            key={preset.id}
            type="button"
            role="radio"
            aria-checked={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            onClick={() => onChange(preset.id)}
            className={cn(
              "surface-2 rounded-[var(--radius-2xl)] border p-5 text-left transition-all",
              selected
                ? "border-accent ring-accent/20 ring-2"
                : "border-border hover:border-border-strong hover:shadow-sm",
            )}
          >
            <span className="text-3xl" aria-hidden>
              {preset.icon}
            </span>
            <p className="type-heading-sm mt-3 font-medium">{preset.name}</p>
            <p className="type-body-sm text-foreground-muted mt-1 line-clamp-2">
              {preset.description}
            </p>
            {selected && (
              <span className="text-accent type-label mt-3 inline-flex items-center gap-1">
                <Check className="size-3" aria-hidden />
                Selected
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
