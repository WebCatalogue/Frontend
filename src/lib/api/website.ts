import { apiClient, unwrapApiData } from "@/lib/api/client";
import type {
  CreateWebsiteRequest,
  PaginatedList,
  PublishedWebsite,
  UpdateWebsiteConfigRequest,
  UpdateWebsiteRequest,
  Website,
  WebsiteConfig,
} from "@/types/api";

function normalizeWebsiteList(payload: unknown): Website[] {
  const data = unwrapApiData<Website[] | PaginatedList<Website> | Website>(
    payload,
  );

  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && "items" in data) {
    return (data as PaginatedList<Website>).items ?? [];
  }
  if (data && typeof data === "object" && "id" in data) {
    return [data as Website];
  }
  return [];
}

export async function listBusinessWebsites(
  businessId: string,
): Promise<Website[]> {
  const { data } = await apiClient.get(`/businesses/${businessId}/websites`);
  return normalizeWebsiteList(data);
}

export async function createBusinessWebsite(
  businessId: string,
  payload: CreateWebsiteRequest,
): Promise<Website> {
  const { data } = await apiClient.post(
    `/businesses/${businessId}/websites`,
    payload,
  );
  return unwrapApiData<Website>(data);
}

export async function getWebsite(websiteId: string): Promise<Website> {
  const { data } = await apiClient.get(`/websites/${websiteId}`);
  return unwrapApiData<Website>(data);
}

export async function updateWebsite(
  websiteId: string,
  payload: UpdateWebsiteRequest,
): Promise<Website> {
  const { data } = await apiClient.patch(`/websites/${websiteId}`, payload);
  return unwrapApiData<Website>(data);
}

export async function deleteWebsite(websiteId: string): Promise<void> {
  await apiClient.delete(`/websites/${websiteId}`);
}

export async function publishWebsite(websiteId: string): Promise<Website> {
  const { data } = await apiClient.post(`/websites/${websiteId}/publish`);
  return unwrapApiData<Website>(data);
}

export async function archiveWebsite(websiteId: string): Promise<Website> {
  const { data } = await apiClient.patch(`/websites/${websiteId}/archive`);
  return unwrapApiData<Website>(data);
}

export async function getWebsiteConfig(
  websiteId: string,
): Promise<WebsiteConfig> {
  const { data } = await apiClient.get(`/websites/${websiteId}/config`);
  return unwrapApiData<WebsiteConfig>(data);
}

export async function updateWebsiteConfig(
  websiteId: string,
  payload: UpdateWebsiteConfigRequest,
): Promise<WebsiteConfig> {
  const { data } = await apiClient.patch(
    `/websites/${websiteId}/config`,
    payload,
  );
  return unwrapApiData<WebsiteConfig>(data);
}

export async function getPublishedWebsite(
  websiteSlug: string,
  tenantSlug: string,
): Promise<PublishedWebsite> {
  const { data } = await apiClient.get(`/websites/${websiteSlug}/published`, {
    headers: { "x-tenant-slug": tenantSlug },
  });
  return unwrapApiData<PublishedWebsite>(data);
}

/** @deprecated Use createBusinessWebsite */
export async function createWebsite(
  payload: CreateWebsiteRequest,
): Promise<Website> {
  if (!payload.businessId) {
    throw new Error("businessId is required to create a website.");
  }
  return createBusinessWebsite(payload.businessId, payload);
}
