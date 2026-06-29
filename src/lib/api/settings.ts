import { apiClient, unwrapApiData } from "@/lib/api/client";
import { mapSettings } from "@/lib/mappers/agency";
import type { ApiSettings } from "@/types/api";

export async function getSettings() {
  const { data } = await apiClient.get("/settings");
  return mapSettings(unwrapApiData<ApiSettings>(data));
}

export async function updateSettings(payload: Partial<ApiSettings>) {
  const { data } = await apiClient.patch("/settings", payload);
  return mapSettings(unwrapApiData<ApiSettings>(data));
}
