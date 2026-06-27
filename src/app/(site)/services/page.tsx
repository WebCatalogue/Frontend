import { CtaBanner, PageHeader, PageSection } from "@/components/layout";
import { Reveal } from "@/components/playground/motion/primitives";
import { SERVICES } from "@/mock/services";

export const metadata = {
  title: "Services — Aurevia",
  description:
    "Business websites, landing pages, redesigns, branding, SEO, and maintenance for local businesses.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything your business needs to thrive online."
        description="From first website to full digital transformation — crafted with the same care at every level."
        breadcrumbs={[{ label: "Services" }]}
      />

      <PageSection>
        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.05}>
              <article className="depth-panel h-full p-8">
                <h2 className="type-heading-md text-foreground">
                  {service.title}
                </h2>
                <p className="type-body-md text-foreground-muted mt-3">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2 border-t border-[var(--color-border-subtle)] pt-6">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="type-body-sm text-foreground-muted flex items-center gap-2"
                    >
                      <span className="bg-accent size-1 shrink-0 rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <CtaBanner
        title="Not sure which service fits?"
        description="Book a free consultation and we'll recommend the right approach for your business."
      />
    </>
  );
}
