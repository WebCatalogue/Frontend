export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  features: string[];
  idealFor: string;
}

export const SERVICES: Service[] = [
  {
    id: "website-design",
    title: "Website Design",
    slug: "website-design",
    description:
      "Layouts shaped around how your customers actually decide — not how agencies win awards.",
    longDescription:
      "We start with your business, not a template grid. Every page is composed from proven sections — hero, services, gallery, contact — arranged for your industry. You get a site that looks custom because the pieces are chosen for you, not copied from a theme store.",
    features: [
      "Industry-matched layouts",
      "Mobile-first composition",
      "Brand-consistent typography",
      "Accessibility built in",
    ],
    idealFor: "Businesses launching their first professional site",
  },
  {
    id: "website-development",
    title: "Website Development",
    slug: "website-development",
    description:
      "Fast, reliable builds on modern technology — no WordPress plugins holding you back.",
    longDescription:
      "BhaiKISite runs on Next.js with performance as a default. Pages load quickly, forms work, and your site stays secure without constant plugin updates. We handle the technical foundation so you focus on content.",
    features: [
      "Next.js architecture",
      "Core Web Vitals optimised",
      "Form & booking integrations",
      "Secure hosting guidance",
    ],
    idealFor: "Owners replacing slow or broken websites",
  },
  {
    id: "website-builder",
    title: "Website Builder",
    slug: "website-builder",
    description:
      "Compose your own site from premium components — no code, no compromise.",
    longDescription:
      "Our builder gives you the same sections we use for agency projects. Pick a template, swap components, adjust your theme, and publish. It's the control of a page builder with the polish of a design studio.",
    features: [
      "Drag-and-drop sections",
      "Live theme preview",
      "Component catalogue",
      "One-click publishing",
    ],
    idealFor: "Hands-on owners who want speed and control",
  },
  {
    id: "template-customization",
    title: "Template Customization",
    slug: "template-customization",
    description:
      "Start from an industry template and refine it until it feels unmistakably yours.",
    longDescription:
      "Choose from dozens of industry starters — café, salon, gym, clinic, and more. We adjust colours, fonts, imagery, and copy so the result doesn't look like anyone else's template. Fast turnaround without generic output.",
    features: [
      "40+ industry templates",
      "Custom colour palettes",
      "Photography guidance",
      "Copy refinement",
    ],
    idealFor: "Businesses that need to launch quickly with quality",
  },
  {
    id: "seo-ready",
    title: "SEO-Ready Websites",
    slug: "seo-ready-websites",
    description:
      "Technical foundations so local customers find you on Google — not page three.",
    longDescription:
      "Every BhaiKISite build includes proper meta tags, semantic structure, sitemaps, and schema markup. We set up Google Business Profile alignment and local landing patterns so 'near me' searches actually surface your business.",
    features: [
      "Meta & Open Graph tags",
      "Structured data",
      "Sitemap generation",
      "Local SEO patterns",
    ],
    idealFor: "Shops, clinics, and restaurants competing locally",
  },
  {
    id: "performance",
    title: "Performance Optimization",
    slug: "performance-optimization",
    description:
      "Sites that load in under two seconds — because slow pages lose customers.",
    longDescription:
      "We compress images intelligently, lazy-load below-the-fold content, and eliminate render-blocking resources. Your Lighthouse scores improve, your bounce rate drops, and Google ranks you higher.",
    features: [
      "Image optimisation",
      "Lazy loading",
      "Code splitting",
      "CDN recommendations",
    ],
    idealFor: "Sites with high traffic or image-heavy galleries",
  },
  {
    id: "hosting",
    title: "Hosting Guidance",
    slug: "hosting-guidance",
    description:
      "Clear recommendations on where to host — without upselling you infrastructure you don't need.",
    longDescription:
      "We advise on Vercel, Cloudflare, and regional providers based on your traffic and budget. Domain setup, SSL, and DNS are handled with documentation you can hand to any IT person.",
    features: [
      "Provider comparison",
      "Domain & SSL setup",
      "DNS configuration",
      "Uptime monitoring tips",
    ],
    idealFor: "First-time website owners unsure where to host",
  },
  {
    id: "maintenance",
    title: "Maintenance & Support",
    slug: "maintenance",
    description:
      "Monthly care so your site stays current, secure, and aligned with your business.",
    longDescription:
      "Menus change. Hours shift. New photos arrive. Our maintenance plans cover content updates, security patches, and performance checks — so your site never quietly goes stale while you're busy running the shop.",
    features: [
      "Content updates",
      "Security monitoring",
      "Monthly health checks",
      "Priority support",
    ],
    idealFor: "Owners who want a set-and-forget partnership",
  },
];
