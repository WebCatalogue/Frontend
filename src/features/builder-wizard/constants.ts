import { getOptionsForCategory } from "@/features/marketplace/catalog";
import { getCategoriesForIndustry } from "@/features/marketplace/categories";
import { INDUSTRIES } from "@/mock/industries";
import type { BuilderSectionOption, BuilderStyleOption } from "./types";

export const BUILDER_TOTAL_STEPS = 5;

export const BUILDER_STEP_TITLES = [
  "Select Industry",
  "Choose Website Style",
  "Choose Sections",
  "Choose Templates",
  "Live Website Preview",
] as const;

export const BUILDER_STYLES: BuilderStyleOption[] = [
  {
    id: "luxury",
    label: "Luxury",
    description: "Refined elegance with premium spacing and gold accents.",
    themeId: "luxury",
    paletteId: "neutral",
    previewGradient: "linear-gradient(135deg, #1C1917 0%, #A68B5B 100%)",
  },
  {
    id: "modern",
    label: "Modern",
    description: "Clean lines and confident typography for forward brands.",
    themeId: "modern",
    paletteId: "blue",
    previewGradient: "linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)",
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Stripped-back layouts that let your content breathe.",
    themeId: "minimal",
    paletteId: "neutral",
    previewGradient: "linear-gradient(135deg, #FAFAFA 0%, #E5E5E5 100%)",
  },
  {
    id: "bold",
    label: "Bold",
    description: "High-energy contrast with dynamic, expressive motion.",
    themeId: "gym",
    paletteId: "blue",
    previewGradient: "linear-gradient(135deg, #0F172A 0%, #2563EB 100%)",
  },
  {
    id: "elegant",
    label: "Elegant",
    description: "Soft sophistication for beauty and wellness brands.",
    themeId: "salon",
    paletteId: "rose",
    previewGradient: "linear-gradient(135deg, #FDF2F8 0%, #EC4899 100%)",
  },
  {
    id: "creative",
    label: "Creative",
    description: "Expressive layouts for studios, makers, and agencies.",
    themeId: "creative",
    paletteId: "purple",
    previewGradient: "linear-gradient(135deg, #7C3AED 0%, #F43F5E 100%)",
  },
  {
    id: "corporate",
    label: "Corporate",
    description: "Trustworthy structure with polished professional tone.",
    themeId: "modern",
    paletteId: "slate",
    previewGradient: "linear-gradient(135deg, #334155 0%, #64748B 100%)",
  },
];

const CORE_SECTIONS: BuilderSectionOption[] = [
  {
    id: "navigation",
    label: "Navigation",
    description: "Top bar with links and primary action.",
    required: true,
  },
  {
    id: "hero",
    label: "Hero",
    description: "First impression with headline and CTA.",
    required: true,
  },
  {
    id: "about",
    label: "About",
    description: "Your story, values, and differentiators.",
  },
  {
    id: "gallery",
    label: "Gallery",
    description: "Visual proof of your work or space.",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    description: "Social proof from happy customers.",
  },
  {
    id: "faq",
    label: "FAQ",
    description: "Answer objections before they arise.",
  },
  {
    id: "contact",
    label: "Contact",
    description: "Make it easy to reach you.",
    required: true,
  },
  {
    id: "footer",
    label: "Footer",
    description: "Closing links, hours, and essentials.",
    required: true,
  },
];

const SECTION_ALIASES: Record<string, string> = {
  services: "services",
  pricing: "membership",
  team: "team",
};

export function getBuilderIndustries() {
  return INDUSTRIES.map((industry) => ({
    id: industry.slug,
    name: industry.name,
    description: industry.tagline,
    image: industry.image,
  }));
}

export function getBuilderSectionsForIndustry(
  industryId: string,
): BuilderSectionOption[] {
  const industryCategories = getCategoriesForIndustry(industryId);
  const industryExtras = industryCategories
    .filter((category) => category.kind === "industry")
    .map((category) => ({
      id: category.id,
      label: category.label,
      description: category.description,
    }));

  const serviceLike = industryExtras.find((section) =>
    [
      "services",
      "menu",
      "membership",
      "rooms",
      "listings",
      "portfolio",
    ].includes(section.id),
  );

  const extras: BuilderSectionOption[] = [];

  if (serviceLike) {
    extras.push({
      id: serviceLike.id,
      label: "Services",
      description: serviceLike.description,
    });
  }

  const teamCategory = industryCategories.find(
    (category) => category.id === "team",
  );
  if (teamCategory) {
    extras.push({
      id: "team",
      label: "Team",
      description: teamCategory.description,
    });
  }

  const pricingCategory = industryCategories.find((category) =>
    ["membership", "pricing"].includes(category.id),
  );
  if (pricingCategory) {
    extras.push({
      id: pricingCategory.id,
      label: "Pricing",
      description: pricingCategory.description,
    });
  }

  return [...CORE_SECTIONS.slice(0, 3), ...extras, ...CORE_SECTIONS.slice(3)];
}

export function getDefaultEnabledSections(industryId: string): string[] {
  return getBuilderSectionsForIndustry(industryId)
    .filter(
      (section) =>
        section.required ||
        ["about", "gallery", "testimonials"].includes(section.id),
    )
    .map((section) => section.id);
}

export function getDefaultSectionOrder(
  industryId: string,
  enabledSections: string[],
): string[] {
  const ordered = getBuilderSectionsForIndustry(industryId).map(
    (section) => section.id,
  );
  return ordered.filter((id) => enabledSections.includes(id));
}

export function sectionHasTemplates(
  sectionId: string,
  industryId: string,
): boolean {
  const categoryId = SECTION_ALIASES[sectionId] ?? sectionId;
  return getOptionsForCategory(categoryId, industryId).length > 0;
}

export function computeBuilderProgress(step: number): number {
  return Math.round(((step + 1) / BUILDER_TOTAL_STEPS) * 100);
}

export function canAdvanceBuilderStep(
  step: number,
  state: {
    industryId: string | null;
    styleId: string | null;
    enabledSections: string[];
    selections: Record<string, string>;
  },
): boolean {
  switch (step) {
    case 0:
      return Boolean(state.industryId);
    case 1:
      return Boolean(state.styleId);
    case 2:
      return (
        state.enabledSections.includes("hero") &&
        state.enabledSections.includes("contact")
      );
    case 3: {
      if (!state.industryId) return false;
      const requiredSections = state.enabledSections.filter((sectionId) =>
        sectionHasTemplates(sectionId, state.industryId!),
      );
      return requiredSections.every((sectionId) =>
        Boolean(state.selections[sectionId]),
      );
    }
    case 4:
      return true;
    default:
      return false;
  }
}
