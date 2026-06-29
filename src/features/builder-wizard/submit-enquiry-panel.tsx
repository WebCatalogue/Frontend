"use client";

import { Input } from "@/components/ui";
import type { BuilderEnquiryConfig } from "./types";
import type { EnquiryFormErrors } from "./enquiry/validate-enquiry-form";

interface SubmitEnquiryPanelProps {
  config: BuilderEnquiryConfig;
  errors?: EnquiryFormErrors | null;
  disabled?: boolean;
}

export function SubmitEnquiryPanel({
  config,
  errors,
  disabled = false,
}: SubmitEnquiryPanelProps) {
  return (
    <div className="builder-enquiry-panel depth-panel mt-6 space-y-4 p-5 sm:p-6">
      <div>
        <p className="type-heading-sm text-foreground font-medium">
          Ready to build this with our team?
        </p>
        <p className="type-body-sm text-foreground-muted mt-1">
          Share your details and we&apos;ll send your selected configuration
          with the enquiry.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Business name"
          name="businessName"
          required
          disabled={disabled}
          error={errors?.businessName}
        />
        <Input
          label="Your name"
          name="contactName"
          required
          disabled={disabled}
          error={errors?.contactName}
        />
        <Input
          label="Email"
          name="contactEmail"
          type="email"
          required
          disabled={disabled}
          error={errors?.contactEmail}
          className="sm:col-span-2"
        />
        <Input
          label="Phone"
          name="contactPhone"
          type="tel"
          required
          disabled={disabled}
          error={errors?.contactPhone}
          className="sm:col-span-2"
        />
      </div>
      <p className="type-body-sm text-foreground-muted">
        Submitting sends your industry, style, sections, and template choices
        {config.industryId ? ` for ${config.industryId}` : ""}.
      </p>
    </div>
  );
}
