import { SectionShell } from "../section-shell";
import type { RegistryComponentProps } from "../../registry";

export function GalleryGrid({ settings }: RegistryComponentProps) {
  const images = Array.isArray(settings?.images)
    ? settings.images
    : [1, 2, 3, 4, 5, 6];

  return (
    <SectionShell>
      <h2 className="type-heading-md mb-8 font-medium">Gallery</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.slice(0, 6).map((_, i) => (
          <div
            key={i}
            className="bg-muted aspect-square rounded-[var(--radius-xl)]"
            aria-hidden
          />
        ))}
      </div>
    </SectionShell>
  );
}
