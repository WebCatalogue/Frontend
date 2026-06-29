import { apiClient, unwrapApiData } from "@/lib/api/client";
import { normalizeList } from "@/lib/api/utils";
import { mapClient } from "@/lib/mappers/agency";
import type { ApiClient } from "@/types/api";
import type { Client } from "@/types/agency";

export async function listClients(): Promise<Client[]> {
  const { data } = await apiClient.get("/clients");
  return normalizeList<ApiClient>(data).map(mapClient);
}

export async function getClient(clientId: string): Promise<Client> {
  const { data } = await apiClient.get(`/clients/${clientId}`);
  return mapClient(unwrapApiData<ApiClient>(data));
}

export async function createClient(
  payload: Partial<Client> & {
    businessName: string;
    ownerName: string;
    email: string;
    phone: string;
    industry: string;
  },
): Promise<Client> {
  const { data } = await apiClient.post("/clients", payload);
  return mapClient(unwrapApiData<ApiClient>(data));
}

export async function updateClient(
  clientId: string,
  payload: Partial<Client>,
): Promise<Client> {
  const { data } = await apiClient.patch(`/clients/${clientId}`, payload);
  return mapClient(unwrapApiData<ApiClient>(data));
}
