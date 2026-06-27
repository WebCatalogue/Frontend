import { apiClient, unwrapApiData } from "@/lib/api/client";
import type { WebsiteNavigation } from "@/types/api";

export async function getWebsiteNavigation(
  websiteId: string,
): Promise<WebsiteNavigation> {
  const { data } = await apiClient.get(`/websites/${websiteId}/navigation`);
  return unwrapApiData<WebsiteNavigation>(data);
}

export async function updateWebsiteNavigation(
  websiteId: string,
  payload: WebsiteNavigation,
): Promise<WebsiteNavigation> {
  const { data } = await apiClient.put(
    `/websites/${websiteId}/navigation`,
    payload,
  );
  return unwrapApiData<WebsiteNavigation>(data);
}
