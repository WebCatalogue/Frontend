"use client";

import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { HERO_EASE, PRODUCT_STEPS } from "./hero-motion";
import { HeroButtons } from "./hero-buttons";

const STEP_CYCLE_MS = 3200;

const underlineSpring = {
  type: "spring" as const,
  stiffness: 360,
  damping: 34,
  mass: 0.85,
};

const labelTransition = { duration: 0.6, ease: HERO_EASE };

export const HeroStepIndicator = memo(function HeroStepIndicator() {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % PRODUCT_STEPS.length);
    }, STEP_CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <motion.div
      className="mt-8 w-full max-w-4xl sm:mt-10"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: HERO_EASE, delay: reduced ? 0 : 0.65 }}
    >
      <div
        className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-4 sm:gap-4 md:gap-5"
        role="list"
        aria-label="How BhaiKiSite works"
      >
        {PRODUCT_STEPS.map((step, index) => {
          const isActive = index === activeIndex;
          const label = step.label.replace(/\.$/, "");

          return (
            <div key={step.id} role="listitem" className="min-w-0">
              <div
                className="bg-foreground/20 relative h-[2px] w-full overflow-hidden rounded-full"
                aria-hidden
              >
                {isActive && (
                  <motion.div
                    layoutId={reduced ? undefined : "hero-step-underline"}
                    className="bg-foreground/25 absolute inset-0 overflow-hidden rounded-full"
                    transition={reduced ? { duration: 0 } : underlineSpring}
                  >
                    {!reduced && (
                      <motion.div
                        key={activeIndex}
                        className="bg-foreground h-full w-full origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: STEP_CYCLE_MS / 1000,
                          ease: [0.33, 0, 0.2, 1],
                        }}
                      />
                    )}
                    {reduced && <div className="bg-foreground h-full w-full" />}
                  </motion.div>
                )}
              </div>

              <motion.p
                className={cn(
                  "mt-3 text-sm leading-snug sm:mt-4 sm:text-base md:text-[1.0625rem]",
                  isActive
                    ? "text-foreground font-medium"
                    : "text-foreground-muted font-normal",
                )}
                animate={{
                  opacity: isActive ? 1 : 0.78,
                  y: isActive ? 0 : 1,
                }}
                transition={labelTransition}
              >
                {label}
              </motion.p>
            </div>
          );
        })}
      </div>

      <HeroButtons />
    </motion.div>
  );
});
