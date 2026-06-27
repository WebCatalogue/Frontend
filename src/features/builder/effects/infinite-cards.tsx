"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EffectComponentProps } from "./types";
import { getEffectString } from "./types";

const DEFAULT_ITEMS = ["Design", "Build", "Launch", "Grow"];

export function InfiniteCards({
  className,
  children,
  settings,
}: EffectComponentProps) {
  const items = Array.isArray(settings?.items)
    ? (settings.items as string[])
    : DEFAULT_ITEMS;
  const doubled = [...items, ...items];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex gap-3 py-2"
        aria-hidden
      >
        <motion.div
          className="flex shrink-0 gap-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="shrink-0 rounded-full border border-[var(--preview-primary,#2563EB)]/30 bg-[var(--preview-muted,#f3f4f6)] px-4 py-1.5 text-xs font-medium text-[var(--preview-foreground,#111)]"
            >
              {getEffectString(settings, `item-${i}`, item)}
            </span>
          ))}
        </motion.div>
      </div>
      <div className="relative z-10 pt-10">{children}</div>
    </div>
  );
}
