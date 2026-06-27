export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  author: string;
  date: string;
  readTime: string;
}

export const BLOG_CATEGORIES = [
  { name: "Design", slug: "design" },
  { name: "Business", slug: "business" },
  { name: "SEO", slug: "seo" },
  { name: "Industry Insights", slug: "industry-insights" },
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "why-your-cafe-needs-a-premium-website",
    title: "Why Your Café Needs a Premium Website in 2025",
    excerpt:
      "Customers decide whether to visit in seconds. Here's how a crafted digital presence fills seats.",
    category: "Industry Insights",
    categorySlug: "industry-insights",
    author: "Arjun Mehta",
    date: "2025-05-12",
    readTime: "6 min",
  },
  {
    id: "2",
    slug: "website-speed-and-conversions",
    title: "How Website Speed Directly Impacts Your Revenue",
    excerpt:
      "Every second of load time costs conversions. We break down the numbers for local businesses.",
    category: "Business",
    categorySlug: "business",
    author: "Sneha Patel",
    date: "2025-04-28",
    readTime: "8 min",
  },
  {
    id: "3",
    slug: "local-seo-fundamentals",
    title: "Local SEO Fundamentals for Small Businesses",
    excerpt:
      "Get found on Google Maps and local search with these foundational strategies.",
    category: "SEO",
    categorySlug: "seo",
    author: "Sneha Patel",
    date: "2025-04-15",
    readTime: "10 min",
  },
  {
    id: "4",
    slug: "design-principles-that-build-trust",
    title: "5 Design Principles That Build Customer Trust",
    excerpt:
      "Typography, spacing, and color choices that signal quality before a word is read.",
    category: "Design",
    categorySlug: "design",
    author: "Arjun Mehta",
    date: "2025-03-30",
    readTime: "7 min",
  },
];
