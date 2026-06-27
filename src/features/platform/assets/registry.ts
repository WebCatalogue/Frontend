import type { BuilderComponentDefinition } from "@/types/api";
import { EFFECT_KEYS } from "@/features/builder/effects";
import { INDUSTRY_TEMPLATES } from "@/mock/industry-templates";
import { EFFECT_CATALOGUE, enrichCatalogue } from "../catalogue-meta";
import { PALETTES } from "../palettes";
import { PLATFORM_THEMES } from "../themes";
import type { PlatformAsset } from "./types";

const TYPOGRAPHY_ASSETS: PlatformAsset[] = [
  {
    id: "typography-instrument-inter",
    kind: "typography",
    name: "Instrument Serif + Inter",
    category: "display-body",
    description:
      "Default BhaiKISite pairing — editorial headlines with readable body copy.",
    version: "1.0",
    source: "custom",
    supportedIndustries: ["cafe", "restaurant", "salon", "clinic"],
    supportedThemes: ["modern", "luxury", "cafe", "restaurant"],
    performance: "light",
    accessibility: "aa",
    tags: ["serif", "sans", "default"],
    previewGradient: "linear-gradient(135deg, #FAFAF8 0%, #E5E5E5 100%)",
    documentation:
      "Display: Instrument Serif. Body: Inter. Loaded via next/font.",
  },
  {
    id: "typography-inter-only",
    kind: "typography",
    name: "Inter Stack",
    category: "sans",
    description: "Single-family stack for minimal and fitness brands.",
    version: "1.0",
    source: "custom",
    supportedIndustries: ["gym", "education", "real-estate"],
    supportedThemes: ["minimal", "gym", "modern"],
    performance: "light",
    accessibility: "aaa",
    tags: ["sans", "minimal"],
    previewGradient: "linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 100%)",
  },
];

const ICON_ASSETS: PlatformAsset[] = [
  {
    id: "icons-lucide",
    kind: "icon",
    name: "Lucide Icons",
    category: "system",
    description:
      "Consistent stroke icons used across the BhaiKISite dashboard and builder.",
    version: "1.0",
    source: "custom",
    supportedIndustries: [],
    supportedThemes: [],
    performance: "light",
    accessibility: "aa",
    tags: ["icons", "ui", "future-ready"],
    previewGradient: "linear-gradient(135deg, #334155 0%, #64748B 100%)",
    documentation:
      "Icon set integration planned for section-level icon pickers.",
  },
];

function componentsToAssets(
  defs: BuilderComponentDefinition[],
): PlatformAsset[] {
  return enrichCatalogue(defs).map((item) => ({
    id: `component-${item.key}`,
    kind: "component" as const,
    registryKey: item.key,
    entityId: item.key,
    name: item.displayName,
    category: item.category,
    description: item.description,
    version: item.version,
    source: item.librarySource,
    supportedIndustries: item.supportedIndustries,
    supportedThemes: item.supportedThemes,
    performance: item.performance,
    accessibility: item.accessibility,
    tags: item.tags,
    previewGradient: item.previewGradient,
    variants: item.variants,
    settingsSchema: item.settingsSchema,
    documentation: `Section component registered as \`${item.key}\`. Add via builder or compose flow.`,
    dependencies: ["@/features/builder/registry"],
    accessibilityNotes:
      item.accessibility === "aaa"
        ? "Full keyboard support and semantic structure."
        : item.accessibility === "partial"
          ? "Verify motion and media alternatives before publish."
          : "Meets WCAG AA contrast targets with default palette.",
    performanceNotes:
      item.performance === "heavy"
        ? "Lazy-load media and limit simultaneous animations."
        : item.performance === "moderate"
          ? "Optimise images; carousel uses client hydration."
          : "Lightweight static render.",
    exampleUsage: `<RegistrySection section={{ componentKey: "${item.key}" }} />`,
  }));
}

function effectsToAssets(): PlatformAsset[] {
  return EFFECT_CATALOGUE.map((item) => ({
    id: `effect-${item.key}`,
    kind: "effect" as const,
    registryKey: item.key,
    entityId: item.key.replace("effect.", ""),
    name: item.displayName,
    category: item.category,
    description: item.description,
    version: item.version,
    source: item.librarySource,
    supportedIndustries: item.supportedIndustries,
    supportedThemes: item.supportedThemes,
    performance: item.performance,
    accessibility: item.accessibility,
    tags: item.tags,
    previewGradient: item.previewGradient,
    documentation: `Apply as a page, section, or component layer via effect.${item.key.replace("effect.", "")}.`,
    dependencies: ["@/features/builder/effects"],
    accessibilityNotes: "Decorative motion — respect prefers-reduced-motion.",
    performanceNotes:
      item.performance === "moderate"
        ? "Limit particle count on mobile."
        : "GPU-friendly transforms.",
    exampleUsage: `resolveEffect("${item.key}")`,
  }));
}

