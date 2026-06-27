import { Button } from "@/components/ui/button";
import { getString, SectionShell } from "../section-shell";
import type { RegistryComponentProps } from "../../registry";

export function CtaBanner({ settings }: RegistryComponentProps) {
  const headline = getString(settings, "headline", "Ready to get started?");
  const ctaLabel = getString(settings, "ctaLabel", "Contact us");
  const ctaHref = getString(settings, "ctaHref", "#");

  return (
    <SectionShell className="bg-accent-muted rounded-[var(--radius-3xl)]">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <h2 className="type-heading-lg font-medium">{headline}</h2>
        <Button asChild size="lg">
          <a href={ctaHref}>{ctaLabel}</a>
        </Button>
      </div>
    </SectionShell>
  );
}
