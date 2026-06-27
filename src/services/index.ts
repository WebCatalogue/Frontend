/**
 * Service layer — delegates to the centralized API client.
 * Marketing content still uses typed mock data where no backend API exists.
 */

export {
  apiClient,
  authApi,
  businessApi,
  websiteApi,
  tenantApi,
  pagesApi,
  mediaApi,
  builderApi,
  navigationApi,
  seoApi,
} from "@/lib/api";

export { getApiBaseUrl } from "@/lib/config";
