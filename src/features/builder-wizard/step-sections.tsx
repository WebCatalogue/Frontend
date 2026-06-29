"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getBuilderSectionsForIndustry } from "./constants";

interface StepSectionsProps {
  industryId: string;
  enabledSections: string[];
  onToggle: (sectionId: string) => void;
}

export function StepSections({
  industryId,
  enabledSections,
  onToggle,
}: StepSectionsProps) {
  const sections = getBuilderSectionsForIndustry(industryId);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {sections.map((section, index) => {
        const enabled = enabledSections.includes(section.id);
        const locked = section.required;

        return (
          <motion.button
            key={section.id}
            type="button"
            disabled={locked}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.025,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={locked ? undefined : { scale: 1.01 }}
            whileTap={locked ? undefined : { scale: 0.99 }}
            onClick={() => onToggle(section.id)}
            className={cn(
              "builder-section-toggle flex items-start gap-4 text-left",
              enabled && "builder-section-toggle--active",
              locked && "builder-section-toggle--locked",
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border transition-colors",
                enabled
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-transparent",
              )}
              aria-hidden
            >
              {enabled && <Check className="size-3.5" />}
            </span>
            <span className="min-w-0">
              <span className="type-heading-sm text-foreground block font-medium">
                {section.label}
                {locked && (
                  <span className="type-label text-foreground-muted ml-2 font-normal">
                    Required
                  </span>
                )}
              </span>
              <span className="type-body-sm text-foreground-muted mt-1 block">
                {section.description}
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
