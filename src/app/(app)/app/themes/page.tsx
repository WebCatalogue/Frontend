"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RegistrySection } from "@/features/builder/registry";
import {
  PaletteSelector,
  ThemeEngineProvider,
  useThemeEngine,
} from "@/features/platform/theme-engine";
import { PLATFORM_THEMES, getTheme } from "@/features/platform/themes";
import type { PublishedSection } from "@/types/api";

export default function ThemesPage() {
  const [previewThemeId, setPreviewThemeId] = useState("modern");

  return (
    <ThemeEngineProvider initialThemeId={previewThemeId}>
      <div className="space-y-8">
        <div>
          <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
            Theme browser
          </h1>
          <p className="type-body-sm text-foreground-muted mt-2">
            Preview themes and palettes before applying to your websites.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {PLATFORM_THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setPreviewThemeId(theme.id)}
                className={`rounded-[var(--radius-2xl)] border p-4 text-left transition-all ${
                  previewThemeId === theme.id
                    ? "border-accent ring-accent/20 ring-2"
                    : "border-border hover:border-border-strong"
                }`}
              >
                <div
                  className="mb-3 h-16 rounded-xl"
                  style={{ background: theme.previewGradient }}
                  aria-hidden
                />
                <p className="type-heading-sm font-medium">{theme.name}</p>
                <p className="type-body-sm text-foreground-muted mt-1 line-clamp-2">
                  {theme.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {theme.industryTags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <ThemePreviewPanel themeId={previewThemeId} />
        </div>
      </div>
    </ThemeEngineProvider>
  );
}

function ThemePreviewPanel({ themeId }: { themeId: string }) {
  const { paletteId, setPaletteId } = useThemeEngine();
  const theme = getTheme(themeId);

  const demoSection: PublishedSection = {
    id: "demo",
    componentKey: "hero.basic",
    settings: {
      headline: `${theme.name} Theme`,
      subtitle: "Live preview with your selected palette.",
      ctaLabel: "Get started",
      ctaHref: "#",
    },
  };

  return (
    <div className="space-y-4">
      <PaletteSelector
        value={paletteId}
        onChange={setPaletteId}
        options={theme.supportedPalettes}
      />
      <motion.div
        key={`${themeId}-${paletteId}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="preview-canvas border-border overflow-hidden rounded-[var(--radius-2xl)] border shadow-lg"
        style={{
          background: "var(--preview-background)",
          fontFamily: "var(--preview-font-body)",
        }}
      >
        <RegistrySection section={demoSection} />
      </motion.div>
      <dl className="type-body-sm text-foreground-muted grid grid-cols-2 gap-2">
        <dt>Border radius</dt>
        <dd>{theme.borderRadius}</dd>
        <dt>Animation</dt>
        <dd className="capitalize">{theme.animationStyle}</dd>
      </dl>
      <Button variant="outline" className="w-full" asChild>
        <a href="/app/compose">Use in Composer</a>
      </Button>
    </div>
  );
}
