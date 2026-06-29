import { apiClient, unwrapApiData } from "@/lib/api/client";
import { normalizeList } from "@/lib/api/utils";
import { mapProjectSummary } from "@/lib/mappers/agency";
import type { ApiProjectSummary, CreateEnquiryRequest } from "@/types/api";
import type { AgencyProject } from "@/types/agency";

export async function listEnquiries(): Promise<AgencyProject[]> {
  const { data } = await apiClient.get("/enquiries");
  return normalizeList<ApiProjectSummary>(data).map((item) =>
    mapProjectSummary(item),
  );
}

export async function submitEnquiry(
  payload: CreateEnquiryRequest,
): Promise<AgencyProject> {
  const { data } = await apiClient.post("/enquiries", payload);
  return mapProjectSummary(unwrapApiData<ApiProjectSummary>(data));
}

export async function deleteEnquiry(enquiryId: string): Promise<void> {
  await apiClient.delete(`/enquiries/${enquiryId}`);
}
