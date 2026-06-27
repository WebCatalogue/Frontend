"use client";

import { Badge } from "@/components/ui/badge";
import { LIBRARY_SOURCE_LABELS } from "@/features/platform/catalogue-meta";
import type { EnrichedCatalogueItem } from "@/features/platform/types";
import { CatalogueThumbnail } from "./catalogue-thumbnail";
import { cn } from "@/lib/utils";

interface CatalogueCardProps {
  item: EnrichedCatalogueItem;
  onSelect?: (item: EnrichedCatalogueItem) => void;
  className?: string;
}

export function CatalogueCard({
  item,
  onSelect,
  className,
}: CatalogueCardProps) {
  const Wrapper = onSelect ? "button" : "article";

  return (
    <Wrapper
      type={onSelect ? "button" : undefined}
      onClick={onSelect ? () => onSelect(item) : undefined}
      className={cn(
        "surface-2 group border-border w-full overflow-hidden rounded-[var(--radius-2xl)] border text-left transition-shadow hover:shadow-md",
        onSelect && "cursor-pointer",
        className,
      )}
    >
      <CatalogueThumbnail
        item={item}
        className="rounded-none border-0 border-b"
      />

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="type-heading-sm font-medium">{item.displayName}</h2>
            <p className="type-label text-foreground-subtle mt-0.5 capitalize">
              {item.category}
            </p>
          </div>
          <Badge variant="outline" className="shrink-0 capitalize">
            {item.difficulty}
          </Badge>
        </div>

        <p className="type-body-sm text-foreground-muted line-clamp-2">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <SourceBadge source={item.librarySource} />
          <Badge variant={item.accessibility === "aaa" ? "success" : "default"}>
            A11y {item.accessibility.toUpperCase()}
          </Badge>
          <Badge
            variant={
              item.performance === "heavy"
                ? "warning"
                : item.performance === "moderate"
                  ? "outline"
                  : "success"
            }
          >
            {item.performance}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-1">
          {item.supportedIndustries.slice(0, 3).map((ind) => (
            <Badge key={ind} variant="default">
              {ind}
            </Badge>
          ))}
        </div>

        <p className="type-body-sm text-foreground-subtle">
          {item.animation} · v{item.version} · {item.key}
        </p>
      </div>
    </Wrapper>
  );
}

function SourceBadge({ source }: { source: string }) {
  return (
    <Badge variant="accent">{LIBRARY_SOURCE_LABELS[source] ?? source}</Badge>
  );
}
