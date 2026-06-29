import { apiClient, unwrapApiData } from "@/lib/api/client";
import { normalizeList } from "@/lib/api/utils";
import { mapNotification } from "@/lib/mappers/agency";
import type { ApiNotification } from "@/types/api";

export async function listNotifications() {
  const { data } = await apiClient.get("/notifications");
  return normalizeList<ApiNotification>(data).map(mapNotification);
}

export async function markNotificationRead(notificationId: string) {
  const { data } = await apiClient.patch(
    `/notifications/${notificationId}/read`,
  );
  return mapNotification(unwrapApiData<ApiNotification>(data));
}

export async function markAllNotificationsRead() {
  await apiClient.post("/notifications/read-all");
}
