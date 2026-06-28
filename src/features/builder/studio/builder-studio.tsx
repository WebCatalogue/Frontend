"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  Copy,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { CatalogueThumbnail } from "@/features/catalogue/catalogue-thumbnail";
import { RegistrySection } from "@/features/builder/registry";
import { getFullCatalogue } from "@/features/platform/catalogue-meta";
import { PLATFORM_RECIPES } from "@/features/platform/recipes";
import { resolveEffect } from "@/features/builder/effects";
import { INDUSTRY_PRESETS } from "@/features/platform/industry-presets";
import {
  ThemeEngineProvider,
  useThemeEngine,
} from "@/features/platform/theme-engine";
import { getTheme } from "@/features/platform/themes";
import { WebsiteStatusBadge } from "@/features/websites/website-status-badge";
import {
  useComponentRegistry,
  useCreatePage,
  useCreateSection,
  useDeleteSection,
  usePageSections,
  useReorderSections,
  useUpdateNavigation,
  useWebsiteNavigation,
  useWebsitePages,
} from "@/hooks/use-api-queries";
import { getErrorMessage } from "@/lib/errors/api-error";
import type { PublishedSection, Section, Website } from "@/types/api";
import { cn } from "@/lib/utils";
import { BuilderStudioProvider, useBuilderStudio } from "./builder-context";
import {
  AnimationsPanelContent,
  BusinessDataPanelWrapper,
  RightPanelTabs,
  SectionSettingsEditor,
  SeoPanelContent,
  ThemePanelContent,
  TokensPanelContent,
} from "./builder-right-panels";
import {
  BuilderStatusBar,
  PreviewDeviceToolbar,
  previewDeviceWidth,
} from "./builder-status-bar";
import {
  BuilderCanvasFrame,
  BuilderRightPanel,
  BuilderSidebar,
  SectionDragHandle,
} from "./builder-shell";

interface BuilderStudioProps {
  website: Website;
}

export function BuilderStudio({ website }: BuilderStudioProps) {
  const pagesQuery = useWebsitePages(website.id);
  const pages = pagesQuery.data ?? [];

  return (
    <ThemeEngineProvider
      initialThemeId={website.themeId ?? "modern"}
      initialPaletteId={getTheme(website.themeId ?? "modern").defaultPaletteId}
    >
      <BuilderStudioProvider websiteId={website.id} pages={pages} sections={[]}>
        <BuilderStudioInner
          website={website}
          pagesLoading={pagesQuery.isLoading}
        />
      </BuilderStudioProvider>
    </ThemeEngineProvider>
  );
}

