"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { DemoImage } from "@/components/marketing/demo-image";
import { ColorSwatches } from "@/components/marketing/color-swatches";
import { ThemeInfoRow } from "@/components/marketing/template-card";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { Badge } from "@/components/ui";
import { getPalette } from "@/features/platform/palettes";
import { getTheme } from "@/features/platform/themes";
import type { IndustryTemplate } from "@/mock/industry-templates";
import { cn } from "@/lib/utils";

type Device = "desktop" | "tablet" | "mobile";

interface TemplatePreviewModalProps {
  template: IndustryTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const deviceConfig: Record<
  Device,
  { label: string; icon: typeof Monitor; width: string; aspect: string }
> = {
  desktop: {
    label: "Desktop",
    icon: Monitor,
    width: "max-w-4xl",
    aspect: "aspect-[16/10]",
  },
  tablet: {
    label: "Tablet",
    icon: Tablet,
    width: "max-w-xl",
    aspect: "aspect-[4/3]",
  },
  mobile: {
    label: "Mobile",
    icon: Smartphone,
    width: "max-w-xs",
    aspect: "aspect-[9/19]",
  },
};

export function TemplatePreviewModal({
  template,
  open,
  onOpenChange,
}: TemplatePreviewModalProps) {
  const [device, setDevice] = useState<Device>("desktop");

  if (!template) return null;

  const theme = getTheme(template.themeId);
  const palette = getPalette(template.paletteId);

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent
        className="max-h-[92vh] max-w-5xl overflow-y-auto p-0 sm:p-0"
        showClose
      >
        <div className="border-border border-b p-6 sm:p-8">
          <ModalHeader className="text-left">
            <ModalTitle className="type-heading-lg">{template.name}</ModalTitle>
            <ModalDescription className="type-body-md mt-1">
              {template.description}
            </ModalDescription>
          </ModalHeader>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap gap-2">
            {(Object.keys(deviceConfig) as Device[]).map((d) => {
              const Icon = deviceConfig[d].icon;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDevice(d)}
                  className={cn(
                    "type-body-sm flex items-center gap-2 rounded-full border px-4 py-2 transition-colors",
                    device === d
                      ? "border-accent bg-accent-muted text-accent"
                      : "text-foreground-muted hover:text-foreground border-[var(--color-border-subtle)]",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                  {deviceConfig[d].label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={device}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <div
                className={cn(
                  "depth-panel w-full overflow-hidden rounded-[var(--radius-xl)]",
                  deviceConfig[device].width,
                )}
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden",
                    deviceConfig[device].aspect,
                  )}
                >
                  <DemoImage
                    src={
                      device === "mobile"
                        ? template.mobileImage
                        : template.desktopImage
                    }
                    alt={`${template.name} ${device} preview`}
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="depth-panel p-6">
              <h3 className="type-heading-sm text-foreground mb-4">Theme</h3>
              <div className="divide-y divide-[var(--color-border-subtle)]">
                <ThemeInfoRow label="Theme" value={theme.name} />
                <ThemeInfoRow
                  label="Typography"
                  value="Instrument Serif + Inter"
                />
                <ThemeInfoRow label="Primary colour" value={palette.primary} />
                <ThemeInfoRow label="Accent colour" value={palette.accent} />
                <ThemeInfoRow
                  label="Border radius"
                  value={template.borderRadius}
                />
                <ThemeInfoRow
                  label="Button style"
                  value={template.buttonStyle}
                  className="capitalize"
                />
                <ThemeInfoRow
                  label="Animation"
                  value={template.animationStyle}
                  className="capitalize"
                />
                <ThemeInfoRow
                  label="Modes"
                  value={template.supportsDarkMode ? "Light + Dark" : "Light"}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="depth-panel p-6">
                <h3 className="type-heading-sm text-foreground mb-4">
                  Colour palette
                </h3>
                <ColorSwatches
                  paletteId={template.paletteId}
                  size="lg"
                  showLabels
                />
              </div>

              <div className="depth-panel p-6">
                <h3 className="type-heading-sm text-foreground mb-4">Pages</h3>
                <div className="flex flex-wrap gap-2">
                  {template.pages.map((p) => (
                    <Badge key={p} variant="default">
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="depth-panel p-6">
                <h3 className="type-heading-sm text-foreground mb-4">
                  Sections included
                </h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {template.sections.map((s) => (
                    <li
                      key={s}
                      className="type-body-sm text-foreground-muted flex items-center gap-2"
                    >
                      <span className="bg-accent size-1.5 shrink-0 rounded-full" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
