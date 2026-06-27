"use client";

import {
  ThemeEngineProvider,
  useThemeEngine,
  PaletteSelector,
} from "@/features/platform/theme-engine";
import { getTheme } from "@/features/platform/themes";
import { getPalette } from "@/features/platform/palettes";
import { ColorSwatches } from "@/components/marketing/color-swatches";
import { Reveal } from "@/components/playground/motion/primitives";

interface IndustryLivePreviewProps {
  themeId: string;
  paletteId: string;
  industryName: string;
  heroImage: string;
}

function PreviewFrame({
  industryName,
  heroImage,
  themeId,
}: Omit<IndustryLivePreviewProps, "paletteId">) {
  const { paletteId } = useThemeEngine();
  const theme = getTheme(themeId);
  const palette = getPalette(paletteId);

  return (
    <div
      className="overflow-hidden rounded-[var(--radius-xl)] border shadow-lg"
      style={{
        borderColor: palette.muted,
        background: palette.background,
        fontFamily: theme.fontBody,
      }}
    >
      <div className="relative h-32 overflow-hidden sm:h-40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroImage} alt="" className="size-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${palette.background}ee, transparent)`,
          }}
        />
      </div>
      <div className="p-5 sm:p-6" style={{ color: palette.foreground }}>
        <p
          className="text-xs font-medium tracking-widest uppercase opacity-60"
          style={{ fontFamily: theme.fontDisplay }}
        >
          {industryName}
        </p>
        <h3
          className="mt-2 text-xl leading-tight sm:text-2xl"
          style={{ fontFamily: theme.fontDisplay }}
        >
          Your business, beautifully online
        </h3>
        <p className="mt-2 text-sm opacity-70">
          Theme and colours update instantly as you explore options below.
        </p>
        <div className="mt-4 flex gap-2">
          <span
            className="rounded-full px-4 py-2 text-sm font-medium text-white"
            style={{
              background: palette.primary,
              borderRadius: theme.borderRadius,
            }}
          >
            Get started
          </span>
          <span
            className="rounded-full border px-4 py-2 text-sm"
            style={{
              borderColor: palette.accent,
              color: palette.accent,
              borderRadius: theme.borderRadius,
            }}
          >
            View menu
          </span>
        </div>
      </div>
    </div>
  );
}

function PalettePanel({ defaultPaletteId }: { defaultPaletteId: string }) {
  const { paletteId, setPaletteId } = useThemeEngine();

  return (
    <div className="depth-panel p-6 sm:p-8">
      <h3 className="type-heading-sm text-foreground">Suggested palette</h3>
      <p className="type-body-sm text-foreground-muted mt-2">
        Click a swatch to see how buttons, accents, and backgrounds change
        across your site.
      </p>
      <div className="mt-6">
        <PaletteSelector value={paletteId} onChange={setPaletteId} />
      </div>
      <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-6">
        <p className="type-label text-foreground-subtle mb-3">
          Current palette
        </p>
        <ColorSwatches
          paletteId={paletteId || defaultPaletteId}
          size="md"
          showLabels
        />
      </div>
    </div>
  );
}

function LivePreviewInner(props: IndustryLivePreviewProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <Reveal>
        <PreviewFrame {...props} />
      </Reveal>
      <Reveal delay={0.1}>
        <PalettePanel defaultPaletteId={props.paletteId} />
      </Reveal>
    </div>
  );
}

export function IndustryLivePreview(props: IndustryLivePreviewProps) {
  return (
    <ThemeEngineProvider
      initialThemeId={props.themeId}
      initialPaletteId={props.paletteId}
    >
      <LivePreviewInner {...props} />
    </ThemeEngineProvider>
  );
}
