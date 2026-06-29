import { demoImage, type DemoImageKey } from "@/lib/demo-images";

export interface HeroPreviewImages {
  hero: DemoImageKey;
  gallery: [DemoImageKey, DemoImageKey, DemoImageKey];
  about: DemoImageKey;
}

const PREVIEW_IMAGES: Record<string, HeroPreviewImages> = {
  cafe: {
    hero: "cafe",
    gallery: ["cafeInterior", "restaurant", "bakery"],
    about: "cafeInterior",
  },
  luxury: {
    hero: "salon",
    gallery: ["fashion", "jewellery", "salon"],
    about: "fashion",
  },
  modern: {
    hero: "workspace",
    gallery: ["laptop", "teamCollaboration", "workspace"],
    about: "teamCollaboration",
  },
  gym: {
    hero: "gym",
    gallery: ["gym", "photography", "education"],
    about: "gym",
  },
};

export function getHeroPreviewImages(themeId: string): HeroPreviewImages {
  return PREVIEW_IMAGES[themeId] ?? PREVIEW_IMAGES.cafe;
}
