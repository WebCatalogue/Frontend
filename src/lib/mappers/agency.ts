import { pickField } from "@/lib/api/utils";
import type {
  ApiActivityItem,
  ApiAnalyticsSummary,
  ApiCalendarEvent,
  ApiChecklistItem,
  ApiClient,
  ApiDashboardSummary,
  ApiNotification,
  ApiProjectAttachment,
  ApiProjectDetail,
  ApiProjectDraft,
  ApiProjectNote,
  ApiProjectSummary,
  ApiSettings,
  ApiTimelineEvent,
} from "@/types/api";
import type {
  ActivityItem,
  AgencyProject,
  AnalyticsData,
  CalendarEvent,
  ChecklistItem,
  Client,
  Contributor,
  DashboardStats,
  KanbanColumn,
  ProjectAttachment,
  ProjectDraft,
  ProjectNote,
  ProjectPriority,
  ProjectSource,
  ProjectStatus,
  TimelineEvent,
  TimelineEventType,
} from "@/types/agency";

const CONTRIBUTORS: Contributor[] = ["Garvit", "Aarush"];

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

function mapContributor(value?: string | null): Contributor | undefined {
  if (!value) return undefined;
  const normalized = value.trim();
  const match = CONTRIBUTORS.find(
    (name) => name.toLowerCase() === normalized.toLowerCase(),
  );
  return match ?? (normalized as Contributor);
}

function mapProjectStatus(value?: string): ProjectStatus {
  return (value ?? "new-enquiry") as ProjectStatus;
}

function mapKanbanColumn(value?: string | null): KanbanColumn | undefined {
  if (!value) return undefined;
  return value as KanbanColumn;
}

function mapProjectSource(value?: string): ProjectSource {
  return (value ?? "website") as ProjectSource;
}

function mapProjectPriority(value?: string): ProjectPriority {
  return (value ?? "medium") as ProjectPriority;
}

function mapTimelineType(value?: string): TimelineEventType {
  return (value ?? "general") as TimelineEventType;
}

function mapChecklistItem(item: ApiChecklistItem): ChecklistItem {
  const record = asRecord(item);
  return {
    id: String(item.id),
    label: item.label,
    completed: Boolean(item.completed),
    completedBy: mapContributor(
      pickField<string>(record, "completedBy", "completed_by"),
    ),
    completedAt: pickField<string>(record, "completedAt", "completed_at"),
  };
}

function mapTimelineEvent(
  event: ApiTimelineEvent,
  projectId?: string,
): TimelineEvent {
  const record = asRecord(event);
  return {
    id: String(event.id),
    projectId:
      pickField<string>(record, "projectId", "project_id") ?? projectId ?? "",
    type: mapTimelineType(event.type),
    message: event.message,
    contributor: mapContributor(event.contributor),
    timestamp: event.timestamp,
  };
}

function mapProjectNote(note: ApiProjectNote, projectId?: string): ProjectNote {
  const record = asRecord(note);
  return {
    id: String(note.id),
    projectId:
      pickField<string>(record, "projectId", "project_id") ?? projectId ?? "",
    content: note.content,
    contributor: mapContributor(note.contributor) ?? "Garvit",
    createdAt:
      pickField<string>(record, "createdAt", "created_at") ??
      new Date().toISOString(),
  };
}

function mapAttachment(
  attachment: ApiProjectAttachment,
  projectId?: string,
): ProjectAttachment {
  const record = asRecord(attachment);
  const size = attachment.size;
  return {
    id: String(attachment.id),
    projectId:
      pickField<string>(record, "projectId", "project_id") ?? projectId ?? "",
    name: attachment.name,
    type: (attachment.type ?? "other") as ProjectAttachment["type"],
    size: typeof size === "number" ? `${size} B` : String(size ?? "—"),
    uploadedBy:
      mapContributor(pickField<string>(record, "uploadedBy", "uploaded_by")) ??
      "Garvit",
    uploadedAt:
      pickField<string>(record, "uploadedAt", "uploaded_at") ??
      new Date().toISOString(),
    url: attachment.url ?? undefined,
  };
}

