export const APP_NAME = "BhaiKISite";
export const APP_TAGLINE = "Premium websites, built effortlessly.";
export const APP_DESCRIPTION =
  "Allow businesses to create premium websites by combining reusable components, themes and templates.";

export const COMPANY_EMAIL = "hello@bhaikisite.com";
export const COMPANY_PHONE = "+91 98765 43210";
export const COMPANY_WHATSAPP = "919876543210";
export const COMPANY_ADDRESS = "Bengaluru, India";

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/bhaikisite",
  instagram: "https://instagram.com/bhaikisite",
  linkedin: "https://linkedin.com/company/bhaikisite",
} as const;

export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  industries: "/industries",
  portfolio: "/portfolio",
  pricing: "/pricing",
  contact: "/contact",
  blog: "/blog",
  privacy: "/privacy",
  terms: "/terms",
  login: "/login",
  visualise: "/visualise",
  enquiry: "/enquiry",
  templates: "/templates",
  app: "/app",
  appEnquiries: "/app/enquiries",
  appTodo: "/app/todo",
  appProjects: "/app/projects",
  appWaiting: "/app/waiting",
  appCompleted: "/app/completed",
  appMaintenance: "/app/maintenance",
  appClients: "/app/clients",
  appCalendar: "/app/calendar",
  appActivity: "/app/activity",
  appTemplates: "/app/templates",
  appAssets: "/app/assets",
  appAnalytics: "/app/analytics",
  appSettings: "/app/settings",
} as const;

/** Local storage / session keys */
export const STORAGE_KEYS = {
  accessToken: "bks_access_token",
  refreshToken: "bks_refresh_token",
  tokenExpiry: "bks_token_expiry",
  sessionCookie: "bks_has_session",
  mockSession: "bhaikisite-session",
  cookieConsent: "bks-cookie-consent",
} as const;
