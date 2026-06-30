"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { HERO_EASE } from "./hero-motion";
import { HeroStepIndicator } from "./hero-step-indicator";

const HERO_TITLE_LINE_ONE = [
  { text: "Build", accent: false },
  { text: "Premium", accent: true },
  { text: "Websites", accent: true },
] as const;

const HERO_TITLE_LINE_TWO = [
  { text: "Without", accent: false },
  { text: "Starting", accent: false },
  { text: "From", accent: false },
  { text: "Scratch.", accent: true },
] as const;

export const HeroHeader = memo(function HeroHeader() {
  const reduced = useReducedMotion();

  return (
    <div className="flex w-full flex-col items-center px-2 text-center md:px-0">
      <h1
        id="hero-heading"
        className="type-display-2xl text-foreground mx-auto max-w-4xl font-[family-name:var(--font-display)] tracking-tight"
      >
        <span className="block overflow-hidden">
          {HERO_TITLE_LINE_ONE.map((word, i) => (
            <motion.span
              key={word.text}
              className={cn("inline-block", word.accent && "text-accent")}
              initial={reduced ? false : { y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: reduced ? 0 : 0.9,
                ease: HERO_EASE,
                delay: reduced ? 0 : 0.1 + i * 0.08,
              }}
            >
              {word.text}
              {i < HERO_TITLE_LINE_ONE.length - 1 ? "\u00a0" : ""}
            </motion.span>
          ))}
        </span>
        <span className="text-foreground/85 mt-1 block overflow-hidden">
          {HERO_TITLE_LINE_TWO.map((word, i) => (
            <motion.span
              key={word.text}
              className={cn("inline-block", word.accent && "text-accent")}
              initial={reduced ? false : { y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: reduced ? 0 : 0.9,
                ease: HERO_EASE,
                delay: reduced ? 0 : 0.35 + i * 0.07,
              }}
            >
              {word.text}
              {i < HERO_TITLE_LINE_TWO.length - 1 ? "\u00a0" : ""}
            </motion.span>
          ))}
        </span>
      </h1>

      <HeroStepIndicator />
    </div>
  );
});
