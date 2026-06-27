import Link from "next/link";
import { CtaBanner, PageHeader, PageSection } from "@/components/layout";
import { DemoImage } from "@/components/marketing/demo-image";
import { Reveal } from "@/components/playground/motion/primitives";
import { Button } from "@/components/ui";
import { APP_DESCRIPTION, ROUTES } from "@/constants";
import {
  COMPANY_TIMELINE,
  COMPANY_VALUES,
  DESIGN_PHILOSOPHY,
  FOUNDERS,
  HOW_IT_WORKS,
  PROCESS_STEPS,
  TECHNOLOGY,
} from "@/mock/company";
import { WHY_BHAIKISITE } from "@/mock";
import { demoImage } from "@/lib/demo-images";

export const metadata = {
  title: "About — BhaiKISite",
  description: APP_DESCRIPTION,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We build the platform local businesses wish they had years ago."
        description="BhaiKISite started with a simple observation: the best shops in town often had the worst websites. We're fixing that — one industry template at a time."
        breadcrumbs={[{ label: "About" }]}
      />

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="type-display-md text-foreground">Our story</h2>
            <div className="mt-8 space-y-5">
              <p className="type-body-lg text-foreground-muted">
                BhaiKISite began when we kept meeting business owners who had
                outgrown their Facebook page but couldn&apos;t justify ₹5 lakh
                agency quotes or messy DIY builders. They needed something in
                between — premium quality, sensible pricing, and a process that
                didn&apos;t require learning HTML.
              </p>
              <p className="type-body-md text-foreground-muted">
                So we built a component library, a theme system, and industry
                templates that ship the way a good agency would — then put the
                controls in your hands. Today, cafés, clinics, salons, and gyms
                across India launch sites on BhaiKISite that they&apos;re
                actually proud to share.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)]">
              <DemoImage
                src={demoImage("workspace", 1200)}
                alt="BhaiKISite workspace"
              />
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection subdued>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="section-eyebrow mb-6">Mission</p>
            <h2 className="type-heading-lg text-foreground">
              Give every local business a website that matches their craft.
            </h2>
            <p className="type-body-md text-foreground-muted mt-4">
              Not a generic template. Not a six-month agency timeline. A real,
              polished site you can launch this month.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-eyebrow mb-6">Vision</p>
            <h2 className="type-heading-lg text-foreground">
              Become the default way Indian businesses go online.
            </h2>
            <p className="type-body-md text-foreground-muted mt-4">
              When someone opens a café in Pune or a salon in Hyderabad, we want
              BhaiKISite to be the obvious first step — not an afterthought.
            </p>
          </Reveal>
        </div>
      </PageSection>

      <PageSection>
        <Reveal>
          <p className="section-eyebrow mb-6">How it works</p>
          <h2 className="type-display-md text-foreground mb-12">
            From template to live site in four steps.
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {HOW_IT_WORKS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="depth-panel p-7">
                <h3 className="type-heading-sm text-foreground">
                  {item.title}
                </h3>
                <p className="type-body-sm text-foreground-muted mt-3">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection subdued>
        <Reveal>
          <p className="section-eyebrow mb-6">Process</p>
          <h2 className="type-display-md text-foreground mb-12">
            What working with us looks like.
          </h2>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.08}>
              <div>
                <span className="type-label text-accent">{step.step}</span>
                <h3 className="type-heading-sm text-foreground mt-4">
                  {step.title}
                </h3>
                <p className="type-body-sm text-foreground-muted mt-2">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <Reveal>
          <p className="section-eyebrow mb-6">Design philosophy</p>
          <h2 className="type-display-md text-foreground mb-12">
            How we think about design.
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-3">
          {DESIGN_PHILOSOPHY.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="depth-panel p-7">
                <h3 className="type-heading-sm text-foreground">
                  {item.title}
                </h3>
                <p className="type-body-sm text-foreground-muted mt-3">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection subdued>
        <Reveal>
          <p className="section-eyebrow mb-6">Technology</p>
          <h2 className="type-display-md text-foreground mb-12">
            Built on a modern foundation.
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-3">
          {TECHNOLOGY.map((item, i) => (
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
      </PageSection>

      <PageSection>
        <Reveal>
          <p className="section-eyebrow mb-6">Timeline</p>
          <h2 className="type-display-md text-foreground mb-12">
            How we got here.
          </h2>
        </Reveal>
        <div className="max-w-2xl space-y-8">
          {COMPANY_TIMELINE.map((item, i) => (
            <Reveal key={item.year} delay={i * 0.08}>
              <div className="flex gap-6">
                <span className="type-label text-accent w-14 shrink-0 pt-1">
                  {item.year}
                </span>
                <div>
                  <h3 className="type-heading-sm text-foreground">
                    {item.title}
                  </h3>
                  <p className="type-body-sm text-foreground-muted mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection subdued>
        <Reveal>
          <p className="section-eyebrow mb-6">Founders</p>
          <h2 className="type-display-md text-foreground mb-12">
            Built by engineers who ship.
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

      <PageSection subdued>
        <Reveal>
          <p className="section-eyebrow mb-6">Values</p>
          <h2 className="type-display-md text-foreground mb-12">
            What guides every decision.
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

      <PageSection>
        <Reveal>
          <p className="section-eyebrow mb-6">Why BhaiKISite</p>
          <h2 className="type-display-md text-foreground mb-12">
            What sets us apart.
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_BHAIKISITE.map((item, i) => (
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
              <Link href={ROUTES.contact}>Start a conversation</Link>
            </Button>
          </div>
        </Reveal>
      </PageSection>

      <CtaBanner />
    </>
  );
}
