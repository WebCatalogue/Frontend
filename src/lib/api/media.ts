import { apiClient, unwrapApiData } from "@/lib/api/client";
import type { MediaAsset, PaginatedList } from "@/types/api";

function normalizeMediaList(payload: unknown): MediaAsset[] {
  const data = unwrapApiData<MediaAsset[] | PaginatedList<MediaAsset>>(payload);
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && "items" in data) {
    return data.items ?? [];
  }
  return [];
}

export async function listMedia(params?: {
  search?: string;
  folder?: string;
}): Promise<MediaAsset[]> {
  const { data } = await apiClient.get("/media", { params });
  return normalizeMediaList(data);
}

export async function getMedia(mediaId: string): Promise<MediaAsset> {
  const { data } = await apiClient.get(`/media/${mediaId}`);
  return unwrapApiData<MediaAsset>(data);
}

export async function uploadMedia(formData: FormData): Promise<MediaAsset> {
  const { data } = await apiClient.post("/media", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return unwrapApiData<MediaAsset>(data);
}

export async function updateMedia(
  mediaId: string,
  payload: { alt?: string; filename?: string },
): Promise<MediaAsset> {
  const { data } = await apiClient.patch(`/media/${mediaId}`, payload);
  return unwrapApiData<MediaAsset>(data);
}

export async function deleteMedia(mediaId: string): Promise<void> {
  await apiClient.delete(`/media/${mediaId}`);
}
