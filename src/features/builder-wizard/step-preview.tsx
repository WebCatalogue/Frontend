"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { ThemeEngineProvider } from "@/features/platform/theme-engine";
import { getOptionById } from "@/features/marketplace/catalog";
import { MarketplaceSection } from "@/features/marketplace/marketplace-renderer";
import { BUILDER_PREVIEW_CAPTURE_ID } from "@/features/builder-wizard/enquiry/constants";
import { cn } from "@/lib/utils";
import type { PreviewDevice } from "@/features/marketplace/types";

interface StepPreviewProps {
  industryId: string;
  themeId: string;
  paletteId: string;
  sectionOrder: string[];
  selections: Record<string, string>;
}

const DEVICE_OPTIONS: {
  id: PreviewDevice;
  label: string;
  icon: typeof Monitor;
  width: string;
}[] = [
  { id: "desktop", label: "Desktop", icon: Monitor, width: "100%" },
  { id: "tablet", label: "Tablet", icon: Tablet, width: "768px" },
  { id: "mobile", label: "Mobile", icon: Smartphone, width: "390px" },
];

export function StepPreview({
  industryId,
  themeId,
  paletteId,
  sectionOrder,
  selections,
}: StepPreviewProps) {
  const [device, setDevice] = useState<PreviewDevice>("desktop");

  const sections = useMemo(() => {
    return sectionOrder
      .map((categoryId) => {
        const optionId = selections[categoryId];
        if (!optionId) return null;
        const option = getOptionById(optionId);
        if (!option) return null;
        return { categoryId, option };
      })
      .filter(Boolean) as Array<{
      categoryId: string;
      option: NonNullable<ReturnType<typeof getOptionById>>;
    }>;
  }, [sectionOrder, selections]);

  const activeDevice = DEVICE_OPTIONS.find((item) => item.id === device)!;

  return (
    <ThemeEngineProvider
      key={`${themeId}-${paletteId}`}
      initialThemeId={themeId}
      initialPaletteId={paletteId}
    >
      <div className="builder-preview">
        <div className="builder-preview__toolbar">
          <p className="type-body-sm text-foreground-muted">
            Your assembled website preview
          </p>
          <div className="builder-preview__devices" role="tablist">
            {DEVICE_OPTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={device === id}
                onClick={() => setDevice(id)}
                className={cn(
                  "builder-preview__device",
                  device === id && "builder-preview__device--active",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="builder-preview__stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={device}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="builder-preview__frame"
              style={{ width: activeDevice.width, maxWidth: "100%" }}
            >
              <div className="builder-preview__browser">
                <div className="builder-preview__browser-chrome" aria-hidden>
                  <span />
                  <span />
                  <span />
                </div>
                <div
                  id={BUILDER_PREVIEW_CAPTURE_ID}
                  className="builder-preview__content"
                >
                  {sections.map(({ categoryId, option }) => (
                    <MarketplaceSection
                      key={`${categoryId}-${option.id}`}
                      option={option}
                      industrySlug={industryId}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ThemeEngineProvider>
  );
}
