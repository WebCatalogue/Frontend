import { demoImage } from "@/lib/demo-images";

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  industry: string;
  location: string;
  description: string;
  story: string;
  servicesDelivered: string[];
  results: { label: string; value: string }[];
  image: string;
  screenshotDesktop: string;
  screenshotMobile: string;
  year: string;
  timeline: string;
  pages: number;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "1",
    slug: "harbor-coffee",
    title: "Harbor Coffee Co.",
    industry: "Café",
    location: "Kochi, Kerala",
    description:
      "A neighbourhood roastery needed a site that matched the care they put into every pour-over.",
    story:
      "Harbor had loyal walk-in regulars but almost no online presence. Their menu lived on a faded chalkboard photo on Instagram. We built a warm, photo-led site with a digital menu, roastery story, and clear hours — so tourists and locals could find them before opening time. Within six weeks, weekend foot traffic from search and maps referrals climbed noticeably.",
    servicesDelivered: [
      "Website design & build",
      "Menu structure",
      "Photography direction",
      "Local SEO setup",
    ],
    results: [
      { label: "Online menu views", value: "+220%" },
      { label: "Weekend walk-ins", value: "+35%" },
      { label: "Launch timeline", value: "18 days" },
    ],
    image: demoImage("cafe", 1200),
    screenshotDesktop: demoImage("cafeInterior", 1400),
    screenshotMobile: demoImage("cafe", 600),
    year: "2025",
    timeline: "18 days",
    pages: 6,
  },
  {
    id: "2",
    slug: "atelier-salon",
    title: "Atelier Salon",
    industry: "Salon",
    location: "Hyderabad, Telangana",
    description:
      "A premium salon wanted bookings to feel as refined as the experience in the chair.",
    story:
      "Atelier's old site buried prices and forced clients to call for availability. We redesigned around service clarity — stylists, galleries, and one-tap booking. The tone matches their interior: calm, confident, never salesy. Reception reported fewer 'how much is a balayage?' calls and more qualified appointments.",
    servicesDelivered: [
      "Website redesign",
      "Service menu architecture",
      "Booking integration",
      "Gallery layout",
    ],
    results: [
      { label: "Online bookings", value: "+48%" },
      { label: "Phone enquiries", value: "−30%" },
      { label: "Launch timeline", value: "3 weeks" },
    ],
    image: demoImage("salon", 1200),
    screenshotDesktop: demoImage("salon", 1400),
    screenshotMobile: demoImage("salon", 600),
    year: "2025",
    timeline: "3 weeks",
    pages: 7,
  },
  {
    id: "3",
    slug: "greenfield-clinic",
    title: "Greenfield Clinic",
    industry: "Healthcare",
    location: "Pune, Maharashtra",
    description:
      "A family practice needed patients to trust them online before stepping into the waiting room.",
    story:
      "Greenfield's previous website looked like it hadn't been touched since 2012 — which undermined an otherwise modern clinic. We rebuilt with clear service pages, doctor bios, and a simple appointment path. Patient feedback mentioned the site specifically: 'I knew what to expect before I arrived.'",
    servicesDelivered: [
      "Trust-focused UX",
      "Doctor profile pages",
      "Appointment flow",
      "FAQ & insurance info",
    ],
    results: [
      { label: "Appointment requests", value: "+41%" },
      { label: "Bounce rate", value: "−26%" },
      { label: "Launch timeline", value: "4 weeks" },
    ],
    image: demoImage("clinic", 1200),
    screenshotDesktop: demoImage("clinic", 1400),
    screenshotMobile: demoImage("clinic", 600),
    year: "2024",
    timeline: "4 weeks",
    pages: 9,
  },
  {
    id: "4",
    slug: "maison-jewels",
    title: "Maison Jewels",
    industry: "Jewellery",
    location: "Jaipur, Rajasthan",
    description:
      "A heritage jeweller wanted their craftsmanship visible in every pixel.",
    story:
      "Maison sells on detail — gemstone cuts, setting styles, generational craft. Their old grid of tiny thumbnails didn't do pieces justice. We moved to an editorial gallery with collection stories and a custom enquiry flow for bridal clients. Showroom visits from out-of-town buyers increased after launch.",
    servicesDelivered: [
      "Luxury template customisation",
      "Collection storytelling",
      "Custom enquiry forms",
      "Image optimisation",
    ],
    results: [
      { label: "Bridal enquiries", value: "+55%" },
      { label: "Avg. session time", value: "+3.2 min" },
      { label: "Launch timeline", value: "5 weeks" },
    ],
    image: demoImage("jewellery", 1200),
    screenshotDesktop: demoImage("jewellery", 1400),
    screenshotMobile: demoImage("jewellery", 600),
    year: "2024",
    timeline: "5 weeks",
    pages: 8,
  },
  {
    id: "5",
    slug: "ironforge-gym",
    title: "Ironforge Gym",
    industry: "Fitness",
    location: "Bengaluru, Karnataka",
    description:
      "A CrossFit box needed a site with as much energy as their 6 a.m. classes.",
    story:
      "Ironforge competed with bigger chains that had polished apps and pricing pages. We gave them a bold, dark-themed site with class schedules, coach bios, and transparent membership tiers. January sign-ups exceeded their previous year — they credited the clarity of the pricing page.",
    servicesDelivered: [
      "High-energy web design",
      "Class schedule layout",
      "Membership comparison",
      "Performance optimisation",
    ],
    results: [
      { label: "January sign-ups", value: "+62%" },
      { label: "Trial conversions", value: "+28%" },
      { label: "Launch timeline", value: "2 weeks" },
    ],
    image: demoImage("gym", 1200),
    screenshotDesktop: demoImage("gym", 1400),
    screenshotMobile: demoImage("gym", 600),
    year: "2024",
    timeline: "2 weeks",
    pages: 6,
  },
  {
    id: "6",
    slug: "table-nine",
    title: "Table Nine",
    industry: "Restaurant",
    location: "Mumbai, Maharashtra",
    description:
      "A fine-dining room needed reservations to feel as intentional as the tasting menu.",
    story:
      "Table Nine had press coverage but a website that didn't match the room. We built an immersive experience — chef story, seasonal menu, private dining — with photography that leads every scroll. Reservations shifted from phone-heavy to online-first within the first month.",
    servicesDelivered: [
      "Fine dining web experience",
      "Menu architecture",
      "Reservation integration",
      "Private events page",
    ],
    results: [
      { label: "Online reservations", value: "+70%" },
      { label: "Private event leads", value: "+4 / month" },
      { label: "Launch timeline", value: "4 weeks" },
    ],
    image: demoImage("restaurant", 1200),
    screenshotDesktop: demoImage("restaurantDining", 1400),
    screenshotMobile: demoImage("restaurant", 600),
    year: "2025",
    timeline: "4 weeks",
    pages: 8,
  },
];
