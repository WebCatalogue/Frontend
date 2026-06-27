import Link from "next/link";
import { CtaBanner, PageHeader, PageSection } from "@/components/layout";
import { Reveal } from "@/components/playground/motion/primitives";
import { Button } from "@/components/ui";
import { PORTFOLIO_PROJECTS } from "@/mock/portfolio";

export const metadata = {
  title: "Portfolio — Aurevia",
  description:
    "Selected projects showcasing premium websites for local businesses.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Work we're proud of."
        description="A selection of websites crafted for businesses that refused to settle for ordinary."
        breadcrumbs={[{ label: "Portfolio" }]}
      />

      <PageSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <article className="group depth-panel flex h-full flex-col overflow-hidden">
                <div
                  className="h-52 sm:h-56"
                  style={{ background: project.gradient }}
                />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="type-label text-foreground-subtle">
                    {project.industry} · {project.year}
                  </p>
                  <h2 className="type-heading-md text-foreground mt-2">
                    {project.title}
                  </h2>
                  <p className="type-body-sm text-foreground-muted mt-2 flex-1">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="type-label text-foreground-subtle bg-muted rounded-full px-2 py-0.5 !tracking-normal !normal-case"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-6 w-full" asChild>
                    <Link href={`/portfolio/${project.slug}`}>
                      View case study
                    </Link>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <CtaBanner />
    </>
  );
}
