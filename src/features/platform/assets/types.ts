import type {
  AccessibilityBadge,
  LibrarySource,
  PerformanceBadge,
} from "../types";

export type AssetKind =
  | "component"
  | "template"
  | "theme"
  | "effect"
  | "background"
  | "palette"
  | "typography"
  | "icon";

export type AssetSort = "name" | "recent" | "popular" | "version";

/** Unified metadata for every reusable platform asset. */
export interface PlatformAsset {
  id: string;
  kind: AssetKind;
  name: string;
  category: string;
  description: string;
  version: string;
  source: LibrarySource;
  supportedIndustries: string[];
  supportedThemes: string[];
  performance: PerformanceBadge;
  accessibility: AccessibilityBadge;
  tags: string[];
  previewGradient: string;
  desktopPreview?: string;
  mobilePreview?: string;
  /** Registry key for components/effects */
  registryKey?: string;
  /** Linked entity id (themeId, paletteId, templateId) */
  entityId?: string;
  variants?: string[];
  settingsSchema?: Record<string, unknown>;
  documentation?: string;
  dependencies?: string[];
  accessibilityNotes?: string;
  performanceNotes?: string;
  exampleUsage?: string;
}

export interface AssetFilterState {
  query: string;
  kind: AssetKind | "all";
  category: string | "all";
  source: LibrarySource | "all";
  industry: string | "all";
  sort: AssetSort;
  favoritesOnly: boolean;
  recentOnly: boolean;
}

export const ASSET_KIND_LABELS: Record<AssetKind, string> = {
  component: "Components",
  template: "Templates",
  theme: "Themes",
  effect: "Effects",
  background: "Backgrounds",
  palette: "Color Palettes",
  typography: "Typography",
  icon: "Icons",
};

export const ASSET_KIND_TABS: AssetKind[] = [
  "component",
  "template",
  "theme",
  "effect",
  "background",
  "palette",
  "typography",
  "icon",
];
