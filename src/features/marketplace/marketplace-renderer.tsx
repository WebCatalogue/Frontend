"use client";

import { memo, type ComponentType, type ReactNode } from "react";
import {
  COMPONENT_REGISTRY,
  type RegistryComponentProps,
} from "@/features/builder/registry";
import type { PublishedSection } from "@/types/api";
import type { MarketplaceOption } from "./types";
import * as Preview from "./preview-sections";

type PreviewEntry = ComponentType<RegistryComponentProps>;

const PREVIEW_REGISTRY: Record<string, PreviewEntry> = {
  "preview.nav.centered": Preview.NavCentered,
  "preview.nav.split": Preview.NavSplit,
  "preview.nav.minimal": Preview.NavMinimal,
  "preview.nav.transparent": Preview.NavTransparent,
  "preview.nav.sticky": Preview.NavSticky,
  "preview.nav.mega": Preview.NavMega,
  "preview.about.split": Preview.AboutSplit,
  "preview.about.timeline": Preview.AboutTimeline,
  "preview.about.values": Preview.AboutValues,
  "preview.gallery.featured": Preview.GalleryFeatured,
  "preview.gallery.lightbox": Preview.GalleryLightbox,
  "preview.gallery.before-after": Preview.GalleryBeforeAfter,
  "preview.testimonials.cards": Preview.TestimonialsCards,
  "preview.testimonials.carousel": Preview.TestimonialsFeatured,
  "preview.testimonials.featured": Preview.TestimonialsFeatured,
  "preview.testimonials.video": Preview.TestimonialsCards,
  "preview.testimonials.logos": Preview.TestimonialsLogos,
  "preview.faq.columns": Preview.FaqColumns,
  "preview.faq.grouped": Preview.FaqGrouped,
  "preview.faq.search": Preview.FaqGrouped,
  "preview.contact.split": Preview.ContactSplit,
  "preview.contact.minimal": Preview.ContactMinimal,
  "preview.contact.booking": Preview.ContactBooking,
  "preview.contact.cards": Preview.ContactCards,
  "preview.footer.columns": Preview.FooterColumns,
  "preview.footer.newsletter": Preview.FooterNewsletter,
  "preview.footer.luxury": Preview.FooterLuxury,
  "preview.footer.map": Preview.FooterColumns,
  "preview.menu.grid": Preview.MenuGrid,
  "preview.menu.categories": Preview.MenuCategories,
  "preview.menu.board": Preview.MenuBoard,
  "preview.menu.featured": Preview.MenuFeatured,
  "preview.menu.compact": Preview.MenuCompact,
  "preview.menu.cards": Preview.MenuGrid,
  "preview.drinks.carousel": Preview.DrinksCarousel,
  "preview.drinks.cards": Preview.MenuGrid,
  "preview.drinks.hero": Preview.MenuFeatured,
  "preview.drinks.seasonal": Preview.DrinksCarousel,
  "preview.instagram.grid": Preview.InstagramGrid,
  "preview.instagram.carousel": Preview.InstagramGrid,
  "preview.instagram.featured": Preview.GalleryFeatured,
  "preview.booking.form": Preview.ContactBooking,
  "preview.booking.widget": Preview.ContactBooking,
  "preview.booking.split": Preview.ContactSplit,
  "preview.pricing.tiers": Preview.PricingTiers,
  "preview.pricing.compare": Preview.PricingCompare,
  "preview.team.grid": Preview.TeamGrid,
  "preview.team.featured": Preview.TeamFeatured,
  "preview.team.carousel": Preview.TeamGrid,
  "preview.services.list": Preview.ServicesList,
  "preview.services.cards": Preview.ServicesCards,
  "preview.services.tabs": Preview.ServicesTabs,
  "preview.programs.schedule": Preview.ProgramsSchedule,
  "preview.stats.row": Preview.StatsRow,
  "preview.rooms.grid": Preview.RoomsGrid,
  "preview.rooms.featured": Preview.RoomsFeatured,
};

export function resolveMarketplaceComponent(
  componentKey: string,
): PreviewEntry | null {
  return PREVIEW_REGISTRY[componentKey] ?? null;
}

export function optionToSection(
  option: MarketplaceOption,
  industrySlug: string,
  sortOrder: number,
): PublishedSection {
  return {
    id: `${option.categoryId}-${option.id}`,
    componentKey: option.componentKey,
    variant: option.variant ?? null,
    settings: {
      ...option.settings,
      _industry: industrySlug,
      _category: option.categoryId,
    },
    sortOrder,
  };
}

export const MarketplaceSection = memo(function MarketplaceSection({
  option,
  industrySlug,
  compact,
}: {
  option: MarketplaceOption;
  industrySlug: string;
  compact?: boolean;
}) {
  const section = optionToSection(option, industrySlug, 0);
  const PreviewComponent = resolveMarketplaceComponent(option.componentKey);
  const RegistryComponent = COMPONENT_REGISTRY[option.componentKey];

  if (RegistryComponent) {
    return (
      <div className={compact ? "pointer-events-none scale-[0.98]" : undefined}>
        <RegistryComponent
          section={section}
          settings={section.settings}
          variant={section.variant}
        />
      </div>
    );
  }

  if (PreviewComponent) {
    return (
      <div className={compact ? "pointer-events-none scale-[0.98]" : undefined}>
        <PreviewComponent
          section={section}
          settings={section.settings}
          variant={section.variant}
        />
      </div>
    );
  }

  return (
    <Preview.FallbackPreview
      section={section}
      settings={section.settings}
      variant={section.variant}
    />
  );
});

export function MarketplacePreviewFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-background overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
