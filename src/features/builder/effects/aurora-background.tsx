"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EffectComponentProps } from "./types";
import { getEffectString } from "./types";

export function AuroraBackground({
  className,
  children,
  settings,
}: EffectComponentProps) {
  const color1 = getEffectString(
    settings,
    "color1",
    "var(--preview-primary, #2563EB)",
  );
  const color2 = getEffectString(
    settings,
    "color2",
    "var(--preview-accent, #8B5CF6)",
  );

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, ${color1}55, transparent),
            radial-gradient(ellipse 60% 40% at 80% 60%, ${color2}44, transparent)
          `,
        }}
        animate={{ scale: [1, 1.05, 1], x: [0, "2%", 0], y: [0, "-2%", 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
