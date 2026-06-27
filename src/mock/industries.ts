import { demoImage } from "@/lib/demo-images";

export interface IndustryFeature {
  title: string;
  description: string;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  helpText: string;
  image: string;
  heroImage: string;
  overview: string;
  whyNeeded: string;
  commonFeatures: IndustryFeature[];
  suggestedThemeId: string;
  suggestedPaletteId: string;
  availableComponents: string[];
  faq: { question: string; answer: string }[];
}

export const INDUSTRIES: Industry[] = [
  {
    id: "cafe",
    name: "Cafés & Coffee Shops",
    slug: "cafe",
    tagline: "Turn first-time visitors into regulars.",
    description:
      "Websites that capture the warmth of your space — menu, hours, and story in one place.",
    helpText:
      "Show your roast, your pastries, and your neighbourhood. Make it easy to find you and hard to resist.",
    image: demoImage("cafe", 800),
    heroImage: demoImage("cafe", 1600),
    overview:
      "Your café competes with chains that spend millions on branding. A sharp website levels the field — it shows your beans, your baristas, and the atmosphere people walk in for. BhaiKISite gives you templates built around what coffee customers actually look for: menu, location, hours, and a reason to visit today.",
    whyNeeded:
      "Most people check your menu online before they order or walk in. If your site looks dated or your hours are buried, they pick the place next door. A proper café website pays for itself in foot traffic.",
    commonFeatures: [
      {
        title: "Digital menu",
        description:
          "Seasonal items, dietary tags, and daily specials — easy to update without calling a developer.",
      },
      {
        title: "Location & hours",
        description:
          "Maps, parking notes, and holiday hours so customers never arrive to a locked door.",
      },
      {
        title: "Story & sourcing",
        description:
          "Share where your beans come from and why your space feels different from a chain.",
      },
      {
        title: "Online ordering ready",
        description:
          "Layouts built to connect with delivery partners or your own ordering flow.",
      },
    ],
    suggestedThemeId: "cafe",
    suggestedPaletteId: "warm",
    availableComponents: [
      "Hero",
      "About",
      "Gallery",
      "Menu",
      "Testimonials",
      "FAQ",
      "Contact",
      "Footer",
    ],
    faq: [
      {
        question: "Can I update my menu myself?",
        answer:
          "Yes. Swap items, prices, and photos from your dashboard — no code required.",
      },
      {
        question: "Do templates work for bakeries too?",
        answer:
          "Absolutely. Café templates adapt well for patisseries, tea rooms, and juice bars.",
      },
      {
        question: "How fast can I go live?",
        answer:
          "Pick a template, add your photos and menu, and publish the same day if you're ready.",
      },
    ],
  },
  {
    id: "restaurant",
    name: "Restaurants",
    slug: "restaurant",
    tagline: "Fill tables with a site worth savouring.",
    description:
      "From neighbourhood bistros to fine dining — layouts that make people hungry and ready to book.",
    helpText:
      "Reservations, seasonal menus, and private dining — presented the way your food deserves.",
    image: demoImage("restaurant", 800),
    heroImage: demoImage("restaurant", 1600),
    overview:
      "Restaurant websites need to do two jobs: make mouths water and make booking effortless. Our templates lead with photography, structure menus clearly, and put reservations one tap away. Whether you run a family diner or a chef's table, the layout adapts to your pace.",
    whyNeeded:
      "Guests decide where to eat from their phone. Blurry photos and PDF menus cost you covers every week. A polished site signals that the experience inside matches what they see online.",
    commonFeatures: [
      {
        title: "Reservation flows",
        description:
          "Prominent booking buttons and event inquiry forms that actually get used.",
      },
      {
        title: "Seasonal menus",
        description:
          "Organise starters, mains, and wine lists without clutter.",
      },
      {
        title: "Private events",
        description:
          "Dedicated sections for parties, catering, and corporate bookings.",
      },
      {
        title: "Chef & story",
        description:
          "Put a face and philosophy behind the kitchen — it builds loyalty.",
      },
    ],
    suggestedThemeId: "restaurant",
    suggestedPaletteId: "rose",
    availableComponents: [
      "Hero",
      "About",
      "Gallery",
      "Menu",
      "Testimonials",
      "Booking",
      "FAQ",
      "Contact",
      "Footer",
    ],
    faq: [
      {
        question: "Can I show different menus for lunch and dinner?",
        answer:
          "Yes — use tabs or separate pages, whichever fits your service style.",
      },
      {
        question: "Does it work for cloud kitchens?",
        answer:
          "Fast-food and delivery-focused templates are built for order-first restaurants.",
      },
      {
        question: "Can I integrate OpenTable or similar?",
        answer:
          "Booking sections link out to your preferred reservation platform.",
      },
    ],
  },
  {
    id: "bakery",
    name: "Bakeries",
    slug: "bakery",
    tagline: "Showcase what's fresh out of the oven.",
    description:
      "Sweet, artisanal pages for patisseries, bread shops, and custom cake studios.",
    helpText:
      "Daily specials, custom orders, and your craft — visible before customers smell the bread.",
    image: demoImage("bakery", 800),
    heroImage: demoImage("bakery", 1600),
    overview:
      "Bakeries sell with their eyes first. Our templates put your counters, wedding cakes, and seasonal boxes front and centre. Customers see what you bake today, how to order ahead, and where to pick up.",
    whyNeeded:
      "Instagram gets attention, but your website closes custom orders. Without a proper gallery and order form, big events go to the bakery with the better online presence.",
    commonFeatures: [
      {
        title: "Product galleries",
        description:
          "High-resolution grids for cakes, pastries, and seasonal boxes.",
      },
      {
        title: "Custom order forms",
        description:
          "Capture event dates, flavours, and serving sizes in one flow.",
      },
      {
        title: "Daily specials",
        description:
          "Highlight what's fresh today without redesigning the page.",
      },
      {
        title: "Pickup & delivery",
        description: "Clear hours, locations, and ordering cut-off times.",
      },
    ],
    suggestedThemeId: "cafe",
    suggestedPaletteId: "warm",
    availableComponents: [
      "Hero",
      "Gallery",
      "Menu",
      "About",
      "Testimonials",
      "Contact",
      "Footer",
    ],
    faq: [
      {
        question: "Can I take wedding cake enquiries online?",
        answer:
          "Yes — dedicated forms and gallery sections for celebration orders.",
      },
      {
        question: "Will it work on mobile?",
        answer:
          "Every template is mobile-first — most orders happen on phones.",
      },
    ],
  },
  {
    id: "salon",
    name: "Salons & Spas",
    slug: "salon",
    tagline: "Book more chairs with a polished online presence.",
    description:
      "Service menus, stylist profiles, and booking — designed for beauty brands that charge for craft.",
    helpText:
      "Your website should feel as considered as your cuts. Show services, prices, and availability clearly.",
    image: demoImage("salon", 800),
    heroImage: demoImage("salon", 1600),
    overview:
      "Salon clients choose based on vibe and trust. BhaiKISite templates emphasise your work through galleries, list services without confusion, and guide visitors to book — not bounce to a competitor's Instagram.",
    whyNeeded:
      "If booking takes three clicks or your price list is a screenshot, people leave. A clear site reduces no-shows and attracts clients willing to pay for quality.",
    commonFeatures: [
      {
        title: "Service menus",
        description: "Organised by category with duration and pricing.",
      },
      {
        title: "Stylist profiles",
        description: "Introduce your team and their specialties.",
      },
      {
        title: "Before & after galleries",
        description: "Visual proof that sells the upgrade.",
      },
      {
        title: "Online booking",
        description: "Connect to your booking tool with prominent CTAs.",
      },
    ],
    suggestedThemeId: "salon",
    suggestedPaletteId: "rose",
    availableComponents: [
      "Hero",
      "Services",
      "Gallery",
      "Team",
      "Testimonials",
      "Booking",
      "Contact",
      "Footer",
    ],
    faq: [
      {
        question: "Can I show different services per location?",
        answer:
          "Multi-location salons can use separate pages or filtered service lists.",
      },
      {
        question: "Do you support spa and wellness menus?",
        answer:
          "Yes — service sections work for massages, facials, and packages too.",
      },
    ],
  },
  {
    id: "gym",
    name: "Gyms & Fitness",
    slug: "gym",
    tagline: "Convert browsers into members.",
    description:
      "High-energy sites with class schedules, trainer spotlights, and membership tiers.",
    helpText:
      "Motivation starts online. Show your facility, programs, and pricing without the hard sell.",
    image: demoImage("gym", 800),
    heroImage: demoImage("gym", 1600),
    overview:
      "Gym websites need energy and clarity. Visitors want to see the floor, understand class types, and compare memberships in seconds. Our fitness templates are built for that decision moment — not generic corporate wellness pages.",
    whyNeeded:
      "January traffic is useless if your site doesn't convert. Weak pricing pages and missing class info send motivated people to the gym with the clearer website.",
    commonFeatures: [
      {
        title: "Class schedules",
        description: "Weekly timetables that are easy to scan on mobile.",
      },
      {
        title: "Trainer profiles",
        description: "Credentials and specialties that build confidence.",
      },
      {
        title: "Membership tiers",
        description:
          "Side-by-side plans without hidden fees buried in footnotes.",
      },
      {
        title: "Trial & tour CTAs",
        description:
          "Drive free trials and facility visits with prominent buttons.",
      },
    ],
    suggestedThemeId: "gym",
    suggestedPaletteId: "blue",
    availableComponents: [
      "Hero",
      "Features",
      "Pricing",
      "Team",
      "Gallery",
      "Testimonials",
      "CTA",
      "Contact",
      "Footer",
    ],
    faq: [
      {
        question: "Works for yoga and pilates studios?",
        answer: "Yes — class-first layouts suit boutique fitness studios too.",
      },
      {
        question: "Can I highlight personal training?",
        answer:
          "Dedicated sections for 1:1 coaching and transformation stories.",
      },
    ],
  },
  {
    id: "jewellery",
    name: "Jewellery",
    slug: "jewellery",
    tagline: "Let every piece breathe.",
    description:
      "Luxury product galleries and collection stories for fine jewellers and watchmakers.",
    helpText:
      "Craftsmanship deserves close-ups, not cramped grids. Showcase collections with room to shine.",
    image: demoImage("jewellery", 800),
    heroImage: demoImage("jewellery", 1600),
    overview:
      "Jewellery is sold on detail and emotion. Our templates use generous whitespace, zoom-friendly galleries, and storytelling sections that explain heritage, materials, and custom work — the things that justify premium pricing.",
    whyNeeded:
      "Customers research online before visiting a showroom. A site that looks like a marketplace listing undermines the value of handmade or certified pieces.",
    commonFeatures: [
      {
        title: "Collection galleries",
        description:
          "Editorial layouts for bridal, everyday, and limited editions.",
      },
      {
        title: "Craft & heritage",
        description: "Tell the story behind your workshop or family legacy.",
      },
      {
        title: "Custom design enquiries",
        description: "Forms for bespoke pieces with reference uploads.",
      },
      {
        title: "Store locator",
        description:
          "Directions, hours, and appointment booking for showrooms.",
      },
    ],
    suggestedThemeId: "luxury",
    suggestedPaletteId: "amber",
    availableComponents: [
      "Hero",
      "Gallery",
      "About",
      "Features",
      "Testimonials",
      "Contact",
      "Footer",
    ],
    faq: [
      {
        question: "Can I showcase high-resolution product photos?",
        answer:
          "Galleries are optimised for sharp imagery without slow load times.",
      },
      {
        question: "Suitable for watch retailers?",
        answer: "Luxury templates work well for timepieces and accessories.",
      },
    ],
  },
  {
    id: "furniture",
    name: "Furniture & Home",
    slug: "furniture",
    tagline: "Help customers picture it in their home.",
    description:
      "Room inspiration, product catalogues, and showroom info for furniture retailers.",
    helpText:
      "Spacious layouts that mirror the calm of a well-designed living room.",
    image: demoImage("furniture", 800),
    heroImage: demoImage("furniture", 1600),
    overview:
      "Furniture buyers need scale, material, and context. BhaiKISite templates combine room-set photography, clean product cards, and showroom details so customers visit prepared — or buy with confidence online.",
    whyNeeded:
      "Competing with large retailers means looking equally professional online. A cluttered catalogue or missing dimensions creates returns and abandoned carts.",
    commonFeatures: [
      {
        title: "Room inspiration",
        description: "Styled scenes that show pieces in real homes.",
      },
      {
        title: "Product catalogue",
        description:
          "Filterable grids with materials, sizes, and availability.",
      },
      {
        title: "Showroom visits",
        description:
          "Maps, parking, and appointment booking for large purchases.",
      },
      {
        title: "Delivery & care",
        description:
          "Shipping zones, assembly info, and warranty details upfront.",
      },
    ],
    suggestedThemeId: "minimal",
    suggestedPaletteId: "neutral",
    availableComponents: [
      "Hero",
      "Gallery",
      "Features",
      "About",
      "Testimonials",
      "FAQ",
      "Contact",
      "Footer",
    ],
    faq: [
      {
        question: "Can I organise by room type?",
        answer: "Yes — living room, bedroom, office, and outdoor collections.",
      },
      {
        question: "Works for interior designers?",
        answer: "Portfolio-style galleries suit design studios too.",
      },
    ],
  },
  {
    id: "hotel",
    name: "Hotels & Stays",
    slug: "hotel",
    tagline: "Drive direct bookings, not just OTA listings.",
    description:
      "Immersive room galleries, amenity highlights, and reservation flows for hospitality.",
    helpText:
      "Your property deserves more than a booking widget on a white page.",
    image: demoImage("hotel", 800),
    heroImage: demoImage("hotel", 1600),
    overview:
      "Hotels lose margin when every booking goes through a third party. A compelling direct-booking site shows rooms, experiences, and local flavour — giving travellers a reason to book with you instead of a aggregator.",
    whyNeeded:
      "Travellers compare photos before price. Low-quality galleries and buried amenity lists push guests to platforms that take a cut of every stay.",
    commonFeatures: [
      {
        title: "Room galleries",
        description:
          "Multiple angles, floor plans, and rate highlights per room type.",
      },
      {
        title: "Amenities & experiences",
        description: "Spa, dining, and local activities in scannable sections.",
      },
      {
        title: "Direct booking",
        description: "Prominent reserve buttons linked to your booking engine.",
      },
      {
        title: "Events & weddings",
        description: "Dedicated pages for group bookings and celebrations.",
      },
    ],
    suggestedThemeId: "luxury",
    suggestedPaletteId: "neutral",
    availableComponents: [
      "Hero",
      "Gallery",
      "Features",
      "About",
      "Testimonials",
      "Booking",
      "Contact",
      "Footer",
    ],
    faq: [
      {
        question: "Boutique hotels or large resorts?",
        answer:
          "Templates scale from 6-room guesthouses to multi-wing properties.",
      },
      {
        question: "Can I highlight restaurant and spa?",
        answer:
          "Feature sections link dining and wellness as part of the stay.",
      },
    ],
  },
  {
    id: "clinic",
    name: "Clinics & Healthcare",
    slug: "clinic",
    tagline: "Build trust before the first appointment.",
    description:
      "Patient-friendly layouts with services, team profiles, and easy scheduling.",
    helpText:
      "Calm design that communicates competence — not clinical coldness.",
    image: demoImage("clinic", 800),
    heroImage: demoImage("clinic", 1600),
    overview:
      "Patients choose providers they trust. Healthcare templates prioritise clarity: who you are, what you treat, how to book, and what to expect. No jargon walls, no outdated PDFs — just a professional first impression.",
    whyNeeded:
      "People Google symptoms and providers in the same session. If your site looks neglected, they assume your practice might be too.",
    commonFeatures: [
      {
        title: "Service listings",
        description: "Clear descriptions of treatments and specialties.",
      },
      {
        title: "Doctor profiles",
        description: "Credentials, languages, and consultation styles.",
      },
      {
        title: "Appointment booking",
        description: "Integrated scheduling or clear contact paths.",
      },
      {
        title: "Patient resources",
        description: "FAQs, preparation guides, and insurance information.",
      },
    ],
    suggestedThemeId: "medical",
    suggestedPaletteId: "cool",
    availableComponents: [
      "Hero",
      "About",
      "Services",
      "Team",
      "FAQ",
      "Testimonials",
      "Contact",
      "Footer",
    ],
    faq: [
      {
        question: "Suitable for dental and dermatology?",
        answer: "Medical templates adapt across outpatient specialties.",
      },
      {
        question: "Can we list multiple locations?",
        answer: "Yes — location pages with hours and contact per branch.",
      },
    ],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    slug: "real-estate",
    tagline: "Listings that sell the lifestyle, not just the square footage.",
    description:
      "Property showcases, agent profiles, and enquiry flows for brokers and agencies.",
    helpText:
      "First impressions happen on a phone screen. Make every listing look worth visiting.",
    image: demoImage("realEstate", 800),
    heroImage: demoImage("realEstate", 1600),
    overview:
      "Real estate is visual and local. BhaiKISite templates foreground photography, neighbourhood context, and agent credibility — the trio that turns scrollers into showings.",
    whyNeeded:
      "Buyers dismiss listings with bad photos and vague descriptions. Agents with polished personal sites win seller mandates because owners trust their marketing.",
    commonFeatures: [
      {
        title: "Property galleries",
        description: "Fullscreen imagery with key specs at a glance.",
      },
      {
        title: "Agent profiles",
        description: "Track record, territories, and direct contact.",
      },
      {
        title: "Mortgage & area guides",
        description: "Content that keeps visitors on your site longer.",
      },
      {
        title: "Enquiry forms",
        description: "Capture serious buyers without friction.",
      },
    ],
    suggestedThemeId: "modern",
    suggestedPaletteId: "slate",
    availableComponents: [
      "Hero",
      "Gallery",
      "Features",
      "Stats",
      "Team",
      "Testimonials",
      "Contact",
      "Footer",
    ],
    faq: [
      {
        question: "Works for commercial property?",
        answer: "Feature and stats sections suit office and retail listings.",
      },
      {
        question: "Can I import listings from my CRM?",
        answer:
          "Layouts are ready for integration — talk to us about your stack.",
      },
    ],
  },
  {
    id: "photography",
    name: "Photography",
    slug: "photography",
    tagline: "Your portfolio is your storefront.",
    description:
      "Image-first layouts for wedding, commercial, and portrait photographers.",
    helpText:
      "Let your work load fast and fill the screen — clients hire what they can see.",
    image: demoImage("photography", 800),
    heroImage: demoImage("photography", 1600),
    overview:
      "Photographers don't need paragraphs — they need galleries that load quickly and feel intentional. Our templates minimise distraction, maximise imagery, and make packages and booking obvious for clients ready to hire.",
    whyNeeded:
      "Social media is discovery; your website is where contracts get signed. A slow or cluttered portfolio loses weddings and commercial jobs to photographers with sharper presentation.",
    commonFeatures: [
      {
        title: "Portfolio grids",
        description:
          "Masonry and editorial layouts that respect aspect ratios.",
      },
      {
        title: "Package pricing",
        description:
          "Clear tiers for weddings, portraits, and commercial work.",
      },
      {
        title: "Client testimonials",
        description: "Social proof beside your best shots.",
      },
      {
        title: "Booking enquiries",
        description: "Date, location, and budget captured in one form.",
      },
    ],
    suggestedThemeId: "minimal",
    suggestedPaletteId: "neutral",
    availableComponents: [
      "Hero",
      "Gallery",
      "About",
      "Services",
      "Pricing",
      "Testimonials",
      "Contact",
      "Footer",
    ],
    faq: [
      {
        question: "Will large galleries hurt performance?",
        answer:
          "Images are optimised for fast loads without sacrificing quality.",
      },
      {
        question: "Suitable for videographers?",
        answer: "Hero and gallery sections support showreel embeds too.",
      },
    ],
  },
  {
    id: "fashion",
    name: "Fashion Boutiques",
    slug: "fashion",
    tagline: "Lookbooks that belong on the runway and the phone.",
    description:
      "Collection-driven pages for boutiques, labels, and apparel brands.",
    helpText:
      "Seasonal drops, store locators, and brand story — without looking like a template store.",
    image: demoImage("fashion", 800),
    heroImage: demoImage("fashion", 1600),
    overview:
      "Fashion brands live and die by aesthetic consistency. BhaiKISite templates deliver editorial spacing, bold typography options, and collection layouts that feel like an extension of your lookbook — not a generic shop theme.",
    whyNeeded:
      "Shoppers expect the same polish online as in your window display. A mismatched website undercuts pricing power and wholesale enquiries.",
    commonFeatures: [
      {
        title: "Seasonal lookbooks",
        description: "Full-bleed imagery for new collections and capsules.",
      },
      {
        title: "Store locator",
        description: "Stockists and flagship locations with hours.",
      },
      {
        title: "Brand story",
        description: "Origin, materials, and sustainability messaging.",
      },
      {
        title: "Wholesale enquiries",
        description: "B2B forms for stockists and collaborators.",
      },
    ],
    suggestedThemeId: "luxury",
    suggestedPaletteId: "rose",
    availableComponents: [
      "Hero",
      "Gallery",
      "About",
      "Features",
      "Testimonials",
      "CTA",
      "Contact",
      "Footer",
    ],
    faq: [
      {
        question: "Can I connect an online shop?",
        answer:
          "Layouts link to Shopify and other platforms — we focus on brand presentation.",
      },
      {
        question: "Streetwear or luxury?",
        answer:
          "Templates range from minimal quiet luxury to bold dark streetwear.",
      },
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
