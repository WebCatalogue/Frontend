export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
}

export const SERVICES: Service[] = [
  {
    id: "business-websites",
    title: "Business Websites",
    slug: "business-websites",
    description:
      "Custom-crafted websites that reflect your brand and convert visitors into loyal customers.",
    features: [
      "Custom design",
      "Mobile-first",
      "CMS-ready structure",
      "Analytics setup",
    ],
  },
  {
    id: "website-catalogue",
    title: "Website Catalogue",
    slug: "website-catalogue",
    description:
      "Industry-specific templates refined into unique, premium experiences for your business.",
    features: [
      "Industry templates",
      "Rapid deployment",
      "Brand customization",
      "Multi-page sites",
    ],
  },
  {
    id: "landing-pages",
    title: "Landing Pages",
    slug: "landing-pages",
    description:
      "High-converting single-page experiences designed for campaigns, launches, and promotions.",
    features: [
      "Conversion-focused",
      "A/B ready layout",
      "Fast load times",
      "Lead capture forms",
    ],
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    slug: "website-redesign",
    description:
      "Transform outdated websites into modern, premium digital experiences your customers trust.",
    features: [
      "UX audit",
      "Visual refresh",
      "Performance boost",
      "SEO improvements",
    ],
  },
  {
    id: "branding-support",
    title: "Branding Support",
    slug: "branding-support",
    description:
      "Cohesive visual identity across your website — typography, color, and tone of voice.",
    features: [
      "Color systems",
      "Typography",
      "Visual guidelines",
      "Asset creation",
    ],
  },
  {
    id: "seo-foundation",
    title: "SEO Foundation",
    slug: "seo-foundation",
    description:
      "Technical SEO and on-page optimization so local customers find you first.",
    features: [
      "Meta optimization",
      "Schema markup",
      "Sitemap setup",
      "Local SEO",
    ],
  },
  {
    id: "performance",
    title: "Performance Optimization",
    slug: "performance-optimization",
    description:
      "Lightning-fast load times that improve rankings, conversions, and user experience.",
    features: [
      "Core Web Vitals",
      "Image optimization",
      "Code splitting",
      "CDN setup",
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance Plans",
    slug: "maintenance-plans",
    description:
      "Ongoing care, updates, and support so your website stays secure and current.",
    features: [
      "Monthly updates",
      "Security patches",
      "Content changes",
      "Priority support",
    ],
  },
];
