import { SectionShell } from "../section-shell";
import type { RegistryComponentProps } from "../../registry";

export function GalleryCarousel({ settings }: RegistryComponentProps) {
  const images = Array.isArray(settings?.images) ? settings.images : [1, 2, 3];

  return (
    <SectionShell>
      <h2 className="type-heading-md mb-8 font-medium">Carousel</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.slice(0, 5).map((_, i) => (
          <div
            key={i}
            className="bg-muted h-48 w-72 shrink-0 rounded-[var(--radius-xl)]"
            aria-hidden
          />
        ))}
      </div>
    </SectionShell>
  );
}
