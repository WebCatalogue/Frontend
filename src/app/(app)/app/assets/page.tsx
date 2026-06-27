"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { QueryErrorState } from "@/components/shared/query-state";
import { AssetCard } from "@/features/assets/asset-card";
import {
  buildAssetRegistry,
  filterAssets,
} from "@/features/platform/assets/registry";
import {
  ASSET_KIND_LABELS,
  ASSET_KIND_TABS,
  type AssetKind,
  type AssetSort,
} from "@/features/platform/assets/types";
import { LIBRARY_SOURCE_LABELS } from "@/features/platform/catalogue-meta";
import type { LibrarySource } from "@/features/platform/types";
import { useComponentRegistry } from "@/hooks/use-api-queries";
import {
  getFavoriteAssetIds,
  getRecentAssetIds,
  toggleFavoriteAsset,
  trackRecentAsset,
} from "@/lib/asset-preferences";

export default function AssetRegistryPage() {
  const registryQuery = useComponentRegistry();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<AssetKind | "all">("all");
  const [source, setSource] = useState<LibrarySource | "all">("all");
  const [sort, setSort] = useState<AssetSort>("name");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [recentOnly, setRecentOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(getFavoriteAssetIds());
    setRecentIds(getRecentAssetIds());
  }, []);

  const assets = useMemo(
    () => buildAssetRegistry(registryQuery.data ?? []),
    [registryQuery.data],
  );

  const filtered = useMemo(
    () =>
      filterAssets(assets, {
        query,
        kind,
        source,
        favoriteIds,
        recentIds,
        favoritesOnly,
        recentOnly,
        sort,
      }),
    [
      assets,
      query,
      kind,
      source,
      favoriteIds,
      recentIds,
      favoritesOnly,
      recentOnly,
      sort,
    ],
  );

  const handleFavorite = useCallback((id: string) => {
    setFavoriteIds(toggleFavoriteAsset(id));
  }, []);

  const handleOpen = useCallback((id: string) => {
    setRecentIds(trackRecentAsset(id));
  }, []);

  if (registryQuery.error) {
    return (
      <QueryErrorState
        error={registryQuery.error}
        onRetry={() => registryQuery.refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          Asset registry
        </h1>
        <p className="type-body-sm text-foreground-muted mt-2">
          Unified library of components, templates, themes, effects, palettes,
          and typography — version-ready and searchable.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-md flex-1">
          <Search
            className="text-foreground-subtle absolute top-1/2 left-3 size-4 -translate-y-1/2"
            aria-hidden
          />
          <Input
            placeholder="Search assets…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            aria-label="Search assets"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as AssetSort)}
          className="border-border type-body-sm rounded-[var(--radius-md)] border px-3 py-2"
          aria-label="Sort assets"
        >
          <option value="name">Sort: Name</option>
          <option value="recent">Sort: Recently used</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <TabChip active={kind === "all"} onClick={() => setKind("all")}>
          All
        </TabChip>
        {ASSET_KIND_TABS.map((k) => (
          <TabChip key={k} active={kind === k} onClick={() => setKind(k)}>
            {ASSET_KIND_LABELS[k]}
          </TabChip>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <SlidersHorizontal
          className="text-foreground-subtle size-4"
          aria-hidden
        />
        <FilterChip active={source === "all"} onClick={() => setSource("all")}>
          All sources
        </FilterChip>
        {(Object.keys(LIBRARY_SOURCE_LABELS) as LibrarySource[]).map((s) => (
          <FilterChip
            key={s}
            active={source === s}
            onClick={() => setSource(s)}
          >
            {LIBRARY_SOURCE_LABELS[s]}
          </FilterChip>
        ))}
        <Button
          variant={favoritesOnly ? "primary" : "outline"}
          size="sm"
          onClick={() => {
            setFavoritesOnly((v) => !v);
            setRecentOnly(false);
          }}
        >
          Favorites
        </Button>
        <Button
          variant={recentOnly ? "primary" : "outline"}
          size="sm"
          onClick={() => {
            setRecentOnly((v) => !v);
            setFavoritesOnly(false);
          }}
        >
          Recently used
        </Button>
      </div>

      {registryQuery.isLoading ? (
        <ListSkeleton rows={8} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((asset) => (
            <div key={asset.id} onClick={() => handleOpen(asset.id)}>
              <AssetCard
                asset={asset}
                isFavorite={favoriteIds.includes(asset.id)}
                onToggleFavorite={handleFavorite}
              />
            </div>
          ))}
        </div>
      )}

      <p className="type-body-sm text-foreground-subtle">
        {filtered.length} of {assets.length} assets
      </p>
    </div>
  );
}

function TabChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`type-body-sm rounded-full border px-3 py-1 transition-colors ${
        active
          ? "border-accent bg-accent-muted text-foreground"
          : "border-border text-foreground-muted hover:border-border-strong"
      }`}
    >
      {children}
    </button>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return TabChip({ children, active, onClick });
}
