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
