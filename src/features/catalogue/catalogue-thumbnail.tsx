"use client";

import { RegistrySection } from "@/features/builder/registry";
import { resolveEffect } from "@/features/builder/effects";
import { ThemeEngineProvider } from "@/features/platform/theme-engine";
import type { EnrichedCatalogueItem } from "@/features/platform/types";
import type { PublishedSection } from "@/types/api";
import { cn } from "@/lib/utils";

const DEMO_SECTION_SETTINGS: Record<string, Record<string, unknown>> = {
  "hero.basic": {
    headline: "Your headline",
    subtitle: "A compelling subtitle for your business.",
    ctaLabel: "Get started",
    ctaHref: "#",
  },
  "hero.split": {
    headline: "Split hero",
    subtitle: "Image and copy side by side.",
    ctaLabel: "Learn more",
  },
  "about.story": {
    title: "Our story",
    body: "Share what makes your business unique.",
  },
  "cta.banner": {
    headline: "Ready to begin?",
    ctaLabel: "Contact us",
  },
};

interface CatalogueThumbnailProps {
  item: EnrichedCatalogueItem;
  className?: string;
}

export function CatalogueThumbnail({
  item,
  className,
}: CatalogueThumbnailProps) {
  return (
    <ThemeEngineProvider initialThemeId="modern" initialPaletteId="blue">
      <div
        className={cn(
          "border-border relative h-36 overflow-hidden rounded-[var(--radius-lg)] border bg-[var(--preview-background,#fafaf8)]",
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 origin-top-left scale-[0.45] overflow-hidden"
          style={{ width: "222%", height: "222%" }}
        >
          <ThumbnailContent item={item} />
        </div>
      </div>
    </ThemeEngineProvider>
  );
}

function ThumbnailContent({ item }: { item: EnrichedCatalogueItem }) {
  if (item.kind === "effect") {
    const Effect = resolveEffect(item.key);
    if (!Effect) {
      return <GradientFallback gradient={item.previewGradient} />;
    }
    return (
      <Effect settings={{ text: item.displayName }}>
        <div className="flex min-h-[12rem] items-center justify-center p-8">
          <p className="text-sm font-medium text-[var(--preview-foreground)]">
            {item.displayName}
          </p>
        </div>
      </Effect>
    );
  }

  const section: PublishedSection = {
    id: `thumb-${item.key}`,
    componentKey: item.key,
    settings: DEMO_SECTION_SETTINGS[item.key] ?? {},
  };

  if (!DEMO_SECTION_SETTINGS[item.key] && item.key.includes("hero")) {
    section.settings = DEMO_SECTION_SETTINGS["hero.basic"];
  }

  try {
    return <RegistrySection section={section} />;
  } catch {
    return <GradientFallback gradient={item.previewGradient} />;
  }
}

function GradientFallback({ gradient }: { gradient: string }) {
  return (
    <div
      className="flex h-full min-h-[10rem] items-end p-4"
      style={{ background: gradient }}
    >
      <span className="text-xs font-medium text-white/80">Preview</span>
    </div>
  );
}
