import type { BuilderComponentDefinition, RegistryAsset } from "@/types/api";
import { EFFECT_KEYS } from "@/features/builder/effects";
import { EFFECT_CATALOGUE, enrichCatalogue } from "../catalogue-meta";
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

function registryToAssets(
  items: RegistryAsset[],
  kind: PlatformAsset["kind"],
): PlatformAsset[] {
  return items.map((item) => ({
    id: `${kind}-${item.id}`,
    kind,
    entityId: item.id,
    registryKey: item.id,
    name: item.name,
    category: String(item.metadata?.category ?? item.kind ?? kind),
    description: item.description ?? "",
    version: item.version ?? "1.0",
    source: "custom" as const,
    supportedIndustries: Array.isArray(item.metadata?.industries)
      ? (item.metadata?.industries as string[])
      : [],
    supportedThemes: Array.isArray(item.metadata?.themes)
      ? (item.metadata?.themes as string[])
      : [],
    performance: "light" as const,
    accessibility: "aa" as const,
    tags: Array.isArray(item.metadata?.tags)
      ? (item.metadata?.tags as string[])
      : [item.id],
    previewGradient:
      typeof item.metadata?.previewGradient === "string"
        ? item.metadata.previewGradient
        : "linear-gradient(135deg, #1C1917 0%, #525252 100%)",
    desktopPreview:
      typeof item.metadata?.desktopImage === "string"
        ? item.metadata.desktopImage
        : undefined,
    mobilePreview:
      typeof item.metadata?.mobileImage === "string"
        ? item.metadata.mobileImage
        : undefined,
  }));
}

export interface PlatformRegistriesInput {
  templates?: RegistryAsset[];
  themes?: RegistryAsset[];
  palettes?: RegistryAsset[];
  effects?: RegistryAsset[];
  typography?: RegistryAsset[];
  industries?: RegistryAsset[];
}

export function buildAssetRegistry(
  components: BuilderComponentDefinition[],
  registries: PlatformRegistriesInput = {},
): PlatformAsset[] {
  const apiEffects = registries.effects ?? [];
  const effectAssets =
    apiEffects.length > 0
      ? registryToAssets(apiEffects, "effect")
      : effectsToAssets();

  return [
    ...componentsToAssets(components),
    ...registryToAssets(registries.templates ?? [], "template"),
    ...registryToAssets(registries.themes ?? [], "theme"),
    ...registryToAssets(registries.palettes ?? [], "palette"),
    ...effectAssets,
    ...(apiEffects.length > 0
      ? registryToAssets(
          apiEffects.filter(
            (item) => item.metadata?.category === "backgrounds",
          ),
          "background",
        )
      : backgroundsToAssets()),
    ...registryToAssets(registries.typography ?? [], "typography"),
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
