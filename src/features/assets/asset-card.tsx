"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CatalogueThumbnail } from "@/features/catalogue/catalogue-thumbnail";
import { LIBRARY_SOURCE_LABELS } from "@/features/platform/catalogue-meta";
import type { EnrichedCatalogueItem } from "@/features/platform/types";
import type { PlatformAsset } from "@/features/platform/assets/types";
import { cn } from "@/lib/utils";

function assetToCatalogueItem(asset: PlatformAsset): EnrichedCatalogueItem {
  return {
    key: asset.registryKey ?? asset.id,
    category: asset.category as EnrichedCatalogueItem["category"],
    displayName: asset.name,
    description: asset.description,
    tags: asset.tags,
    difficulty: "beginner",
    version: asset.version,
    animation: asset.tags[0] ?? "fade-up",
    supportedThemes: asset.supportedThemes,
    supportedIndustries: asset.supportedIndustries,
    librarySource: asset.source,
    accessibility: asset.accessibility,
    performance: asset.performance,
    previewGradient: asset.previewGradient,
    kind:
      asset.kind === "effect" || asset.kind === "background"
        ? "effect"
        : "section",
  };
}

interface AssetCardProps {
  asset: PlatformAsset;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  href?: string;
}

export function AssetCard({
  asset,
  isFavorite,
  onToggleFavorite,
  href,
}: AssetCardProps) {
  const detailHref =
    href ??
    (asset.kind === "component" && asset.registryKey
      ? `/app/assets/component/${encodeURIComponent(asset.registryKey)}`
      : undefined);

  const inner = (
    <>
      {asset.kind === "component" || asset.kind === "effect" ? (
        <CatalogueThumbnail
          item={assetToCatalogueItem(asset)}
          className="h-32 rounded-none border-0 border-b"
        />
      ) : asset.desktopPreview ? (
        <div className="relative h-32 overflow-hidden border-b">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset.desktopPreview}
            alt=""
            className="size-full object-cover"
          />
        </div>
      ) : (
        <div
          className="h-32 border-b"
          style={{ background: asset.previewGradient }}
        />
      )}

      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="type-heading-sm truncate font-medium">
              {asset.name}
            </h3>
            <p className="type-label text-foreground-subtle capitalize">
              {asset.category}
            </p>
          </div>
          {onToggleFavorite && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(asset.id);
              }}
              className="text-foreground-muted hover:text-accent shrink-0 p-1"
              aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
            >
              <Star
                className={cn(
                  "size-4",
                  isFavorite && "fill-accent text-accent",
                )}
              />
            </button>
          )}
        </div>
        <p className="type-body-sm text-foreground-muted line-clamp-2">
          {asset.description}
        </p>
        <div className="flex flex-wrap gap-1">
          <Badge variant="accent">
            {LIBRARY_SOURCE_LABELS[asset.source] ?? asset.source}
          </Badge>
          <Badge
            variant={asset.accessibility === "aaa" ? "success" : "default"}
          >
            A11y {asset.accessibility}
          </Badge>
          <Badge variant="outline">{asset.performance}</Badge>
        </div>
      </div>
    </>
  );

  if (detailHref) {
    return (
      <Link
        href={detailHref}
        className="surface-2 group border-border block overflow-hidden rounded-[var(--radius-2xl)] border transition-shadow hover:shadow-md"
      >
        {inner}
      </Link>
    );
  }

  return (
    <article className="surface-2 border-border overflow-hidden rounded-[var(--radius-2xl)] border">
      {inner}
    </article>
  );
}
