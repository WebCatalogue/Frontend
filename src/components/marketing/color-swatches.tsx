import { getPalette } from "@/features/platform/palettes";
import { cn } from "@/lib/utils";

interface ColorSwatchesProps {
  paletteId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showLabels?: boolean;
}

const sizes = {
  sm: "size-6",
  md: "size-8",
  lg: "size-10",
};

export function ColorSwatches({
  paletteId,
  size = "md",
  className,
  showLabels = false,
}: ColorSwatchesProps) {
  const palette = getPalette(paletteId);
  if (!palette) return null;

  const swatches = [
    { key: "primary", label: "Primary", color: palette.primary },
    { key: "accent", label: "Accent", color: palette.accent },
    { key: "secondary", label: "Secondary", color: palette.secondary },
    { key: "background", label: "Background", color: palette.background },
    { key: "foreground", label: "Text", color: palette.foreground },
  ];

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {swatches.map((s) => (
        <div key={s.key} className="flex flex-col items-center gap-1">
          <span
            className={cn(
              sizes[size],
              "ring-border rounded-full ring-1 ring-inset",
            )}
            style={{ backgroundColor: s.color }}
            title={`${s.label}: ${s.color}`}
            aria-hidden
          />
          {showLabels && (
            <span className="type-label text-foreground-subtle !text-[10px]">
              {s.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
