import Link from "next/link";
import { CtaBanner, PageHeader, PageSection } from "@/components/layout";
import { DemoImage } from "@/components/marketing/demo-image";
import { Reveal } from "@/components/playground/motion/primitives";
import { Button } from "@/components/ui";
import { PORTFOLIO_PROJECTS } from "@/mock/portfolio";

export const metadata = {
  title: "Portfolio — BhaiKISite",
  description:
    "Real websites built for cafés, salons, clinics, restaurants, and fitness brands across India.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Sites that earn compliments before the first visit."
        description="Each project started with a business that cared about quality — and a website that didn't reflect it. Here's what changed."
        breadcrumbs={[{ label: "Portfolio" }]}
      />

      <PageSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <article className="group depth-panel flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <DemoImage
                    src={project.image}
                    alt={project.title}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="type-label text-foreground-subtle">
                    {project.industry} · {project.location}
                  </p>
                  <h2 className="type-heading-md text-foreground mt-2">
                    {project.title}
                  </h2>
                  <p className="type-body-sm text-foreground-muted mt-2 flex-1">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.results.slice(0, 2).map((r) => (
                      <span
                        key={r.label}
                        className="type-label text-foreground-subtle bg-muted rounded-full px-2.5 py-1 !tracking-normal !normal-case"
                      >
                        {r.value} {r.label.toLowerCase()}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-6 w-full" asChild>
                    <Link href={`/portfolio/${project.slug}`}>
                      Read case study
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
