import { ROUTES } from "@/constants";

export const MAIN_NAV = [
  { label: "Services", href: ROUTES.services, mega: "services" as const },
  { label: "Industries", href: ROUTES.industries, mega: "industries" as const },
  { label: "Portfolio", href: ROUTES.portfolio },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "About", href: ROUTES.about },
  { label: "Blog", href: ROUTES.blog },
] as const;

export const FOOTER_NAV = {
  company: [
    { label: "About", href: ROUTES.about },
    { label: "Portfolio", href: ROUTES.portfolio },
    { label: "Pricing", href: ROUTES.pricing },
    { label: "Contact", href: ROUTES.contact },
    { label: "Blog", href: ROUTES.blog },
  ],
  services: [
    { label: "Business Websites", href: ROUTES.services },
    { label: "Website Catalogue", href: ROUTES.services },
    { label: "Landing Pages", href: ROUTES.services },
    { label: "Website Redesign", href: ROUTES.services },
  ],
  legal: [
    { label: "Privacy Policy", href: ROUTES.privacy },
    { label: "Terms & Conditions", href: ROUTES.terms },
  ],
} as const;
