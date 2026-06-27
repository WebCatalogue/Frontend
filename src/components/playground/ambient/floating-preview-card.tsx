"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  floatDelay?: number;
  depth?: number;
  enableTilt?: boolean;
}

export function TiltCard({
  children,
  className,
  floatDelay = 0,
  depth = 6,
  enableTilt = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 25, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [depth, -depth]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-depth, depth]),
    springConfig,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !enableTilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("tilt-card-wrapper w-full max-w-[17.5rem]", className)}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: floatDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="tilt-card-inner"
        style={
          reduced || !enableTilt
            ? {}
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface FloatingCardProps {
  title: string;
  category: string;
  gradient: string;
  className?: string;
  delay?: number;
  enableFloat?: boolean;
}

export function FloatingPreviewCard({
  title,
  category,
  gradient,
  className,
  delay = 0,
  enableFloat = true,
}: FloatingCardProps) {
  const reduced = useReducedMotion();

  return (
    <TiltCard className={className} floatDelay={delay} depth={5}>
      <motion.div
        className="floating-preview-card mx-auto w-full"
        animate={reduced || !enableFloat ? {} : { y: [0, -6, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.4,
        }}
      >
        <div className="floating-preview-chrome">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-[var(--color-border-strong)]" />
            <span className="size-2 rounded-full bg-[var(--color-border)]" />
            <span className="size-2 rounded-full bg-[var(--color-border-subtle)]" />
          </div>
          <div className="floating-preview-url" />
        </div>

        <div className="floating-preview-body" style={{ background: gradient }}>
          <div className="floating-preview-shine" />
          <div className="relative z-10 p-5 sm:p-6">
            <p className="type-label mb-2.5 text-white/60 sm:mb-3">
              {category}
            </p>
            <p
              className="text-[1.375rem] leading-[1.15] tracking-tight text-white sm:text-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </p>
            <div className="mt-4 h-px w-10 bg-white/30 sm:mt-5 sm:w-12" />
            <p className="mt-3 max-w-[12.5rem] text-[0.8125rem] leading-relaxed text-white/70 sm:mt-4 sm:text-sm">
              Crafted with intention. Built to convert visitors into customers.
            </p>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}
