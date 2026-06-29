"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { BUILDER_STYLES } from "./constants";

interface StepStyleProps {
  value: string | null;
  onChange: (styleId: string, themeId: string, paletteId: string) => void;
}

export function StepStyle({ value, onChange }: StepStyleProps) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      role="radiogroup"
      aria-label="Choose website style"
    >
      {BUILDER_STYLES.map((style, index) => {
        const selected = value === style.id;

        return (
          <motion.button
            key={style.id}
            type="button"
            role="radio"
            aria-checked={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.03,
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(style.id, style.themeId, style.paletteId)}
            className={cn(
              "builder-choice-card overflow-hidden text-left",
              selected && "builder-choice-card--selected",
            )}
          >
            <div
              className="relative h-32 w-full"
              style={{ background: style.previewGradient }}
              aria-hidden
            >
              {selected && (
                <span className="bg-background/90 absolute top-3 right-3 flex size-8 items-center justify-center rounded-full shadow-md">
                  <Check className="text-accent size-4" aria-hidden />
                </span>
              )}
            </div>
            <div className="p-4 sm:p-5">
              <p className="type-heading-sm text-foreground font-medium">
                {style.label}
              </p>
              <p className="type-body-sm text-foreground-muted mt-1 line-clamp-2">
                {style.description}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
