import { demoImage } from "@/lib/demo-images";
import type { MarketplaceOption, OptionDef } from "./types";

function opt(categoryId: string, def: OptionDef): MarketplaceOption {
  return {
    categoryId,
    id: def.id,
    name: def.name,
    description: def.description,
    componentKey: def.componentKey,
    variant: def.variant ?? null,
    settings: def.settings ?? null,
    screenshot: demoImage(def.imageKey, 900),
    supportedThemes: def.supportedThemes ?? [
      "modern",
      "minimal",
      "luxury",
      "cafe",
      "gym",
    ],
    supportedIndustries: def.supportedIndustries ?? ["*"],
    animations: def.animations ?? [],
    mobileReady: def.mobileReady ?? true,
    accessibility: def.accessibility ?? "aa",
    performance: def.performance ?? "light",
    tags: def.tags,
  };
}

function cat(categoryId: string, defs: OptionDef[]): MarketplaceOption[] {
  return defs.map((d) => opt(categoryId, d));
}

const NAV = cat("navigation", [
  {
    id: "nav-centered",
    name: "Centered Nav",
    description: "Logo centred with balanced link groups on each side.",
    componentKey: "preview.nav.centered",
    imageKey: "workspace",
    animations: ["fade-in"],
  },
  {
    id: "nav-split",
    name: "Split Nav",
    description: "Logo left, links right — the classic professional layout.",
    componentKey: "preview.nav.split",
    imageKey: "laptop",
    animations: ["slide-in"],
  },
  {
    id: "nav-minimal",
    name: "Minimal Nav",
    description: "Quiet typography with a single accent CTA.",
    componentKey: "preview.nav.minimal",
    imageKey: "workspace",
    animations: ["none"],
    performance: "light",
  },
  {
    id: "nav-transparent",
    name: "Transparent Nav",
    description: "Floats over hero imagery for immersive landing pages.",
    componentKey: "preview.nav.transparent",
    imageKey: "hotel",
    animations: ["fade-in"],
  },
  {
    id: "nav-sticky",
    name: "Sticky Nav",
    description: "Stays visible on scroll with subtle backdrop blur.",
    componentKey: "preview.nav.sticky",
    imageKey: "cafe",
    animations: ["fade-in"],
  },
  {
    id: "nav-mega",
    name: "Mega Menu",
    description: "Expandable panels for large sites and deep navigation.",
    componentKey: "preview.nav.mega",
    imageKey: "furniture",
    animations: ["accordion"],
    performance: "moderate",
  },
]);

const HERO = cat("hero", [
  {
    id: "hero-centered",
    name: "Centered Hero",
    description: "Bold headline with centred copy and primary CTA.",
    componentKey: "hero.basic",
    imageKey: "cafe",
    settings: {
      headline: "Crafted with care",
      subtitle:
        "Every detail considered — from first impression to final click.",
      ctaLabel: "Explore",
    },
    animations: ["fade-up"],
  },
  {
    id: "hero-split",
    name: "Split Hero",
    description: "Copy and imagery side by side for storytelling brands.",
    componentKey: "hero.split",
    imageKey: "restaurant",
    settings: {
      headline: "Experience the difference",
      subtitle: "A layout built for brands that lead with visuals.",
      ctaLabel: "Book now",
    },
    animations: ["slide-in"],
  },
  {
    id: "hero-video",
    name: "Video Hero",
    description: "Cinematic full-width video backdrop with overlay text.",
    componentKey: "hero.video",
    imageKey: "gym",
    settings: {
      headline: "Move with purpose",
      subtitle:
        "High-energy first impressions for fitness and lifestyle brands.",
    },
    animations: ["scale-in"],
    performance: "moderate",
  },
  {
    id: "hero-minimal",
    name: "Minimal Hero",
    description: "Generous whitespace with restrained typography.",
    componentKey: "hero.basic",
    imageKey: "furniture",
    variant: "minimal",
    settings: {
      headline: "Quiet luxury",
      subtitle: "Less noise. More intention.",
      ctaLabel: "Discover",
    },
    animations: ["fade-in"],
    performance: "light",
  },
  {
    id: "hero-editorial",
    name: "Editorial Hero",
    description: "Magazine-style headline with supporting eyebrow.",
    componentKey: "hero.split",
    imageKey: "fashion",
    variant: "editorial",
    settings: {
      headline: "The new collection",
      subtitle: "Seasonal drops presented with editorial spacing.",
    },
    animations: ["reveal"],
  },
  {
    id: "hero-immersive",
    name: "Immersive Hero",
    description: "Edge-to-edge imagery with gradient text overlay.",
    componentKey: "hero.video",
    imageKey: "hotel",
    variant: "immersive",
    settings: { headline: "Arrive somewhere unforgettable" },
    animations: ["parallax"],
    performance: "moderate",
  },
]);

const ABOUT = cat("about", [
  {
    id: "about-story",
    name: "Brand Story",
    description: "Narrative block with headline and long-form body copy.",
    componentKey: "about.story",
    imageKey: "cafeInterior",
    animations: ["reveal"],
  },
  {
    id: "about-split",
    name: "Split About",
    description: "Image beside story for founder-led businesses.",
    componentKey: "preview.about.split",
    imageKey: "bakery",
    animations: ["slide-in"],
  },
  {
    id: "about-timeline",
    name: "Timeline",
    description: "Milestones that build heritage and trust.",
    componentKey: "preview.about.timeline",
    imageKey: "jewellery",
    animations: ["stagger"],
  },
  {
    id: "about-values",
    name: "Values Grid",
    description: "Three pillars that communicate what you stand for.",
    componentKey: "preview.about.values",
    imageKey: "clinic",
    animations: ["fade-up"],
  },
  {
    id: "about-team-intro",
    name: "Team Intro",
    description: "Short team narrative before profiles or services.",
    componentKey: "about.story",
    imageKey: "salon",
    variant: "team",
    settings: {
      headline: "People behind the craft",
      body: "Meet the team that makes every visit feel personal.",
    },
    animations: ["fade-in"],
  },
]);

