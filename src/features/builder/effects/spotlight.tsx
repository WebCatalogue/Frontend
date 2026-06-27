"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EffectComponentProps } from "./types";

export function Spotlight({
  className,
  children,
  settings,
}: EffectComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const size = typeof settings?.size === "number" ? settings.size : 280;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, var(--preview-primary, #2563EB)22, transparent 70%)`;

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMove}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
