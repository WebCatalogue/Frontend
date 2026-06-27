import { apiClient, unwrapApiData } from "@/lib/api/client";
import type { Tenant } from "@/types/api";

export async function getCurrentTenant(): Promise<Tenant> {
  const { data } = await apiClient.get("/tenant/current");
  return unwrapApiData<Tenant>(data);
}
