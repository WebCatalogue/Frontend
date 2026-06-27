import { Button } from "@/components/ui/button";
import { getString, SectionShell } from "../section-shell";
import type { RegistryComponentProps } from "..";

export function HeroBasic({ settings }: RegistryComponentProps) {
  const headline = getString(settings, "headline", "Welcome");
  const subtitle = getString(
    settings,
    "subtitle",
    "Your business, beautifully online.",
  );
  const ctaLabel = getString(settings, "ctaLabel", "Get started");
  const ctaHref = getString(settings, "ctaHref", "#");

  return (
    <SectionShell className="text-center">
      <p className="type-label text-accent mb-4">Hero</p>
      <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
        {headline}
      </h1>
      <p className="type-body-lg text-foreground-muted mx-auto mt-4 max-w-2xl">
        {subtitle}
      </p>
      {ctaLabel && (
        <Button asChild className="mt-8" size="lg">
          <a href={ctaHref}>{ctaLabel}</a>
        </Button>
      )}
    </SectionShell>
  );
}
