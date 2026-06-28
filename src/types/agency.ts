/** Agency Operating System — domain types (mock-first, API-ready) */

export type Contributor = "Garvit" | "Aarush";

export type ProjectSource =
  | "website"
  | "whatsapp"
  | "instagram"
  | "referral"
  | "walk-in"
  | "returning-client"
  | "phone-call";

export type ProjectPriority = "low" | "medium" | "high" | "urgent";

export type ProjectStatus =
  | "new-enquiry"
  | "our-todo"
  | "planning"
  | "design"
  | "development"
  | "review"
  | "waiting-for-client"
  | "ready-to-publish"
  | "completed"
  | "maintenance"
  | "archived";

export type KanbanColumn =
  | "planning"
  | "design"
  | "development"
  | "review"
  | "publishing"
  | "maintenance";

export type AttachmentType =
  | "logo"
  | "image"
  | "pdf"
  | "brand-guide"
  | "invoice"
  | "contract"
  | "other";

export type TimelineEventType =
  | "checklist"
  | "status"
  | "note"
  | "file"
  | "client"
  | "preview"
  | "integration"
  | "general";

export interface Client {
  id: string;
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  industry: string;
  website?: string;
  projectStatus: ProjectStatus;
  currentPlan?: string;
  lastContact: string;
  notes?: string;
  projectsCount: number;
  createdAt: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  completedBy?: Contributor;
  completedAt?: string;
}

export interface TimelineEvent {
  id: string;
  projectId: string;
  type: TimelineEventType;
  message: string;
  contributor?: Contributor;
  timestamp: string;
}

export interface ProjectNote {
  id: string;
  projectId: string;
  content: string;
  contributor: Contributor;
  createdAt: string;
}

export interface ProjectAttachment {
  id: string;
  projectId: string;
  name: string;
  type: AttachmentType;
  size: string;
  uploadedBy: Contributor;
  uploadedAt: string;
  url?: string;
}

export interface ProjectDraft {
  themeId: string;
  themeName: string;
  paletteId: string;
  industryId: string;
  sections: string[];
  previewThumbnail?: string;
}

export interface AgencyProject {
  id: string;
  businessName: string;
  industry: string;
  status: ProjectStatus;
  kanbanColumn?: KanbanColumn;
  source: ProjectSource;
  priority: ProjectPriority;
  submittedAt: string;
  updatedAt: string;
  deadline?: string;
  estimatedBudget?: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  notes?: string;
  clientId?: string;
  draft?: ProjectDraft;
  checklist: ChecklistItem[];
  timeline: TimelineEvent[];
  projectNotes: ProjectNote[];
  attachments: ProjectAttachment[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: "meeting" | "deadline" | "launch" | "maintenance" | "reminder";
  projectId?: string;
  clientName?: string;
}

export interface ActivityItem {
  id: string;
  message: string;
  contributor: Contributor;
  projectId?: string;
  projectName?: string;
  timestamp: string;
  type: TimelineEventType;
}

export interface DashboardStats {
  newEnquiries: number;
  projectsInProgress: number;
  completedThisMonth: number;
  maintenanceClients: number;
  revenuePlaceholder: string;
}

export interface AnalyticsData {
  projectsByIndustry: { industry: string; count: number }[];
  projectsByStatus: { status: ProjectStatus; count: number }[];
  monthlyCompletions: { month: string; count: number }[];
  leadSources: { source: ProjectSource; count: number }[];
  averageDeliveryDays: number;
  revenuePlaceholder: string;
}

export interface CreateProjectInput {
  businessName: string;
  industry: string;
  source: ProjectSource;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  notes?: string;
  estimatedBudget?: string;
  deadline?: string;
  priority?: ProjectPriority;
}
