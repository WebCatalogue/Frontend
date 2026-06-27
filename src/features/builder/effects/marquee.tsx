"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EffectComponentProps } from "./types";

const DEFAULT_MARQUEE = [
  "Premium websites",
  "Built effortlessly",
  "BhaiKISite",
];

export function Marquee({
  className,
  children,
  settings,
}: EffectComponentProps) {
  const items = Array.isArray(settings?.items)
    ? (settings.items as string[])
    : DEFAULT_MARQUEE;
  const doubled = [...items, ...items];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 border-t border-[var(--preview-primary,#2563EB)]/20 bg-[var(--preview-muted,#f3f4f6)]/50 py-2"
        aria-hidden
      >
        <motion.div
          className="flex shrink-0 gap-8 px-4 text-xs font-medium tracking-wide whitespace-nowrap text-[var(--preview-foreground-muted,#666)] uppercase"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </motion.div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
