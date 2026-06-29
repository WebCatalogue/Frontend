"use client";

import { ComponentOptionCard } from "@/features/marketplace/component-option-card";
import { getOptionsForCategory } from "@/features/marketplace/catalog";
import { getBuilderSectionsForIndustry } from "./constants";

interface StepTemplatesProps {
  industryId: string;
  enabledSections: string[];
  selections: Record<string, string>;
  onSelect: (sectionId: string, optionId: string) => void;
}

export function StepTemplates({
  industryId,
  enabledSections,
  selections,
  onSelect,
}: StepTemplatesProps) {
  const sectionMeta = getBuilderSectionsForIndustry(industryId).filter(
    (section) => enabledSections.includes(section.id),
  );

  return (
    <div className="space-y-10">
      {sectionMeta.map((section) => {
        const options = getOptionsForCategory(section.id, industryId).slice(
          0,
          3,
        );
        if (options.length === 0) return null;

        return (
          <section key={section.id} aria-labelledby={`builder-${section.id}`}>
            <div className="mb-5">
              <p className="section-eyebrow mb-2">Section</p>
              <h3
                id={`builder-${section.id}`}
                className="type-heading-md text-foreground font-medium"
              >
                {section.label}
              </h3>
              <p className="type-body-sm text-foreground-muted mt-1">
                Pick the layout that fits your brand.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {options.map((option, index) => (
                <ComponentOptionCard
                  key={option.id}
                  option={option}
                  isSelected={selections[section.id] === option.id}
                  onSelect={() => onSelect(section.id, option.id)}
                  onPreview={() => onSelect(section.id, option.id)}
                  index={index}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
