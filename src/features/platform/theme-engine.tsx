"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getPalette, PALETTES } from "./palettes";
import { getTheme } from "./themes";

interface ThemeEngineState {
  themeId: string;
  paletteId: string;
  setThemeId: (id: string) => void;
  setPaletteId: (id: string) => void;
}

const ThemeEngineContext = createContext<ThemeEngineState | null>(null);

function applyPreviewTokens(themeId: string, paletteId: string): void {
  const theme = getTheme(themeId);
  const palette = getPalette(paletteId);
  const root = document.documentElement;

  root.style.setProperty("--preview-primary", palette.primary);
  root.style.setProperty("--preview-secondary", palette.secondary);
  root.style.setProperty("--preview-accent", palette.accent);
  root.style.setProperty("--preview-background", palette.background);
  root.style.setProperty("--preview-foreground", palette.foreground);
  root.style.setProperty("--preview-muted", palette.muted);
  root.style.setProperty("--preview-ring", palette.ring);
  root.style.setProperty("--preview-radius", theme.borderRadius);
  root.style.setProperty("--preview-font-display", theme.fontDisplay);
  root.style.setProperty("--preview-font-body", theme.fontBody);
}

interface ThemeEngineProviderProps {
  children: ReactNode;
  initialThemeId?: string;
  initialPaletteId?: string;
}

export function ThemeEngineProvider({
  children,
  initialThemeId = "modern",
  initialPaletteId,
}: ThemeEngineProviderProps) {
  const theme = getTheme(initialThemeId);
  const [themeId, setThemeId] = useState(initialThemeId);
  const [paletteId, setPaletteId] = useState(
    initialPaletteId ?? theme.defaultPaletteId,
  );

  useEffect(() => {
    applyPreviewTokens(themeId, paletteId);
  }, [themeId, paletteId]);

  const value = useMemo(
    () => ({ themeId, paletteId, setThemeId, setPaletteId }),
    [themeId, paletteId],
  );

  return (
    <ThemeEngineContext.Provider value={value}>
      {children}
    </ThemeEngineContext.Provider>
  );
}

export function useThemeEngine(): ThemeEngineState {
  const ctx = useContext(ThemeEngineContext);
  if (!ctx) {
    throw new Error("useThemeEngine must be used within ThemeEngineProvider");
  }
  return ctx;
}

export function usePreviewStyles(): React.CSSProperties {
  const { themeId, paletteId } = useThemeEngine();
  const theme = getTheme(themeId);
  const palette = getPalette(paletteId);

  return useMemo(
    () => ({
      backgroundColor: palette.background,
      color: palette.foreground,
      fontFamily: theme.fontBody,
      borderRadius: theme.borderRadius,
      ["--color-primary" as string]: palette.primary,
      ["--color-accent" as string]: palette.accent,
    }),
    [theme, palette],
  );
}

export function PaletteSelector({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (id: string) => void;
  options?: string[];
}) {
  const palettes = options ? options.map((id) => getPalette(id)) : undefined;

  const items = palettes ?? PALETTES;

  return (
    <div
      className="flex flex-wrap gap-2"
      role="radiogroup"
      aria-label="Color palette"
    >
      {items.map((palette) => (
        <button
          key={palette.id}
          type="button"
          role="radio"
          aria-checked={value === palette.id}
          onClick={() => onChange(palette.id)}
          className={`flex items-center gap-2 rounded-[var(--radius-lg)] border px-3 py-2 text-sm transition-all ${
            value === palette.id
              ? "border-[var(--preview-primary)] bg-[var(--preview-muted)] ring-2 ring-[var(--preview-ring)]/30"
              : "border-border hover:border-border-strong"
          }`}
        >
          <span
            className="size-4 rounded-full"
            style={{ background: palette.primary }}
            aria-hidden
          />
          {palette.name}
        </button>
      ))}
    </div>
  );
}
