"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Check, Smartphone, Sparkles, Star } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { getOptionsForCategory } from "@/features/marketplace/catalog";
import { ComponentPreviewModal } from "@/features/marketplace/component-preview-modal";
import type { MarketplaceOption } from "@/features/marketplace/types";
import { cn } from "@/lib/utils";

interface WizardOptionStepProps {
  categoryId: string;
  industryId: string;
  themeId: string;
  paletteId: string;
  selectedOptionId?: string;
  onSelect: (option: MarketplaceOption) => void;
  recommendedId?: string;
}

export function WizardOptionStep({
  categoryId,
  industryId,
  themeId,
  paletteId,
  selectedOptionId,
  onSelect,
  recommendedId,
}: WizardOptionStepProps) {
  const options = getOptionsForCategory(categoryId, industryId).slice(0, 6);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreview = useCallback((optionId: string) => {
    setPreviewId(optionId);
    setPreviewOpen(true);
  }, []);

  const previewOption = previewId
    ? options.find((o) => o.id === previewId)
    : null;

  return (
    <div className="space-y-4">
      <div
        className="grid gap-4 sm:grid-cols-2"
        role="listbox"
        aria-label="Component options"
      >
        {options.map((option, index) => {
          const isSelected = selectedOptionId === option.id;
          const isRecommended = recommendedId === option.id || index === 0;

          return (
            <motion.article
              key={option.id}
              role="option"
              aria-selected={isSelected}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] border transition-all",
                isSelected
                  ? "border-accent ring-accent/30 shadow-lg ring-2"
                  : "border-border hover:border-accent/40 hover:shadow-md",
              )}
            >
              {isRecommended && (
                <span className="bg-accent text-accent-foreground type-label absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full px-2.5 py-1">
                  <Star className="size-3" aria-hidden />
                  Recommended
                </span>
              )}

              {isSelected && (
                <span className="bg-success text-success-foreground type-label absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full px-2.5 py-1">
                  <Check className="size-3" aria-hidden />
                  Selected
                </span>
              )}

              <button
                type="button"
                onClick={() => handlePreview(option.id)}
                className="bg-muted relative aspect-[16/10] w-full overflow-hidden"
                aria-label={`Preview ${option.name}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={option.screenshot}
                  alt=""
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="type-heading-sm font-medium">{option.name}</h3>
                <p className="type-body-sm text-foreground-muted mt-1 line-clamp-2 flex-1">
                  {option.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {option.mobileReady && (
                    <Badge variant="outline" className="gap-1">
                      <Smartphone className="size-3" aria-hidden />
                      Mobile ready
                    </Badge>
                  )}
                  {option.animations.slice(0, 1).map((a) => (
                    <Badge key={a} variant="accent" className="gap-1">
                      <Sparkles className="size-3" aria-hidden />
                      {a}
                    </Badge>
                  ))}
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {option.supportedThemes.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="type-label bg-muted text-foreground-subtle rounded px-1.5 py-0.5 !tracking-normal !normal-case"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handlePreview(option.id)}
                  >
                    Preview
                  </Button>
                  <Button
                    variant={isSelected ? "outline" : "primary"}
                    size="sm"
                    className="flex-1"
                    onClick={() => onSelect(option)}
                  >
                    {isSelected ? "Selected" : "Use This"}
                  </Button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <ComponentPreviewModal
        optionId={previewId}
        industrySlug={industryId}
        themeId={themeId}
        paletteId={paletteId}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        onUse={(option) => onSelect(option)}
        isSelected={previewOption?.id === selectedOptionId}
      />
    </div>
  );
}
