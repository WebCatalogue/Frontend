"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { CatalogueThumbnail } from "@/features/catalogue/catalogue-thumbnail";
import {
  buildAssetRegistry,
  getComponentAsset,
} from "@/features/platform/assets/registry";
import { LIBRARY_SOURCE_LABELS } from "@/features/platform/catalogue-meta";
import { getPropertySchema } from "@/features/builder/properties/schemas";
import { useComponentRegistry } from "@/hooks/use-api-queries";
import { enrichCatalogueItem } from "@/features/platform/catalogue-meta";
import type { BuilderComponentDefinition } from "@/types/api";

export default function ComponentDetailPage() {
  const params = useParams<{ key: string }>();
  const key = decodeURIComponent(params.key ?? "");
  const registryQuery = useComponentRegistry();

  const asset = useMemo(() => {
    const assets = buildAssetRegistry(registryQuery.data ?? []);
    return getComponentAsset(assets, key);
  }, [registryQuery.data, key]);

  const catalogueItem = useMemo(() => {
    const def = registryQuery.data?.find((c) => c.key === key);
    if (!def) return null;
    return enrichCatalogueItem(def as BuilderComponentDefinition);
  }, [registryQuery.data, key]);

  const schema = getPropertySchema(key);

  if (registryQuery.isLoading) {
    return <p className="type-body-sm text-foreground-muted p-8">Loading…</p>;
  }

  if (!asset || !catalogueItem) {
    return (
      <div className="p-8">
        <p className="type-body-md">Component not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/app/assets">Back to registry</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-12">
      <Button asChild variant="ghost" size="sm">
        <Link href="/app/assets">
          <ArrowLeft className="size-4" aria-hidden />
          Asset registry
        </Link>
      </Button>

      <header>
        <p className="section-eyebrow mb-2">Component</p>
        <h1 className="type-display-md text-foreground">{asset.name}</h1>
        <p className="type-body-md text-foreground-muted mt-2">
          {asset.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="accent">{LIBRARY_SOURCE_LABELS[asset.source]}</Badge>
          <Badge variant="outline">v{asset.version}</Badge>
          <Badge variant="outline" className="capitalize">
            {asset.performance}
          </Badge>
          <Badge variant="success">A11y {asset.accessibility}</Badge>
        </div>
      </header>

      <section>
        <h2 className="type-heading-sm mb-4 font-medium">Live preview</h2>
        <CatalogueThumbnail item={catalogueItem} className="h-64" />
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="depth-panel p-6">
          <h2 className="type-heading-sm mb-4 font-medium">Properties</h2>
          <ul className="space-y-2">
            {schema.map((f) => (
              <li
                key={f.key}
                className="type-body-sm flex justify-between gap-4"
              >
                <span className="text-foreground-muted">{f.label}</span>
                <span className="font-mono text-xs">{f.key}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="depth-panel p-6">
          <h2 className="type-heading-sm mb-4 font-medium">
            Compatible themes
          </h2>
          <div className="flex flex-wrap gap-1">
            {asset.supportedThemes.map((t) => (
              <Badge key={t} variant="default">
                {t}
              </Badge>
            ))}
          </div>
          <h2 className="type-heading-sm mt-6 mb-4 font-medium">
            Compatible industries
          </h2>
          <div className="flex flex-wrap gap-1">
            {asset.supportedIndustries.map((i) => (
              <Badge key={i} variant="outline">
                {i}
              </Badge>
            ))}
          </div>
        </section>
      </div>

      <section className="grid gap-6 sm:grid-cols-2">
        <DocBlock title="Documentation" content={asset.documentation} />
        <DocBlock title="Example usage" content={asset.exampleUsage} mono />
        <DocBlock title="Accessibility" content={asset.accessibilityNotes} />
        <DocBlock title="Performance" content={asset.performanceNotes} />
        <DocBlock
          title="Dependencies"
          content={asset.dependencies?.join(", ")}
        />
      </section>

      <div className="flex gap-3">
        <Button asChild>
          <Link href="/app/compose">Use in composer</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/app/assets?kind=component">Browse components</Link>
        </Button>
      </div>
    </div>
  );
}

function DocBlock({
  title,
  content,
  mono,
}: {
  title: string;
  content?: string;
  mono?: boolean;
}) {
  if (!content) return null;
  return (
    <div className="depth-panel p-5">
      <h3 className="type-heading-sm mb-2 font-medium">{title}</h3>
      <p
        className={`type-body-sm text-foreground-muted ${mono ? "font-mono text-xs" : ""}`}
      >
        {content}
      </p>
    </div>
  );
}
