"use client";

import { useRef } from "react";
import { ComponentOptionCard } from "./component-option-card";
import { getOptionById, getOptionsForCategory } from "./catalog";
import type { MarketplaceCategory } from "./types";

interface CategoryGalleryProps {
  category: MarketplaceCategory;
  industrySlug: string;
  selectedOptionId: string | undefined;
  onSelect: (categoryId: string, optionId: string) => void;
  onPreview: (optionId: string) => void;
}

export function CategoryGallery({
  category,
  industrySlug,
  selectedOptionId,
  onSelect,
  onPreview,
}: CategoryGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const options = getOptionsForCategory(category.id, industrySlug);

  if (options.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id={`category-${category.id}`}
      className="scroll-mt-28"
      aria-labelledby={`heading-${category.id}`}
    >
      <div className="mb-8">
        <p className="section-eyebrow mb-2">
          {category.kind === "industry" ? "Industry section" : "Core section"}
        </p>
        <h2
          id={`heading-${category.id}`}
          className="type-display-md text-foreground"
        >
          {category.label}
        </h2>
        <p className="type-body-md text-foreground-muted mt-2 max-w-2xl">
          {category.description}
        </p>
        {selectedOptionId && (
          <p className="type-body-sm text-accent mt-3">
            Active: {getOptionById(selectedOptionId)?.name ?? "—"}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {options.map((option, i) => (
          <ComponentOptionCard
            key={option.id}
            option={option}
            isSelected={selectedOptionId === option.id}
            onSelect={() => onSelect(category.id, option.id)}
            onPreview={() => onPreview(option.id)}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
