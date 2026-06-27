import Link from "next/link";
import { CtaBanner, PageHeader, PageSection } from "@/components/layout";
import { Reveal } from "@/components/playground/motion/primitives";
import { Button } from "@/components/ui";
import { APP_DESCRIPTION, ROUTES } from "@/constants";
import { COMPANY_VALUES, FOUNDERS } from "@/mock/company";
import { WHY_AUREVIA } from "@/mock";

export const metadata = {
  title: "About — Aurevia",
  description: APP_DESCRIPTION,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We believe every business deserves to look exceptional online."
        description="Aurevia was founded to close the gap between enterprise-quality web design and local businesses who need it most."
        breadcrumbs={[{ label: "About" }]}
      />

      <PageSection>
        <Reveal>
          <h2 className="type-display-md text-foreground max-w-2xl">
            Our story
          </h2>
          <div className="mt-8 max-w-3xl space-y-5">
            <p className="type-body-lg text-foreground-muted">
              We started Aurevia after seeing too many brilliant local
              businesses held back by outdated, template-driven websites. Cafés
              with world-class coffee. Salons with exceptional craft. Clinics
              with genuine care. All underserved online.
            </p>
            <p className="type-body-md text-foreground-muted">
              We set out to build a studio that treats every project with the
              same design rigor as global brands — because your customers judge
              your business by your website before they ever walk through the
              door.
            </p>
          </div>
        </Reveal>
      </PageSection>

      <PageSection subdued>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="section-eyebrow mb-6">Mission</p>
            <h2 className="type-heading-lg text-foreground">
              Help local businesses establish a premium digital presence.
            </h2>
            <p className="type-body-md text-foreground-muted mt-4">
              Through beautifully designed, high-performance websites that build
              trust and drive growth.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-eyebrow mb-6">Vision</p>
            <h2 className="type-heading-lg text-foreground">
              A world where every local business competes on equal footing
              online.
            </h2>
            <p className="type-body-md text-foreground-muted mt-4">
              Where craftsmanship and care are visible in every pixel — not just
              in the physical experience.
            </p>
          </Reveal>
        </div>
      </PageSection>

      <PageSection>
        <Reveal>
          <p className="section-eyebrow mb-6">Values</p>
          <h2 className="type-display-md text-foreground mb-12">
            What we stand for.
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {COMPANY_VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="depth-panel p-7">
                <h3 className="type-heading-sm text-foreground">{v.title}</h3>
                <p className="type-body-sm text-foreground-muted mt-3">
                  {v.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection subdued>
        <Reveal>
          <p className="section-eyebrow mb-6">Founders</p>
          <h2 className="type-display-md text-foreground mb-12">
            The people behind Aurevia.
          </h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.1}>
              <div className="depth-panel p-8">
                <div className="bg-accent-muted text-accent flex size-14 items-center justify-center rounded-full text-lg font-medium">
                  {f.initials}
                </div>
                <h3 className="type-heading-md text-foreground mt-6">
                  {f.name}
                </h3>
                <p className="type-body-sm text-accent mt-1">{f.role}</p>
                <p className="type-body-md text-foreground-muted mt-4">
                  {f.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <Reveal>
          <p className="section-eyebrow mb-6">Why choose us</p>
          <h2 className="type-display-md text-foreground mb-12">
            Why businesses choose Aurevia.
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_AUREVIA.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="surface-1 rounded-[var(--radius-xl)] p-6">
                <h3 className="type-heading-sm text-foreground">
                  {item.title}
                </h3>
                <p className="type-body-sm text-foreground-muted mt-2">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <Button variant="primary" size="lg" asChild>
              <Link href={ROUTES.contact}>Work with us</Link>
            </Button>
          </div>
        </Reveal>
      </PageSection>

      <CtaBanner />
    </>
  );
}