function backgroundsToAssets(): PlatformAsset[] {
  return EFFECT_CATALOGUE.filter((e) => e.category === "backgrounds").map(
    (item) => ({
      id: `background-${item.key}`,
      kind: "background" as const,
      registryKey: item.key,
      entityId: item.key.replace("effect.", ""),
      name: item.displayName,
      category: "background",
      description: item.description,
      version: item.version,
      source: item.librarySource,
      supportedIndustries: item.supportedIndustries,
      supportedThemes: item.supportedThemes,
      performance: item.performance,
      accessibility: item.accessibility,
      tags: [...item.tags, "background"],
      previewGradient: item.previewGradient,
    }),
  );
}

function themesToAssets(): PlatformAsset[] {
  return PLATFORM_THEMES.map((t) => ({
    id: `theme-${t.id}`,
    kind: "theme" as const,
    entityId: t.id,
    name: t.name,
    category: "theme",
    description: t.description,
    version: "1.0",
    source: "custom" as const,
    supportedIndustries: t.industryTags,
    supportedThemes: [t.id],
    performance: "light" as const,
    accessibility: "aa" as const,
    tags: t.industryTags,
    previewGradient: t.previewGradient,
  }));
}

function palettesToAssets(): PlatformAsset[] {
  return PALETTES.map((p) => ({
    id: `palette-${p.id}`,
    kind: "palette" as const,
    entityId: p.id,
    name: p.name,
    category: "palette",
    description: `${p.name} colour system for buttons, links, and surfaces.`,
    version: "1.0",
    source: "custom" as const,
    supportedIndustries: [],
    supportedThemes: PLATFORM_THEMES.filter((t) =>
      t.supportedPalettes.includes(p.id),
    ).map((t) => t.id),
    performance: "light" as const,
    accessibility: "aa" as const,
    tags: [p.id, "color"],
    previewGradient: `linear-gradient(135deg, ${p.primary} 0%, ${p.accent} 100%)`,
  }));
}

function templatesToAssets(): PlatformAsset[] {
  return INDUSTRY_TEMPLATES.map((t) => ({
    id: `template-${t.id}`,
    kind: "template" as const,
    entityId: t.id,
    name: t.name,
    category: t.industrySlug,
    description: t.description,
    version: "1.0",
    source: "custom" as const,
    supportedIndustries: [t.industrySlug],
    supportedThemes: [t.themeId],
    performance: "moderate" as const,
    accessibility: "aa" as const,
    tags: [t.industrySlug, t.themeId, t.paletteId],
    previewGradient: "linear-gradient(135deg, #1C1917 0%, #525252 100%)",
    desktopPreview: t.desktopImage,
    mobilePreview: t.mobileImage,
  }));
}

export function buildAssetRegistry(
  components: BuilderComponentDefinition[],
): PlatformAsset[] {
  return [
    ...componentsToAssets(components),
    ...templatesToAssets(),
    ...themesToAssets(),
    ...effectsToAssets(),
    ...backgroundsToAssets(),
    ...palettesToAssets(),
    ...TYPOGRAPHY_ASSETS,
    ...ICON_ASSETS,
  ];
}

export function getAssetById(
  assets: PlatformAsset[],
  id: string,
): PlatformAsset | undefined {
  return assets.find((a) => a.id === id);
}

export function getComponentAsset(
  assets: PlatformAsset[],
  key: string,
): PlatformAsset | undefined {
  return assets.find(
    (a) =>
      a.kind === "component" && (a.registryKey === key || a.entityId === key),
  );
}

export function filterAssets(
  assets: PlatformAsset[],
  opts: {
    query?: string;
    kind?: PlatformAsset["kind"] | "all";
    category?: string;
    source?: string;
    industry?: string;
    favoriteIds?: string[];
    recentIds?: string[];
    favoritesOnly?: boolean;
    recentOnly?: boolean;
    sort?: "name" | "recent" | "popular" | "version";
  },
): PlatformAsset[] {
  const q = opts.query?.trim().toLowerCase() ?? "";
  let list = assets.filter((a) => {
    if (opts.kind && opts.kind !== "all" && a.kind !== opts.kind) return false;
    if (
      opts.category &&
      opts.category !== "all" &&
      a.category !== opts.category
    )
      return false;
    if (opts.source && opts.source !== "all" && a.source !== opts.source)
      return false;
    if (
      opts.industry &&
      opts.industry !== "all" &&
      !a.supportedIndustries.includes(opts.industry)
    )
      return false;
    if (opts.favoritesOnly && !opts.favoriteIds?.includes(a.id)) return false;
    if (opts.recentOnly && !opts.recentIds?.includes(a.id)) return false;
    if (
      q &&
      !a.name.toLowerCase().includes(q) &&
      !a.description.toLowerCase().includes(q) &&
      !a.tags.some((t) => t.includes(q)) &&
      !a.id.includes(q)
    )
      return false;
    return true;
  });

  if (opts.sort === "recent" && opts.recentIds?.length) {
    list = [...list].sort(
      (a, b) => opts.recentIds!.indexOf(a.id) - opts.recentIds!.indexOf(b.id),
    );
  } else if (opts.sort === "name") {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}

export { EFFECT_KEYS };
