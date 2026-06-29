import type {
  ApiCreateEnquiryRequest,
  ApiEnquirySource,
  CreateEnquiryRequest,
} from "@/types/api";
import type { ProjectSource } from "@/types/agency";

const API_ENQUIRY_SOURCES: ApiEnquirySource[] = [
  "WEBSITE",
  "REFERRAL",
  "SOCIAL",
  "EMAIL",
  "PHONE",
  "OTHER",
];

const FRONTEND_SOURCE_TO_API: Record<ProjectSource, ApiEnquirySource> = {
  website: "WEBSITE",
  whatsapp: "SOCIAL",
  instagram: "SOCIAL",
  referral: "REFERRAL",
  "walk-in": "OTHER",
  "returning-client": "REFERRAL",
  "phone-call": "PHONE",
};

function mapEnquirySourceToApi(source: string): ApiEnquirySource {
  const upper = source.toUpperCase();
  if (API_ENQUIRY_SOURCES.includes(upper as ApiEnquirySource)) {
    return upper as ApiEnquirySource;
  }

  return FRONTEND_SOURCE_TO_API[source as ProjectSource] ?? "WEBSITE";
}

function omitUndefined<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, field]) => field !== undefined),
  ) as T;
}

export function mapCreateEnquiryRequest(
  input: CreateEnquiryRequest,
): ApiCreateEnquiryRequest {
  return omitUndefined({
    name: input.businessName.trim(),
    source: mapEnquirySourceToApi(input.source),
    industry: input.industry?.trim() || undefined,
    contactName: input.contactName?.trim() || undefined,
    contactPhone: input.contactPhone?.trim() || undefined,
    contactEmail: input.contactEmail?.trim() || undefined,
    notes: input.notes?.trim() || undefined,
    estimatedBudget: input.estimatedBudget?.trim() || undefined,
    deadline: input.deadline?.trim() || undefined,
    priority: input.priority?.trim()
      ? input.priority.trim().toUpperCase()
      : undefined,
    themeId: input.themeId?.trim() || undefined,
    themeName: input.themeName?.trim() || undefined,
  });
}