const GALLERY = cat("gallery", [
  {
    id: "gallery-grid",
    name: "Masonry Grid",
    description: "Responsive image grid with hover zoom.",
    componentKey: "gallery.grid",
    imageKey: "photography",
    animations: ["stagger"],
  },
  {
    id: "gallery-carousel",
    name: "Carousel",
    description: "Swipeable slider for featured work or rooms.",
    componentKey: "gallery.carousel",
    imageKey: "hotel",
    animations: ["marquee"],
    performance: "moderate",
  },
  {
    id: "gallery-featured",
    name: "Featured + Grid",
    description: "Hero image with supporting thumbnail grid.",
    componentKey: "preview.gallery.featured",
    imageKey: "restaurant",
    animations: ["fade-up"],
  },
  {
    id: "gallery-masonry",
    name: "Editorial Masonry",
    description: "Mixed aspect ratios for portfolio-style brands.",
    componentKey: "gallery.grid",
    imageKey: "fashion",
    variant: "masonry",
    animations: ["stagger"],
    performance: "moderate",
  },
  {
    id: "gallery-lightbox",
    name: "Lightbox Grid",
    description: "Click-to-expand gallery with keyboard navigation.",
    componentKey: "preview.gallery.lightbox",
    imageKey: "jewellery",
    animations: ["scale-in"],
    accessibility: "aaa",
  },
  {
    id: "gallery-fullbleed",
    name: "Full-bleed Strip",
    description: "Horizontal image strip for maximum visual impact.",
    componentKey: "gallery.carousel",
    imageKey: "realEstate",
    variant: "strip",
    animations: ["marquee"],
  },
]);

const TESTIMONIALS = cat("testimonials", [
  {
    id: "testimonials-cards",
    name: "Card Grid",
    description: "Three-up testimonial cards with star ratings.",
    componentKey: "preview.testimonials.cards",
    imageKey: "cafe",
    animations: ["stagger"],
  },
  {
    id: "testimonials-carousel",
    name: "Quote Carousel",
    description: "Rotating quotes with author attribution.",
    componentKey: "preview.testimonials.carousel",
    imageKey: "salon",
    animations: ["fade-in"],
    performance: "moderate",
  },
  {
    id: "testimonials-featured",
    name: "Featured Quote",
    description: "Single large quote for maximum social proof.",
    componentKey: "preview.testimonials.featured",
    imageKey: "gym",
    animations: ["reveal"],
  },
  {
    id: "testimonials-video",
    name: "Video Testimonials",
    description: "Embedded client stories beside written quotes.",
    componentKey: "preview.testimonials.video",
    imageKey: "photography",
    animations: ["fade-up"],
    performance: "moderate",
  },
  {
    id: "testimonials-logos",
    name: "Logos + Quotes",
    description: "Brand logos paired with short endorsements.",
    componentKey: "preview.testimonials.logos",
    imageKey: "realEstate",
    animations: ["fade-in"],
  },
]);

const CONTACT = cat("contact", [
  {
    id: "contact-map",
    name: "Map + Form",
    description: "Location map with enquiry form side by side.",
    componentKey: "contact.map",
    imageKey: "cafe",
    animations: ["fade-in"],
  },
  {
    id: "contact-split",
    name: "Split Contact",
    description: "Hours and details beside a compact form.",
    componentKey: "preview.contact.split",
    imageKey: "restaurant",
    animations: ["slide-in"],
  },
  {
    id: "contact-minimal",
    name: "Minimal Contact",
    description: "Email, phone, and social links — no clutter.",
    componentKey: "preview.contact.minimal",
    imageKey: "photography",
    animations: ["none"],
    performance: "light",
  },
  {
    id: "contact-booking",
    name: "Booking Contact",
    description: "Date picker and party size for reservations.",
    componentKey: "preview.contact.booking",
    imageKey: "restaurantDining",
    animations: ["fade-up"],
  },
  {
    id: "contact-cards",
    name: "Location Cards",
    description: "Multi-location cards with maps and hours.",
    componentKey: "preview.contact.cards",
    imageKey: "realEstate",
    animations: ["stagger"],
  },
]);

const FOOTER = cat("footer", [
  {
    id: "footer-simple",
    name: "Simple Footer",
    description: "Copyright and essential links in one row.",
    componentKey: "footer.simple",
    imageKey: "workspace",
    animations: ["none"],
    performance: "light",
  },
  {
    id: "footer-columns",
    name: "Column Footer",
    description: "Four columns for links, hours, and newsletter.",
    componentKey: "preview.footer.columns",
    imageKey: "cafe",
    animations: ["fade-in"],
  },
  {
    id: "footer-minimal",
    name: "Minimal Footer",
    description: "Single line with social icons.",
    componentKey: "footer.simple",
    imageKey: "fashion",
    variant: "minimal",
    animations: ["none"],
  },
  {
    id: "footer-newsletter",
    name: "Newsletter Footer",
    description: "Email capture above link columns.",
    componentKey: "preview.footer.newsletter",
    imageKey: "bakery",
    animations: ["fade-up"],
  },
  {
    id: "footer-luxury",
    name: "Luxury Footer",
    description: "Refined spacing for premium hospitality brands.",
    componentKey: "preview.footer.luxury",
    imageKey: "hotel",
    animations: ["fade-in"],
  },
  {
    id: "footer-map",
    name: "Footer + Map",
    description: "Embedded map with contact details below.",
    componentKey: "preview.footer.map",
    imageKey: "clinic",
    animations: ["fade-in"],
    performance: "moderate",
  },
]);

// Industry-specific option builders
function industryCat(
  categoryId: string,
  defs: OptionDef[],
): MarketplaceOption[] {
  return cat(categoryId, defs);
}

const MENU = industryCat("menu", [
  {
    id: "menu-grid",
    name: "Grid Menu",
    description: "Photo cards with prices and dietary tags.",
    componentKey: "preview.menu.grid",
    imageKey: "cafe",
    supportedIndustries: ["cafe", "restaurant", "bakery"],
    animations: ["stagger"],
  },
  {
    id: "menu-categories",
    name: "Category Menu",
    description: "Tabbed sections for drinks, food, and specials.",
    componentKey: "preview.menu.categories",
    imageKey: "restaurant",
    supportedIndustries: ["cafe", "restaurant"],
    animations: ["fade-in"],
  },
  {
    id: "menu-board",
    name: "Chalkboard Menu",
    description: "Handwritten aesthetic for artisan brands.",
    componentKey: "preview.menu.board",
    imageKey: "bakery",
    supportedIndustries: ["cafe", "bakery"],
    animations: ["none"],
  },
  {
    id: "menu-featured",
    name: "Featured + List",
    description: "Hero dish beside scannable item list.",
    componentKey: "preview.menu.featured",
    imageKey: "restaurantDining",
    supportedIndustries: ["restaurant"],
    animations: ["reveal"],
  },
  {
    id: "menu-compact",
    name: "Compact List",
    description: "Dense list optimised for mobile ordering.",
    componentKey: "preview.menu.compact",
    imageKey: "cafeInterior",
    supportedIndustries: ["cafe", "bakery"],
    animations: ["none"],
    performance: "light",
  },
]);