function mapProjectDraft(
  draft?: ApiProjectDraft | null,
): ProjectDraft | undefined {
  if (!draft) return undefined;
  const record = asRecord(draft);
  const themeId = pickField<string>(record, "themeId", "theme_id");
  if (!themeId) return undefined;
  return {
    themeId,
    themeName: pickField<string>(record, "themeName", "theme_name") ?? themeId,
    paletteId:
      pickField<string>(record, "paletteId", "palette_id") ?? "default",
    industryId:
      pickField<string>(record, "industryId", "industry_id") ?? "general",
    sections: draft.sections ?? [],
    previewThumbnail: pickField<string>(
      record,
      "previewThumbnail",
      "preview_thumbnail",
    ),
  };
}

export function mapProjectSummary(
  summary: ApiProjectSummary,
  extras?: Partial<AgencyProject>,
): AgencyProject {
  const record = asRecord(summary);
  const id = String(summary.id);
  return {
    id,
    businessName:
      pickField<string>(record, "businessName", "business_name") ?? "Untitled",
    industry: summary.industry ?? "general",
    status: mapProjectStatus(summary.status),
    kanbanColumn: mapKanbanColumn(
      pickField<string>(record, "kanbanColumn", "kanban_column"),
    ),
    source: mapProjectSource(summary.source),
    priority: mapProjectPriority(summary.priority),
    submittedAt:
      pickField<string>(record, "submittedAt", "submitted_at") ??
      new Date().toISOString(),
    updatedAt:
      pickField<string>(record, "updatedAt", "updated_at") ??
      new Date().toISOString(),
    deadline: summary.deadline ?? undefined,
    estimatedBudget:
      pickField<string>(record, "estimatedBudget", "estimated_budget") ??
      undefined,
    contactName:
      pickField<string>(record, "contactName", "contact_name") ?? "—",
    contactPhone:
      pickField<string>(record, "contactPhone", "contact_phone") ?? "—",
    contactEmail:
      pickField<string>(record, "contactEmail", "contact_email") ?? "—",
    notes: summary.notes ?? undefined,
    clientId: pickField<string>(record, "clientId", "client_id") ?? undefined,
    checklist: extras?.checklist ?? [],
    timeline: extras?.timeline ?? [],
    projectNotes: extras?.projectNotes ?? [],
    attachments: extras?.attachments ?? [],
    draft: extras?.draft,
  };
}

export function mapProjectDetail(payload: ApiProjectDetail): AgencyProject {
  const overview =
    payload.overview ?? payload.project ?? (payload as ApiProjectSummary);
  const projectId = String(overview.id);
  const checklist = (payload.checklist ?? []).map(mapChecklistItem);
  const timeline = (payload.activities ?? payload.timeline ?? []).map((event) =>
    mapTimelineEvent(event, projectId),
  );
  const projectNotes = (payload.notes ?? payload.projectNotes ?? []).map(
    (note) => mapProjectNote(note, projectId),
  );
  const attachments = (payload.attachments ?? []).map((attachment) =>
    mapAttachment(attachment, projectId),
  );
  const draft = mapProjectDraft(
    payload.websiteDraft ?? payload.draft ?? payload.website,
  );

  return mapProjectSummary(overview, {
    checklist,
    timeline,
    projectNotes,
    attachments,
    draft,
  });
}

export function mapClient(client: ApiClient): Client {
  const record = asRecord(client);
  return {
    id: String(client.id),
    businessName:
      pickField<string>(record, "businessName", "business_name") ?? "—",
    ownerName: pickField<string>(record, "ownerName", "owner_name") ?? "—",
    phone: client.phone ?? "—",
    email: client.email ?? "—",
    industry: client.industry ?? "—",
    website: client.website ?? undefined,
    projectStatus: mapProjectStatus(
      pickField<string>(record, "projectStatus", "project_status"),
    ),
    currentPlan:
      pickField<string>(record, "currentPlan", "current_plan") ?? undefined,
    lastContact:
      pickField<string>(record, "lastContact", "last_contact") ??
      new Date().toISOString().slice(0, 10),
    notes: client.notes ?? undefined,
    projectsCount:
      pickField<number>(record, "projectsCount", "projects_count") ?? 0,
    createdAt:
      pickField<string>(record, "createdAt", "created_at") ??
      new Date().toISOString(),
  };
}