function BuilderStudioInner({
  website,
  pagesLoading,
}: {
  website: Website;
  pagesLoading: boolean;
}) {
  const {
    rightPanel,
    setRightPanel,
    selectedPageId,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useBuilderStudio();
  const sectionsQuery = usePageSections(selectedPageId ?? "");
  const sections = sectionsQuery.data ?? [];
  const reorder = useReorderSections(selectedPageId ?? "");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        if (canUndo && selectedPageId) {
          const snap = undo();
          if (snap?.sectionIds.length) {
            void reorder.mutateAsync(snap.sectionIds);
          }
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        if (canRedo && selectedPageId) {
          const snap = redo();
          if (snap?.sectionIds.length) {
            void reorder.mutateAsync(snap.sectionIds);
          }
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo, canUndo, canRedo, selectedPageId, reorder]);

  const rightTitle =
    rightPanel === "theme"
      ? "Theme"
      : rightPanel === "tokens"
        ? "Design tokens"
        : rightPanel === "animations"
          ? "Effect layers"
          : rightPanel === "business-data"
            ? "Business data"
            : rightPanel === "seo"
              ? "SEO"
              : "Properties";

  return (
    <div className="bg-background fixed inset-0 z-[var(--z-index-fixed)] flex flex-col">
      <header className="border-border flex h-14 shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/app/businesses/${website.businessId ?? ""}`}>
              <ChevronLeft className="size-4" aria-hidden />
              Exit
            </Link>
          </Button>
          <span className="type-heading-sm font-medium">{website.name}</span>
          <WebsiteStatusBadge status={website.status} />
        </div>
        <span className="type-label text-foreground-subtle hidden sm:inline">
          Composer
        </span>
      </header>

      <div className="flex min-h-0 flex-1">
        <BuilderSidebar>
          <SidebarPanelContent
            websiteId={website.id}
            loading={pagesLoading || sectionsQuery.isLoading}
            sections={sections}
          />
        </BuilderSidebar>

        <BuilderCanvas websiteName={website.name} sections={sections} />

        <aside className="border-border bg-background flex w-80 shrink-0 flex-col border-l">
          <RightPanelTabs
            active={rightPanel}
            onChange={(tab) => setRightPanel(tab as typeof rightPanel)}
          />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <BuilderRightPanel title={rightTitle}>
              <RightPanelContent
                websiteId={website.id}
                sections={sections}
                panel={rightPanel}
              />
            </BuilderRightPanel>
          </div>
        </aside>
      </div>
      <BuilderStatusBar websiteStatus={website.status} />
    </div>
  );
}

function RightPanelContent({
  websiteId,
  sections,
  panel,
}: {
  websiteId: string;
  sections: Section[];
  panel: string;
}) {
  const { selectedSectionId, selectedPageId } = useBuilderStudio();
  const selected = sections.find((s) => s.id === selectedSectionId);

  switch (panel) {
    case "theme":
      return <ThemePanelContent websiteId={websiteId} />;
    case "tokens":
      return <TokensPanelContent />;
    case "animations":
      return <AnimationsPanelContent />;
    case "business-data":
      return <BusinessDataPanelWrapper websiteId={websiteId} />;
    case "seo":
      return <SeoPanelContent websiteId={websiteId} />;
    default:
      return (
        <PropertiesPanelContent
          sections={sections}
          selected={selected}
          pageId={selectedPageId}
        />
      );
  }
}

function SidebarPanelContent({
  websiteId,
  loading,
  sections,
}: {
  websiteId: string;
  loading: boolean;
  sections: Section[];
}) {
  const { sidebarPanel } = useBuilderStudio();
  if (loading)
    return <p className="type-body-sm text-foreground-muted">Loading…</p>;

  switch (sidebarPanel) {
    case "pages":
      return <PagesPanel websiteId={websiteId} />;
    case "sections":
      return <SectionsPanel sections={sections} />;
    case "components":
      return <ComponentsPanel />;
    case "templates":
      return <TemplatesPanel websiteId={websiteId} />;
    case "recipes":
      return <RecipesPanel websiteId={websiteId} />;
    case "media":
      return <MediaPanel />;
    case "navigation":
      return <NavigationPanel websiteId={websiteId} />;
    default:
      return null;
  }
}

function PagesPanel({ websiteId }: { websiteId: string }) {
  const { pages, selectedPageId, setSelectedPageId } = useBuilderStudio();
  const { addToast } = useToast();
  const createPage = useCreatePage(websiteId);
  const [title, setTitle] = useState("");

  async function handleCreate() {
    if (!title.trim()) return;
    try {
      const page = await createPage.mutateAsync({ title: title.trim() });
      setSelectedPageId(page.id);
      setTitle("");
      addToast({ title: "Page created", variant: "success" });
    } catch (err) {
      addToast({
        title: "Error",
        description: getErrorMessage(err),
        variant: "error",
      });
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="type-heading-sm font-medium">Pages</h3>
      {pages.map((page) => (
        <button
          key={page.id}
          type="button"
          onClick={() => setSelectedPageId(page.id)}
          className={`w-full rounded-[var(--radius-lg)] border p-3 text-left text-sm transition-colors ${
            selectedPageId === page.id
              ? "border-accent bg-accent-muted/40"
              : "border-border hover:border-border-strong"
          }`}
        >
          {page.title}
        </button>
      ))}
      <div className="space-y-2 border-t pt-4">
        <Input
          placeholder="New page title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          size="sm"
          className="w-full"
          onClick={handleCreate}
          isLoading={createPage.isPending}
        >
          <Plus className="size-4" aria-hidden />
          Add page
        </Button>
      </div>
    </div>
  );
}

function SectionsPanel({ sections }: { sections: Section[] }) {
  const {
    selectedSectionId,
    setSelectedSectionId,
    selectedPageId,
    setRightPanel,
    pushHistory,
  } = useBuilderStudio();
  const reorder = useReorderSections(selectedPageId ?? "");
  const [dragId, setDragId] = useState<string | null>(null);
  const sorted = [...sections].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  );

  async function handleReorder(fromId: string, toId: string) {
    if (fromId === toId) return;
    const fromIndex = sorted.findIndex((s) => s.id === fromId);
    const toIndex = sorted.findIndex((s) => s.id === toId);
    if (fromIndex < 0 || toIndex < 0) return;
    const next = [...sorted];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    pushHistory(sorted, "Reorder sections");
    await reorder.mutateAsync(next.map((s) => s.id));
  }

  if (!selectedPageId) {
    return (
      <p className="type-body-sm text-foreground-muted">Select a page first.</p>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="type-heading-sm font-medium">Page sections</h3>
      <p className="type-body-sm text-foreground-muted">
        Drag to reorder sections on the canvas.
      </p>
      {sorted.length === 0 ? (
        <p className="type-body-sm text-foreground-muted">
          No sections yet. Add from Components.
        </p>
      ) : (
        sorted.map((section, index) => (
          <div
            key={section.id}
            draggable
            onDragStart={() => setDragId(section.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragId) void handleReorder(dragId, section.id);
              setDragId(null);
            }}
            onDragEnd={() => setDragId(null)}
          >
            <button
              type="button"
              onClick={() => {
                setSelectedSectionId(section.id);
                setRightPanel("properties");
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded-[var(--radius-lg)] border p-3 text-left transition-colors",
                selectedSectionId === section.id
                  ? "border-accent bg-accent-muted/30"
                  : "border-border hover:border-border-strong",
                dragId === section.id && "opacity-50",
              )}
            >
              <SectionDragHandle />
              <div className="min-w-0 flex-1">
                <p className="type-body-sm truncate font-medium">
                  {section.componentKey}
                </p>
                <p className="type-label text-foreground-subtle">
                  #{index + 1}
                </p>
              </div>
            </button>
          </div>
        ))
      )}
    </div>
  );
}

function ComponentsPanel() {
  const { selectedPageId, setSelectedSectionId } = useBuilderStudio();
  const registryQuery = useComponentRegistry();
  const createSection = useCreateSection(selectedPageId ?? "");
  const { addToast } = useToast();
  const catalogue = getFullCatalogue(registryQuery.data ?? []).filter(
    (item) => item.kind === "section",
  );

  if (!selectedPageId) {
    return (
      <p className="type-body-sm text-foreground-muted">Select a page first.</p>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="type-heading-sm font-medium">Component catalogue</h3>
      {catalogue.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={async () => {
            try {
              const section = await createSection.mutateAsync({
                componentKey: item.key,
              });
              setSelectedSectionId(section.id);
              addToast({
                title: `${item.displayName} added`,
                variant: "success",
              });
            } catch (err) {
              addToast({
                title: "Error",
                description: getErrorMessage(err),
                variant: "error",
              });
            }
          }}
          className="hover:border-border-strong border-border w-full overflow-hidden rounded-[var(--radius-lg)] border text-left transition-colors"
        >
          <CatalogueThumbnail
            item={item}
            className="h-20 rounded-none border-0"
          />
          <div className="p-3">
            <p className="type-body-sm font-medium">{item.displayName}</p>
            <p className="type-body-sm text-foreground-muted line-clamp-1">
              {item.description}
            </p>
            <Badge variant="outline" className="mt-2 capitalize">
              {item.category}
            </Badge>
          </div>
        </button>
      ))}
    </div>
  );
}

