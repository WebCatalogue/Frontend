import { apiClient, unwrapApiData } from "@/lib/api/client";
import { normalizeList } from "@/lib/api/utils";
import { mapProjectDetail, mapProjectSummary } from "@/lib/mappers/agency";
import type {
  ApiProjectDetail,
  ApiProjectSummary,
  CreateProjectAttachmentRequest,
  CreateProjectNoteRequest,
  CreateProjectRequest,
  UpdateChecklistItemRequest,
  UpdateProjectRequest,
} from "@/types/api";
import type { AgencyProject } from "@/types/agency";

export async function listProjects(): Promise<AgencyProject[]> {
  const { data } = await apiClient.get("/projects");
  return normalizeList<ApiProjectSummary>(data).map((item) =>
    mapProjectSummary(item),
  );
}

export async function getProject(projectId: string): Promise<AgencyProject> {
  const { data } = await apiClient.get(`/projects/${projectId}`);
  const payload = unwrapApiData<ApiProjectSummary | ApiProjectDetail>(data);
  if (
    "checklist" in payload ||
    "activities" in payload ||
    "overview" in payload
  ) {
    return mapProjectDetail(payload as ApiProjectDetail);
  }
  return mapProjectSummary(payload as ApiProjectSummary);
}

export async function getProjectDetail(
  projectId: string,
): Promise<AgencyProject> {
  const { data } = await apiClient.get(`/projects/${projectId}/detail`);
  return mapProjectDetail(unwrapApiData<ApiProjectDetail>(data));
}

export async function createProject(
  payload: CreateProjectRequest,
): Promise<AgencyProject> {
  const { data } = await apiClient.post("/projects", payload);
  const created = unwrapApiData<ApiProjectSummary | ApiProjectDetail>(data);
  if ("checklist" in created || "overview" in created) {
    return mapProjectDetail(created as ApiProjectDetail);
  }
  return mapProjectSummary(created as ApiProjectSummary);
}

export async function updateProject(
  projectId: string,
  payload: UpdateProjectRequest,
): Promise<AgencyProject> {
  const { data } = await apiClient.patch(`/projects/${projectId}`, payload);
  const updated = unwrapApiData<ApiProjectSummary | ApiProjectDetail>(data);
  if ("checklist" in updated || "overview" in updated) {
    return mapProjectDetail(updated as ApiProjectDetail);
  }
  return mapProjectSummary(updated as ApiProjectSummary);
}

export async function deleteProject(projectId: string): Promise<void> {
  await apiClient.delete(`/projects/${projectId}`);
}

export async function updateChecklistItem(
  projectId: string,
  itemId: string,
  payload: UpdateChecklistItemRequest,
): Promise<AgencyProject> {
  const { data } = await apiClient.patch(
    `/projects/${projectId}/checklist/${itemId}`,
    payload,
  );
  return mapProjectDetail(unwrapApiData<ApiProjectDetail>(data));
}

export async function addProjectNote(
  projectId: string,
  payload: CreateProjectNoteRequest,
): Promise<AgencyProject> {
  const { data } = await apiClient.post(
    `/projects/${projectId}/notes`,
    payload,
  );
  return mapProjectDetail(unwrapApiData<ApiProjectDetail>(data));
}

export async function addProjectAttachment(
  projectId: string,
  payload: CreateProjectAttachmentRequest,
): Promise<AgencyProject> {
  const { data } = await apiClient.post(
    `/projects/${projectId}/attachments`,
    payload,
  );
  return mapProjectDetail(unwrapApiData<ApiProjectDetail>(data));
}

export async function deleteProjectAttachment(
  projectId: string,
  attachmentId: string,
): Promise<void> {
  await apiClient.delete(`/projects/${projectId}/attachments/${attachmentId}`);
}

export async function convertEnquiryToProject(
  enquiryId: string,
): Promise<AgencyProject> {
  const { data } = await apiClient.post(`/enquiries/${enquiryId}/convert`);
  const created = unwrapApiData<ApiProjectSummary | ApiProjectDetail>(data);
  if ("checklist" in created || "overview" in created) {
    return mapProjectDetail(created as ApiProjectDetail);
  }
  return mapProjectSummary(created as ApiProjectSummary);
}
