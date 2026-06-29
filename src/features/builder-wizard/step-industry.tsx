"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { DemoImage } from "@/components/marketing/demo-image";
import { cn } from "@/lib/utils";
import { getBuilderIndustries } from "./constants";

interface StepIndustryProps {
  value: string | null;
  onChange: (industryId: string) => void;
}

export function StepIndustry({ value, onChange }: StepIndustryProps) {
  const industries = getBuilderIndustries();

  return (
    <div
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      role="radiogroup"
      aria-label="Select industry"
    >
      {industries.map((industry, index) => {
        const selected = value === industry.id;

        return (
          <motion.button
            key={industry.id}
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
            onClick={() => onChange(industry.id)}
            className={cn(
              "builder-choice-card group overflow-hidden text-left",
              selected && "builder-choice-card--selected",
            )}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <DemoImage
                src={industry.image}
                alt=""
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              {selected && (
                <span className="bg-accent text-accent-foreground absolute top-3 right-3 flex size-8 items-center justify-center rounded-full shadow-lg">
                  <Check className="size-4" aria-hidden />
                </span>
              )}
            </div>
            <div className="p-4 sm:p-5">
              <p className="type-heading-sm text-foreground font-medium">
                {industry.name}
              </p>
              <p className="type-body-sm text-foreground-muted mt-1 line-clamp-2">
                {industry.description}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
