import { Button } from "@/components/ui/button";
import { getString, SectionShell } from "../section-shell";
import type { RegistryComponentProps } from "../../registry";

export function HeroSplit({ settings, variant }: RegistryComponentProps) {
  const headline = getString(settings, "headline", "Split hero");
  const body = getString(
    settings,
    "body",
    "Two-column hero with image and copy.",
  );
  const ctaLabel = getString(settings, "ctaLabel", "Learn more");
  const ctaHref = getString(settings, "ctaHref", "#");
  const imageFirst = variant === "left-image";

  return (
    <SectionShell>
      <div
        className={`grid items-center gap-10 md:grid-cols-2 ${imageFirst ? "" : "md:[&>*:first-child]:order-2"}`}
      >
        <div
          className="bg-muted aspect-[4/3] rounded-[var(--radius-2xl)]"
          aria-hidden
        />
        <div>
          <h2 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
            {headline}
          </h2>
          <p className="type-body-lg text-foreground-muted mt-4">{body}</p>
          <Button asChild className="mt-6">
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
