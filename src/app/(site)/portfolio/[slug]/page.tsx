import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner, PageHeader, PageSection } from "@/components/layout";
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
  if (!project) return { title: "Project — Aurevia" };
  return {
    title: `${project.title} — Aurevia`,
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
        eyebrow={`${project.industry} · ${project.year}`}
        title={project.title}
        description={project.description}
        breadcrumbs={[
          { label: "Portfolio", href: ROUTES.portfolio },
          { label: project.title },
        ]}
      />

      <PageSection>
        <div
          className="depth-panel mb-12 h-64 overflow-hidden rounded-[var(--radius-2xl)] sm:h-80 lg:h-96"
          style={{ background: project.gradient }}
        />
        <div className="max-w-3xl">
          <h2 className="type-heading-lg text-foreground">Overview</h2>
          <p className="type-body-lg text-foreground-muted mt-4">
            {project.description} We partnered with {project.title} to create a
            digital experience that reflects their brand values and drives
            measurable business results.
          </p>
          <div className="mt-8">
            <p className="type-label text-foreground-subtle mb-3">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="type-body-sm text-foreground-muted bg-muted rounded-full px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection subdued>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { label: "Timeline", value: "3 weeks" },
            { label: "Pages", value: "8" },
            { label: "Result", value: "+40% inquiries" },
          ].map((stat) => (
            <div key={stat.label} className="depth-panel p-6 text-center">
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
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
