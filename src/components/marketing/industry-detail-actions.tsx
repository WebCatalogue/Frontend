"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { VisualiseSiteButton } from "@/features/visualise-wizard";
import { ROUTES } from "@/constants";

interface IndustryDetailActionsProps {
  slug: string;
}

export function IndustryDetailActions({ slug }: IndustryDetailActionsProps) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <VisualiseSiteButton size="lg" industryId={slug} />
      <Button variant="outline" size="lg" asChild>
        <Link href={ROUTES.enquiry}>Submit enquiry</Link>
      </Button>
      <Button variant="outline" size="lg" asChild>
        <Link href={ROUTES.contact}>Talk to us</Link>
      </Button>
    </div>
  );
}
