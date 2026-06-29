import { submitEnquiry as submitEnquiryApi } from "@/lib/api/enquiries";
import { getTheme } from "@/features/platform/themes";
import type { CreateEnquiryRequest } from "@/types/api";
import type { BuilderEnquiryConfig } from "../types";

export interface SubmitEnquiryInput {
  values: {
    businessName: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
  };
  config: BuilderEnquiryConfig;
}

function buildEnquiryNotes(config: BuilderEnquiryConfig): string {
  return JSON.stringify(
    {
      builderConfig: config,
      summary: {
        industry: config.industryId,
        style: config.styleId,
        theme: config.themeId,
        palette: config.paletteId,
        sections: config.enabledSections,
        templates: config.selections,
      },
    },
    null,
    2,
  );
}

export async function submitEnquiry({ values, config }: SubmitEnquiryInput) {
  const theme = getTheme(config.themeId);
  const payload: CreateEnquiryRequest = {
    businessName: values.businessName,
    industry: config.industryId,
    source: "website",
    contactName: values.contactName,
    contactPhone: values.contactPhone,
    contactEmail: values.contactEmail,
    notes: buildEnquiryNotes(config),
    priority: "medium",
    themeId: config.themeId,
    themeName: theme.name,
  };

  return submitEnquiryApi(payload);
}
