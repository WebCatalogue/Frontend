import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner, PageHeader, PageSection } from "@/components/layout";
import { DemoImage } from "@/components/marketing/demo-image";
import { Reveal } from "@/components/playground/motion/primitives";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants";
import { PORTFOLIO_PROJECTS } from "@/mock/portfolio";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project — BhaiKISite" };
  return {
    title: `${project.title} — BhaiKISite`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${project.industry} · ${project.location}`}
        title={project.title}
        description={project.description}
        breadcrumbs={[
          { label: "Portfolio", href: ROUTES.portfolio },
          { label: project.title },
        ]}
      />

      <PageSection>
        <Reveal>
          <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-[var(--radius-2xl)]">
            <DemoImage
              src={project.screenshotDesktop}
              alt={`${project.title} website preview`}
              priority
            />
          </div>
        </Reveal>
        <div className="max-w-3xl">
          <h2 className="type-heading-lg text-foreground">The story</h2>
          <p className="type-body-lg text-foreground-muted mt-4">
            {project.story}
          </p>
        </div>
      </PageSection>

      <PageSection subdued>
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <h2 className="type-heading-md text-foreground mb-6">
              What we delivered
            </h2>
            <ul className="space-y-3">
              {project.servicesDelivered.map((s) => (
                <li
                  key={s}
                  className="type-body-md text-foreground-muted flex items-center gap-3"
                >
                  <span className="bg-accent size-1.5 shrink-0 rounded-full" />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="type-heading-md text-foreground mb-6">Results</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {project.results.map((r) => (
                <div key={r.label} className="depth-panel p-5 text-center">
                  <p className="stat-value">{r.value}</p>
                  <p className="stat-label">{r.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection>
        <Reveal>
          <h2 className="type-heading-md text-foreground mb-8">
            Website preview
          </h2>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_12rem]">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-xl)] shadow-lg">
              <DemoImage
                src={project.screenshotDesktop}
                alt={`${project.title} desktop`}
              />
            </div>
            <p className="type-label text-foreground-subtle mt-3">Desktop</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-[9/19] max-w-[12rem] overflow-hidden rounded-[var(--radius-xl)] shadow-lg">
              <DemoImage
                src={project.screenshotMobile}
                alt={`${project.title} mobile`}
                sizes="200px"
              />
            </div>
            <p className="type-label text-foreground-subtle mt-3 text-center">
              Mobile
            </p>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="depth-panel p-5 text-center">
            <p className="stat-value">{project.timeline}</p>
            <p className="stat-label">Timeline</p>
          </div>
          <div className="depth-panel p-5 text-center">
            <p className="stat-value">{project.pages}</p>
            <p className="stat-label">Pages</p>
          </div>
          <div className="depth-panel p-5 text-center">
            <p className="stat-value">{project.year}</p>
            <p className="stat-label">Launched</p>
          </div>
        </div>
      </PageSection>

      <div className="px-5 pb-16 text-center sm:px-6 lg:px-12">
        <Button variant="outline" asChild>
          <Link href={ROUTES.portfolio}>← Back to portfolio</Link>
        </Button>
      </div>

      <CtaBanner title="Want results like this?" />
    </>
  );
}
