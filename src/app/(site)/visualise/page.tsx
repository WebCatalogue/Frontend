import Link from "next/link";
import { PageHeader, PageSection } from "@/components/layout";
import { VisualiseSiteButton } from "@/features/visualise-wizard";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants";

export default function VisualisePage() {
  return (
    <>
      <PageHeader
        eyebrow="Visualise"
        title="See your website before we build it."
        description="Pick your industry, choose a theme, and preview sections — no account needed. When you're happy, submit an enquiry and our team takes it from there."
        breadcrumbs={[{ label: "Visualise Your Site" }]}
      />

      <PageSection>
        <div className="depth-panel mx-auto max-w-2xl space-y-8 p-8 text-center sm:p-12">
          <p className="type-body-lg text-foreground-muted">
            Our guided wizard walks you through industry, style, and layout
            choices with a live preview at every step.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
      </PageSection>
    </>
  );
}