const FEATURED_DRINKS = industryCat("featured-drinks", [
  {
    id: "drinks-carousel",
    name: "Drinks Carousel",
    description: "Swipe through signature pours and seasonal specials.",
    componentKey: "preview.drinks.carousel",
    imageKey: "cafe",
    supportedIndustries: ["cafe"],
    animations: ["marquee"],
  },
  {
    id: "drinks-cards",
    name: "Drink Cards",
    description: "Three featured drinks with tasting notes.",
    componentKey: "preview.drinks.cards",
    imageKey: "cafeInterior",
    supportedIndustries: ["cafe"],
    animations: ["stagger"],
  },
  {
    id: "drinks-hero",
    name: "Hero Drink",
    description: "Single signature pour with origin story.",
    componentKey: "preview.drinks.hero",
    imageKey: "cafe",
    supportedIndustries: ["cafe"],
    animations: ["reveal"],
  },
  {
    id: "drinks-seasonal",
    name: "Seasonal Spotlight",
    description: "Limited-time drinks with countdown CTA.",
    componentKey: "preview.drinks.seasonal",
    imageKey: "bakery",
    supportedIndustries: ["cafe"],
    animations: ["fade-up"],
  },
]);

const COFFEE_STORY = industryCat("coffee-story", [
  {
    id: "story-origin",
    name: "Origin Story",
    description: "Farm-to-cup narrative with sourcing map.",
    componentKey: "about.story",
    imageKey: "cafe",
    supportedIndustries: ["cafe"],
    settings: {
      headline: "From origin to cup",
      body: "We source directly from small farms — every roast tells a story.",
    },
    animations: ["reveal"],
  },
  {
    id: "story-roastery",
    name: "Roastery Tour",
    description: "Behind-the-scenes process with step imagery.",
    componentKey: "preview.about.split",
    imageKey: "cafeInterior",
    supportedIndustries: ["cafe"],
    animations: ["slide-in"],
  },
  {
    id: "story-values",
    name: "Sustainability",
    description: "Ethical sourcing and environmental commitments.",
    componentKey: "preview.about.values",
    imageKey: "cafe",
    supportedIndustries: ["cafe"],
    animations: ["fade-up"],
  },
]);

const INSTAGRAM = industryCat("instagram-feed", [
  {
    id: "ig-grid",
    name: "Photo Grid",
    description: "Six-up Instagram grid with hover overlay.",
    componentKey: "preview.instagram.grid",
    imageKey: "cafe",
    supportedIndustries: ["cafe", "bakery", "fashion"],
    animations: ["stagger"],
  },
  {
    id: "ig-carousel",
    name: "Story Carousel",
    description: "Horizontal scroll of latest posts.",
    componentKey: "preview.instagram.carousel",
    imageKey: "fashion",
    supportedIndustries: ["cafe", "salon"],
    animations: ["marquee"],
    performance: "moderate",
  },
  {
    id: "ig-featured",
    name: "Featured Post",
    description: "Large featured image with recent thumbnails.",
    componentKey: "preview.instagram.featured",
    imageKey: "bakery",
    supportedIndustries: ["cafe"],
    animations: ["fade-in"],
  },
]);

const BOOKING = industryCat("booking", [
  {
    id: "booking-form",
    name: "Reservation Form",
    description: "Date, time, and party size with confirmation.",
    componentKey: "preview.booking.form",
    imageKey: "restaurant",
    supportedIndustries: ["restaurant", "hotel", "salon"],
    animations: ["fade-up"],
  },
  {
    id: "booking-widget",
    name: "Booking Widget",
    description: "Embedded calendar with availability slots.",
    componentKey: "preview.booking.widget",
    imageKey: "hotel",
    supportedIndustries: ["hotel", "salon"],
    animations: ["fade-in"],
    performance: "moderate",
  },
  {
    id: "booking-cta",
    name: "Booking CTA",
    description: "Prominent reserve button with trust signals.",
    componentKey: "cta.banner",
    imageKey: "restaurantDining",
    supportedIndustries: ["restaurant", "hotel"],
    settings: {
      headline: "Reserve your table",
      body: "Join us for an evening worth remembering.",
      ctaLabel: "Book now",
    },
    animations: ["fade-up"],
  },
  {
    id: "booking-split",
    name: "Split Booking",
    description: "Imagery beside inline booking form.",
    componentKey: "preview.booking.split",
    imageKey: "salon",
    supportedIndustries: ["salon", "hotel"],
    animations: ["slide-in"],
  },
]);

const CHEF_STORY = industryCat("chef-story", [
  {
    id: "chef-profile",
    name: "Chef Profile",
    description: "Portrait, bio, and philosophy beside signature dishes.",
    componentKey: "preview.about.split",
    imageKey: "restaurantDining",
    supportedIndustries: ["restaurant"],
    animations: ["reveal"],
  },
  {
    id: "chef-timeline",
    name: "Culinary Journey",
    description: "Career milestones and accolades.",
    componentKey: "preview.about.timeline",
    imageKey: "restaurant",
    supportedIndustries: ["restaurant"],
    animations: ["stagger"],
  },
  {
    id: "chef-quote",
    name: "Chef's Quote",
    description: "Featured quote with kitchen photography.",
    componentKey: "preview.testimonials.featured",
    imageKey: "restaurant",
    supportedIndustries: ["restaurant"],
    animations: ["fade-in"],
  },
]);

const PRIVATE_EVENTS = industryCat("private-events", [
  {
    id: "events-packages",
    name: "Event Packages",
    description: "Tiered packages for parties and corporate dining.",
    componentKey: "preview.pricing.tiers",
    imageKey: "restaurant",
    supportedIndustries: ["restaurant", "hotel"],
    animations: ["stagger"],
  },
  {
    id: "events-enquiry",
    name: "Event Enquiry",
    description: "Capture date, guest count, and requirements.",
    componentKey: "preview.contact.booking",
    imageKey: "restaurantDining",
    supportedIndustries: ["restaurant"],
    animations: ["fade-up"],
  },
  {
    id: "events-gallery",
    name: "Event Gallery",
    description: "Past events and private dining spaces.",
    componentKey: "gallery.grid",
    imageKey: "hotel",
    supportedIndustries: ["restaurant", "hotel"],
    animations: ["stagger"],
  },
]);

