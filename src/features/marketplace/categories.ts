import type { MarketplaceCategory } from "./types";

export const UNIVERSAL_CATEGORIES: MarketplaceCategory[] = [
  {
    id: "navigation",
    label: "Navigation",
    description: "How visitors orient and move through your site.",
    kind: "universal",
  },
  {
    id: "hero",
    label: "Hero",
    description:
      "The first impression — headline, imagery, and primary action.",
    kind: "universal",
  },
  {
    id: "about",
    label: "About",
    description: "Your story, values, and what makes you different.",
    kind: "universal",
  },
  {
    id: "gallery",
    label: "Gallery",
    description: "Visual proof — products, spaces, work, and atmosphere.",
    kind: "universal",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    description: "Social proof from customers who already trust you.",
    kind: "universal",
  },
  {
    id: "faq",
    label: "FAQ",
    description: "Answer common questions before they become objections.",
    kind: "universal",
  },
  {
    id: "contact",
    label: "Contact",
    description: "Make it effortless to reach you, visit, or enquire.",
    kind: "universal",
  },
  {
    id: "footer",
    label: "Footer",
    description: "Closing navigation, hours, and legal essentials.",
    kind: "universal",
  },
];

const INDUSTRY_EXTRA: Record<string, MarketplaceCategory[]> = {
  cafe: [
    {
      id: "menu",
      label: "Menu",
      description: "Showcase drinks, food, and seasonal specials.",
      kind: "industry",
    },
    {
      id: "featured-drinks",
      label: "Featured Drinks",
      description: "Highlight signature pours and limited releases.",
      kind: "industry",
    },
    {
      id: "coffee-story",
      label: "Coffee Story",
      description: "Origin, roast philosophy, and craft narrative.",
      kind: "industry",
    },
    {
      id: "instagram-feed",
      label: "Instagram Feed",
      description: "Live social grid that keeps your site feeling current.",
      kind: "industry",
    },
  ],
  restaurant: [
    {
      id: "menu",
      label: "Menu",
      description: "Structured courses, wine lists, and daily specials.",
      kind: "industry",
    },
    {
      id: "booking",
      label: "Booking",
      description: "Reservations, private dining, and event enquiries.",
      kind: "industry",
    },
    {
      id: "chef-story",
      label: "Chef Story",
      description: "Put a face and philosophy behind the kitchen.",
      kind: "industry",
    },
    {
      id: "private-events",
      label: "Private Events",
      description: "Catering, parties, and corporate dining.",
      kind: "industry",
    },
  ],
  bakery: [
    {
      id: "menu",
      label: "Product Menu",
      description: "Pastries, breads, and celebration cakes.",
      kind: "industry",
    },
    {
      id: "custom-orders",
      label: "Custom Orders",
      description: "Wedding cakes and bespoke celebration orders.",
      kind: "industry",
    },
    {
      id: "daily-specials",
      label: "Daily Specials",
      description: "What's fresh out of the oven today.",
      kind: "industry",
    },
  ],
  salon: [
    {
      id: "stylists",
      label: "Stylists",
      description: "Introduce your team and their specialties.",
      kind: "industry",
    },
    {
      id: "services",
      label: "Services",
      description: "Cuts, colour, treatments, and add-ons.",
      kind: "industry",
    },
    {
      id: "packages",
      label: "Packages",
      description: "Bundled services and bridal packages.",
      kind: "industry",
    },
    {
      id: "booking",
      label: "Booking",
      description: "Appointment scheduling and availability.",
      kind: "industry",
    },
  ],
  gym: [
    {
      id: "membership",
      label: "Membership",
      description: "Plans, perks, and trial offers.",
      kind: "industry",
    },
    {
      id: "trainers",
      label: "Trainers",
      description: "Coach profiles, credentials, and specialties.",
      kind: "industry",
    },
    {
      id: "programs",
      label: "Programs",
      description: "Classes, schedules, and training tracks.",
      kind: "industry",
    },
    {
      id: "transformations",
      label: "Transformations",
      description: "Before-and-after results that motivate sign-ups.",
      kind: "industry",
    },
  ],
  hotel: [
    {
      id: "rooms",
      label: "Rooms",
      description: "Room types, rates, and immersive galleries.",
      kind: "industry",
    },
    {
      id: "booking",
      label: "Booking",
      description: "Direct reservation flow and availability.",
      kind: "industry",
    },
    {
      id: "amenities",
      label: "Amenities",
      description: "Spa, dining, pool, and on-property experiences.",
      kind: "industry",
    },
    {
      id: "attractions",
      label: "Attractions",
      description: "Local experiences and curated itineraries.",
      kind: "industry",
    },
  ],
  clinic: [
    {
      id: "services",
      label: "Services",
      description: "Treatments, specialties, and care pathways.",
      kind: "industry",
    },
    {
      id: "team",
      label: "Medical Team",
      description: "Doctor profiles, credentials, and languages.",
      kind: "industry",
    },
    {
      id: "appointments",
      label: "Appointments",
      description: "Scheduling and patient intake.",
      kind: "industry",
    },
    {
      id: "patient-resources",
      label: "Patient Resources",
      description: "Preparation guides, insurance, and forms.",
      kind: "industry",
    },
  ],
  jewellery: [
    {
      id: "collections",
      label: "Collections",
      description: "Bridal, everyday, and limited editions.",
      kind: "industry",
    },
    {
      id: "craft",
      label: "Craft & Heritage",
      description: "Workshop story and artisan process.",
      kind: "industry",
    },
    {
      id: "custom-design",
      label: "Custom Design",
      description: "Bespoke enquiry and consultation flow.",
      kind: "industry",
    },
  ],
  furniture: [
    {
      id: "catalogue",
      label: "Catalogue",
      description: "Filterable product grids with specs.",
      kind: "industry",
    },
    {
      id: "room-inspiration",
      label: "Room Inspiration",
      description: "Styled scenes in real homes.",
      kind: "industry",
    },
    {
      id: "showroom",
      label: "Showroom",
      description: "Visit details, parking, and appointments.",
      kind: "industry",
    },
  ],
  "real-estate": [
    {
      id: "listings",
      label: "Listings",
      description: "Property showcases with key specs.",
      kind: "industry",
    },
    {
      id: "agents",
      label: "Agents",
      description: "Broker profiles and territories.",
      kind: "industry",
    },
    {
      id: "neighbourhood",
      label: "Neighbourhood Guides",
      description: "Area insights that keep buyers engaged.",
      kind: "industry",
    },
  ],
  photography: [
    {
      id: "portfolio",
      label: "Portfolio",
      description: "Editorial grids that respect aspect ratios.",
      kind: "industry",
    },
    {
      id: "packages",
      label: "Packages",
      description: "Wedding, portrait, and commercial tiers.",
      kind: "industry",
    },
    {
      id: "booking",
      label: "Booking",
      description: "Date, location, and budget enquiry.",
      kind: "industry",
    },
  ],
  fashion: [
    {
      id: "lookbook",
      label: "Lookbook",
      description: "Seasonal collections and editorial drops.",
      kind: "industry",
    },
    {
      id: "store-locator",
      label: "Store Locator",
      description: "Stockists and flagship locations.",
      kind: "industry",
    },
    {
      id: "wholesale",
      label: "Wholesale",
      description: "B2B enquiry for stockists.",
      kind: "industry",
    },
  ],
};

export function getCategoriesForIndustry(slug: string): MarketplaceCategory[] {
  const extras = INDUSTRY_EXTRA[slug] ?? [];
  return [...UNIVERSAL_CATEGORIES, ...extras];
}

export function getCategoryById(
  slug: string,
  categoryId: string,
): MarketplaceCategory | undefined {
  return getCategoriesForIndustry(slug).find((c) => c.id === categoryId);
}
