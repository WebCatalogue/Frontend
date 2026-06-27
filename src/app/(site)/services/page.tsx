import { CtaBanner, PageHeader, PageSection } from "@/components/layout";
import { DemoImage } from "@/components/marketing/demo-image";
import { Reveal } from "@/components/playground/motion/primitives";
import { SERVICES } from "@/mock/services";
import { demoImage } from "@/lib/demo-images";

export const metadata = {
  title: "Services — BhaiKISite",
  description:
    "Website design, development, builder access, templates, SEO, performance, hosting guidance, and maintenance.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything you need to look sharp online."
        description="Whether you want us to build it, or you want to compose it yourself — every service is designed for business owners, not developers."
        breadcrumbs={[{ label: "Services" }]}
      />

      <PageSection>
        <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
          <div className="space-y-8">
            {SERVICES.map((service, i) => (
              <Reveal key={service.id} delay={i * 0.04}>
                <article className="depth-panel p-8 sm:p-10" id={service.slug}>
                  <p className="type-label text-accent mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="type-heading-md text-foreground">
                    {service.title}
                  </h2>
                  <p className="type-body-md text-foreground-muted mt-3">
                    {service.description}
                  </p>
                  <p className="type-body-sm text-foreground-muted mt-4 border-l-2 border-[var(--color-border-subtle)] pl-4">
                    {service.longDescription}
                  </p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
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
                  <p className="type-body-sm text-foreground-subtle mt-6">
                    Ideal for:{" "}
                    <span className="text-foreground-muted">
                      {service.idealFor}
                    </span>
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="depth-panel sticky top-24 overflow-hidden lg:block">
              <div className="relative aspect-[4/3]">
                <DemoImage
                  src={demoImage("laptop", 800)}
                  alt="BhaiKISite services"
                />
              </div>
              <div className="p-6">
                <p className="type-body-sm text-foreground-muted">
                  Not sure where to start? Book a free 30-minute call and
                  we&apos;ll recommend the right combination for your business.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </PageSection>

      <CtaBanner
        title="Let's figure out the right fit."
        description="Tell us about your business. We'll suggest a path — no pressure, no jargon."
      />
    </>
  );
}
