import { getString, SectionShell } from "../section-shell";
import type { RegistryComponentProps } from "../../registry";

export function HeroVideo({ settings }: RegistryComponentProps) {
  const headline = getString(settings, "headline", "Video hero");
  const subtitle = getString(
    settings,
    "subtitle",
    "Cinematic introduction for your brand.",
  );

  return (
    <SectionShell className="text-center">
      <div
        className="bg-muted mb-8 aspect-video rounded-[var(--radius-2xl)]"
        aria-hidden
      />
      <h2 className="type-display-md text-foreground font-[family-name:var(--font-display)]">
        {headline}
      </h2>
      <p className="type-body-lg text-foreground-muted mt-3">{subtitle}</p>
    </SectionShell>
  );
}
