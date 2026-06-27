import { apiClient, unwrapApiData } from "@/lib/api/client";
import type { BuilderComponentDefinition } from "@/types/api";

export async function getComponentRegistry(): Promise<
  BuilderComponentDefinition[]
> {
  const { data } = await apiClient.get("/builder/components");
  const result = unwrapApiData<
    BuilderComponentDefinition[] | { items: BuilderComponentDefinition[] }
  >(data);
  if (Array.isArray(result)) return result;
  if (result && "items" in result) return result.items ?? [];
  return [];
}
