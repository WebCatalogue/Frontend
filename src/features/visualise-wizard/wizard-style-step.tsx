"use client";

import { motion } from "framer-motion";
import { Check, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  PaletteSelector,
  useThemeEngine,
} from "@/features/platform/theme-engine";
import { PLATFORM_THEMES, getTheme } from "@/features/platform/themes";
import { getIndustryPreset } from "@/features/platform/industry-presets";
import { cn } from "@/lib/utils";

interface WizardStyleStepProps {
  industryId: string;
  themeId: string;
  paletteId: string;
  onThemeChange: (themeId: string, paletteId: string) => void;
}

export function WizardStyleStep({
  industryId,
  themeId,
  paletteId,
  onThemeChange,
}: WizardStyleStepProps) {
  const engine = useThemeEngine();
  const preset = getIndustryPreset(industryId);
  const theme = getTheme(themeId);

  const themes = PLATFORM_THEMES.filter(
    (t) =>
      t.industryTags.includes("general") ||
      t.industryTags.includes(industryId) ||
      preset?.recommendedThemeId === t.id,
  ).slice(0, 6);

  const displayThemes =
    themes.length >= 4 ? themes : PLATFORM_THEMES.slice(0, 6);

  return (
    <div className="space-y-6">
      <div
        className="grid gap-4 sm:grid-cols-2"
        role="radiogroup"
        aria-label="Website style"
      >
        {displayThemes.map((t, index) => {
          const selected = themeId === t.id;
          const recommended = preset?.recommendedThemeId === t.id;

          return (
            <motion.button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={selected}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => {
                onThemeChange(t.id, t.defaultPaletteId);
                engine.setThemeId(t.id);
                engine.setPaletteId(t.defaultPaletteId);
              }}
              className={cn(
                "overflow-hidden rounded-[var(--radius-xl)] border text-left transition-all",
                selected
                  ? "border-accent ring-accent/20 ring-2"
                  : "border-border hover:border-accent/40",
              )}
            >
              <div
                className="relative h-28 w-full"
                style={{ background: t.previewGradient }}
                aria-hidden
              >
                {recommended && (
                  <span className="bg-accent text-accent-foreground type-label absolute top-3 left-3 rounded-full px-2.5 py-1">
                    Recommended
                  </span>
                )}
                {selected && (
                  <span className="bg-background/90 absolute top-3 right-3 flex size-7 items-center justify-center rounded-full">
                    <Check className="text-accent size-4" aria-hidden />
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="type-heading-sm font-medium">{t.name}</p>
                <p className="type-body-sm text-foreground-muted mt-1 line-clamp-2">
                  {t.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="gap-1">
                    <Smartphone className="size-3" aria-hidden />
                    Mobile ready
                  </Badge>
                  {t.industryTags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="type-label bg-muted text-foreground-subtle rounded px-1.5 py-0.5 !tracking-normal !normal-case"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="surface-2 border-border rounded-[var(--radius-xl)] border p-5">
        <p className="type-heading-sm font-medium">Colour palette</p>
        <p className="type-body-sm text-foreground-muted mt-1">
          Fine-tune the colours for your {theme.name.toLowerCase()} style.
        </p>
        <div className="mt-4">
          <PaletteSelector
            value={paletteId}
            onChange={(id) => {
              onThemeChange(themeId, id);
              engine.setPaletteId(id);
            }}
            options={theme.supportedPalettes}
          />
        </div>
      </div>
    </div>
  );
}
