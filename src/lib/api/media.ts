import { apiClient, unwrapApiData } from "@/lib/api/client";
import type { MediaAsset } from "@/types/api";

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
