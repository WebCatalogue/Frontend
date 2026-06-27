import { CtaBanner, PageHeader, PageSection } from "@/components/layout";
import { Reveal } from "@/components/playground/motion/primitives";
import { INDUSTRIES } from "@/mock/industries";

export const metadata = {
  title: "Industries — Aurevia",
  description:
    "Premium websites for cafés, restaurants, salons, clinics, gyms, hotels, and more.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Websites tailored to your industry."
        description="Every sector has unique needs. We bring deep understanding of your customers, competitors, and conversion patterns."
        breadcrumbs={[{ label: "Industries" }]}
      />

      <PageSection>
        <div className="space-y-6">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.id} delay={i * 0.04}>
              <article className="depth-panel overflow-hidden">
                <div className="grid lg:grid-cols-[14rem_1fr]">
                  <div
                    className="min-h-[8rem] lg:min-h-full"
                    style={{ background: industry.gradient }}
                    aria-hidden
                  />
                  <div className="p-7 sm:p-8 lg:p-10">
                    <h2 className="type-heading-lg text-foreground">
                      {industry.name}
                    </h2>
                    <p className="type-body-md text-foreground-muted mt-3">
                      {industry.description}
                    </p>
                    <p className="type-body-sm text-foreground-muted mt-4 border-t border-[var(--color-border-subtle)] pt-4">
                      {industry.helpText}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <CtaBanner
        title="Don't see your industry?"
        description="We work with all types of local businesses. Tell us about yours."
      />
    </>
  );
}
