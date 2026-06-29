export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  tenant: {
    current: ["tenant", "current"] as const,
  },
  businesses: {
    all: ["businesses"] as const,
    detail: (id: string) => ["businesses", id] as const,
    websites: (businessId: string) =>
      ["businesses", businessId, "websites"] as const,
  },
  websites: {
    detail: (id: string) => ["websites", id] as const,
    config: (id: string) => ["websites", id, "config"] as const,
    pages: (id: string) => ["websites", id, "pages"] as const,
    navigation: (id: string) => ["websites", id, "navigation"] as const,
    seo: (id: string) => ["websites", id, "seo"] as const,
    published: (tenantSlug: string, websiteSlug: string) =>
      ["websites", "published", tenantSlug, websiteSlug] as const,
  },
  pages: {
    detail: (id: string) => ["pages", id] as const,
    sections: (id: string) => ["pages", id, "sections"] as const,
  },
  media: {
    all: ["media"] as const,
    detail: (id: string) => ["media", id] as const,
  },
  builder: {
    registry: ["builder", "components"] as const,
    component: (key: string) => ["builder", "components", key] as const,
    registries: ["builder", "registries"] as const,
  },
  businessData: {
    collection: (websiteId: string, collection: string) =>
      ["websites", websiteId, "data", collection] as const,
  },
  agency: {
    projects: {
      all: ["agency", "projects"] as const,
      detail: (id: string) => ["agency", "projects", id] as const,
    },
    clients: {
      all: ["agency", "clients"] as const,
      detail: (id: string) => ["agency", "clients", id] as const,
    },
    enquiries: ["agency", "enquiries"] as const,
    dashboard: {
      summary: ["agency", "dashboard", "summary"] as const,
      activity: ["agency", "dashboard", "activity"] as const,
      analytics: ["agency", "dashboard", "analytics"] as const,
    },
    calendar: ["agency", "calendar"] as const,
    notifications: ["agency", "notifications"] as const,
    settings: ["agency", "settings"] as const,
  },
} as const;
