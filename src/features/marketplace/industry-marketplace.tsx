"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PaletteSelector,
  ThemeEngineProvider,
} from "@/features/platform/theme-engine";
import { ColorSwatches } from "@/components/marketing/color-swatches";
import { PageSection } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { getCategoriesForIndustry } from "./categories";
import { getDefaultSelections } from "./catalog";
import { CategoryGallery } from "./category-gallery";
import { YourWebsitePanel } from "./your-website-panel";
import { AssembledWebsitePreview } from "./assembled-preview";
import { ComponentPreviewModal } from "./component-preview-modal";
import type { PreviewDevice } from "./types";

interface IndustryMarketplaceProps {
  industrySlug: string;
  industryName: string;
  themeId: string;
  paletteId: string;
}

export function IndustryMarketplace({
  industrySlug,
  industryName,
  themeId,
  paletteId,
}: IndustryMarketplaceProps) {
  const router = useRouter();
  const categories = useMemo(
    () => getCategoriesForIndustry(industrySlug),
    [industrySlug],
  );
  const categoryIds = useMemo(() => categories.map((c) => c.id), [categories]);

  const [selections, setSelections] = useState<Record<string, string>>(() =>
    getDefaultSelections(industrySlug, categoryIds),
  );
  const [previewOptionId, setPreviewOptionId] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [device, setDevice] = useState<PreviewDevice>("desktop");
  const [activePaletteId, setActivePaletteId] = useState(paletteId);

  const handleSelect = useCallback((categoryId: string, optionId: string) => {
    setSelections((prev) => ({ ...prev, [categoryId]: optionId }));
  }, []);

  const handlePreview = useCallback((optionId: string) => {
    setPreviewOptionId(optionId);
    setPreviewOpen(true);
  }, []);

  const handleUseFromModal = useCallback(
    (option: { id: string; categoryId: string }) => {
      handleSelect(option.categoryId, option.id);
    },
    [handleSelect],
  );

  const jumpToCategory = useCallback((categoryId: string) => {
    const el = document.getElementById(`category-${categoryId}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleEnquiry = useCallback(() => {
    router.push(ROUTES.enquiry);
  }, [router]);

  const previewIsSelected = previewOptionId
    ? Object.values(selections).includes(previewOptionId)
    : false;

  return (
    <ThemeEngineProvider
      initialThemeId={themeId}
      initialPaletteId={activePaletteId}
    >
      <PageSection subdued id="configure">
        <div className="mb-10 max-w-3xl">
          <p className="section-eyebrow mb-3">Component marketplace</p>
          <h2 className="type-display-md text-foreground">
            Build your {industryName.toLowerCase()} site, section by section
          </h2>
          <p className="type-body-lg text-foreground-muted mt-4">
            Choose one component per category. Your live preview updates
            instantly — no page refresh, no guesswork.
          </p>
        </div>

        <div className="depth-panel mb-12 p-6 sm:p-8">
          <h3 className="type-heading-sm text-foreground">Colour palette</h3>
          <p className="type-body-sm text-foreground-muted mt-2">
            Switch palettes to see how your assembled site feels in different
            tones.
          </p>
          <div className="mt-6">
            <PaletteSelector
              value={activePaletteId}
              onChange={setActivePaletteId}
            />
          </div>
          <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-6">
            <ColorSwatches paletteId={activePaletteId} size="md" showLabels />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] xl:grid-cols-[1fr_20rem]">
          <div className="min-w-0 space-y-20">
            {categories.map((category) => (
              <CategoryGallery
                key={category.id}
                category={category}
                industrySlug={industrySlug}
                selectedOptionId={selections[category.id]}
                onSelect={handleSelect}
                onPreview={handlePreview}
              />
            ))}
          </div>

          <div className="hidden lg:block">
            <YourWebsitePanel
              categories={categories}
              selections={selections}
              onJumpToCategory={jumpToCategory}
              onCompose={handleEnquiry}
              industryName={industryName}
            />
          </div>
        </div>
      </PageSection>

      <PageSection id="live-preview">
        <div className="mb-8 max-w-2xl">
          <p className="section-eyebrow mb-3">Live preview</p>
          <h2 className="type-display-md text-foreground">
            Your assembled website
          </h2>
          <p className="type-body-md text-foreground-muted mt-3">
            Every selection above composes into a complete page. Switch device
            views to see how it adapts.
          </p>
        </div>

        <AssembledWebsitePreview
          categories={categories}
          selections={selections}
          industrySlug={industrySlug}
          themeId={themeId}
          paletteId={activePaletteId}
          device={device}
          onDeviceChange={setDevice}
        />

        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="primary" size="lg" onClick={handleEnquiry}>
            Submit enquiry
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href={ROUTES.visualise}>Visualise your site</Link>
          </Button>
        </div>
      </PageSection>

      <div className="fixed right-4 bottom-4 left-4 z-40 lg:hidden">
        <Button
          variant="primary"
          className="w-full shadow-lg"
          onClick={handleEnquiry}
        >
          Submit enquiry ({Object.keys(selections).length} sections)
        </Button>
      </div>

      <ComponentPreviewModal
        optionId={previewOptionId}
        industrySlug={industrySlug}
        themeId={themeId}
        paletteId={activePaletteId}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        onUse={handleUseFromModal}
        isSelected={previewIsSelected}
      />
    </ThemeEngineProvider>
  );
}
