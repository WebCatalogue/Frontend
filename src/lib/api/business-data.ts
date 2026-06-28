import { apiClient, unwrapApiData } from "@/lib/api/client";
import type { BusinessDataCollection, BusinessDataRecord } from "@/types/api";

function collectionPath(websiteId: string, collection: BusinessDataCollection) {
  return `/websites/${websiteId}/data/${collection}`;
}

function normalizeList(payload: unknown): BusinessDataRecord[] {
  const data = unwrapApiData<
    BusinessDataRecord[] | { items: BusinessDataRecord[] }
  >(payload);
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && "items" in data) {
    return data.items ?? [];
  }
  return [];
}

export async function listBusinessData(
  websiteId: string,
  collection: BusinessDataCollection,
): Promise<BusinessDataRecord[]> {
  const { data } = await apiClient.get(collectionPath(websiteId, collection));
  return normalizeList(data);
}

export async function createBusinessDataItem(
  websiteId: string,
  collection: BusinessDataCollection,
  payload: Record<string, unknown>,
): Promise<BusinessDataRecord> {
  const { data } = await apiClient.post(
    collectionPath(websiteId, collection),
    payload,
  );
  return unwrapApiData<BusinessDataRecord>(data);
}

export async function updateBusinessDataItem(
  websiteId: string,
  collection: BusinessDataCollection,
  itemId: string,
  payload: Record<string, unknown>,
): Promise<BusinessDataRecord> {
  const { data } = await apiClient.patch(
    `${collectionPath(websiteId, collection)}/${itemId}`,
    payload,
  );
  return unwrapApiData<BusinessDataRecord>(data);
}

export async function deleteBusinessDataItem(
  websiteId: string,
  collection: BusinessDataCollection,
  itemId: string,
): Promise<void> {
  await apiClient.delete(`${collectionPath(websiteId, collection)}/${itemId}`);
}
