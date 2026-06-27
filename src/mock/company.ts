export interface Founder {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export const FOUNDERS: Founder[] = [
  {
    id: "1",
    name: "Arjun Mehta",
    role: "Co-Founder & Creative Director",
    bio: "Former design lead with a passion for helping local businesses compete with world-class digital experiences.",
    initials: "AM",
  },
  {
    id: "2",
    name: "Sneha Patel",
    role: "Co-Founder & Engineering Lead",
    bio: "Full-stack engineer obsessed with performance, accessibility, and building technology that serves real businesses.",
    initials: "SP",
  },
];

export const COMPANY_VALUES = [
  {
    title: "Craft over templates",
    description:
      "Every website is designed with intention. We don't ship generic layouts — we compose experiences.",
  },
  {
    title: "Local businesses first",
    description:
      "We understand the challenges of running a café, salon, or clinic. Our solutions are built for your reality.",
  },
  {
    title: "Performance matters",
    description:
      "A beautiful site that loads slowly loses customers. We obsess over speed, SEO, and Core Web Vitals.",
  },
  {
    title: "Partnership, not transactions",
    description:
      "We're invested in your success. From launch to growth, we're your long-term digital partner.",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We learn your business, audience, and goals in a focused consultation.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Custom mockups refined until every detail feels unmistakably yours.",
  },
  {
    step: "03",
    title: "Development",
    description:
      "Pixel-perfect build with performance, SEO, and accessibility baked in.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "Thorough testing, training, and a confident go-live with ongoing support.",
  },
];

export const WHY_AUREVIA = [
  {
    title: "Premium by default",
    description:
      "Every project receives the design attention usually reserved for enterprise budgets.",
  },
  {
    title: "Industry expertise",
    description:
      "Deep understanding of cafés, salons, clinics, and local retail — not generic agency work.",
  },
  {
    title: "Fast delivery",
    description:
      "Most sites live in 2–4 weeks without compromising quality or attention to detail.",
  },
  {
    title: "Transparent pricing",
    description:
      "Clear packages with no hidden fees. You know exactly what you're investing in.",
  },
];
