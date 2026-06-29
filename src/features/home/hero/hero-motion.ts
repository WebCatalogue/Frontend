import { getTheme } from "@/features/platform/themes";

/** Shared motion tokens for the flagship hero */

export const HERO_EASE = [0.16, 1, 0.3, 1] as const;

export const HERO_STATS = [
  { value: 500, suffix: "+", label: "Businesses" },
  { value: 100, suffix: "+", label: "Components" },
  { value: 50, suffix: "+", label: "Templates" },
] as const;

export const PRODUCT_STEPS = [
  { id: 1, label: "Choose your industry." },
  { id: 2, label: "Customize components." },
  { id: 3, label: "Preview instantly." },
  { id: 4, label: "We'll build it professionally." },
] as const;

/** Browser build timeline (seconds) */
export const BUILD_TIMELINE = {
  navbar: 0.5,
  heroHeading: 1.0,
  heroButtons: 1.5,
  heroImage: 2.0,
  about: 2.8,
  gallery: 3.5,
  testimonials: 4.2,
  footer: 5.0,
  themeChange: 6.0,
  cycleDuration: 7.0,
} as const;

export const PREVIEW_THEMES = ["cafe", "luxury", "modern", "gym"] as const;

export function getPreviewTheme(index: number) {
  const id = PREVIEW_THEMES[index % PREVIEW_THEMES.length];
  const theme = getTheme(id);
  return {
    id,
    name: theme.name,
    gradient: theme.previewGradient,
    displayFont: theme.fontDisplay,
    bodyFont: theme.fontBody,
    radius: theme.borderRadius,
  };
}
