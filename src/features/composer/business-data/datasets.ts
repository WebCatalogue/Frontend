import type { BusinessDataSource } from "./types";

export const BUSINESS_DATA_SOURCES: (BusinessDataSource & {
  apiAvailable: boolean;
})[] = [
  {
    id: "cafe-menu",
    name: "Café Menu",
    description:
      "Drinks, pastries, and daily specials with prices and dietary tags.",
    icon: "☕",
    apiEndpoint: "/websites/:id/data/menu",
    apiAvailable: false,
    industries: ["cafe", "bakery"],
    fields: [
      { key: "name", label: "Item name", type: "text", required: true },
      { key: "price", label: "Price", type: "text", required: true },
      { key: "category", label: "Category", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "image", label: "Image URL", type: "image" },
    ],
  },
  {
    id: "gym-memberships",
    name: "Gym Membership Plans",
    description: "Tiered plans with features, pricing, and signup CTAs.",
    icon: "💪",
    apiEndpoint: "/websites/:id/data/memberships",
    apiAvailable: false,
    industries: ["gym"],
    fields: [
      { key: "name", label: "Plan name", type: "text", required: true },
      { key: "price", label: "Monthly price", type: "text", required: true },
      { key: "features", label: "Features", type: "textarea" },
    ],
  },
  {
    id: "salon-services",
    name: "Salon Services",
    description: "Service menu with duration, stylist, and booking links.",
    icon: "✂️",
    apiEndpoint: "/websites/:id/data/services",
    apiAvailable: false,
    industries: ["salon"],
    fields: [
      { key: "name", label: "Service", type: "text", required: true },
      { key: "duration", label: "Duration", type: "text" },
      { key: "price", label: "From price", type: "text" },
    ],
  },
  {
    id: "restaurant-categories",
    name: "Restaurant Menu",
    description:
      "Menu sections — starters, mains, desserts, and seasonal items.",
    icon: "🍽️",
    apiEndpoint: "/websites/:id/data/menu-categories",
    apiAvailable: false,
    industries: ["restaurant"],
    fields: [
      { key: "name", label: "Category", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    id: "team-members",
    name: "Team Members",
    description: "Staff profiles with role, bio, and photo.",
    icon: "👥",
    apiEndpoint: "/websites/:id/data/team",
    apiAvailable: false,
    industries: ["clinic", "salon", "education"],
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role", type: "text" },
      { key: "bio", label: "Bio", type: "textarea" },
      { key: "photo", label: "Photo URL", type: "image" },
    ],
  },
  {
    id: "testimonials",
    name: "Testimonials",
    description: "Customer quotes with name and business.",
    icon: "💬",
    apiEndpoint: "/websites/:id/data/testimonials",
    apiAvailable: false,
    industries: ["cafe", "salon", "gym", "restaurant"],
    fields: [
      { key: "quote", label: "Quote", type: "textarea", required: true },
      { key: "author", label: "Author", type: "text" },
      { key: "business", label: "Business", type: "text" },
    ],
  },
  {
    id: "gallery",
    name: "Gallery",
    description: "Image collections for portfolios and product showcases.",
    icon: "🖼️",
    apiEndpoint: "/websites/:id/data/gallery",
    apiAvailable: false,
    industries: ["photography", "fashion", "furniture", "jewellery"],
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "image", label: "Image URL", type: "image", required: true },
      { key: "caption", label: "Caption", type: "text" },
    ],
  },
  {
    id: "pricing",
    name: "Pricing",
    description: "Service or product pricing tables.",
    icon: "💰",
    apiEndpoint: "/websites/:id/data/pricing",
    apiAvailable: false,
    industries: ["gym", "salon", "education"],
    fields: [
      { key: "name", label: "Plan", type: "text", required: true },
      { key: "price", label: "Price", type: "text", required: true },
      { key: "features", label: "Features", type: "textarea" },
    ],
  },
  {
    id: "faqs",
    name: "FAQs",
    description: "Question and answer pairs for support sections.",
    icon: "❓",
    apiEndpoint: "/websites/:id/data/faqs",
    apiAvailable: false,
    industries: ["clinic", "gym", "education"],
    fields: [
      { key: "question", label: "Question", type: "text", required: true },
      { key: "answer", label: "Answer", type: "textarea", required: true },
    ],
  },
  {
    id: "events",
    name: "Events",
    description: "Upcoming events, workshops, and promotions.",
    icon: "📅",
    apiEndpoint: "/websites/:id/data/events",
    apiAvailable: false,
    industries: ["restaurant", "hotel", "education"],
    fields: [
      { key: "title", label: "Event title", type: "text", required: true },
      { key: "date", label: "Date", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
];

export function getBusinessDataSource(id: string) {
  return BUSINESS_DATA_SOURCES.find((s) => s.id === id);
}