const CUSTOM_ORDERS = industryCat("custom-orders", [
  {
    id: "orders-form",
    name: "Custom Order Form",
    description: "Event date, flavours, and serving size.",
    componentKey: "preview.contact.booking",
    imageKey: "bakery",
    supportedIndustries: ["bakery"],
    animations: ["fade-up"],
  },
  {
    id: "orders-gallery",
    name: "Celebration Gallery",
    description: "Wedding cakes and custom creations.",
    componentKey: "gallery.grid",
    imageKey: "bakery",
    supportedIndustries: ["bakery"],
    animations: ["stagger"],
  },
  {
    id: "orders-cta",
    name: "Order CTA",
    description: "Drive custom enquiries with seasonal messaging.",
    componentKey: "cta.banner",
    imageKey: "bakery",
    supportedIndustries: ["bakery"],
    settings: {
      headline: "Order your celebration cake",
      body: "Tell us your date and vision — we'll handle the rest.",
      ctaLabel: "Start enquiry",
    },
    animations: ["fade-up"],
  },
]);

const DAILY_SPECIALS = industryCat("daily-specials", [
  {
    id: "specials-banner",
    name: "Today's Specials",
    description: "Rotating banner for fresh-baked highlights.",
    componentKey: "cta.banner",
    imageKey: "bakery",
    supportedIndustries: ["bakery", "cafe"],
    settings: {
      headline: "Fresh today",
      body: "Sourdough boule · almond croissants · seasonal tart",
      ctaLabel: "View menu",
    },
    animations: ["fade-in"],
  },
  {
    id: "specials-cards",
    name: "Special Cards",
    description: "Three daily items with photos and prices.",
    componentKey: "preview.menu.cards",
    imageKey: "bakery",
    supportedIndustries: ["bakery", "cafe"],
    animations: ["stagger"],
  },
]);

const STYLISTS = industryCat("stylists", [
  {
    id: "stylists-grid",
    name: "Stylist Grid",
    description: "Team photos with specialties and booking links.",
    componentKey: "preview.team.grid",
    imageKey: "salon",
    supportedIndustries: ["salon"],
    animations: ["stagger"],
  },
  {
    id: "stylists-featured",
    name: "Featured Stylist",
    description: "Spotlight senior stylist with portfolio strip.",
    componentKey: "preview.team.featured",
    imageKey: "salon",
    supportedIndustries: ["salon"],
    animations: ["reveal"],
  },
  {
    id: "stylists-carousel",
    name: "Team Carousel",
    description: "Swipe through stylist profiles.",
    componentKey: "preview.team.carousel",
    imageKey: "salon",
    supportedIndustries: ["salon"],
    animations: ["marquee"],
    performance: "moderate",
  },
]);

const SERVICES = industryCat("services", [
  {
    id: "services-list",
    name: "Service List",
    description: "Categorised services with duration and pricing.",
    componentKey: "preview.services.list",
    imageKey: "salon",
    supportedIndustries: ["salon", "clinic"],
    animations: ["fade-in"],
  },
  {
    id: "services-cards",
    name: "Service Cards",
    description: "Visual cards for cuts, colour, and treatments.",
    componentKey: "preview.services.cards",
    imageKey: "salon",
    supportedIndustries: ["salon"],
    animations: ["stagger"],
  },
  {
    id: "services-tabs",
    name: "Tabbed Services",
    description: "Hair, skin, and wellness in organised tabs.",
    componentKey: "preview.services.tabs",
    imageKey: "clinic",
    supportedIndustries: ["salon", "clinic"],
    animations: ["fade-up"],
  },
  {
    id: "services-pricing",
    name: "Service + Pricing",
    description: "Combined menu with transparent pricing.",
    componentKey: "preview.pricing.tiers",
    imageKey: "salon",
    supportedIndustries: ["salon"],
    animations: ["stagger"],
  },
]);

const PACKAGES = industryCat("packages", [
  {
    id: "packages-tiers",
    name: "Package Tiers",
    description: "Bridal, event, and maintenance bundles.",
    componentKey: "preview.pricing.tiers",
    imageKey: "salon",
    supportedIndustries: ["salon"],
    animations: ["stagger"],
  },
  {
    id: "packages-cards",
    name: "Package Cards",
    description: "Visual package cards with included services.",
    componentKey: "preview.services.cards",
    imageKey: "salon",
    supportedIndustries: ["salon"],
    animations: ["fade-up"],
  },
  {
    id: "packages-compare",
    name: "Compare Packages",
    description: "Side-by-side comparison table.",
    componentKey: "preview.pricing.compare",
    imageKey: "salon",
    supportedIndustries: ["salon"],
    animations: ["fade-in"],
  },
]);

const MEMBERSHIP = industryCat("membership", [
  {
    id: "membership-tiers",
    name: "Membership Tiers",
    description: "Basic, premium, and unlimited plans.",
    componentKey: "preview.pricing.tiers",
    imageKey: "gym",
    supportedIndustries: ["gym"],
    animations: ["stagger"],
  },
  {
    id: "membership-compare",
    name: "Plan Comparison",
    description: "Feature matrix for easy decision-making.",
    componentKey: "preview.pricing.compare",
    imageKey: "gym",
    supportedIndustries: ["gym"],
    animations: ["fade-in"],
  },
  {
    id: "membership-trial",
    name: "Free Trial CTA",
    description: "Drive sign-ups with trial offer banner.",
    componentKey: "cta.banner",
    imageKey: "gym",
    supportedIndustries: ["gym"],
    settings: {
      headline: "Start your free trial",
      body: "Seven days unlimited access — no commitment.",
      ctaLabel: "Claim trial",
    },
    animations: ["fade-up"],
  },
  {
    id: "membership-benefits",
    name: "Member Benefits",
    description: "Perks grid that justifies premium tiers.",
    componentKey: "preview.about.values",
    imageKey: "gym",
    supportedIndustries: ["gym"],
    animations: ["fade-up"],
  },
]);

