"use client";

import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ThemeEngineProvider } from "@/features/platform/theme-engine";
import { getOptionById } from "./catalog";
import { MarketplaceSection } from "./marketplace-renderer";
import type { MarketplaceOption } from "./types";

interface ComponentPreviewModalProps {
  optionId: string | null;
  industrySlug: string;
  themeId: string;
  paletteId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUse: (option: MarketplaceOption) => void;
  isSelected?: boolean;
}

export function ComponentPreviewModal({
  optionId,
  industrySlug,
  themeId,
  paletteId,
  open,
  onOpenChange,
  onUse,
  isSelected,
}: ComponentPreviewModalProps) {
  const option = optionId ? getOptionById(optionId) : null;
  if (!option) return null;

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent
        className="max-h-[92vh] max-w-4xl overflow-y-auto p-0 sm:p-0"
        showClose
      >
        <div className="border-border border-b p-6">
          <ModalHeader className="text-left">
            <ModalTitle className="type-heading-lg">{option.name}</ModalTitle>
            <ModalDescription className="type-body-md mt-1">
              {option.description}
            </ModalDescription>
          </ModalHeader>
        </div>

        <div className="space-y-6 p-6">
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)]">
            <ThemeEngineProvider
              initialThemeId={themeId}
              initialPaletteId={paletteId}
            >
              <MarketplaceSection option={option} industrySlug={industrySlug} />
            </ThemeEngineProvider>
          </div>

          <div className="flex flex-wrap gap-2">
            {option.animations.map((a) => (
              <span
                key={a}
                className="type-label bg-muted rounded-full px-2.5 py-1 !tracking-normal !normal-case"
              >
                {a}
              </span>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button
              variant={isSelected ? "outline" : "primary"}
              onClick={() => {
                onUse(option);
                onOpenChange(false);
              }}
            >
              {isSelected ? "Already selected" : "Use this component"}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
