"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EffectComponentProps } from "./types";
import { getEffectNumber } from "./types";

export function Particles({
  className,
  children,
  settings,
}: EffectComponentProps) {
  const count = getEffectNumber(settings, "count", 24);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: `${(i * 37) % 100}%`,
        y: `${(i * 53) % 100}%`,
        size: 2 + (i % 3),
        duration: 3 + (i % 5),
        delay: (i % 7) * 0.3,
      })),
    [count],
  );

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-[var(--preview-primary,#2563EB)] opacity-30"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ y: [0, -12, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
