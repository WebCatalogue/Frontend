import Link from "next/link";
import { PageHeader } from "@/components/layout";
import {
  VisualiseHeroVisual,
  VisualiseSiteButton,
} from "@/features/visualise-wizard";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants";

export default function VisualisePage() {
  return (
    <PageHeader
      eyebrow="Visualise"
      title="See your website before we build it."
      description="Pick your industry, choose a theme, and preview sections — no account needed. When you're happy, submit an enquiry and our team takes it from there."
      breadcrumbs={[{ label: "Visualise Your Site" }]}
      media={<VisualiseHeroVisual />}
    >
      <div className="visualise-cta-panel depth-panel mt-8 space-y-6 p-6 sm:mt-10 sm:p-8">
        <p className="type-body-lg text-foreground-muted max-w-xl">
          Our guided wizard walks you through industry, style, and layout
          choices with a live preview at every step.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <VisualiseSiteButton size="lg" />
          <Button variant="outline" size="lg" asChild>
            <Link href={ROUTES.enquiry}>Submit enquiry directly</Link>
          </Button>
        </div>
        <p className="type-body-sm text-foreground-muted">
          Already visualised?{" "}
          <Link href={ROUTES.enquiry} className="text-accent hover:underline">
            Tell us about your project
          </Link>
        </p>
      </div>
    </PageHeader>
  );
}
