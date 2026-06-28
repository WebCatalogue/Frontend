import type { WizardStepDef } from "./types";

/** User-friendly labels — no technical jargon */
export const WIZARD_STEP_LABELS = {
  industry: "Choose Business Type",
  style: "Choose Website Style",
  navigation: "Choose Top Navigation",
  welcome: "Choose Welcome Section",
  about: "Choose About Your Business",
  contact: "Choose Contact Information",
  photos: "Choose Photos",
  finish: "Your website draft is ready!",
} as const;

export const INDUSTRY_WIZARD_SECTION: Record<
  string,
  { categoryId: string; label: string }
> = {
  cafe: { categoryId: "menu", label: "Choose Menu Section" },
  bakery: { categoryId: "menu", label: "Choose Product Menu" },
  restaurant: { categoryId: "menu", label: "Choose Featured Dishes" },
  gym: { categoryId: "membership", label: "Choose Membership Section" },
  salon: { categoryId: "services", label: "Choose Services Section" },
  hotel: { categoryId: "rooms", label: "Choose Rooms Section" },
  clinic: { categoryId: "services", label: "Choose Services Section" },
  jewellery: { categoryId: "collections", label: "Choose Collections Section" },
  furniture: { categoryId: "catalogue", label: "Choose Catalogue Section" },
  "real-estate": { categoryId: "listings", label: "Choose Listings Section" },
  photography: { categoryId: "portfolio", label: "Choose Portfolio Section" },
  fashion: { categoryId: "lookbook", label: "Choose Lookbook Section" },
  education: { categoryId: "testimonials", label: "Choose Highlights Section" },
};

export const DEFAULT_INDUSTRY_SECTION = {
  categoryId: "testimonials",
  label: "Choose Highlights Section",
};

export const WIZARD_TOTAL_STEPS = 8;

export function getIndustrySectionStep(industryId: string): {
  categoryId: string;
  label: string;
} {
  return INDUSTRY_WIZARD_SECTION[industryId] ?? DEFAULT_INDUSTRY_SECTION;
}

export function getWizardSteps(industryId: string): WizardStepDef[] {
  const industrySection = getIndustrySectionStep(industryId);

  return [
    { id: "industry", label: WIZARD_STEP_LABELS.industry, kind: "industry" },
    { id: "style", label: WIZARD_STEP_LABELS.style, kind: "style" },
    {
      id: "navigation",
      label: WIZARD_STEP_LABELS.navigation,
      kind: "component",
      categoryId: "navigation",
    },
    {
      id: "welcome",
      label: WIZARD_STEP_LABELS.welcome,
      kind: "component",
      categoryId: "hero",
    },
    {
      id: "about",
      label: WIZARD_STEP_LABELS.about,
      kind: "component",
      categoryId: "about",
    },
    {
      id: "industry-section",
      label: industrySection.label,
      kind: "component",
      categoryId: industrySection.categoryId,
    },
    {
      id: "photos",
      label: WIZARD_STEP_LABELS.photos,
      kind: "component",
      categoryId: "gallery",
    },
    {
      id: "contact",
      label: WIZARD_STEP_LABELS.contact,
      kind: "component",
      categoryId: "contact",
    },
  ];
}

export function getWizardSectionOrder(industryId: string): string[] {
  const industrySection = getIndustrySectionStep(industryId);
  return [
    "navigation",
    "hero",
    "about",
    industrySection.categoryId,
    "gallery",
    "contact",
    "footer",
  ];
}

export function computeCompletionPercent(
  step: number,
  total = WIZARD_TOTAL_STEPS,
): number {
  return Math.min(100, Math.round((step / total) * 100));
}
