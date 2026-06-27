"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EffectComponentProps } from "./types";
import { getEffectString } from "./types";

export function TextReveal({
  className,
  children,
  settings,
}: EffectComponentProps) {
  const text = getEffectString(settings, "text", "Reveal your story");

  return (
    <div className={cn("relative", className)}>
      <motion.p
        className="pointer-events-none mb-4 text-center text-lg font-medium tracking-tight text-[var(--preview-foreground,#111)] sm:text-xl"
        style={{ fontFamily: "var(--preview-font-display, inherit)" }}
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.p>
      {children}
    </div>
  );
}
