export type EffectLayerTarget = "page" | "section" | "component";

export interface EffectLayer {
  id: string;
  effectKey: string;
  target: EffectLayerTarget;
  targetId?: string;
  settings?: Record<string, unknown>;
  enabled: boolean;
}

export const AVAILABLE_EFFECTS = [
  { key: "effect.aurora", name: "Aurora" },
  { key: "effect.particles", name: "Particles" },
  { key: "effect.spotlight", name: "Spotlight" },
  { key: "effect.animated-grid", name: "Animated Grid" },
  { key: "effect.marquee", name: "Marquee" },
  { key: "effect.scroll-reveal", name: "Scroll Reveal" },
  { key: "effect.text-reveal", name: "Text Reveal" },
  { key: "effect.infinite-cards", name: "Infinite Cards" },
] as const;

export function createEffectLayer(
  effectKey: string,
  target: EffectLayerTarget,
  targetId?: string,
): EffectLayer {
  return {
    id: `fx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    effectKey,
    target,
    targetId,
    settings: {},
    enabled: true,
  };
}
