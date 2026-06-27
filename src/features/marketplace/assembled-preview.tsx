"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeEngineProvider } from "@/features/platform/theme-engine";
import { getOptionById } from "./catalog";
import { MarketplaceSection } from "./marketplace-renderer";
import type { MarketplaceCategory, PreviewDevice } from "./types";

const DEVICES: { id: PreviewDevice; label: string; width: string }[] = [
  { id: "desktop", label: "Desktop", width: "max-w-5xl" },
  { id: "tablet", label: "Tablet", width: "max-w-2xl" },
  { id: "mobile", label: "Mobile", width: "max-w-sm" },
];

interface AssembledWebsitePreviewProps {
  categories: MarketplaceCategory[];
  selections: Record<string, string>;
  industrySlug: string;
  themeId: string;
  paletteId: string;
  device: PreviewDevice;
  onDeviceChange: (device: PreviewDevice) => void;
}

export function AssembledWebsitePreview({
  categories,
  selections,
  industrySlug,
  themeId,
  paletteId,
  device,
  onDeviceChange,
}: AssembledWebsitePreviewProps) {
  const sections = useMemo(() => {
    return categories
      .map((category) => {
        const optionId = selections[category.id];
        if (!optionId) return null;
        const option = getOptionById(optionId);
        if (!option) return null;
        return { category, option };
      })
      .filter(Boolean) as {
      category: MarketplaceCategory;
      option: NonNullable<ReturnType<typeof getOptionById>>;
    }[];
  }, [categories, selections]);

  const deviceWidth =
    DEVICES.find((d) => d.id === device)?.width ?? "max-w-5xl";

  return (
    <div className="depth-panel overflow-hidden">
      <div
        className="border-border bg-muted/30 flex items-center justify-between border-b px-4 py-3"
        role="toolbar"
        aria-label="Preview device"
      >
        <p className="type-body-sm text-foreground-muted">
          Live assembly · {sections.length} sections
        </p>
        <div className="flex gap-1">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => onDeviceChange(d.id)}
              className={cn(
                "type-body-sm rounded-[var(--radius-md)] px-3 py-1 transition-colors",
                device === d.id
                  ? "bg-accent-muted text-foreground font-medium"
                  : "text-foreground-muted hover:text-foreground",
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center bg-[var(--color-background-subtle)] p-4 sm:p-8">
        <motion.div
          layout
          className={cn(
            "bg-background w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] shadow-xl transition-[max-width] duration-500 ease-out",
            deviceWidth,
          )}
        >
          <ThemeEngineProvider
            initialThemeId={themeId}
            initialPaletteId={paletteId}
          >
            <AnimatePresence mode="popLayout">
              {sections.map(({ option }, index) => (
                <motion.div
                  key={`${option.categoryId}-${option.id}`}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, delay: index * 0.02 }}
                >
                  <MarketplaceSection
                    option={option}
                    industrySlug={industrySlug}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </ThemeEngineProvider>
        </motion.div>
      </div>
    </div>
  );
}
