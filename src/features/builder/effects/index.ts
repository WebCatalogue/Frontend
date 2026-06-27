"use client";

import dynamic from "next/dynamic";
import type { EffectRegistryEntry } from "./types";

const AuroraBackground = dynamic(() =>
  import("./aurora-background").then((m) => m.AuroraBackground),
);
const Spotlight = dynamic(() => import("./spotlight").then((m) => m.Spotlight));
const Particles = dynamic(() => import("./particles").then((m) => m.Particles));
const InfiniteCards = dynamic(() =>
  import("./infinite-cards").then((m) => m.InfiniteCards),
);
const AnimatedGrid = dynamic(() =>
  import("./animated-grid").then((m) => m.AnimatedGrid),
);
const Marquee = dynamic(() => import("./marquee").then((m) => m.Marquee));
const TextReveal = dynamic(() =>
  import("./text-reveal").then((m) => m.TextReveal),
);
const ScrollReveal = dynamic(() =>
  import("./scroll-reveal").then((m) => m.ScrollReveal),
);

/** Platform effect wrappers — never import third-party UI directly in pages. */
export const EFFECT_REGISTRY: Record<string, EffectRegistryEntry> = {
  "effect.aurora": AuroraBackground,
  "effect.spotlight": Spotlight,
  "effect.particles": Particles,
  "effect.infinite-cards": InfiniteCards,
  "effect.animated-grid": AnimatedGrid,
  "effect.marquee": Marquee,
  "effect.text-reveal": TextReveal,
  "effect.scroll-reveal": ScrollReveal,
};

export const EFFECT_KEYS = Object.keys(EFFECT_REGISTRY);

export function resolveEffect(key: string): EffectRegistryEntry | null {
  return EFFECT_REGISTRY[key] ?? null;
}

export {
  AuroraBackground,
  Spotlight,
  Particles,
  InfiniteCards,
  AnimatedGrid,
  Marquee,
  TextReveal,
  ScrollReveal,
};
export type { EffectComponentProps } from "./types";