const TRAINERS = industryCat("trainers", [
  {
    id: "trainers-grid",
    name: "Trainer Grid",
    description: "Coach profiles with credentials and specialties.",
    componentKey: "preview.team.grid",
    imageKey: "gym",
    supportedIndustries: ["gym"],
    animations: ["stagger"],
  },
  {
    id: "trainers-featured",
    name: "Head Coach",
    description: "Featured trainer with transformation stats.",
    componentKey: "preview.team.featured",
    imageKey: "gym",
    supportedIndustries: ["gym"],
    animations: ["reveal"],
  },
  {
    id: "trainers-carousel",
    name: "Coach Carousel",
    description: "Swipe through trainer profiles.",
    componentKey: "preview.team.carousel",
    imageKey: "gym",
    supportedIndustries: ["gym"],
    animations: ["marquee"],
    performance: "moderate",
  },
]);

const PROGRAMS = industryCat("programs", [
  {
    id: "programs-schedule",
    name: "Class Schedule",
    description: "Weekly timetable with class types and instructors.",
    componentKey: "preview.programs.schedule",
    imageKey: "gym",
    supportedIndustries: ["gym"],
    animations: ["fade-in"],
  },
  {
    id: "programs-cards",
    name: "Program Cards",
    description: "HIIT, yoga, strength — visual program cards.",
    componentKey: "preview.services.cards",
    imageKey: "gym",
    supportedIndustries: ["gym"],
    animations: ["stagger"],
  },
  {
    id: "programs-features",
    name: "Program Features",
    description: "What's included in each training track.",
    componentKey: "preview.about.values",
    imageKey: "gym",
    supportedIndustries: ["gym"],
    animations: ["fade-up"],
  },
  {
    id: "programs-cta",
    name: "Join Program CTA",
    description: "Conversion banner for flagship program.",
    componentKey: "cta.banner",
    imageKey: "gym",
    supportedIndustries: ["gym"],
    settings: {
      headline: "Join our flagship program",
      body: "12 weeks to measurable results with expert coaching.",
      ctaLabel: "Enrol now",
    },
    animations: ["fade-up"],
  },
]);

const TRANSFORMATIONS = industryCat("transformations", [
  {
    id: "transform-before-after",
    name: "Before & After",
    description: "Side-by-side transformation gallery.",
    componentKey: "preview.gallery.before-after",
    imageKey: "gym",
    supportedIndustries: ["gym"],
    animations: ["reveal"],
  },
  {
    id: "transform-stories",
    name: "Success Stories",
    description: "Member journeys with quotes and metrics.",
    componentKey: "preview.testimonials.cards",
    imageKey: "gym",
    supportedIndustries: ["gym"],
    animations: ["stagger"],
  },
  {
    id: "transform-stats",
    name: "Results Stats",
    description: "Aggregate outcomes — weight lost, members trained.",
    componentKey: "preview.stats.row",
    imageKey: "gym",
    supportedIndustries: ["gym"],
    animations: ["count-up"],
  },
]);

const ROOMS = industryCat("rooms", [
  {
    id: "rooms-grid",
    name: "Room Grid",
    description: "Room types with rates and amenity icons.",
    componentKey: "preview.rooms.grid",
    imageKey: "hotel",
    supportedIndustries: ["hotel"],
    animations: ["stagger"],
  },
  {
    id: "rooms-carousel",
    name: "Room Carousel",
    description: "Swipe through suites and room categories.",
    componentKey: "gallery.carousel",
    imageKey: "hotel",
    supportedIndustries: ["hotel"],
    animations: ["marquee"],
    performance: "moderate",
  },
  {
    id: "rooms-featured",
    name: "Signature Suite",
    description: "Hero room with gallery and booking CTA.",
    componentKey: "preview.rooms.featured",
    imageKey: "hotel",
    supportedIndustries: ["hotel"],
    animations: ["reveal"],
  },
  {
    id: "rooms-comparison",
    name: "Room Comparison",
    description: "Compare room types side by side.",
    componentKey: "preview.pricing.compare",
    imageKey: "hotel",
    supportedIndustries: ["hotel"],
    animations: ["fade-in"],
  },
]);

const AMENITIES = industryCat("amenities", [
  {
    id: "amenities-grid",
    name: "Amenities Grid",
    description: "Spa, pool, dining, and concierge icons.",
    componentKey: "preview.about.values",
    imageKey: "hotel",
    supportedIndustries: ["hotel"],
    animations: ["stagger"],
  },
  {
    id: "amenities-featured",
    name: "Featured Amenity",
    description: "Spotlight restaurant or spa experience.",
    componentKey: "preview.about.split",
    imageKey: "hotel",
    supportedIndustries: ["hotel"],
    animations: ["reveal"],
  },
  {
    id: "amenities-tour",
    name: "Virtual Tour",
    description: "Image gallery simulating property walkthrough.",
    componentKey: "gallery.grid",
    imageKey: "hotel",
    supportedIndustries: ["hotel"],
    animations: ["stagger"],
    performance: "moderate",
  },
]);

const ATTRACTIONS = industryCat("attractions", [
  {
    id: "attractions-cards",
    name: "Local Experiences",
    description: "Curated activities and neighbourhood highlights.",
    componentKey: "preview.services.cards",
    imageKey: "hotel",
    supportedIndustries: ["hotel"],
    animations: ["stagger"],
  },
  {
    id: "attractions-map",
    name: "Attractions Map",
    description: "Interactive map of nearby points of interest.",
    componentKey: "contact.map",
    imageKey: "realEstate",
    supportedIndustries: ["hotel"],
    animations: ["fade-in"],
    performance: "moderate",
  },
  {
    id: "attractions-itinerary",
    name: "Day Itineraries",
    description: "Suggested day plans for different traveller types.",
    componentKey: "preview.faq.grouped",
    imageKey: "hotel",
    supportedIndustries: ["hotel"],
    animations: ["fade-up"],
  },
]);

const TEAM = industryCat("team", [
  {
    id: "team-grid",
    name: "Team Grid",
    description: "Doctor or staff profiles with credentials.",
    componentKey: "preview.team.grid",
    imageKey: "clinic",
    supportedIndustries: ["clinic"],
    animations: ["stagger"],
  },
  {
    id: "team-featured",
    name: "Lead Physician",
    description: "Featured profile with specialisations.",
    componentKey: "preview.team.featured",
    imageKey: "clinic",
    supportedIndustries: ["clinic"],
    animations: ["reveal"],
  },
  {
    id: "team-carousel",
    name: "Team Carousel",
    description: "Browse specialists with swipe.",
    componentKey: "preview.team.carousel",
    imageKey: "clinic",
    supportedIndustries: ["clinic"],
    animations: ["marquee"],
    performance: "moderate",
  },
]);

