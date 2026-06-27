import { cn } from "@/lib/utils";
import type { RegistryComponentProps } from "../registry";

function getString(
  settings: Record<string, unknown> | null | undefined,
  key: string,
  fallback = "",
): string {
  const value = settings?.[key];
  return typeof value === "string" ? value : fallback;
}

export function SectionShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("section-pad py-16 md:py-24", className)}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

export function useSettings(settings?: RegistryComponentProps["settings"]) {
  return settings ?? {};
}

export { getString };
