export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₹49,999",
    period: "one-time",
    description:
      "Perfect for new businesses establishing their first online presence.",
    features: [
      "Up to 5 pages",
      "Mobile-responsive design",
      "Contact form",
      "Basic SEO setup",
      "30-day support",
      "1 revision round",
    ],
    cta: "Get Started",
  },
  {
    id: "business",
    name: "Business",
    price: "₹99,999",
    period: "one-time",
    description:
      "For growing businesses that need a comprehensive digital presence.",
    features: [
      "Up to 12 pages",
      "Custom design",
      "Blog structure",
      "Advanced SEO",
      "Google Analytics",
      "90-day support",
      "3 revision rounds",
      "Performance optimization",
    ],
    highlighted: true,
    cta: "Most Popular",
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹1,99,999",
    period: "one-time",
    description:
      "Full-service premium experience for brands that demand excellence.",
    features: [
      "Unlimited pages",
      "Bespoke design",
      "Brand guidelines",
      "E-commerce ready",
      "Priority support (1 year)",
      "Unlimited revisions",
      "Monthly maintenance (3 mo)",
      "Content strategy session",
    ],
    cta: "Go Premium",
  },
];

export const PRICING_COMPARISON = [
  { feature: "Pages", starter: "5", business: "12", premium: "Unlimited" },
  {
    feature: "Custom Design",
    starter: "Template-based",
    business: "Yes",
    premium: "Bespoke",
  },
  {
    feature: "SEO Setup",
    starter: "Basic",
    business: "Advanced",
    premium: "Full",
  },
  { feature: "Revisions", starter: "1", business: "3", premium: "Unlimited" },
  {
    feature: "Support",
    starter: "30 days",
    business: "90 days",
    premium: "1 year",
  },
  { feature: "Blog", starter: "—", business: "Yes", premium: "Yes" },
  { feature: "Maintenance", starter: "—", business: "—", premium: "3 months" },
  { feature: "Brand Guidelines", starter: "—", business: "—", premium: "Yes" },
];