const APPOINTMENTS = industryCat("appointments", [
  {
    id: "appt-form",
    name: "Appointment Form",
    description: "Patient intake with preferred date and time.",
    componentKey: "preview.booking.form",
    imageKey: "clinic",
    supportedIndustries: ["clinic"],
    animations: ["fade-up"],
  },
  {
    id: "appt-widget",
    name: "Scheduling Widget",
    description: "Calendar with available appointment slots.",
    componentKey: "preview.booking.widget",
    imageKey: "clinic",
    supportedIndustries: ["clinic"],
    animations: ["fade-in"],
    performance: "moderate",
  },
  {
    id: "appt-cta",
    name: "Book Appointment",
    description: "Trust-first CTA with wait time estimate.",
    componentKey: "cta.banner",
    imageKey: "clinic",
    supportedIndustries: ["clinic"],
    settings: {
      headline: "Book your appointment",
      body: "Same-week availability for new patients.",
      ctaLabel: "Schedule now",
    },
    animations: ["fade-up"],
  },
]);

const PATIENT_RESOURCES = industryCat("patient-resources", [
  {
    id: "resources-faq",
    name: "Patient FAQ",
    description: "Insurance, preparation, and what to expect.",
    componentKey: "faq.accordion",
    imageKey: "clinic",
    supportedIndustries: ["clinic"],
    animations: ["accordion"],
    accessibility: "aaa",
  },
  {
    id: "resources-downloads",
    name: "Forms & Downloads",
    description: "Pre-visit forms and insurance documents.",
    componentKey: "preview.services.list",
    imageKey: "clinic",
    supportedIndustries: ["clinic"],
    animations: ["fade-in"],
  },
  {
    id: "resources-guides",
    name: "Care Guides",
    description: "Post-treatment and preparation guides.",
    componentKey: "preview.faq.grouped",
    imageKey: "clinic",
    supportedIndustries: ["clinic"],
    animations: ["fade-up"],
  },
]);

const COLLECTIONS = industryCat("collections", [
  {
    id: "collections-grid",
    name: "Collection Grid",
    description: "Bridal, everyday, and limited edition grids.",
    componentKey: "gallery.grid",
    imageKey: "jewellery",
    supportedIndustries: ["jewellery", "fashion"],
    animations: ["stagger"],
  },
  {
    id: "collections-editorial",
    name: "Editorial Collection",
    description: "Full-bleed lookbook for seasonal lines.",
    componentKey: "preview.gallery.featured",
    imageKey: "jewellery",
    supportedIndustries: ["jewellery"],
    animations: ["reveal"],
  },
  {
    id: "collections-carousel",
    name: "Collection Carousel",
    description: "Swipe through curated collections.",
    componentKey: "gallery.carousel",
    imageKey: "fashion",
    supportedIndustries: ["jewellery", "fashion"],
    animations: ["marquee"],
  },
]);

const CRAFT = industryCat("craft", [
  {
    id: "craft-story",
    name: "Heritage Story",
    description: "Workshop legacy and artisan process.",
    componentKey: "about.story",
    imageKey: "jewellery",
    supportedIndustries: ["jewellery"],
    settings: {
      headline: "Three generations of craft",
      body: "Every piece is hand-finished in our atelier.",
    },
    animations: ["reveal"],
  },
  {
    id: "craft-process",
    name: "Making Process",
    description: "Step-by-step from sketch to finished piece.",
    componentKey: "preview.about.timeline",
    imageKey: "jewellery",
    supportedIndustries: ["jewellery"],
    animations: ["stagger"],
  },
  {
    id: "craft-video",
    name: "Workshop Film",
    description: "Cinematic workshop footage with narrative.",
    componentKey: "hero.video",
    imageKey: "jewellery",
    supportedIndustries: ["jewellery"],
    settings: { headline: "Inside the atelier" },
    animations: ["scale-in"],
    performance: "moderate",
  },
]);

const CUSTOM_DESIGN = industryCat("custom-design", [
  {
    id: "custom-enquiry",
    name: "Bespoke Enquiry",
    description: "Capture vision, budget, and timeline.",
    componentKey: "preview.contact.booking",
    imageKey: "jewellery",
    supportedIndustries: ["jewellery"],
    animations: ["fade-up"],
  },
  {
    id: "custom-gallery",
    name: "Custom Gallery",
    description: "Past bespoke commissions and one-offs.",
    componentKey: "gallery.grid",
    imageKey: "jewellery",
    supportedIndustries: ["jewellery"],
    animations: ["stagger"],
  },
  {
    id: "custom-cta",
    name: "Design Consultation",
    description: "Book a private consultation CTA.",
    componentKey: "cta.banner",
    imageKey: "jewellery",
    supportedIndustries: ["jewellery"],
    settings: {
      headline: "Design something uniquely yours",
      body: "Private consultation with our master jeweller.",
      ctaLabel: "Book consultation",
    },
    animations: ["fade-up"],
  },
]);

const CATALOGUE = industryCat("catalogue", [
  {
    id: "catalogue-grid",
    name: "Product Grid",
    description: "Filterable furniture catalogue with specs.",
    componentKey: "gallery.grid",
    imageKey: "furniture",
    supportedIndustries: ["furniture"],
    animations: ["stagger"],
  },
  {
    id: "catalogue-cards",
    name: "Product Cards",
    description: "Cards with material, size, and price.",
    componentKey: "preview.services.cards",
    imageKey: "furniture",
    supportedIndustries: ["furniture"],
    animations: ["stagger"],
  },
  {
    id: "catalogue-featured",
    name: "Featured Product",
    description: "Hero product with supporting range.",
    componentKey: "preview.gallery.featured",
    imageKey: "furniture",
    supportedIndustries: ["furniture"],
    animations: ["reveal"],
  },
]);

