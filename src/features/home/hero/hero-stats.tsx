"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { HERO_EASE, HERO_STATS } from "./hero-motion";

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const Stat = memo(function Stat({ value, suffix, label, delay }: StatProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const timeout = window.setTimeout(() => motionVal.set(value), delay * 1000);
    const unsub = springVal.on("change", (v) => setDisplay(Math.round(v)));
    return () => {
      window.clearTimeout(timeout);
      unsub();
    };
  }, [inView, reduced, value, delay, motionVal, springVal]);

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: HERO_EASE, delay }}
    >
      <p className="text-2xl font-medium tracking-tight text-white tabular-nums sm:text-3xl">
        {display}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-white/45">{label}</p>
    </motion.div>
  );
});

export const HeroStats = memo(function HeroStats() {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-8 pb-6 sm:mt-12 sm:gap-12 sm:pb-10">
      {HERO_STATS.map((stat, i) => (
        <Stat
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          delay={0.2 + i * 0.12}
        />
      ))}
    </div>
  );
});