function RecipesPanel({ websiteId }: { websiteId: string }) {
  const { selectedPageId } = useBuilderStudio();
  const createSection = useCreateSection(selectedPageId ?? "");
  const { addToast } = useToast();
  const { setThemeId, setPaletteId } = useThemeEngine();

  if (!selectedPageId) {
    return (
      <p className="type-body-sm text-foreground-muted">Select a page first.</p>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="type-heading-sm font-medium">Recipes</h3>
      <p className="type-body-sm text-foreground-muted">
        Pre-composed stacks — not full templates. Inserts sections, theme, and
        effects.
      </p>
      {PLATFORM_RECIPES.map((recipe) => (
        <button
          key={recipe.id}
          type="button"
          onClick={async () => {
            try {
              setThemeId(recipe.themeId);
              setPaletteId(recipe.paletteId);
              for (const s of recipe.sections) {
                await createSection.mutateAsync({
                  componentKey: s.componentKey,
                  settings: s.settings,
                });
              }
              addToast({
                title: `${recipe.name} inserted`,
                variant: "success",
              });
            } catch (err) {
              addToast({
                title: "Error",
                description: getErrorMessage(err),
                variant: "error",
              });
            }
            void websiteId;
          }}
          className="hover:border-border-strong border-border w-full rounded-[var(--radius-lg)] border p-3 text-left"
        >
          <p className="type-body-sm font-medium">{recipe.name}</p>
          <p className="type-body-sm text-foreground-muted mt-1 line-clamp-2">
            {recipe.description}
          </p>
          <p className="type-label text-foreground-subtle mt-2">
            {recipe.sections.length} sections · {recipe.themeId}
          </p>
        </button>
      ))}
    </div>
  );
}

function TemplatesPanel({ websiteId }: { websiteId: string }) {
  const { selectedPageId } = useBuilderStudio();
  const createSection = useCreateSection(selectedPageId ?? "");
  const { addToast } = useToast();

  if (!selectedPageId) {
    return (
      <p className="type-body-sm text-foreground-muted">Select a page first.</p>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="type-heading-sm font-medium">Industry templates</h3>
      {INDUSTRY_PRESETS.map((preset) => (
        <button
          key={preset.id}
          type="button"
          onClick={async () => {
            try {
              for (const key of preset.recommendedSections) {
                await createSection.mutateAsync({ componentKey: key });
              }
              addToast({
                title: `${preset.name} template applied`,
                variant: "success",
              });
            } catch (err) {
              addToast({
                title: "Error",
                description: getErrorMessage(err),
                variant: "error",
              });
            }
            void websiteId;
          }}
          className="hover:border-border-strong border-border w-full rounded-[var(--radius-lg)] border p-3 text-left"
        >
          <span className="text-2xl" aria-hidden>
            {preset.icon}
          </span>
          <p className="type-body-sm mt-2 font-medium">{preset.name}</p>
          <p className="type-body-sm text-foreground-muted">
            {preset.description}
          </p>
        </button>
      ))}
    </div>
  );
}

function MediaPanel() {
  return (
    <div className="space-y-3">
      <h3 className="type-heading-sm font-medium">Media</h3>
      <p className="type-body-sm text-foreground-muted">
        Upload assets from the{" "}
        <Link href="/app/media" className="text-accent hover:underline">
          Media Library
        </Link>
        .
      </p>
    </div>
  );
}

function NavigationPanel({ websiteId }: { websiteId: string }) {
  const navQuery = useWebsiteNavigation(websiteId);
  const updateNav = useUpdateNavigation(websiteId);
  const { addToast } = useToast();
  const [json, setJson] = useState("");

  const display = json || JSON.stringify(navQuery.data?.items ?? [], null, 2);

  return (
    <div className="space-y-3">
      <h3 className="type-heading-sm font-medium">Navigation</h3>
      <Textarea
        value={display}
        onChange={(e) => setJson(e.target.value)}
        rows={12}
        className="font-mono text-xs"
      />
      <Button
        size="sm"
        onClick={async () => {
          try {
            const items = JSON.parse(display) as {
              label: string;
              href: string;
            }[];
            await updateNav.mutateAsync({ websiteId, items });
            addToast({ title: "Navigation saved", variant: "success" });
          } catch (err) {
            addToast({
              title: "Error",
              description: getErrorMessage(err),
              variant: "error",
            });
          }
        }}
        isLoading={updateNav.isPending}
      >
        Save
      </Button>
    </div>
  );
}

function BuilderCanvas({
  websiteName,
  sections,
}: {
  websiteName: string;
  sections: Section[];
}) {
  const {
    selectedSectionId,
    setSelectedSectionId,
    setRightPanel,
    previewDevice,
    effectLayers,
    selectedPageId,
  } = useBuilderStudio();
  const sorted = [...sections].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  );
  const pageEffects = effectLayers.filter(
    (l) => l.enabled && l.target === "page" && l.targetId === selectedPageId,
  );
  const widthClass = previewDeviceWidth(previewDevice);

  let canvas = (
    <div
      className={cn(
        "mx-auto min-h-full w-full transition-all duration-300",
        widthClass,
      )}
    >
      <AnimatePresence mode="popLayout">
        {sorted.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center p-8 text-center">
            <p className="text-foreground-muted">
              Add components from the sidebar to build your page.
            </p>
          </div>
        ) : (
          sorted.map((section) => {
            const sectionFx = effectLayers.filter(
              (l) =>
                l.enabled &&
                l.target === "section" &&
                l.targetId === section.id,
            );
            let block = (
              <RegistrySection
                section={
                  {
                    id: section.id,
                    componentKey: section.componentKey,
                    variant: section.variant,
                    settings: section.settings,
                    sortOrder: section.sortOrder,
                  } as PublishedSection
                }
              />
            );
            for (const fx of sectionFx) {
              const Effect = resolveEffect(fx.effectKey);
              if (Effect) block = <Effect key={fx.id}>{block}</Effect>;
            }
            return (
              <motion.div
                key={section.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                onClick={() => {
                  setSelectedSectionId(section.id);
                  setRightPanel("properties");
                }}
                className={cn(
                  "relative cursor-pointer transition-shadow",
                  selectedSectionId === section.id &&
                    "ring-2 ring-[var(--preview-primary,var(--color-accent))] ring-inset",
                )}
              >
                {block}
              </motion.div>
            );
          })
        )}
      </AnimatePresence>
    </div>
  );

  for (const fx of pageEffects) {
    const Effect = resolveEffect(fx.effectKey);
    if (Effect) canvas = <Effect key={fx.id}>{canvas}</Effect>;
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <PreviewDeviceToolbar />
      <BuilderCanvasFrame websiteName={websiteName}>
        {canvas}
      </BuilderCanvasFrame>
    </div>
  );
}

function PropertiesPanelContent({
  sections,
  selected,
  pageId,
}: {
  sections: Section[];
  selected?: Section;
  pageId: string | null;
}) {
  const { selectedSectionId, setSelectedSectionId, pushHistory } =
    useBuilderStudio();
  const deleteSection = useDeleteSection(pageId ?? "");
  const createSection = useCreateSection(pageId ?? "");
  const reorder = useReorderSections(pageId ?? "");
  const { addToast } = useToast();

  const sorted = [...sections].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  );

  function move(index: number, dir: -1 | 1) {
    const next = [...sorted];
    const t = index + dir;
    if (t < 0 || t >= next.length) return;
    [next[index], next[t]] = [next[t], next[index]];
    pushHistory(sorted, "Reorder sections");
    void reorder.mutateAsync(next.map((s) => s.id));
  }

  if (!pageId) {
    return <p className="type-body-sm text-foreground-muted">Select a page.</p>;
  }

  return (
    <div className="space-y-4">
      {sorted.map((section, index) => (
        <div
          key={section.id}
          className={cn(
            "rounded-[var(--radius-lg)] border p-3",
            selectedSectionId === section.id
              ? "border-accent bg-accent-muted/30"
              : "border-border",
          )}
        >
          <button
            type="button"
            className="type-body-sm w-full text-left font-medium"
            onClick={() => setSelectedSectionId(section.id)}
          >
            {section.componentKey}
          </button>
          <div className="mt-2 flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => move(index, -1)}
              disabled={index === 0}
              aria-label="Move up"
            >
              <ArrowUp className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => move(index, 1)}
              disabled={index === sorted.length - 1}
              aria-label="Move down"
            >
              <ArrowDown className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                try {
                  pushHistory(sorted, "Duplicate section");
                  const dup = await createSection.mutateAsync({
                    componentKey: section.componentKey,
                    variant: section.variant ?? undefined,
                    settings: section.settings ?? undefined,
                  });
                  setSelectedSectionId(dup.id);
                  addToast({ title: "Section duplicated", variant: "success" });
                } catch (err) {
                  addToast({
                    title: "Duplicate failed",
                    description: getErrorMessage(err),
                    variant: "error",
                  });
                }
              }}
              aria-label="Duplicate"
            >
              <Copy className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                pushHistory(sorted, "Delete section");
                await deleteSection.mutateAsync(section.id);
                addToast({ title: "Removed", variant: "success" });
              }}
              aria-label="Delete"
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>
      ))}

      {selected && pageId && (
        <div className="border-t pt-4">
          <SectionSettingsEditor section={selected} pageId={pageId} />
        </div>
      )}
    </div>
  );
}
