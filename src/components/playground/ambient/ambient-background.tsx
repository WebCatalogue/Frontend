"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AmbientBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-[var(--gradient-ambient-base)]" />

      {/* Blob 1 — primary accent */}
      <motion.div
        className="ambient-blob ambient-blob-1"
        animate={
          reduced
            ? {}
            : {
                x: [0, 30, -20, 0],
                y: [0, -40, 20, 0],
                scale: [1, 1.05, 0.98, 1],
              }
        }
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 — warm secondary */}
      <motion.div
        className="ambient-blob ambient-blob-2"
        animate={
          reduced
            ? {}
            : {
                x: [0, -40, 30, 0],
                y: [0, 30, -30, 0],
                scale: [1, 0.95, 1.08, 1],
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 3 — subtle highlight */}
      <motion.div
        className="ambient-blob ambient-blob-3"
        animate={
          reduced
            ? {}
            : {
                x: [0, 20, -30, 0],
                y: [0, -20, 40, 0],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Radial spotlight from top */}
      <div className="ambient-spotlight" />
    </div>
  );
}

export function NoiseOverlay() {
  return (
    <div
      className="noise-overlay pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}
