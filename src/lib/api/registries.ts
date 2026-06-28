import { apiClient, unwrapApiData } from "@/lib/api/client";
import type { BuilderComponentDefinition, RegistryAsset } from "@/types/api";
import { getComponentRegistry } from "./builder";

function normalizeAssets(payload: unknown): RegistryAsset[] {
  const data = unwrapApiData<RegistryAsset[] | { items: RegistryAsset[] }>(
    payload,
  );
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && "items" in data) {
    return data.items ?? [];
  }
  return [];
}

async function fetchRegistryAssets(
  path: string,
): Promise<RegistryAsset[] | null> {
  try {
    const { data } = await apiClient.get(path);
    return normalizeAssets(data);
  } catch {
    return null;
  }
}

export async function getThemeRegistry(): Promise<RegistryAsset[]> {
  return (await fetchRegistryAssets("/builder/themes")) ?? [];
}

export async function getPaletteRegistry(): Promise<RegistryAsset[]> {
  return (await fetchRegistryAssets("/builder/palettes")) ?? [];
}

export async function getEffectRegistry(): Promise<RegistryAsset[]> {
  return (await fetchRegistryAssets("/builder/effects")) ?? [];
}

export async function getTemplateRegistry(): Promise<RegistryAsset[]> {
  return (await fetchRegistryAssets("/builder/templates")) ?? [];
}

export async function getIndustryRegistry(): Promise<RegistryAsset[]> {
  return (await fetchRegistryAssets("/builder/industries")) ?? [];
}

export async function getTypographyRegistry(): Promise<RegistryAsset[]> {
  return (await fetchRegistryAssets("/builder/typography")) ?? [];
}

export async function getUnifiedRegistries(): Promise<{
  components: BuilderComponentDefinition[];
  themes: RegistryAsset[];
  palettes: RegistryAsset[];
  effects: RegistryAsset[];
  templates: RegistryAsset[];
  industries: RegistryAsset[];
  typography: RegistryAsset[];
}> {
  const [
    components,
    themes,
    palettes,
    effects,
    templates,
    industries,
    typography,
  ] = await Promise.all([
    getComponentRegistry(),
    getThemeRegistry(),
    getPaletteRegistry(),
    getEffectRegistry(),
    getTemplateRegistry(),
    getIndustryRegistry(),
    getTypographyRegistry(),
  ]);

  return {
    components,
    themes,
    palettes,
    effects,
    templates,
    industries,
    typography,
  };
}
