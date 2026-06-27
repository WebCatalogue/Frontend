import Link from "next/link";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants";
import { cn } from "@/lib/utils";

interface CtaBannerProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function CtaBanner({
  title = "Ready to elevate your digital presence?",
  description = "Let's craft a website that wins customers before you say a word.",
  primaryLabel = "Start your project",
  primaryHref = ROUTES.contact,
  secondaryLabel = "View pricing",
  secondaryHref = ROUTES.pricing,
  className,
}: CtaBannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden px-5 py-20 sm:px-6 sm:py-24 lg:px-12",
        className,
      )}
      aria-labelledby="cta-banner-title"
    >
      <div className="absolute inset-0 bg-[var(--gradient-ambient-base)]" />
      <div className="relative mx-auto max-w-[var(--container-2xl)]">
        <div className="depth-panel mx-auto max-w-3xl p-10 text-center sm:p-14">
          <h2 id="cta-banner-title" className="type-display-md text-foreground">
            {title}
          </h2>
          <p className="type-body-lg text-foreground-muted mx-auto mt-4 max-w-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button variant="primary" size="lg" asChild>
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button variant="ghost" size="lg" asChild>
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
