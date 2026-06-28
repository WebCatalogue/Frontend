import { apiClient, unwrapApiData } from "@/lib/api/client";
import type { BuilderComponentDefinition } from "@/types/api";

function normalizeComponents(payload: unknown): BuilderComponentDefinition[] {
  const result = unwrapApiData<
    BuilderComponentDefinition[] | { items: BuilderComponentDefinition[] }
  >(payload);
  const raw = Array.isArray(result)
    ? result
    : result && "items" in result
      ? (result.items ?? [])
      : [];

  return raw.map((component) => ({
    ...component,
    displayName:
      component.displayName ??
      component.key
        .split(".")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
    variants: component.variants ?? component.supportedVariants,
  }));
}

export async function getComponentRegistry(): Promise<
  BuilderComponentDefinition[]
> {
  const { data } = await apiClient.get("/builder/components");
  return normalizeComponents(data);
}

export async function getComponentSchema(
  componentKey: string,
): Promise<BuilderComponentDefinition | null> {
  try {
    const { data } = await apiClient.get(
      `/builder/components/${encodeURIComponent(componentKey)}`,
    );
    const result = unwrapApiData<BuilderComponentDefinition>(data);
    return normalizeComponents([result])[0] ?? null;
  } catch {
    const registry = await getComponentRegistry();
    return registry.find((c) => c.key === componentKey) ?? null;
  }
}
