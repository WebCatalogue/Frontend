/** Backend API envelope and domain types */

export interface ApiSuccessEnvelope<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorDetail {
  keyword?: string;
  instancePath?: string;
  message?: string;
}

export interface ApiErrorBody {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
  };
}

export type ApiEnvelope<T> = ApiSuccessEnvelope<T> | ApiErrorBody;

export interface PaginatedList<T> {
  items: T[];
  total?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
}

export type UserRole = "SUPER_ADMIN" | "BUSINESS_OWNER" | "ADMIN" | string;

export type WebsiteStatus =
  | "draft"
  | "published"
  | "archived"
  | "active"
  | string;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
  tokenType?: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
  role?: UserRole | null;
  tenantId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug?: string | null;
  plan?: string | null;
  status?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Business {
  id: string;
  name: string;
  slug?: string | null;
  industry?: string | null;
  description?: string | null;
  status?: string | null;
  tenantId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Website {
  id: string;
  name: string;
  slug?: string | null;
  domain?: string | null;
  status?: WebsiteStatus | null;
  businessId?: string | null;
  themeId?: string | null;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface WebsiteConfig {
  id?: string;
  websiteId: string;
  themeId?: string | null;
  theme?: Record<string, unknown> | null;
  seo?: Record<string, unknown> | null;
  settings?: Record<string, unknown> | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Page {
  id: string;
  websiteId?: string;
  title: string;
  slug?: string | null;
  path?: string | null;
  status?: string | null;
  sortOrder?: number | null;
  content?: Record<string, unknown> | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ComponentSettingsSchemaField {
  type?: string;
  title?: string;
  description?: string;
  default?: unknown;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  format?: string;
  items?: ComponentSettingsSchemaField;
  properties?: Record<string, ComponentSettingsSchemaField>;
  required?: string[];
}

export interface BuilderComponentDefinition {
  key: string;
  category: string;
  displayName?: string;
  description?: string;
  variants?: string[];
  supportedVariants?: string[];
  schemaVersion?: string;
  defaultSettings?: Record<string, unknown>;
  settingsSchema?: Record<string, ComponentSettingsSchemaField>;
  /** Compatible business-data collection keys */
  compatibleCollections?: string[];
}

export interface RegistryAsset {
  id: string;
  kind: string;
  name: string;
  description?: string;
  version?: string;
  metadata?: Record<string, unknown>;
}

export interface BusinessDataRecord {
  id: string;
  websiteId?: string;
  sortOrder?: number;
  version?: number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export type BusinessDataCollection =
  | "menu"
  | "menu-categories"
  | "services"
  | "memberships"
  | "pricing"
  | "testimonials"
  | "gallery"
  | "team"
  | "faqs"
  | "events"
  | "opening-hours";

export interface Section {
  id: string;
  pageId: string;
  componentKey: string;
  variant?: string | null;
  settings?: Record<string, unknown> | null;
  sortOrder?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface NavigationItem {
  id?: string;
  label: string;
  href: string;
  sortOrder?: number;
  children?: NavigationItem[];
}

export interface WebsiteNavigation {
  websiteId: string;
  items: NavigationItem[];
}

export interface WebsiteSeo {
  websiteId?: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  keywords?: string[] | null;
  robots?: string | null;
}

export interface PublishedPage {
  id: string;
  title: string;
  slug: string;
  path?: string;
  sections: PublishedSection[];
}

export interface PublishedSection {
  id: string;
  componentKey: string;
  variant?: string | null;
  settings?: Record<string, unknown> | null;
  sortOrder?: number | null;
}

export interface PublishedWebsite {
  id: string;
  name: string;
  slug: string;
  status: WebsiteStatus;
  themeId?: string | null;
  navigation?: NavigationItem[];
  seo?: WebsiteSeo | null;
  pages: PublishedPage[];
}

export interface MediaAsset {
  id: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  size?: number | null;
  alt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface CreateBusinessRequest {
  name: string;
  industry?: string;
  description?: string;
}

export interface UpdateBusinessRequest {
  name?: string;
  industry?: string;
  description?: string;
  status?: string;
}

export interface CreateWebsiteRequest {
  name: string;
  slug?: string;
  domain?: string;
  businessId?: string;
}

export interface UpdateWebsiteRequest {
  name?: string;
  slug?: string;
  domain?: string;
  status?: WebsiteStatus;
  themeId?: string;
}

export interface CreatePageRequest {
  title: string;
  slug?: string;
  path?: string;
}

export interface UpdatePageRequest {
  title?: string;
  slug?: string;
  path?: string;
  status?: string;
}

export interface CreateSectionRequest {
  componentKey: string;
  variant?: string;
  settings?: Record<string, unknown>;
  sortOrder?: number;
}

export interface UpdateSectionRequest {
  componentKey?: string;
  variant?: string;
  settings?: Record<string, unknown>;
  sortOrder?: number;
}

export interface UpdateWebsiteConfigRequest {
  themeId?: string;
  theme?: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

// ── Agency / CRM API types ────────────────────────────────

export interface ApiProjectSummary {
  id: string;
  businessName?: string;
  business_name?: string;
  industry?: string;
  status?: string;
  kanbanColumn?: string;
  kanban_column?: string;
  source?: string;
  priority?: string;
  submittedAt?: string;
  submitted_at?: string;
  updatedAt?: string;
  updated_at?: string;
  deadline?: string | null;
  estimatedBudget?: string | null;
  estimated_budget?: string | null;
  contactName?: string;
  contact_name?: string;
  contactPhone?: string;
  contact_phone?: string;
  contactEmail?: string;
  contact_email?: string;
  notes?: string | null;
  clientId?: string | null;
  client_id?: string | null;
}

export interface ApiChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  completedBy?: string | null;
  completed_by?: string | null;
  completedAt?: string | null;
  completed_at?: string | null;
}

export interface ApiTimelineEvent {
  id: string;
  projectId?: string;
  project_id?: string;
  type?: string;
  message: string;
  contributor?: string | null;
  timestamp: string;
}

export interface ApiProjectNote {
  id: string;
  projectId?: string;
  project_id?: string;
  content: string;
  contributor?: string;
  createdAt?: string;
  created_at?: string;
}

export interface ApiProjectAttachment {
  id: string;
  projectId?: string;
  project_id?: string;
  name: string;
  type?: string;
  size?: string | number;
  uploadedBy?: string;
  uploaded_by?: string;
  uploadedAt?: string;
  uploaded_at?: string;
  url?: string | null;
}

export interface ApiProjectDraft {
  themeId?: string;
  theme_id?: string;
  themeName?: string;
  theme_name?: string;
  paletteId?: string;
  palette_id?: string;
  industryId?: string;
  industry_id?: string;
  sections?: string[];
  previewThumbnail?: string;
  preview_thumbnail?: string;
}

export interface ApiProjectDetail {
  overview?: ApiProjectSummary;
  project?: ApiProjectSummary;
  checklist?: ApiChecklistItem[];
  activities?: ApiTimelineEvent[];
  timeline?: ApiTimelineEvent[];
  notes?: ApiProjectNote[];
  projectNotes?: ApiProjectNote[];
  attachments?: ApiProjectAttachment[];
  websiteDraft?: ApiProjectDraft;
  draft?: ApiProjectDraft;
  website?: ApiProjectDraft;
}

export interface ApiClient {
  id: string;
  businessName?: string;
  business_name?: string;
  ownerName?: string;
  owner_name?: string;
  phone?: string;
  email?: string;
  industry?: string;
  website?: string | null;
  projectStatus?: string;
  project_status?: string;
  currentPlan?: string | null;
  current_plan?: string | null;
  lastContact?: string;
  last_contact?: string;
  notes?: string | null;
  projectsCount?: number;
  projects_count?: number;
  createdAt?: string;
  created_at?: string;
}

export interface ApiDashboardSummary {
  newEnquiries?: number;
  new_enquiries?: number;
  projectsInProgress?: number;
  projects_in_progress?: number;
  completedThisMonth?: number;
  completed_this_month?: number;
  maintenanceClients?: number;
  maintenance_clients?: number;
  revenue?: string;
  revenuePlaceholder?: string;
  revenue_placeholder?: string;
}

export interface ApiActivityItem {
  id: string;
  message: string;
  contributor?: string;
  projectId?: string;
  project_id?: string;
  projectName?: string;
  project_name?: string;
  timestamp: string;
  type?: string;
}

export interface ApiCalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string | null;
  type?: string;
  projectId?: string;
  project_id?: string;
  clientName?: string;
  client_name?: string;
}

export interface ApiAnalyticsSummary {
  projectsByIndustry?: { industry: string; count: number }[];
  projects_by_industry?: { industry: string; count: number }[];
  projectsByStatus?: { status: string; count: number }[];
  projects_by_status?: { status: string; count: number }[];
  monthlyCompletions?: { month: string; count: number }[];
  monthly_completions?: { month: string; count: number }[];
  leadSources?: { source: string; count: number }[];
  lead_sources?: { source: string; count: number }[];
  averageDeliveryDays?: number;
  average_delivery_days?: number;
  revenue?: string;
  revenuePlaceholder?: string;
  revenue_placeholder?: string;
}

export interface ApiNotification {
  id: string;
  title: string;
  message?: string;
  read?: boolean;
  createdAt?: string;
  created_at?: string;
  type?: string;
}

export interface ApiSettings {
  team?: { name: string; role: string; email: string }[];
  notifications?: {
    email?: boolean;
    whatsapp?: boolean;
    newEnquiries?: boolean;
    new_enquiries?: boolean;
  };
}

export interface CreateProjectRequest {
  businessName: string;
  industry: string;
  source: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  notes?: string;
  estimatedBudget?: string;
  deadline?: string;
  priority?: string;
  clientId?: string;
}

export interface UpdateProjectRequest {
  status?: string;
  kanbanColumn?: string;
  priority?: string;
  notes?: string;
  estimatedBudget?: string;
  deadline?: string;
}

export interface CreateEnquiryRequest extends CreateProjectRequest {
  themeId?: string;
  themeName?: string;
}

export interface CreateProjectNoteRequest {
  content: string;
  contributor?: string;
}

export interface UpdateChecklistItemRequest {
  completed: boolean;
  contributor?: string;
}

export interface CreateProjectAttachmentRequest {
  mediaId: string;
  type?: string;
  name?: string;
}
