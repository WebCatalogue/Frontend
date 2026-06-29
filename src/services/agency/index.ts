export {
  createDefaultChecklist,
  DEFAULT_CHECKLIST_LABELS,
} from "@/constants/checklist";
export { getKanbanColumnForStatus } from "@/lib/mappers/agency";
export * as projectsApi from "@/lib/api/projects";
export * as clientsApi from "@/lib/api/clients";
export * as enquiriesApi from "@/lib/api/enquiries";
export * as dashboardApi from "@/lib/api/dashboard";
export * as calendarApi from "@/lib/api/calendar";

/** @deprecated Use dashboardApi.getDashboardSummary via useDashboardSummary */
export { getDashboardSummary as fetchDashboardStats } from "@/lib/api/dashboard";
/** @deprecated Use dashboardApi.getDashboardActivity via useDashboardActivity */
export { getDashboardActivity as fetchRecentActivity } from "@/lib/api/dashboard";
/** @deprecated Use calendarApi.listCalendarEvents via useCalendarEvents */
export { listCalendarEvents as fetchCalendarEvents } from "@/lib/api/calendar";
/** @deprecated Use dashboardApi.getDashboardAnalytics via useDashboardAnalytics */
export { getDashboardAnalytics as fetchAnalytics } from "@/lib/api/dashboard";
/** @deprecated Use projectsApi.listProjects via useProjects */
export { listProjects as fetchProjects } from "@/lib/api/projects";
/** @deprecated Use clientsApi.listClients via useClients */
export { listClients as fetchClients } from "@/lib/api/clients";
