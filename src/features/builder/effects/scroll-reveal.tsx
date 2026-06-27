"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EffectComponentProps } from "./types";

export function ScrollReveal({ className, children }: EffectComponentProps) {
  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
