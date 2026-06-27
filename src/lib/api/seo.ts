import { apiClient, unwrapApiData } from "@/lib/api/client";
import type { WebsiteSeo } from "@/types/api";

export async function getWebsiteSeo(websiteId: string): Promise<WebsiteSeo> {
  const { data } = await apiClient.get(`/websites/${websiteId}/seo`);
  return unwrapApiData<WebsiteSeo>(data);
}

export async function updateWebsiteSeo(
  websiteId: string,
  payload: WebsiteSeo,
): Promise<WebsiteSeo> {
  const { data } = await apiClient.put(`/websites/${websiteId}/seo`, payload);
  return unwrapApiData<WebsiteSeo>(data);
}
