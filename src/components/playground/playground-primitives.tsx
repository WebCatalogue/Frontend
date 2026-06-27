import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PlaygroundSectionProps {
  id: string;
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function PlaygroundSection({
  id,
  label,
  title,
  description,
  children,
  className,
}: PlaygroundSectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-28 py-20 first:pt-12", className)}
      aria-labelledby={`${id}-title`}
    >
      <header className="mb-12 max-w-2xl">
        <p className="type-label text-foreground-subtle mb-4">{label}</p>
        <h2 id={`${id}-title`} className="type-display-md text-foreground mb-4">
          {title}
        </h2>
        {description && (
          <p className="type-body-lg text-foreground-muted">{description}</p>
        )}
      </header>
      {children}
    </section>
  );
}

interface PlaygroundSpecimenProps {
  label?: string;
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

export function PlaygroundSpecimen({
  label,
  children,
  className,
  padding = "md",
}: PlaygroundSpecimenProps) {
  const paddingMap = {
    sm: "p-5",
    md: "p-8",
    lg: "p-12",
  };

  return (
    <div className={cn("group", className)}>
      {label && (
        <p className="type-label text-foreground-subtle mb-3">{label}</p>
      )}
      <div
        className={cn(
          "surface-1 rounded-[var(--radius-xl)]",
          paddingMap[padding],
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface PlaygroundSwatchProps {
  name: string;
  value: string;
  className?: string;
}

export function PlaygroundSwatch({
  name,
  value,
  className,
}: PlaygroundSwatchProps) {
  return (
    <div className="group flex flex-col gap-3">
      <div
        className={cn(
          "border-border-subtle h-20 rounded-[var(--radius-lg)] border transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] group-hover:scale-[1.02]",
          className,
        )}
        style={{ backgroundColor: value }}
      />
      <div>
        <p className="type-body-sm text-foreground font-medium">{name}</p>
        <p className="type-mono text-foreground-subtle">{value}</p>
      </div>
    </div>
  );
}

interface PlaygroundTokenRowProps {
  token: string;
  value: string;
  preview?: ReactNode;
}

export function PlaygroundTokenRow({
  token,
  value,
  preview,
}: PlaygroundTokenRowProps) {
  return (
    <div className="border-border-subtle flex items-center justify-between gap-6 border-b py-4 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="type-mono text-foreground">{token}</p>
        <p className="type-body-sm text-foreground-subtle">{value}</p>
      </div>
      {preview && <div className="shrink-0">{preview}</div>}
    </div>
  );
}
