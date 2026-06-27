import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@/components/ui";
import { CtaBanner, PageSection } from "@/components/layout";
import { DemoImage } from "@/components/marketing/demo-image";
import { IndustryTemplateGrid } from "@/components/marketing/industry-template-grid";
import { ColorSwatches } from "@/components/marketing/color-swatches";
import { Reveal } from "@/components/playground/motion/primitives";
import { ROUTES } from "@/constants";
import { IndustryMarketplace } from "@/features/marketplace";
import { getTheme } from "@/features/platform/themes";
import { getTemplatesForIndustry } from "@/mock/industry-templates";
import { getIndustryBySlug, INDUSTRIES } from "@/mock/industries";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Industry — BhaiKISite" };
  return {
    title: `${industry.name} — BhaiKISite`,
    description: industry.description,
  };
}

export default async function IndustryDetailPage({
  params,
}: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const templates = getTemplatesForIndustry(slug);
  const theme = getTheme(industry.suggestedThemeId);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <DemoImage
            src={industry.heroImage}
            alt=""
            priority
            className="scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-[var(--color-background)]/90 to-[var(--color-background)]/40" />
        </div>
        <div className="relative mx-auto max-w-[var(--container-2xl)] px-5 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-12">
          <p className="section-eyebrow mb-4">Industries</p>
          <h1 className="type-display-lg text-foreground max-w-2xl">
            {industry.name}
          </h1>
          <p className="type-body-lg text-foreground-muted mt-4 max-w-xl">
            {industry.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" asChild>
              <Link href={`/industries/${slug}#configure`}>
                Configure components
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={`${ROUTES.appCompose}?industry=${slug}`}>
                Start with a template
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={ROUTES.contact}>Talk to us</Link>
            </Button>
          </div>
        </div>
      </section>

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="type-display-md text-foreground">Overview</h2>
            <p className="type-body-lg text-foreground-muted mt-6">
              {industry.overview}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)]">
              <DemoImage src={industry.image} alt={industry.name} />
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection subdued>
        <Reveal>
          <p className="section-eyebrow mb-6">Common features</p>
          <h2 className="type-display-md text-foreground mb-12">
            What {industry.name.toLowerCase()} sites need
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {industry.commonFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="depth-panel p-7">
                <h3 className="type-heading-sm text-foreground">{f.title}</h3>
                <p className="type-body-sm text-foreground-muted mt-3">
                  {f.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <Reveal>
          <p className="section-eyebrow mb-6">Why it matters</p>
          <h2 className="type-display-md text-foreground max-w-2xl">
            Why your business needs a proper website
          </h2>
          <p className="type-body-lg text-foreground-muted mt-6 max-w-3xl">
            {industry.whyNeeded}
          </p>
        </Reveal>
      </PageSection>

      <PageSection subdued>
        <Reveal>
          <p className="section-eyebrow mb-6">Templates</p>
          <h2 className="type-display-md text-foreground mb-4">
            Template collection
          </h2>
          <p className="type-body-md text-foreground-muted mb-12 max-w-2xl">
            {templates.length} ready-to-customise layouts for{" "}
            {industry.name.toLowerCase()}. Preview any template, then open it in
            the composer to make it yours.
          </p>
        </Reveal>
        <IndustryTemplateGrid templates={templates} industrySlug={slug} />
      </PageSection>

      <IndustryMarketplace
        industrySlug={slug}
        industryName={industry.name}
        themeId={industry.suggestedThemeId}
        paletteId={industry.suggestedPaletteId}
      />

      <PageSection>
        <Reveal>
          <p className="section-eyebrow mb-6">Theme</p>
          <h2 className="type-display-md text-foreground mb-8">
            Suggested theme
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="depth-panel max-w-2xl p-7 sm:p-8">
            <h3 className="type-heading-md text-foreground">{theme.name}</h3>
            <p className="type-body-md text-foreground-muted mt-3">
              {theme.description}
            </p>
            <dl className="mt-6 space-y-3 border-t border-[var(--color-border-subtle)] pt-6">
              <div className="flex justify-between gap-4">
                <dt className="type-body-sm text-foreground-muted">
                  Typography
                </dt>
                <dd className="type-body-sm text-foreground">
                  Instrument Serif + Inter
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="type-body-sm text-foreground-muted">
                  Border radius
                </dt>
                <dd className="type-body-sm text-foreground">
                  {theme.borderRadius}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="type-body-sm text-foreground-muted">
                  Animation
                </dt>
                <dd className="type-body-sm text-foreground capitalize">
                  {theme.animationStyle}
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              <p className="type-label text-foreground-subtle mb-3">
                Recommended palette
              </p>
              <ColorSwatches
                paletteId={industry.suggestedPaletteId}
                size="md"
                showLabels
              />
            </div>
          </div>
        </Reveal>
      </PageSection>

      <PageSection subdued>
        <Reveal>
          <div className="depth-panel overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-10 lg:p-12">
                <p className="section-eyebrow mb-4">Pricing</p>
                <h2 className="type-heading-lg text-foreground">
                  Ready to launch your {industry.name.toLowerCase()} site?
                </h2>
                <p className="type-body-md text-foreground-muted mt-4">
                  Start free with a template preview. Upgrade when you&apos;re
                  ready to publish on your own domain.
                </p>
                <Button variant="primary" size="lg" className="mt-6" asChild>
                  <Link href={ROUTES.pricing}>View pricing</Link>
                </Button>
              </div>
              <div className="relative min-h-[16rem] lg:min-h-full">
                <DemoImage src={industry.image} alt="" />
              </div>
            </div>
          </div>
        </Reveal>
      </PageSection>

      <PageSection subdued>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="section-eyebrow mb-6">FAQ</p>
            <h2 className="type-display-md text-foreground">
              Common questions
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible>
              {industry.faq.map((item, i) => (
                <AccordionItem key={item.question} value={`faq-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </PageSection>

      <CtaBanner
        title={`Build your ${industry.name.toLowerCase()} website today`}
        description="Pick a template, customise in minutes, and publish when you're ready."
      />
    </>
  );
}
