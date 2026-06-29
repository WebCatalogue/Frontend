"use client";

import { VisualiseSiteButton } from "@/features/visualise-wizard";

interface IndustryVisualiseCtaProps {
  industrySlug: string;
  className?: string;
}

export function IndustryVisualiseCta({
  industrySlug,
  className,
}: IndustryVisualiseCtaProps) {
  return (
    <VisualiseSiteButton
      industryId={industrySlug}
      size="lg"
      className={className}
    />
  );
}
