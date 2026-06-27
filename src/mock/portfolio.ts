export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  industry: string;
  description: string;
  technologies: string[];
  gradient: string;
  year: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "1",
    slug: "harbor-coffee",
    title: "Harbor Coffee Co.",
    industry: "Café",
    description:
      "A warm, editorial website for an artisan coffee roastery with online menu and location finder.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    gradient: "var(--gradient-warm)",
    year: "2025",
  },
  {
    id: "2",
    slug: "atelier-salon",
    title: "Atelier Salon",
    industry: "Beauty",
    description:
      "An elegant booking-focused site for a premium hair and beauty salon in Mumbai.",
    technologies: ["Next.js", "TypeScript", "Radix UI"],
    gradient: "var(--gradient-plum)",
    year: "2025",
  },
  {
    id: "3",
    slug: "greenfield-clinic",
    title: "Greenfield Clinic",
    industry: "Healthcare",
    description:
      "A trust-building medical practice website with doctor profiles and appointment scheduling.",
    technologies: ["Next.js", "Tailwind CSS", "SEO"],
    gradient: "var(--gradient-sage)",
    year: "2024",
  },
  {
    id: "4",
    slug: "maison-jewels",
    title: "Maison Jewels",
    industry: "Jewellery",
    description:
      "A luxurious product gallery for a heritage jewellery boutique with collection stories.",
    technologies: ["Next.js", "Framer Motion", "Image CDN"],
    gradient: "var(--gradient-warm)",
    year: "2024",
  },
  {
    id: "5",
    slug: "ironforge-gym",
    title: "Ironforge Gym",
    industry: "Fitness",
    description:
      "High-energy membership site with class schedules, trainer profiles, and pricing tiers.",
    technologies: ["Next.js", "TypeScript", "Analytics"],
    gradient: "var(--gradient-sage)",
    year: "2024",
  },
  {
    id: "6",
    slug: "table-nine",
    title: "Table Nine",
    industry: "Restaurant",
    description:
      "Fine dining website with reservation system, seasonal menu, and private events section.",
    technologies: ["Next.js", "Tailwind CSS", "Booking API-ready"],
    gradient: "var(--gradient-ink)",
    year: "2025",
  },
];
