import { SectionShell } from "../section-shell";
import type { RegistryComponentProps } from "../../registry";

export function FallbackSection({ section }: RegistryComponentProps) {
  return (
    <SectionShell className="border-border border-y border-dashed">
      <p className="type-body-sm text-foreground-muted">
        Unregistered component:{" "}
        <code className="text-foreground">
          {section?.componentKey ?? "unknown"}
        </code>
      </p>
    </SectionShell>
  );
}
