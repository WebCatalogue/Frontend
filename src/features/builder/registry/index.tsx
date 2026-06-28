"use client";

import dynamic from "next/dynamic";
import { memo, type ComponentType } from "react";
import type { PublishedSection } from "@/types/api";

export interface RegistryComponentProps {
  settings?: Record<string, unknown> | null;
  variant?: string | null;
  section?: PublishedSection;
}

type RegistryEntry = ComponentType<RegistryComponentProps>;

const HeroBasic = dynamic(() =>
  import("./components/HeroBasic").then((m) => m.HeroBasic),
);
const HeroSplit = dynamic(() =>
  import("./components/HeroSplit").then((m) => m.HeroSplit),
);
const HeroVideo = dynamic(() =>
  import("./components/HeroVideo").then((m) => m.HeroVideo),
);
const GalleryGrid = dynamic(() =>
  import("./components/GalleryGrid").then((m) => m.GalleryGrid),
);
const GalleryCarousel = dynamic(() =>
  import("./components/GalleryCarousel").then((m) => m.GalleryCarousel),
);
const ContactMap = dynamic(() =>
  import("./components/ContactMap").then((m) => m.ContactMap),
);
const FaqAccordion = dynamic(() =>
  import("./components/FaqAccordion").then((m) => m.FaqAccordion),
);
const FooterSimple = dynamic(() =>
  import("./components/FooterSimple").then((m) => m.FooterSimple),
);
const CtaBanner = dynamic(() =>
  import("./components/CtaBanner").then((m) => m.CtaBanner),
);
const AboutStory = dynamic(() =>
  import("./components/AboutStory").then((m) => m.AboutStory),
);

const FallbackSection = dynamic(() =>
  import("./components/FallbackSection").then((m) => m.FallbackSection),
);

/** Maps backend registry keys → frontend components (with legacy aliases) */
export const COMPONENT_REGISTRY: Record<string, RegistryEntry> = {
  "hero.classic": HeroBasic,
  "hero.basic": HeroBasic,
  "hero.centered": HeroBasic,
  "hero.split": HeroSplit,
  "hero.video": HeroVideo,
  "gallery.grid": GalleryGrid,
  "gallery.carousel": GalleryCarousel,
  "contact.map": ContactMap,
  "faq.accordion": FaqAccordion,
  "footer.standard": FooterSimple,
  "footer.simple": FooterSimple,
  "cta.banner": CtaBanner,
  "about.timeline": AboutStory,
  "about.story": AboutStory,
};

export function resolveRegistryComponent(componentKey: string): RegistryEntry {
  return COMPONENT_REGISTRY[componentKey] ?? FallbackSection;
}

export const RegistrySection = memo(function RegistrySection({
  section,
}: {
  section: PublishedSection;
}) {
  const Component = resolveRegistryComponent(section.componentKey);
  return (
    <Component
      section={section}
      settings={section.settings}
      variant={section.variant}
    />
  );
});

export const REGISTRY_KEYS = Object.keys(COMPONENT_REGISTRY);
