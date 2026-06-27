export type CatalogueCategory =
  | "navigation"
  | "hero"
  | "about"
  | "gallery"
  | "services"
  | "pricing"
  | "testimonials"
  | "faq"
  | "contact"
  | "cta"
  | "footer"
  | "backgrounds"
  | "animations"
  | "effects";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type LibrarySource = "custom" | "react-bits" | "shadcn" | "aceternity";

export type AccessibilityBadge = "aa" | "aaa" | "partial";

export type PerformanceBadge = "light" | "moderate" | "heavy";

export interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  ring: string;
}

export interface PlatformTheme {
  id: string;
  name: string;
  description: string;
  industryTags: string[];
  previewGradient: string;
  fontDisplay: string;
  fontBody: string;
  borderRadius: string;
  animationStyle: "subtle" | "expressive" | "minimal";
  defaultPaletteId: string;
  supportedPalettes: string[];
}

export interface CatalogueMeta {
  key: string;
  category: CatalogueCategory;
  tags: string[];
  difficulty: Difficulty;
  version: string;
  animation: string;
  supportedThemes: string[];
  supportedIndustries: string[];
  librarySource: LibrarySource;
  accessibility: AccessibilityBadge;
  performance: PerformanceBadge;
  previewGradient: string;
  /** section = page section, effect = wrapper/animation */
  kind: "section" | "effect";
}

export interface EnrichedCatalogueItem extends CatalogueMeta {
  displayName: string;
  description: string;
  variants?: string[];
  settingsSchema?: Record<string, unknown>;
  librarySource: LibrarySource;
  supportedIndustries: string[];
  performance: PerformanceBadge;
  accessibility: AccessibilityBadge;
  kind: "section" | "effect";
}

export interface IndustryPreset {
  id: string;
  name: string;
  icon: string;
  description: string;
  recommendedThemeId: string;
  recommendedPaletteId: string;
  recommendedPages: string[];
  recommendedSections: string[];
  colorAccent: string;
}

export interface ComposerState {
  industryId: string | null;
  themeId: string | null;
  paletteId: string | null;
  templateSections: string[];
  websiteName: string;
}
