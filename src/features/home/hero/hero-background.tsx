"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface HeroBackgroundProps {
  mouseX: number;
  mouseY: number;
}

const AURORA_EASE = "easeInOut" as const;

export const HeroBackground = memo(function HeroBackground({
  mouseX,
  mouseY,
}: HeroBackgroundProps) {
  const reduced = useReducedMotion();
  const parallaxX = reduced ? 0 : mouseX * 24;
  const parallaxY = reduced ? 0 : mouseY * 18;

  return (
    <div
      className="bg-background pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Light theme */}
      <div className="absolute inset-0 transition-opacity duration-500 dark:opacity-0">
        <div className="absolute inset-0 bg-[var(--gradient-ambient-base)]" />
        <div className="ambient-blob ambient-blob-1 opacity-80" />
        <div className="ambient-blob ambient-blob-2 opacity-70" />
        <div className="ambient-spotlight" />
      </div>

      {/* Dark theme aurora */}
      <div className="absolute inset-0 bg-[#030308] opacity-0 transition-opacity duration-500 dark:opacity-100">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 0%, #0a0812 0%, #030308 55%, #020206 100%)",
          }}
        />

        <motion.div
          className="absolute -bottom-[35%] left-1/2 h-[85%] w-[140%] -translate-x-1/2 rounded-[100%] blur-[90px] md:blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(236,72,153,0.55) 0%, rgba(168,85,247,0.35) 35%, rgba(76,29,149,0.2) 60%, transparent 72%)",
            x: parallaxX * 0.4,
            y: parallaxY * 0.2,
          }}
          animate={
            reduced
              ? undefined
              : {
                  scale: [1, 1.06, 1.02, 1],
                  opacity: [0.85, 1, 0.9, 0.85],
                  x: [0, 18, -12, 0],
                }
          }
          transition={{
            duration: 14,
            repeat: reduced ? 0 : Infinity,
            ease: AURORA_EASE,
          }}
        />

        <motion.div
          className="absolute -right-[20%] bottom-0 h-[75%] w-[70%] blur-[100px] md:blur-[130px]"
          style={{
            background:
              "radial-gradient(ellipse at 30% 80%, rgba(244,114,182,0.5) 0%, rgba(139,92,246,0.3) 40%, rgba(59,7,100,0.15) 65%, transparent 80%)",
            x: parallaxX * 0.6,
            y: parallaxY * 0.35,
          }}
          animate={
            reduced
              ? undefined
              : {
                  scale: [1.02, 1.08, 1],
                  opacity: [0.7, 0.95, 0.7],
                  y: [0, -20, 8, 0],
                }
          }
          transition={{
            duration: 11,
            repeat: reduced ? 0 : Infinity,
            ease: AURORA_EASE,
            delay: 1.5,
          }}
        />

        <motion.div
          className="absolute -bottom-[10%] -left-[15%] h-[55%] w-[55%] blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(76,29,149,0.12) 45%, transparent 70%)",
          }}
          animate={
            reduced
              ? undefined
              : {
                  x: [0, 25, 0],
                  opacity: [0.4, 0.65, 0.4],
                }
          }
          transition={{
            duration: 16,
            repeat: reduced ? 0 : Infinity,
            ease: AURORA_EASE,
            delay: 0.5,
          }}
        />

        <motion.div
          className="absolute bottom-0 left-[35%] h-[45%] w-[45%] -translate-x-1/2 blur-[70px] md:blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(251,113,133,0.45) 0%, rgba(217,70,239,0.25) 50%, transparent 70%)",
            x: parallaxX * 0.25,
          }}
          animate={
            reduced
              ? undefined
              : {
                  scale: [1, 1.12, 1],
                  opacity: [0.6, 0.9, 0.6],
                }
          }
          transition={{
            duration: 8,
            repeat: reduced ? 0 : Infinity,
            ease: AURORA_EASE,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 15%, rgba(3,3,8,0.55) 0%, transparent 70%)",
          }}
        />

        <motion.div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
            opacity: 0.14,
          }}
          animate={reduced ? undefined : { opacity: [0.1, 0.16, 0.1] }}
          transition={{
            duration: 6,
            repeat: reduced ? 0 : Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="from-background absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t to-transparent" />
    </div>
  );
});
