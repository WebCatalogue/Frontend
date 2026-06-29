"use client";

import { motion } from "framer-motion";
import {
  BUILDER_STEP_TITLES,
  BUILDER_TOTAL_STEPS,
  computeBuilderProgress,
} from "./constants";

interface BuilderProgressBarProps {
  step: number;
}

export function BuilderProgressBar({ step }: BuilderProgressBarProps) {
  const progress = computeBuilderProgress(step);

  return (
    <div className="builder-progress border-border-subtle border-b px-6 py-5 pr-20 sm:px-8 sm:py-6 sm:pr-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="type-label text-foreground-muted">Build Your Website</p>
          <h2 className="type-heading-md text-foreground mt-1">
            {BUILDER_STEP_TITLES[step]}
          </h2>
        </div>
        <p className="type-body-sm text-foreground-muted">
          Step {step + 1} of {BUILDER_TOTAL_STEPS}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="builder-progress__track flex-1">
          <motion.div
            className="builder-progress__fill"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="type-label text-foreground-muted w-10 text-right">
          {progress}%
        </span>
      </div>
    </div>
  );
}
