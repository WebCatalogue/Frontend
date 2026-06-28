import type {
  ActivityItem,
  AnalyticsData,
  CalendarEvent,
  DashboardStats,
} from "@/types/agency";
import { MOCK_PROJECTS } from "./mock-projects";

export async function fetchDashboardStats(): Promise<DashboardStats> {
  await delay(100);
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  return {
    newEnquiries: MOCK_PROJECTS.filter((p) => p.status === "new-enquiry")
      .length,
    projectsInProgress: MOCK_PROJECTS.filter((p) =>
      ["our-todo", "planning", "design", "development", "review"].includes(
        p.status,
      ),
    ).length,
    completedThisMonth: MOCK_PROJECTS.filter(
      (p) => p.status === "completed" && new Date(p.updatedAt) >= monthStart,
    ).length,
    maintenanceClients: MOCK_PROJECTS.filter((p) => p.status === "maintenance")
      .length,
    revenuePlaceholder: "₹2,45,000",
  };
}

export async function fetchRecentActivity(): Promise<ActivityItem[]> {
  await delay(150);
  const items: ActivityItem[] = [];

  for (const project of MOCK_PROJECTS) {
    for (const event of project.timeline.slice(0, 2)) {
      items.push({
        id: event.id,
        message: event.message,
        contributor: event.contributor ?? "Garvit",
        projectId: project.id,
        projectName: project.businessName,
        timestamp: event.timestamp,
        type: event.type,
      });
    }
  }

  return items
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .slice(0, 8);
}

export async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  await delay(100);
  return [
    {
      id: "cal-001",
      title: "Bella Salon — kickoff call",
      date: "2026-06-29",
      time: "10:00",
      type: "meeting",
      projectId: "proj-003",
      clientName: "Anita Desai",
    },
    {
      id: "cal-002",
      title: "Spice Route — launch deadline",
      date: "2026-07-01",
      type: "deadline",
      projectId: "proj-004",
      clientName: "Vikram Patel",
    },
    {
      id: "cal-003",
      title: "Greenfield Clinic — client review",
      date: "2026-07-02",
      time: "15:00",
      type: "meeting",
      projectId: "proj-005",
      clientName: "Dr. Meera Nair",
    },
    {
      id: "cal-004",
      title: "Atelier Salon — maintenance check",
      date: "2026-07-05",
      type: "maintenance",
      projectId: "proj-007",
      clientName: "Sonia Kapoor",
    },
    {
      id: "cal-005",
      title: "Team sync — weekly planning",
      date: "2026-06-30",
      time: "11:00",
      type: "meeting",
    },
  ];
}

export async function fetchAnalytics(): Promise<AnalyticsData> {
  await delay(150);
  const industryMap = new Map<string, number>();
  const statusMap = new Map<string, number>();
  const sourceMap = new Map<string, number>();

  for (const p of MOCK_PROJECTS) {
    industryMap.set(p.industry, (industryMap.get(p.industry) ?? 0) + 1);
    statusMap.set(p.status, (statusMap.get(p.status) ?? 0) + 1);
    sourceMap.set(p.source, (sourceMap.get(p.source) ?? 0) + 1);
  }

  return {
    projectsByIndustry: Array.from(industryMap.entries()).map(
      ([industry, count]) => ({ industry, count }),
    ),
    projectsByStatus: Array.from(statusMap.entries()).map(
      ([status, count]) => ({
        status: status as AnalyticsData["projectsByStatus"][0]["status"],
        count,
      }),
    ),
    monthlyCompletions: [
      { month: "Mar", count: 1 },
      { month: "Apr", count: 2 },
      { month: "May", count: 1 },
      { month: "Jun", count: 2 },
    ],
    leadSources: Array.from(sourceMap.entries()).map(([source, count]) => ({
      source: source as AnalyticsData["leadSources"][0]["source"],
      count,
    })),
    averageDeliveryDays: 18,
    revenuePlaceholder: "₹2,45,000",
  };
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
