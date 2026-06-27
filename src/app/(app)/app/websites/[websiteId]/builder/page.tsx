"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  FileText,
  GripVertical,
  Navigation,
  Palette,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import {
  QueryEmptyState,
  QueryErrorState,
  QueryLoadingState,
} from "@/components/shared/query-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { WebsiteStatusBadge } from "@/features/websites/website-status-badge";
import {
  useComponentRegistry,
  useCreatePage,
  useCreateSection,
  useDeleteSection,
  usePageSections,
  useReorderSections,
  useUpdateNavigation,
  useUpdateSeo,
  useUpdateWebsiteConfig,
  useWebsite,
  useWebsiteConfig,
  useWebsiteNavigation,
  useWebsitePages,
  useWebsiteSeo,
} from "@/hooks/use-api-queries";
import { getErrorMessage } from "@/lib/errors/api-error";
import type { Page, Section } from "@/types/api";

interface BuilderPageProps {
  params: Promise<{ websiteId: string }>;
}

export default function WebsiteBuilderPage({ params }: BuilderPageProps) {
  const { websiteId } = use(params);
  const websiteQuery = useWebsite(websiteId);
  const pagesQuery = useWebsitePages(websiteId);
  const registryQuery = useComponentRegistry();
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  const pages = pagesQuery.data ?? [];
  const activePageId = selectedPageId ?? pages[0]?.id ?? null;

  if (websiteQuery.isLoading || pagesQuery.isLoading) {
    return <QueryLoadingState label="Loading builder…" />;
  }

  if (websiteQuery.error) {
    return (
      <QueryErrorState
        error={websiteQuery.error}
        onRetry={() => websiteQuery.refetch()}
        isRetrying={websiteQuery.isFetching}
      />
    );
  }

  const website = websiteQuery.data;
  if (!website) {
    return (
      <QueryErrorState
        title="Website not found"
        description="This website may have been removed."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Button asChild variant="ghost" size="sm" className="mb-3 -ml-2">
            <Link href={`/app/businesses/${website.businessId ?? ""}`}>
              ← Back
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
              {website.name}
            </h1>
            <WebsiteStatusBadge status={website.status} />
          </div>
          <p className="type-body-sm text-foreground-muted mt-2">
            Visual website builder
          </p>
        </div>
      </div>

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList aria-label="Builder sections">
          <TabsTrigger value="pages">
            <FileText className="size-4" aria-hidden />
            Pages
          </TabsTrigger>
          <TabsTrigger value="sections" disabled={!activePageId}>
            Sections
          </TabsTrigger>
          <TabsTrigger value="navigation">
            <Navigation className="size-4" aria-hidden />
            Navigation
          </TabsTrigger>
          <TabsTrigger value="seo">
            <Search className="size-4" aria-hidden />
            SEO
          </TabsTrigger>
          <TabsTrigger value="theme">
            <Palette className="size-4" aria-hidden />
            Theme
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <PagesPanel
            websiteId={websiteId}
            pages={pages}
            selectedPageId={activePageId}
            onSelectPage={setSelectedPageId}
            isLoading={pagesQuery.isFetching}
          />
        </TabsContent>

        <TabsContent value="sections">
          {activePageId ? (
            <SectionsPanel
              pageId={activePageId}
              registry={registryQuery.data ?? []}
              registryLoading={registryQuery.isLoading}
            />
          ) : (
            <QueryEmptyState
              title="Select a page"
              description="Create or select a page to edit its sections."
            />
          )}
        </TabsContent>

        <TabsContent value="navigation">
          <NavigationPanel websiteId={websiteId} />
        </TabsContent>

        <TabsContent value="seo">
          <SeoPanel websiteId={websiteId} />
        </TabsContent>

        <TabsContent value="theme">
          <ThemePanel websiteId={websiteId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PagesPanel({
  websiteId,
  pages,
  selectedPageId,
  onSelectPage,
  isLoading,
}: {
  websiteId: string;
  pages: Page[];
  selectedPageId: string | null;
  onSelectPage: (id: string) => void;
  isLoading: boolean;
}) {
  const { addToast } = useToast();
  const createPage = useCreatePage(websiteId);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const page = await createPage.mutateAsync({
        title: title.trim(),
        slug: slug.trim() || undefined,
      });
      onSelectPage(page.id);
      setTitle("");
      setSlug("");
      addToast({ title: "Page created", variant: "success" });
    } catch (err) {
      addToast({
        title: "Could not create page",
        description: getErrorMessage(err),
        variant: "error",
      });
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        <h2 className="type-heading-sm font-medium">Pages</h2>
        {isLoading && !pages.length ? (
          <ListSkeleton rows={3} />
        ) : pages.length === 0 ? (
          <QueryEmptyState
            title="No pages"
            description="Create your first page."
          />
        ) : (
          pages.map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => onSelectPage(page.id)}
              className={`surface-2 w-full rounded-[var(--radius-xl)] border p-4 text-left transition-colors ${
                selectedPageId === page.id
                  ? "border-accent bg-accent-muted/40"
                  : "border-border hover:border-border-strong"
              }`}
            >
              <p className="type-heading-sm font-medium">{page.title}</p>
              <p className="type-body-sm text-foreground-muted mt-1">
                /{page.slug ?? page.path?.replace(/^\//, "") ?? "untitled"}
              </p>
            </button>
          ))
        )}
      </div>

      <form
        onSubmit={handleCreate}
        className="surface-2 border-border space-y-4 rounded-[var(--radius-2xl)] border p-6"
      >
        <h2 className="type-heading-sm font-medium">Add page</h2>
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Home"
        />
        <Input
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="home"
        />
        <Button
          type="submit"
          isLoading={createPage.isPending}
          disabled={!title.trim()}
        >
          <Plus className="size-4" aria-hidden />
          Create page
        </Button>
      </form>
    </div>
  );
}

function SectionsPanel({
  pageId,
  registry,
  registryLoading,
}: {
  pageId: string;
  registry: { key: string; displayName: string; category: string }[];
  registryLoading: boolean;
}) {
  const { addToast } = useToast();
  const sectionsQuery = usePageSections(pageId);
  const createSection = useCreateSection(pageId);
  const deleteSection = useDeleteSection(pageId);
  const reorder = useReorderSections(pageId);
  const [componentKey, setComponentKey] = useState("hero.basic");

  const sections = useMemo(
    () =>
      [...(sectionsQuery.data ?? [])].sort(
        (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
      ),
    [sectionsQuery.data],
  );

  async function handleAdd() {
    try {
      await createSection.mutateAsync({
        componentKey,
        sortOrder: sections.length,
      });
      addToast({ title: "Section added", variant: "success" });
    } catch (err) {
      addToast({
        title: "Could not add section",
        description: getErrorMessage(err),
        variant: "error",
      });
    }
  }

  function moveSection(index: number, direction: -1 | 1) {
    const next = [...sections];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    const tmp = next[index];
    next[index] = next[target];
    next[target] = tmp;
    void reorder.mutateAsync(next.map((s) => s.id));
  }

  if (sectionsQuery.isLoading) return <ListSkeleton rows={4} />;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <div className="space-y-3">
        <h2 className="type-heading-sm font-medium">Section order</h2>
        <p className="type-body-sm text-foreground-muted">
          Drag handles are placeholders — use arrows to reorder for now.
        </p>

        {sections.length === 0 ? (
          <QueryEmptyState
            title="No sections"
            description="Add a section from the component registry."
          />
        ) : (
          sections.map((section, index) => (
            <SectionRow
              key={section.id}
              section={section}
              index={index}
              total={sections.length}
              onMoveUp={() => moveSection(index, -1)}
              onMoveDown={() => moveSection(index, 1)}
              onDelete={async () => {
                try {
                  await deleteSection.mutateAsync(section.id);
                  addToast({ title: "Section removed", variant: "success" });
                } catch (err) {
                  addToast({
                    title: "Could not remove section",
                    description: getErrorMessage(err),
                    variant: "error",
                  });
                }
              }}
            />
          ))
        )}
      </div>

      <div className="surface-2 border-border space-y-4 rounded-[var(--radius-2xl)] border p-6">
        <h2 className="type-heading-sm font-medium">Add section</h2>
        {registryLoading ? (
          <ListSkeleton rows={2} />
        ) : (
          <>
            <label
              className="type-body-sm block font-medium"
              htmlFor="component-key"
            >
              Component
            </label>
            <select
              id="component-key"
              value={componentKey}
              onChange={(e) => setComponentKey(e.target.value)}
              className="border-input bg-surface-1 h-11 w-full rounded-[var(--radius-lg)] border px-3 text-sm"
            >
              {registry.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.displayName} ({item.key})
                </option>
              ))}
            </select>
            <Button
              onClick={handleAdd}
              isLoading={createSection.isPending}
              className="w-full"
            >
              <Plus className="size-4" aria-hidden />
              Add section
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function SectionRow({
  section,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onDelete,
}: {
  section: Section;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="surface-2 border-border flex items-center gap-3 rounded-[var(--radius-xl)] border p-4">
      <GripVertical
        className="text-foreground-subtle size-4 shrink-0 cursor-grab"
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className="type-body-sm font-medium">{section.componentKey}</p>
        <Badge variant="outline" className="mt-1">
          {section.variant ?? "default"}
        </Badge>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMoveUp}
          disabled={index === 0}
          aria-label="Move section up"
        >
          <ArrowUp className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onMoveDown}
          disabled={index === total - 1}
          aria-label="Move section down"
        >
          <ArrowDown className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          aria-label="Delete section"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function NavigationPanel({ websiteId }: { websiteId: string }) {
  const { addToast } = useToast();
  const navQuery = useWebsiteNavigation(websiteId);
  const updateNav = useUpdateNavigation(websiteId);
  const [itemsJson, setItemsJson] = useState("");

  if (navQuery.isLoading) return <ListSkeleton rows={3} />;

  if (navQuery.error) {
    return (
      <QueryErrorState
        error={navQuery.error}
        onRetry={() => navQuery.refetch()}
        isRetrying={navQuery.isFetching}
      />
    );
  }

  const items = navQuery.data?.items ?? [];
  const displayJson = itemsJson || JSON.stringify(items, null, 2);

  async function handleSave() {
    try {
      const parsed = JSON.parse(displayJson) as {
        label: string;
        href: string;
      }[];
      await updateNav.mutateAsync({ websiteId, items: parsed });
      addToast({ title: "Navigation saved", variant: "success" });
    } catch (err) {
      addToast({
        title: "Could not save navigation",
        description: getErrorMessage(err),
        variant: "error",
      });
    }
  }

  return (
    <div className="surface-2 border-border space-y-4 rounded-[var(--radius-2xl)] border p-6">
      <h2 className="type-heading-sm font-medium">Navigation items</h2>
      <Textarea
        label="Items (JSON)"
        value={displayJson}
        onChange={(e) => setItemsJson(e.target.value)}
        rows={10}
        className="font-mono text-xs"
      />
      <Button onClick={handleSave} isLoading={updateNav.isPending}>
        Save navigation
      </Button>
    </div>
  );
}

function SeoPanel({ websiteId }: { websiteId: string }) {
  const { addToast } = useToast();
  const seoQuery = useWebsiteSeo(websiteId);
  const updateSeo = useUpdateSeo(websiteId);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  if (seoQuery.isLoading) return <ListSkeleton rows={2} />;

  const seo = seoQuery.data;
  const title = metaTitle || seo?.metaTitle || "";
  const description = metaDescription || seo?.metaDescription || "";

  async function handleSave() {
    try {
      await updateSeo.mutateAsync({
        metaTitle: title,
        metaDescription: description,
      });
      addToast({ title: "SEO settings saved", variant: "success" });
    } catch (err) {
      addToast({
        title: "Could not save SEO",
        description: getErrorMessage(err),
        variant: "error",
      });
    }
  }

  return (
    <div className="surface-2 border-border max-w-2xl space-y-4 rounded-[var(--radius-2xl)] border p-6">
      <Input
        label="Meta title"
        value={title}
        onChange={(e) => setMetaTitle(e.target.value)}
      />
      <Textarea
        label="Meta description"
        value={description}
        onChange={(e) => setMetaDescription(e.target.value)}
        rows={4}
      />
      <Button onClick={handleSave} isLoading={updateSeo.isPending}>
        Save SEO
      </Button>
    </div>
  );
}

function ThemePanel({ websiteId }: { websiteId: string }) {
  const { addToast } = useToast();
  const configQuery = useWebsiteConfig(websiteId);
  const updateConfig = useUpdateWebsiteConfig(websiteId);
  const [themeId, setThemeId] = useState("");

  if (configQuery.isLoading) return <ListSkeleton rows={2} />;

  const currentTheme = themeId || configQuery.data?.themeId || "default";

  async function handleSave() {
    try {
      await updateConfig.mutateAsync({ themeId: currentTheme });
      addToast({ title: "Theme updated", variant: "success" });
    } catch (err) {
      addToast({
        title: "Could not update theme",
        description: getErrorMessage(err),
        variant: "error",
      });
    }
  }

  return (
    <div className="surface-2 border-border max-w-md space-y-4 rounded-[var(--radius-2xl)] border p-6">
      <Input
        label="Theme ID"
        value={currentTheme}
        onChange={(e) => setThemeId(e.target.value)}
        hint="Assign a theme preset from your workspace"
      />
      <Button onClick={handleSave} isLoading={updateConfig.isPending}>
        Save theme
      </Button>
    </div>
  );
}
