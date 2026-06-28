"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeEngineProvider } from "@/features/platform/theme-engine";
import { getOptionById } from "@/features/marketplace/catalog";
import { MarketplaceSection } from "@/features/marketplace/marketplace-renderer";
import { getWizardSectionOrder } from "./constants";
import type { WizardDraftSettings } from "./types";

interface WizardMiniPreviewProps {
  settings: WizardDraftSettings;
  currentStep: number;
  className?: string;
}

const STEP_CATEGORY_MAP: (string | null)[] = [
  null,
  null,
  "navigation",
  "hero",
  "about",
  null,
  "gallery",
  "contact",
];

export function WizardMiniPreview({
  settings,
  currentStep,
  className,
}: WizardMiniPreviewProps) {
  const sectionOrder = useMemo(
    () => getWizardSectionOrder(settings.industryId),
    [settings.industryId],
  );

  const industryCategory =
    sectionOrder.find(
      (id) =>
        ![
          "navigation",
          "hero",
          "about",
          "gallery",
          "contact",
          "footer",
        ].includes(id),
    ) ?? "testimonials";

  const activeCategories = useMemo(() => {
    const map = [...STEP_CATEGORY_MAP];
    map[5] = industryCategory;
    return map;
  }, [industryCategory]);

  const sections = useMemo(() => {
    return sectionOrder
      .map((categoryId) => {
        const optionId = settings.selections[categoryId];
        if (!optionId && categoryId !== "footer") return null;
        if (categoryId === "footer") {
          return {
            categoryId,
            option: getOptionById("footer-simple") ?? {
              id: "footer-simple",
              categoryId: "footer",
              name: "Bottom Section",
              description: "",
              componentKey: "footer.simple",
              screenshot: "",
              supportedThemes: [],
              supportedIndustries: ["*"],
              animations: [],
              mobileReady: true,
              accessibility: "aa" as const,
              performance: "light" as const,
            },
          };
        }
        const option = getOptionById(optionId);
        if (!option) return null;
        return { categoryId, option };
      })
      .filter(Boolean) as Array<{
      categoryId: string;
      option: NonNullable<ReturnType<typeof getOptionById>>;
    }>;
  }, [sectionOrder, settings.selections]);

  return (
    <div
      className={cn(
        "border-border bg-muted/20 flex flex-col overflow-hidden rounded-[var(--radius-2xl)] border",
        className,
      )}
    >
      <div className="border-border bg-background/80 border-b px-4 py-3 backdrop-blur-sm">
        <p className="type-label text-foreground-muted">Live preview</p>
        <p className="type-body-sm text-foreground mt-0.5 font-medium">
          Your website so far
        </p>
      </div>

      <div className="flex flex-1 justify-center overflow-y-auto p-3 sm:p-4">
        <motion.div
          layout
          className="bg-background w-full max-w-sm overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] shadow-lg"
        >
          <ThemeEngineProvider
            initialThemeId={settings.themeId}
            initialPaletteId={settings.paletteId}
          >
            <AnimatePresence mode="popLayout">
              {sections.map(({ categoryId, option }, index) => {
                const stepIndex = activeCategories.indexOf(categoryId);
                const isCompleted =
                  categoryId === "footer" ||
                  (stepIndex >= 0 && currentStep > stepIndex);
                const isCurrent = stepIndex >= 0 && currentStep === stepIndex;
                const isPlaceholder = stepIndex >= 0 && currentStep < stepIndex;

                return (
                  <motion.div
                    key={categoryId}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                    className={cn(
                      "relative transition-all duration-300",
                      isCurrent && "ring-accent/40 ring-2 ring-inset",
                      isCompleted && !isCurrent && "opacity-100",
                      isPlaceholder && "opacity-40",
                    )}
                  >
                    {isPlaceholder ? (
                      <div
                        className="bg-muted/60 flex h-16 items-center justify-center border-b border-dashed border-[var(--color-border-subtle)]"
                        aria-hidden
                      >
                        <span className="type-label text-foreground-subtle">
                          {getPlaceholderLabel(categoryId)}
                        </span>
                      </div>
                    ) : (
                      <div className="origin-top scale-[0.85] sm:scale-90">
                        <MarketplaceSection
                          option={option}
                          industrySlug={settings.industryId}
                        />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </ThemeEngineProvider>
        </motion.div>
      </div>
    </div>
  );
}

function getPlaceholderLabel(categoryId: string): string {
  const labels: Record<string, string> = {
    navigation: "Top Navigation",
    hero: "Welcome Section",
    about: "About Section",
    gallery: "Photos",
    contact: "Contact",
    footer: "Bottom Section",
    menu: "Menu",
    membership: "Membership",
    services: "Services",
  };
  return labels[categoryId] ?? "Section";
}
