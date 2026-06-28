import { ROUTES } from "@/constants";

/** Public navigation — agency-facing site only (no login/dashboard links) */
export const MAIN_NAV = [
  { label: "Industries", href: ROUTES.industries },
  { label: "Templates", href: ROUTES.templates },
  { label: "Visualise", href: ROUTES.visualise },
  { label: "Contact", href: ROUTES.contact },
] as const;

export const FOOTER_NAV = {
  company: [
    { label: "Industries", href: ROUTES.industries },
    { label: "Templates", href: ROUTES.templates },
    { label: "Visualise Your Site", href: ROUTES.visualise },
    { label: "Submit Enquiry", href: ROUTES.enquiry },
    { label: "Contact", href: ROUTES.contact },
  ],
  services: [
    { label: "Café & Restaurant", href: "/industries/cafe" },
    { label: "Salon & Beauty", href: "/industries/salon" },
    { label: "Gym & Fitness", href: "/industries/gym" },
    { label: "Clinic & Medical", href: "/industries/clinic" },
  ],
  legal: [
    { label: "Privacy Policy", href: ROUTES.privacy },
    { label: "Terms & Conditions", href: ROUTES.terms },
  ],
} as const;
