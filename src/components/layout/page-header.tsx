import { type ReactNode } from "react";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/layout/breadcrumbs";
import { Reveal } from "@/components/playground/motion/primitives";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
  media?: ReactNode;
  mediaAlign?: "center" | "start";
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  media,
  mediaAlign = "center",
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "section-anchor relative overflow-hidden px-5 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-12 lg:pb-28",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[var(--gradient-ambient-base)]" />
      <div className="relative mx-auto max-w-[var(--container-2xl)]">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div
          className={cn(
            media &&
              "grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10 xl:gap-14",
            media && (mediaAlign === "start" ? "items-start" : "items-center"),
          )}
        >
          <Reveal className="min-w-0">
            {eyebrow && <p className="section-eyebrow mb-6">{eyebrow}</p>}
            <h1 className="type-display-lg text-foreground max-w-3xl">
              {title}
            </h1>
            {description && (
              <p className="type-body-lg text-foreground-muted mt-5 max-w-2xl sm:mt-6">
                {description}
              </p>
            )}
            {children}
          </Reveal>
          {media && (
            <Reveal
              delay={0.1}
              variant="slideFromRight"
              className="relative min-h-0 w-full min-w-0 lg:justify-self-end"
            >
              {media}
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}

interface PageSectionProps {
  children: ReactNode;
  className?: string;
  subdued?: boolean;
  id?: string;
}

export function PageSection({
  children,
  className,
  subdued = false,
  id,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-anchor section-pad relative px-5 sm:px-6 lg:px-12",
        className,
      )}
    >
      {subdued && (
        <div className="absolute inset-0 bg-[var(--color-background-subtle)]" />
      )}
      <div className="relative mx-auto max-w-[var(--container-2xl)]">
        {children}
      </div>
    </section>
  );
}
