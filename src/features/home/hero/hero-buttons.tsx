"use client";

import {
  memo,
  useCallback,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { HERO_EASE } from "./hero-motion";

interface HeroButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export const HeroButtons = memo(function HeroButtons() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
      <MagneticButton href="/visualise" variant="primary">
        Visualise Your Website
      </MagneticButton>
      <MagneticButton href="/templates" variant="secondary">
        Browse Templates
      </MagneticButton>
    </div>
  );
});

const MagneticButton = memo(function MagneticButton({
  href,
  children,
  variant = "primary",
}: HeroButtonProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22 });
  const springY = useSpring(y, { stiffness: 280, damping: 22 });

  const handleMove = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
    },
    [reduced, x, y],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      style={reduced ? undefined : { x: springX, y: springY }}
      whileHover={reduced ? undefined : { scale: 1.03 }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.35, ease: HERO_EASE }}
    >
      <Link
        ref={ref}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-xl)] px-8 py-4 text-base font-medium transition-shadow duration-500 sm:text-[1.0625rem]",
          "focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          variant === "primary"
            ? "bg-primary text-primary-foreground shadow-[0_8px_32px_rgba(17,17,16,0.08)] hover:shadow-[0_12px_48px_rgba(94,106,210,0.2)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.12)] dark:hover:shadow-[0_12px_48px_rgba(94,106,210,0.25)]"
            : "border-border bg-surface-1/80 text-foreground/90 hover:bg-surface-1 hover:text-foreground border backdrop-blur-md dark:border-white/12 dark:bg-white/[0.04] dark:text-white/90 dark:hover:bg-white/[0.08] dark:hover:text-white",
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
});
