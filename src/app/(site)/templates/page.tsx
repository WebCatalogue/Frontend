import Link from "next/link";
import { PageHeader, PageSection } from "@/components/layout";
import { IndustryTemplateGrid } from "@/components/marketing/industry-template-grid";
import { TemplateCategoryFilter } from "@/components/marketing/template-category-filter";
import { Reveal } from "@/components/playground/motion/primitives";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants";
import { INDUSTRIES } from "@/mock/industries";
import { getTemplatesForIndustry } from "@/mock/industry-templates";

export const metadata = {
  title: "Templates — BhaiKISite",
  description:
    "Browse website templates for cafés, salons, gyms, clinics, and more — then visualise or submit an enquiry.",
};

export default function PublicTemplatesPage() {
  const featured = INDUSTRIES.slice(0, 6);

  return (
    <>
      <PageHeader
        eyebrow="Templates"
        title="Starting points for every industry."
        description="Explore layouts our team uses as foundations. Pick one, visualise your brand on it, then send us an enquiry."
        breadcrumbs={[{ label: "Templates" }]}
      />

      <PageSection>
        <TemplateCategoryFilter
          categories={featured.map((industry) => ({
            slug: industry.slug,
            name: industry.name,
          }))}
        />

        <div className="space-y-16">
          {featured.map((industry, i) => {
            const templates = getTemplatesForIndustry(industry.slug).slice(
              0,
              3,
            );
            return (
              <Reveal key={industry.id} delay={i * 0.05}>
                <section
                  id={`templates-${industry.slug}`}
                  className="scroll-mt-32"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="type-heading-md font-medium">
                        {industry.name}
                      </h2>
                      <p className="type-body-sm text-foreground-muted mt-1 max-w-xl">
                        {industry.tagline}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/industries/${industry.slug}`}>
                        View industry
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-6">
                    <IndustryTemplateGrid
                      templates={templates}
                      industrySlug={industry.slug}
                    />
                  </div>
                </section>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Button variant="primary" size="lg" asChild>
            <Link href={ROUTES.visualise}>Visualise your site</Link>
          </Button>
        </div>
      </PageSection>
    </>
  );
}
