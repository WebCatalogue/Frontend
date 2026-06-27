export interface RecipeSection {
  componentKey: string;
  settings?: Record<string, unknown>;
}

export interface PlatformRecipe {
  id: string;
  name: string;
  description: string;
  category: string;
  sections: RecipeSection[];
  themeId: string;
  paletteId: string;
  effects: string[];
  typography: string;
  tags: string[];
}

export const PLATFORM_RECIPES: PlatformRecipe[] = [
  {
    id: "luxury-landing-hero",
    name: "Luxury Landing Hero",
    description:
      "Navbar-ready stack with split hero, CTA banner, and subtle aurora — ideal for jewellery and hotels.",
    category: "landing",
    sections: [
      {
        componentKey: "hero.split",
        settings: {
          headline: "Crafted for distinction",
          subtitle: "A premium first impression for discerning customers.",
          ctaLabel: "Explore",
        },
      },
      { componentKey: "about.story" },
      { componentKey: "cta.banner" },
      { componentKey: "footer.simple" },
    ],
    themeId: "luxury",
    paletteId: "neutral",
    effects: ["effect.aurora"],
    typography: "typography-instrument-inter",
    tags: ["luxury", "hero", "landing"],
  },
  {
    id: "cafe-menu-stack",
    name: "Café Menu Stack",
    description: "Warm hero, gallery, and contact — built for coffee shops.",
    category: "cafe",
    sections: [
      {
        componentKey: "hero.basic",
        settings: {
          headline: "Fresh roasts daily",
          subtitle: "Visit us for single-origin pours and house pastries.",
          ctaLabel: "View menu",
        },
      },
      { componentKey: "gallery.grid" },
      { componentKey: "contact.map" },
      { componentKey: "footer.simple" },
    ],
    themeId: "cafe",
    paletteId: "warm",
    effects: ["effect.particles"],
    typography: "typography-instrument-inter",
    tags: ["cafe", "menu"],
  },
  {
    id: "gym-conversion",
    name: "Gym Conversion",
    description: "High-energy hero video, CTA, and FAQ for fitness brands.",
    category: "gym",
    sections: [
      { componentKey: "hero.video" },
      { componentKey: "cta.banner" },
      { componentKey: "faq.accordion" },
      { componentKey: "footer.simple" },
    ],
    themeId: "gym",
    paletteId: "blue",
    effects: ["effect.animated-grid"],
    typography: "typography-inter-only",
    tags: ["gym", "conversion"],
  },
  {
    id: "clinic-trust",
    name: "Clinic Trust",
    description: "Calm about story, FAQ, and contact for healthcare.",
    category: "clinic",
    sections: [
      { componentKey: "hero.basic" },
      { componentKey: "about.story" },
      { componentKey: "faq.accordion" },
      { componentKey: "contact.map" },
    ],
    themeId: "medical",
    paletteId: "cool",
    effects: [],
    typography: "typography-instrument-inter",
    tags: ["clinic", "trust"],
  },
];

export function getRecipeById(id: string): PlatformRecipe | undefined {
  return PLATFORM_RECIPES.find((r) => r.id === id);
}
