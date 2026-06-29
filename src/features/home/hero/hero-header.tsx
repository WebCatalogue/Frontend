"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { HERO_EASE } from "./hero-motion";
import { HeroStepIndicator } from "./hero-step-indicator";

export const HeroHeader = memo(function HeroHeader() {
  const reduced = useReducedMotion();

  return (
    <div className="flex w-full flex-col items-center px-2 text-center md:px-0">
      <h1
        id="hero-heading"
        className="type-display-2xl text-foreground mx-auto max-w-4xl font-[family-name:var(--font-display)] tracking-tight"
      >
        <span className="block overflow-hidden">
          {["Build", "Premium", "Websites"].map((word, i) => (
            <motion.span
              key={word}
              className="inline-block"
              initial={reduced ? false : { y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: reduced ? 0 : 0.9,
                ease: HERO_EASE,
                delay: reduced ? 0 : 0.1 + i * 0.08,
              }}
            >
              {word}
              {i < 2 ? "\u00a0" : ""}
            </motion.span>
          ))}
        </span>
        <span className="text-foreground/85 mt-1 block overflow-hidden">
          {["Without", "Starting", "From", "Scratch."].map((word, i) => (
            <motion.span
              key={word}
              className="inline-block"
              initial={reduced ? false : { y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: reduced ? 0 : 0.9,
                ease: HERO_EASE,
                delay: reduced ? 0 : 0.35 + i * 0.07,
              }}
            >
              {word}
              {i < 3 ? "\u00a0" : ""}
            </motion.span>
          ))}
        </span>
      </h1>

      <HeroStepIndicator />
    </div>
  );
});
