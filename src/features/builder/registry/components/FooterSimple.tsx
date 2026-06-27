import { getString, SectionShell } from "../section-shell";
import type { RegistryComponentProps } from "../../registry";

export function FooterSimple({ settings }: RegistryComponentProps) {
  const copyright = getString(
    settings,
    "copyright",
    `© ${new Date().getFullYear()} All rights reserved.`,
  );

  return (
    <footer className="border-border border-t py-10">
      <SectionShell className="py-0">
        <p className="type-body-sm text-foreground-muted text-center">
          {copyright}
        </p>
      </SectionShell>
    </footer>
  );
}