const ROOM_INSPIRATION = industryCat("room-inspiration", [
  {
    id: "inspiration-scenes",
    name: "Room Scenes",
    description: "Styled living room, bedroom, and office sets.",
    componentKey: "gallery.grid",
    imageKey: "furniture",
    supportedIndustries: ["furniture"],
    animations: ["stagger"],
  },
  {
    id: "inspiration-editorial",
    name: "Editorial Rooms",
    description: "Magazine-style room features.",
    componentKey: "preview.gallery.featured",
    imageKey: "furniture",
    supportedIndustries: ["furniture"],
    animations: ["reveal"],
  },
  {
    id: "inspiration-before-after",
    name: "Room Transformations",
    description: "Before and after styling projects.",
    componentKey: "preview.gallery.before-after",
    imageKey: "furniture",
    supportedIndustries: ["furniture"],
    animations: ["reveal"],
  },
]);

const SHOWROOM = industryCat("showroom", [
  {
    id: "showroom-visit",
    name: "Visit Showroom",
    description: "Location, hours, parking, and appointments.",
    componentKey: "contact.map",
    imageKey: "furniture",
    supportedIndustries: ["furniture"],
    animations: ["fade-in"],
  },
  {
    id: "showroom-tour",
    name: "Showroom Tour",
    description: "Gallery of showroom floors and displays.",
    componentKey: "gallery.carousel",
    imageKey: "furniture",
    supportedIndustries: ["furniture"],
    animations: ["marquee"],
  },
  {
    id: "showroom-cta",
    name: "Book Visit",
    description: "Schedule a private showroom appointment.",
    componentKey: "cta.banner",
    imageKey: "furniture",
    supportedIndustries: ["furniture"],
    settings: {
      headline: "Visit our showroom",
      body: "See materials and scale in person.",
      ctaLabel: "Book visit",
    },
    animations: ["fade-up"],
  },
]);

const LISTINGS = industryCat("listings", [
  {
    id: "listings-grid",
    name: "Property Grid",
    description: "Listing cards with price, beds, and location.",
    componentKey: "preview.rooms.grid",
    imageKey: "realEstate",
    supportedIndustries: ["real-estate"],
    animations: ["stagger"],
  },
  {
    id: "listings-featured",
    name: "Featured Listing",
    description: "Hero property with key specs and gallery.",
    componentKey: "preview.rooms.featured",
    imageKey: "realEstate",
    supportedIndustries: ["real-estate"],
    animations: ["reveal"],
  },
  {
    id: "listings-carousel",
    name: "Listing Carousel",
    description: "Swipe through new and exclusive listings.",
    componentKey: "gallery.carousel",
    imageKey: "realEstate",
    supportedIndustries: ["real-estate"],
    animations: ["marquee"],
  },
]);

const AGENTS = industryCat("agents", [
  {
    id: "agents-grid",
    name: "Agent Grid",
    description: "Broker profiles with territories and contact.",
    componentKey: "preview.team.grid",
    imageKey: "realEstate",
    supportedIndustries: ["real-estate"],
    animations: ["stagger"],
  },
  {
    id: "agents-featured",
    name: "Lead Agent",
    description: "Featured agent with track record stats.",
    componentKey: "preview.team.featured",
    imageKey: "realEstate",
    supportedIndustries: ["real-estate"],
    animations: ["reveal"],
  },
]);

const NEIGHBOURHOOD = industryCat("neighbourhood", [
  {
    id: "neighbourhood-guides",
    name: "Area Guides",
    description: "Schools, transit, and lifestyle highlights.",
    componentKey: "preview.services.cards",
    imageKey: "realEstate",
    supportedIndustries: ["real-estate"],
    animations: ["stagger"],
  },
  {
    id: "neighbourhood-map",
    name: "Neighbourhood Map",
    description: "Interactive map with local amenities.",
    componentKey: "contact.map",
    imageKey: "realEstate",
    supportedIndustries: ["real-estate"],
    animations: ["fade-in"],
    performance: "moderate",
  },
  {
    id: "neighbourhood-stats",
    name: "Market Stats",
    description: "Median prices, days on market, and trends.",
    componentKey: "preview.stats.row",
    imageKey: "realEstate",
    supportedIndustries: ["real-estate"],
    animations: ["count-up"],
  },
]);

const PORTFOLIO = industryCat("portfolio", [
  {
    id: "portfolio-masonry",
    name: "Portfolio Masonry",
    description: "Mixed-ratio grids for photography work.",
    componentKey: "gallery.grid",
    imageKey: "photography",
    supportedIndustries: ["photography"],
    animations: ["stagger"],
  },
  {
    id: "portfolio-editorial",
    name: "Editorial Portfolio",
    description: "Full-bleed project features.",
    componentKey: "preview.gallery.featured",
    imageKey: "photography",
    supportedIndustries: ["photography"],
    animations: ["reveal"],
  },
  {
    id: "portfolio-carousel",
    name: "Project Carousel",
    description: "Swipe through recent shoots.",
    componentKey: "gallery.carousel",
    imageKey: "photography",
    supportedIndustries: ["photography"],
    animations: ["marquee"],
  },
  {
    id: "portfolio-categories",
    name: "Category Portfolio",
    description: "Wedding, commercial, and portrait tabs.",
    componentKey: "preview.gallery.lightbox",
    imageKey: "photography",
    supportedIndustries: ["photography"],
    animations: ["fade-up"],
  },
]);

const PACKAGES_PHOTO = industryCat("packages", [
  {
    id: "packages-wedding",
    name: "Wedding Packages",
    description: "Tiered wedding photography packages.",
    componentKey: "preview.pricing.tiers",
    imageKey: "photography",
    supportedIndustries: ["photography"],
    animations: ["stagger"],
  },
  {
    id: "packages-portrait",
    name: "Portrait Sessions",
    description: "Individual and family session pricing.",
    componentKey: "preview.pricing.compare",
    imageKey: "photography",
    supportedIndustries: ["photography"],
    animations: ["fade-in"],
  },
]);

const LOOKBOOK = industryCat("lookbook", [
  {
    id: "lookbook-editorial",
    name: "Seasonal Lookbook",
    description: "Full-bleed collection imagery.",
    componentKey: "preview.gallery.featured",
    imageKey: "fashion",
    supportedIndustries: ["fashion"],
    animations: ["reveal"],
  },
  {
    id: "lookbook-grid",
    name: "Collection Grid",
    description: "Season drops in editorial grid.",
    componentKey: "gallery.grid",
    imageKey: "fashion",
    supportedIndustries: ["fashion"],
    animations: ["stagger"],
  },
  {
    id: "lookbook-carousel",
    name: "Lookbook Carousel",
    description: "Horizontal scroll through looks.",
    componentKey: "gallery.carousel",
    imageKey: "fashion",
    supportedIndustries: ["fashion"],
    animations: ["marquee"],
  },
]);

