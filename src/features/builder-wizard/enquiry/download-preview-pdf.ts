import { getIndustryBySlug } from "@/mock/industries";
import type { BuilderEnquiryConfig } from "../types";
import { buildPreviewPdfFilename, downloadPDF } from "./download-pdf";
import { capturePreview } from "./capture-preview";
import { generatePreviewPDF } from "./generate-preview-pdf";

export interface DownloadPreviewPdfOptions {
  businessName?: string;
}

function resolveBusinessName(
  config: BuilderEnquiryConfig,
  businessName?: string,
): string {
  const trimmed = businessName?.trim();
  if (trimmed) return trimmed;
  return getIndustryBySlug(config.industryId)?.name ?? "Website Preview";
}

export async function downloadPreviewPDF(
  config: BuilderEnquiryConfig,
  options: DownloadPreviewPdfOptions = {},
): Promise<void> {
  const canvas = await capturePreview();
  const blob = await generatePreviewPDF(
    {
      businessName: resolveBusinessName(config, options.businessName),
      industryId: config.industryId,
      styleId: config.styleId,
      enabledSections: config.enabledSections,
      selections: config.selections,
      generatedDate: new Date().toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    },
    canvas,
  );

  downloadPDF(blob, buildPreviewPdfFilename(config.industryId));
}
