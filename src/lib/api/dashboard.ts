import { apiClient, unwrapApiData } from "@/lib/api/client";
import {
  mapActivityItem,
  mapAnalyticsSummary,
  mapDashboardSummary,
} from "@/lib/mappers/agency";
import type {
  ApiActivityItem,
  ApiAnalyticsSummary,
  ApiDashboardSummary,
} from "@/types/api";
import { normalizeList } from "@/lib/api/utils";
import type {
  ActivityItem,
  AnalyticsData,
  DashboardStats,
} from "@/types/agency";

export async function getDashboardSummary(): Promise<DashboardStats> {
  const { data } = await apiClient.get("/dashboard/summary");
  return mapDashboardSummary(unwrapApiData<ApiDashboardSummary>(data));
}

export async function getDashboardActivity(): Promise<ActivityItem[]> {
  const { data } = await apiClient.get("/dashboard/activity");
  return normalizeList<ApiActivityItem>(data).map(mapActivityItem);
}

export async function getDashboardAnalytics(): Promise<AnalyticsData> {
  const { data } = await apiClient.get("/dashboard/analytics");
  return mapAnalyticsSummary(unwrapApiData<ApiAnalyticsSummary>(data));
}

/** @deprecated Use getDashboardSummary */
export async function getDashboardStats(): Promise<DashboardStats> {
  return getDashboardSummary();
}

/** @deprecated Use getDashboardActivity */
export async function getRecentActivity(): Promise<ActivityItem[]> {
  return getDashboardActivity();
}

/** @deprecated Use getDashboardAnalytics */
export async function getAnalytics(): Promise<AnalyticsData> {
  return getDashboardAnalytics();
}
