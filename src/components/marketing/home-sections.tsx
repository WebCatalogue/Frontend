"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/playground/motion/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@/components/ui";
import { ROUTES } from "@/constants";
import { HOME_FAQ, PROCESS_STEPS, TESTIMONIALS, WHY_BHAIKISITE } from "@/mock";
import { INDUSTRIES } from "@/mock/industries";
import { PORTFOLIO_PROJECTS } from "@/mock/portfolio";
import { SERVICES } from "@/mock/services";
import { DemoImage } from "@/components/marketing/demo-image";
import { demoImage } from "@/lib/demo-images";

export function HomeIntro() {
  return (
    <section className="section-anchor section-pad px-5 sm:px-6 lg:px-12">
      <div className="mx-auto grid max-w-[var(--container-2xl)] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="section-eyebrow mb-6">Who we are</p>
          <h2 className="type-display-md text-foreground">
            Digital craftsmanship for businesses that care.
          </h2>
          <p className="type-body-lg text-foreground-muted mt-6">
            BhaiKISite is a website creation platform — combine premium
            components, themes, and industry templates to launch a world-class
            site in minutes. From cafés to clinics, every site feels
            handcrafted, not generated.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)]">
            <DemoImage
              src={demoImage("teamCollaboration", 1000)}
              alt="Local business team"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeWhy() {
  return (
    <section className="section-anchor section-pad px-5 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[var(--container-2xl)]">
        <Reveal>
          <p className="section-eyebrow mb-6">Why BhaiKISite</p>
          <h2 className="type-display-md text-foreground max-w-lg">
            Built different. Built for you.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {WHY_BHAIKISITE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="surface-1 h-full rounded-[var(--radius-xl)] p-6 sm:p-7">
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
      </div>
    </section>
  );
}

export function HomeIndustries() {
  const featured = INDUSTRIES.slice(0, 6);
  return (
    <section className="section-anchor section-pad px-5 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[var(--container-2xl)]">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="section-eyebrow mb-6">Industries</p>
            <h2 className="type-display-md text-foreground max-w-lg">
              We understand your business.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button variant="outline" asChild>
              <Link href={ROUTES.industries}>
                All industries <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {featured.map((industry, i) => (
            <Reveal key={industry.id} delay={i * 0.05}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group depth-panel block transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="relative h-28 overflow-hidden rounded-t-[var(--radius-2xl)] sm:h-32">
                  <DemoImage
                    src={industry.image}
                    alt={industry.name}
                    className="transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="type-heading-sm text-foreground group-hover:text-accent transition-colors">
                    {industry.name}
                  </h3>
                  <p className="type-body-sm text-foreground-muted mt-2 line-clamp-2">
                    {industry.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeShowcase() {
  const featured = PORTFOLIO_PROJECTS.slice(0, 3);
  return (
    <section className="section-anchor section-pad px-5 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[var(--container-2xl)]">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="section-eyebrow mb-6">Portfolio</p>
            <h2 className="type-display-md text-foreground">Selected work.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button variant="outline" asChild>
              <Link href={ROUTES.portfolio}>
                View all projects <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group depth-panel block"
              >
                <div className="relative h-48 overflow-hidden rounded-t-[var(--radius-2xl)] sm:h-56">
                  <DemoImage
                    src={project.image}
                    alt={project.title}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <p className="type-label text-foreground-subtle">
                    {project.industry} · {project.year}
                  </p>
                  <h3 className="type-heading-md text-foreground group-hover:text-accent mt-2 transition-colors">
                    {project.title}
                  </h3>
                  <p className="type-body-sm text-foreground-muted mt-2 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeProcess() {
  return (
    <section className="section-anchor section-pad px-5 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[var(--container-2xl)]">
        <Reveal>
          <p className="section-eyebrow mb-6">Process</p>
          <h2 className="type-display-md text-foreground max-w-lg">
            From idea to launch, with clarity.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </section>
  );
}

export function HomeFeatures() {
  const features = SERVICES.slice(0, 4);
  return (
    <section className="section-anchor section-pad px-5 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[var(--container-2xl)]">
        <Reveal>
          <p className="section-eyebrow mb-6">Services</p>
          <h2 className="type-display-md text-foreground max-w-lg">
            Everything you need to grow online.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2">
          {features.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.06}>
              <div className="depth-panel p-7 sm:p-8">
                <h3 className="type-heading-sm text-foreground">
                  {service.title}
                </h3>
                <p className="type-body-sm text-foreground-muted mt-3">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {service.features.slice(0, 3).map((f) => (
                    <li
                      key={f}
                      className="type-body-sm text-foreground-muted flex items-center gap-2"
                    >
                      <span className="bg-accent size-1 shrink-0 rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link href={ROUTES.services}>Explore all services</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeTestimonials() {
  return (
    <section className="section-anchor section-pad px-5 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[var(--container-2xl)]">
        <Reveal>
          <p className="section-eyebrow mb-6">Testimonials</p>
          <h2 className="type-display-md text-foreground">
            Trusted by businesses.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <blockquote className="depth-panel flex h-full flex-col p-7 sm:p-8">
                <p
                  className="text-foreground flex-1 text-lg leading-relaxed"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-[var(--color-border-subtle)] pt-6">
                  <p className="type-body-sm text-foreground font-medium">
                    {t.author}
                  </p>
                  <p className="type-body-sm text-foreground-muted">
                    {t.role}, {t.business}
                  </p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeFaq() {
  return (
    <section className="section-anchor section-pad px-5 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[var(--container-2xl)]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="section-eyebrow mb-6">FAQ</p>
            <h2 className="type-display-md text-foreground">
              Common questions.
            </h2>
            <p className="type-body-md text-foreground-muted mt-4">
              Can&apos;t find what you need?{" "}
              <Link
                href={ROUTES.contact}
                className="text-accent hover:underline"
              >
                Get in touch
              </Link>
              .
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {HOME_FAQ.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