const STORE_LOCATOR = industryCat("store-locator", [
  {
    id: "stores-map",
    name: "Store Map",
    description: "Stockists and flagship on interactive map.",
    componentKey: "contact.map",
    imageKey: "fashion",
    supportedIndustries: ["fashion"],
    animations: ["fade-in"],
  },
  {
    id: "stores-cards",
    name: "Store Cards",
    description: "Location cards with hours and directions.",
    componentKey: "preview.contact.cards",
    imageKey: "fashion",
    supportedIndustries: ["fashion"],
    animations: ["stagger"],
  },
  {
    id: "stores-list",
    name: "Stockist List",
    description: "Searchable list of authorised retailers.",
    componentKey: "preview.services.list",
    imageKey: "fashion",
    supportedIndustries: ["fashion"],
    animations: ["fade-in"],
  },
]);

const WHOLESALE = industryCat("wholesale", [
  {
    id: "wholesale-enquiry",
    name: "Wholesale Enquiry",
    description: "B2B form for stockists and collaborators.",
    componentKey: "preview.contact.booking",
    imageKey: "fashion",
    supportedIndustries: ["fashion"],
    animations: ["fade-up"],
  },
  {
    id: "wholesale-cta",
    name: "Stockist CTA",
    description: "Apply to become an authorised stockist.",
    componentKey: "cta.banner",
    imageKey: "fashion",
    supportedIndustries: ["fashion"],
    settings: {
      headline: "Become a stockist",
      body: "Join our network of curated boutiques worldwide.",
      ctaLabel: "Apply now",
    },
    animations: ["fade-up"],
  },
]);

// Fix FAQ minimal duplicate imageKey - rewrite FAQ section
const FAQ_FIXED = cat("faq", [
  {
    id: "faq-accordion",
    name: "Accordion FAQ",
    description: "Expandable questions with smooth open/close.",
    componentKey: "faq.accordion",
    imageKey: "clinic",
    animations: ["accordion"],
    accessibility: "aaa",
  },
  {
    id: "faq-two-column",
    name: "Two-column FAQ",
    description: "Questions split for faster scanning.",
    componentKey: "preview.faq.columns",
    imageKey: "gym",
    animations: ["fade-in"],
  },
  {
    id: "faq-grouped",
    name: "Grouped FAQ",
    description: "Categories like Booking, Pricing, and Policies.",
    componentKey: "preview.faq.grouped",
    imageKey: "hotel",
    animations: ["fade-up"],
  },
  {
    id: "faq-minimal",
    name: "Minimal FAQ",
    description: "Simple list with subtle dividers.",
    componentKey: "faq.accordion",
    imageKey: "furniture",
    variant: "minimal",
    animations: ["none"],
    performance: "light",
  },
  {
    id: "faq-search",
    name: "Searchable FAQ",
    description: "Filter questions by keyword for large sites.",
    componentKey: "preview.faq.search",
    imageKey: "clinic",
    animations: ["fade-in"],
    performance: "moderate",
  },
]);

const ALL_OPTIONS: MarketplaceOption[] = [
  ...NAV,
  ...HERO,
  ...ABOUT,
  ...GALLERY,
  ...TESTIMONIALS,
  ...FAQ_FIXED,
  ...CONTACT,
  ...FOOTER,
  ...MENU,
  ...FEATURED_DRINKS,
  ...COFFEE_STORY,
  ...INSTAGRAM,
  ...BOOKING,
  ...CHEF_STORY,
  ...PRIVATE_EVENTS,
  ...CUSTOM_ORDERS,
  ...DAILY_SPECIALS,
  ...STYLISTS,
  ...SERVICES,
  ...PACKAGES,
  ...MEMBERSHIP,
  ...TRAINERS,
  ...PROGRAMS,
  ...TRANSFORMATIONS,
  ...ROOMS,
  ...AMENITIES,
  ...ATTRACTIONS,
  ...TEAM,
  ...APPOINTMENTS,
  ...PATIENT_RESOURCES,
  ...COLLECTIONS,
  ...CRAFT,
  ...CUSTOM_DESIGN,
  ...CATALOGUE,
  ...ROOM_INSPIRATION,
  ...SHOWROOM,
  ...LISTINGS,
  ...AGENTS,
  ...NEIGHBOURHOOD,
  ...PORTFOLIO,
  ...PACKAGES_PHOTO,
  ...LOOKBOOK,
  ...STORE_LOCATOR,
  ...WHOLESALE,
];

const OPTIONS_BY_CATEGORY = new Map<string, MarketplaceOption[]>();
for (const option of ALL_OPTIONS) {
  const list = OPTIONS_BY_CATEGORY.get(option.categoryId) ?? [];
  list.push(option);
  OPTIONS_BY_CATEGORY.set(option.categoryId, list);
}

export function getOptionsForCategory(
  categoryId: string,
  industrySlug: string,
): MarketplaceOption[] {
  const options = OPTIONS_BY_CATEGORY.get(categoryId) ?? [];
  return options.filter(
    (o) =>
      o.supportedIndustries.includes("*") ||
      o.supportedIndustries.includes(industrySlug),
  );
}

export function getOptionById(optionId: string): MarketplaceOption | undefined {
  return ALL_OPTIONS.find((o) => o.id === optionId);
}

export function getDefaultSelections(
  industrySlug: string,
  categoryIds: string[],
): Record<string, string> {
  const selections: Record<string, string> = {};
  for (const categoryId of categoryIds) {
    const options = getOptionsForCategory(categoryId, industrySlug);
    if (options[0]) selections[categoryId] = options[0].id;
  }
  return selections;
}

export function buildComposeSections(
  selections: Record<string, string>,
  categoryOrder: string[],
): string[] {
  const keys: string[] = [];
  const seen = new Set<string>();
  for (const categoryId of categoryOrder) {
    const optionId = selections[categoryId];
    if (!optionId) continue;
    const option = getOptionById(optionId);
    if (!option || seen.has(option.componentKey)) continue;
    seen.add(option.componentKey);
    keys.push(option.componentKey);
  }
  return keys;
}
