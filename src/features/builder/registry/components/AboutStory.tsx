import { getString, SectionShell } from "../section-shell";
import type { RegistryComponentProps } from "../../registry";

export function AboutStory({ settings }: RegistryComponentProps) {
  const headline = getString(settings, "headline", "Our story");
  const body = getString(
    settings,
    "body",
    "Tell your customers who you are and why you do what you do.",
  );

  return (
    <SectionShell>
      <p className="type-label text-accent mb-3">About</p>
      <h2 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
        {headline}
      </h2>
      <p className="type-body-lg text-foreground-muted mt-4 max-w-3xl">
        {body}
      </p>
    </SectionShell>
  );
}
