export interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
  helpText: string;
  gradient: string;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "cafes",
    name: "Cafes",
    slug: "cafes",
    description:
      "Warm, inviting websites that capture the atmosphere of your café.",
    helpText:
      "We design café websites with menu showcases, location maps, and reservation flows that make customers crave a visit before they finish scrolling.",
    gradient: "var(--gradient-warm)",
  },
  {
    id: "restaurants",
    name: "Restaurants",
    slug: "restaurants",
    description:
      "Elegant dining experiences online, from fine dining to casual eateries.",
    helpText:
      "Showcase your cuisine with editorial photography layouts, online menus, and table booking — built to fill seats on slow nights.",
    gradient: "var(--gradient-ink)",
  },
  {
    id: "bakeries",
    name: "Bakeries",
    slug: "bakeries",
    description: "Sweet, artisanal websites as delightful as your creations.",
    helpText:
      "Highlight daily specials, custom cake orders, and your story with a website that smells like fresh bread — visually.",
    gradient: "var(--gradient-warm)",
  },
  {
    id: "clothing-stores",
    name: "Clothing Stores",
    slug: "clothing-stores",
    description:
      "Fashion-forward websites that showcase your collections beautifully.",
    helpText:
      "Lookbook galleries, seasonal collections, and store locators designed for boutiques that compete with big brands online.",
    gradient: "var(--gradient-plum)",
  },
  {
    id: "salons",
    name: "Salons",
    slug: "salons",
    description: "Polished websites that reflect the quality of your craft.",
    helpText:
      "Service menus, stylist profiles, and booking integrations that turn browsers into booked appointments.",
    gradient: "var(--gradient-plum)",
  },
  {
    id: "hotels",
    name: "Hotels",
    slug: "hotels",
    description: "Luxurious digital experiences worthy of your hospitality.",
    helpText:
      "Room galleries, amenity highlights, and direct booking flows that reduce OTA dependency and increase direct reservations.",
    gradient: "var(--gradient-ink)",
  },
  {
    id: "clinics",
    name: "Clinics",
    slug: "clinics",
    description: "Trust-building websites for healthcare practices.",
    helpText:
      "Patient-friendly layouts, doctor profiles, and appointment scheduling that communicate care and professionalism.",
    gradient: "var(--gradient-sage)",
  },
  {
    id: "gyms",
    name: "Gyms",
    slug: "gyms",
    description:
      "Energetic websites that motivate memberships and class sign-ups.",
    helpText:
      "Class schedules, trainer spotlights, and membership tiers designed to convert fitness-curious visitors into members.",
    gradient: "var(--gradient-sage)",
  },
  {
    id: "jewellery",
    name: "Jewellery",
    slug: "jewellery",
    description: "Exquisite websites that let your craftsmanship shine.",
    helpText:
      "Product galleries with zoom, collection stories, and boutique locators for brands where every detail matters.",
    gradient: "var(--gradient-warm)",
  },
  {
    id: "furniture",
    name: "Furniture",
    slug: "furniture",
    description: "Spacious, editorial websites for furniture and home décor.",
    helpText:
      "Room inspiration galleries, product catalogs, and showroom information that help customers envision pieces in their homes.",
    gradient: "var(--gradient-ink)",
  },
  {
    id: "coaching",
    name: "Coaching Institutes",
    slug: "coaching-institutes",
    description:
      "Authoritative websites that establish educational credibility.",
    helpText:
      "Course catalogs, faculty profiles, and results showcases that convince parents and students you're the right choice.",
    gradient: "var(--gradient-accent)",
  },
];