export function mapDashboardSummary(
  payload: ApiDashboardSummary,
): DashboardStats {
  const record = asRecord(payload);
  return {
    newEnquiries:
      pickField<number>(record, "newEnquiries", "new_enquiries") ?? 0,
    projectsInProgress:
      pickField<number>(record, "projectsInProgress", "projects_in_progress") ??
      0,
    completedThisMonth:
      pickField<number>(record, "completedThisMonth", "completed_this_month") ??
      0,
    maintenanceClients:
      pickField<number>(record, "maintenanceClients", "maintenance_clients") ??
      0,
    revenuePlaceholder:
      pickField<string>(
        record,
        "revenuePlaceholder",
        "revenue_placeholder",
        "revenue",
      ) ?? "—",
  };
}

export function mapActivityItem(item: ApiActivityItem): ActivityItem {
  const record = asRecord(item);
  return {
    id: String(item.id),
    message: item.message,
    contributor: mapContributor(item.contributor) ?? "Garvit",
    projectId:
      pickField<string>(record, "projectId", "project_id") ?? undefined,
    projectName:
      pickField<string>(record, "projectName", "project_name") ?? undefined,
    timestamp: item.timestamp,
    type: mapTimelineType(item.type),
  };
}

export function mapCalendarEvent(event: ApiCalendarEvent): CalendarEvent {
  const record = asRecord(event);
  return {
    id: String(event.id),
    title: event.title,
    date: event.date,
    time: event.time ?? undefined,
    type: (event.type ?? "meeting") as CalendarEvent["type"],
    projectId:
      pickField<string>(record, "projectId", "project_id") ?? undefined,
    clientName:
      pickField<string>(record, "clientName", "client_name") ?? undefined,
  };
}

export function mapAnalyticsSummary(
  payload: ApiAnalyticsSummary,
): AnalyticsData {
  const record = asRecord(payload);
  return {
    projectsByIndustry:
      payload.projectsByIndustry ?? payload.projects_by_industry ?? [],
    projectsByStatus: (
      payload.projectsByStatus ??
      payload.projects_by_status ??
      []
    ).map((item) => ({
      status: mapProjectStatus(item.status),
      count: item.count,
    })),
    monthlyCompletions:
      payload.monthlyCompletions ?? payload.monthly_completions ?? [],
    leadSources: (payload.leadSources ?? payload.lead_sources ?? []).map(
      (item) => ({
        source: mapProjectSource(item.source),
        count: item.count,
      }),
    ),
    averageDeliveryDays:
      pickField<number>(
        record,
        "averageDeliveryDays",
        "average_delivery_days",
      ) ?? 0,
    revenuePlaceholder:
      pickField<string>(
        record,
        "revenuePlaceholder",
        "revenue_placeholder",
        "revenue",
      ) ?? "—",
  };
}

export function mapNotification(notification: ApiNotification) {
  const record = asRecord(notification);
  return {
    id: String(notification.id),
    title: notification.title,
    message: notification.message,
    read: Boolean(notification.read),
    createdAt:
      pickField<string>(record, "createdAt", "created_at") ??
      new Date().toISOString(),
    type: notification.type,
  };
}

export function mapSettings(payload: ApiSettings) {
  return {
    team: payload.team ?? [],
    notifications: {
      email: payload.notifications?.email ?? false,
      whatsapp: payload.notifications?.whatsapp ?? false,
      newEnquiries:
        payload.notifications?.newEnquiries ??
        payload.notifications?.new_enquiries ??
        false,
    },
  };
}

export function getKanbanColumnForStatus(
  status: ProjectStatus,
): KanbanColumn | undefined {
  const map: Partial<Record<ProjectStatus, KanbanColumn>> = {
    planning: "planning",
    design: "design",
    development: "development",
    review: "review",
    "ready-to-publish": "publishing",
    maintenance: "maintenance",
    "our-todo": "planning",
  };
  return map[status];
}
