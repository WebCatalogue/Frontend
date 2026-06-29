import { apiClient } from "@/lib/api/client";
import { normalizeList } from "@/lib/api/utils";
import { mapCalendarEvent } from "@/lib/mappers/agency";
import type { ApiCalendarEvent } from "@/types/api";
import type { CalendarEvent } from "@/types/agency";

export async function listCalendarEvents(): Promise<CalendarEvent[]> {
  const { data } = await apiClient.get("/calendar/events");
  return normalizeList<ApiCalendarEvent>(data).map(mapCalendarEvent);
}

/** @deprecated Use listCalendarEvents */
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  return listCalendarEvents();
}
