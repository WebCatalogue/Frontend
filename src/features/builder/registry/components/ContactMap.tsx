import { getString, SectionShell } from "../section-shell";
import type { RegistryComponentProps } from "../../registry";

export function ContactMap({ settings }: RegistryComponentProps) {
  const address = getString(settings, "address", "123 Main Street");
  const phone = getString(settings, "phone", "");

  return (
    <SectionShell>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="type-heading-md font-medium">Contact</h2>
          <p className="type-body-md text-foreground-muted mt-3">{address}</p>
          {phone && <p className="type-body-md mt-2">{phone}</p>}
        </div>
        <div
          className="bg-muted min-h-48 rounded-[var(--radius-2xl)]"
          aria-label="Map placeholder"
        />
      </div>
    </SectionShell>
  );
}
