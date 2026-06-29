"use client";

import { useCallback, useState } from "react";
import { useToast } from "@/components/ui";
import { downloadPreviewPDF } from "./enquiry/download-preview-pdf";
import { getEnquiryFormValues } from "./enquiry/validate-enquiry-form";
import type { BuilderEnquiryConfig } from "./types";

export function usePreviewPdfDownload(config: BuilderEnquiryConfig | null) {
  const { addToast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!config || isDownloading) return;

    const form = document.getElementById(
      "builder-enquiry-form",
    ) as HTMLFormElement | null;
    const businessName = form
      ? getEnquiryFormValues(form).businessName
      : undefined;

    setIsDownloading(true);

    try {
      await downloadPreviewPDF(config, { businessName });
      addToast({
        title: "PDF downloaded",
        description: "Your website preview has been saved.",
        variant: "success",
      });
    } catch {
      addToast({
        title: "Download failed",
        description: "Unable to generate the PDF preview. Please try again.",
        variant: "error",
      });
    } finally {
      setIsDownloading(false);
    }
  }, [addToast, config, isDownloading]);

  const resetDownload = useCallback(() => {
    setIsDownloading(false);
  }, []);

  return {
    isDownloading,
    handleDownload,
    resetDownload,
  };
}
