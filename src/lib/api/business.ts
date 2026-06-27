import { apiClient, unwrapApiData } from "@/lib/api/client";
import type {
  Business,
  CreateBusinessRequest,
  PaginatedList,
  UpdateBusinessRequest,
} from "@/types/api";

function normalizeBusinessList(payload: unknown): Business[] {
  const data = unwrapApiData<Business[] | PaginatedList<Business> | Business>(
    payload,
  );

  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && "items" in data) {
    return (data as PaginatedList<Business>).items ?? [];
  }
  if (data && typeof data === "object" && "id" in data) {
    return [data as Business];
  }
  return [];
}

export async function listBusinesses(): Promise<Business[]> {
  const { data } = await apiClient.get("/businesses");
  return normalizeBusinessList(data);
}

export async function getBusiness(businessId: string): Promise<Business> {
  const { data } = await apiClient.get(`/businesses/${businessId}`);
  return unwrapApiData<Business>(data);
}

export async function createBusiness(
  payload: CreateBusinessRequest,
): Promise<Business> {
  const { data } = await apiClient.post("/businesses", payload);
  return unwrapApiData<Business>(data);
}

export async function updateBusiness(
  businessId: string,
  payload: UpdateBusinessRequest,
): Promise<Business> {
  const { data } = await apiClient.patch(`/businesses/${businessId}`, payload);
  return unwrapApiData<Business>(data);
}

export async function deleteBusiness(businessId: string): Promise<void> {
  await apiClient.delete(`/businesses/${businessId}`);
}
