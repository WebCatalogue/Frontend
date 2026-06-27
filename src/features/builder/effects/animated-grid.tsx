"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EffectComponentProps } from "./types";
import { getEffectNumber } from "./types";

export function AnimatedGrid({
  className,
  children,
  settings,
}: EffectComponentProps) {
  const cols = getEffectNumber(settings, "columns", 8);
  const rows = getEffectNumber(settings, "rows", 6);

  const cells = Array.from({ length: cols * rows }, (_, i) => i);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="pointer-events-none absolute inset-0 grid gap-px opacity-[0.08]"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
        aria-hidden
      >
        {cells.map((i) => (
          <motion.div
            key={i}
            className="bg-[var(--preview-foreground,#111)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: (i % cols) * 0.15,
            }}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
