"use client";

import { demoImage, type DemoImageKey } from "@/lib/demo-images";
import { getIndustryBySlug } from "@/mock/industries";
import { Button } from "@/components/ui/button";
import {
  SectionShell,
  getString,
} from "@/features/builder/registry/section-shell";
import type { RegistryComponentProps } from "@/features/builder/registry";
import { Star, MapPin, Clock, Phone, Mail, ChevronRight } from "lucide-react";

function industryKey(
  settings?: RegistryComponentProps["settings"],
): DemoImageKey {
  const slug = getString(settings, "_industry", "cafe");
  const map: Record<string, DemoImageKey> = {
    cafe: "cafe",
    restaurant: "restaurant",
    bakery: "bakery",
    salon: "salon",
    gym: "gym",
    hotel: "hotel",
    clinic: "clinic",
    jewellery: "jewellery",
    furniture: "furniture",
    "real-estate": "realEstate",
    photography: "photography",
    fashion: "fashion",
  };
  return map[slug] ?? "workspace";
}

function industryName(settings?: RegistryComponentProps["settings"]): string {
  const slug = getString(settings, "_industry", "cafe");
  return getIndustryBySlug(slug)?.name ?? "Your business";
}

function PreviewImage({
  settings,
  className,
}: {
  settings?: RegistryComponentProps["settings"];
  className?: string;
}) {
  const src = demoImage(industryKey(settings), 800);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className={`object-cover ${className ?? "size-full"}`}
    />
  );
}

export function FallbackPreview({ section }: RegistryComponentProps) {
  return (
    <SectionShell className="border-border border-y border-dashed">
      <p className="type-body-sm text-foreground-muted text-center">
        Preview: {section?.componentKey ?? "section"}
      </p>
    </SectionShell>
  );
}

export function NavCentered({ settings }: RegistryComponentProps) {
  const name = industryName(settings);
  return (
    <header className="border-border bg-background/95 border-b px-4 py-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <span className="type-heading-sm text-foreground font-[family-name:var(--font-display)]">
          {name.split(" ")[0]}
        </span>
        <nav className="type-body-sm text-foreground-muted flex flex-wrap justify-center gap-4">
          <span>Home</span>
          <span>About</span>
          <span>Services</span>
          <span>Contact</span>
        </nav>
        <Button size="sm">Book now</Button>
      </div>
    </header>
  );
}

export function NavSplit({ settings }: RegistryComponentProps) {
  const name = industryName(settings);
  return (
    <header className="border-border border-b px-4 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <span className="type-heading-sm text-foreground font-[family-name:var(--font-display)]">
          {name.split("&")[0].trim()}
        </span>
        <nav className="type-body-sm text-foreground-muted hidden gap-5 sm:flex">
          <span>Menu</span>
          <span>Gallery</span>
          <span>Visit</span>
        </nav>
        <Button size="sm" variant="outline">
          Contact
        </Button>
      </div>
    </header>
  );
}

export function NavMinimal({ settings }: RegistryComponentProps) {
  const name = industryName(settings);
  return (
    <header className="px-4 py-5">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <span className="type-label text-foreground tracking-[0.2em] uppercase">
          {name.split(" ")[0]}
        </span>
        <Button size="sm" variant="ghost">
          Enquire →
        </Button>
      </div>
    </header>
  );
}

export function NavTransparent({ settings }: RegistryComponentProps) {
  return (
    <header className="relative px-4 py-4">
      <div className="absolute inset-0">
        <PreviewImage settings={settings} className="size-full opacity-40" />
        <div className="from-background/80 absolute inset-0 bg-gradient-to-b to-transparent" />
      </div>
      <div className="relative mx-auto flex max-w-5xl items-center justify-between">
        <span className="type-heading-sm text-foreground">Studio</span>
        <nav className="type-body-sm text-foreground-muted flex gap-4">
          <span>Work</span>
          <span>About</span>
        </nav>
      </div>
    </header>
  );
}

export function NavSticky({ settings }: RegistryComponentProps) {
  const name = industryName(settings);
  return (
    <header className="bg-background/80 sticky top-0 z-10 border-b border-[var(--color-border-subtle)] px-4 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <span className="type-heading-sm text-foreground font-[family-name:var(--font-display)]">
          {name.split("&")[0].trim()}
        </span>
        <nav className="type-body-sm text-foreground-muted hidden gap-5 sm:flex">
          <span>Menu</span>
          <span>Gallery</span>
          <span>Visit</span>
        </nav>
        <Button size="sm" variant="outline">
          Contact
        </Button>
      </div>
    </header>
  );
}

export function NavMega({ settings }: RegistryComponentProps) {
  return (
    <header className="border-border border-b px-4 py-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <span className="type-heading-sm text-foreground">Collection</span>
          <nav className="type-body-sm text-foreground-muted flex gap-4">
            <span className="text-foreground font-medium">Shop ▾</span>
            <span>Rooms</span>
            <span>About</span>
          </nav>
        </div>
        <div className="bg-muted/50 mt-3 grid grid-cols-3 gap-2 rounded-[var(--radius-md)] p-3">
          {["Living", "Bedroom", "Office"].map((l) => (
            <span
              key={l}
              className="type-body-sm text-foreground-muted py-1 text-center"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

export function AboutSplit({ settings }: RegistryComponentProps) {
  return (
    <SectionShell>
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)]">
          <PreviewImage settings={settings} />
        </div>
        <div>
          <p className="type-label text-accent mb-3">Our story</p>
          <h2 className="type-display-md text-foreground font-[family-name:var(--font-display)]">
            Built on craft and care
          </h2>
          <p className="type-body-md text-foreground-muted mt-4">
            Every detail reflects years of dedication — from sourcing to the
            final experience you deliver customers.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

export function AboutTimeline({ settings }: RegistryComponentProps) {
  const years = ["2018 — Founded", "2020 — Expanded", "2024 — Awarded"];
  return (
    <SectionShell>
      <h2 className="type-heading-lg text-foreground mb-8 font-[family-name:var(--font-display)]">
        Our journey
      </h2>
      <div className="border-accent space-y-4 border-l-2 pl-6">
        {years.map((y) => (
          <p key={y} className="type-body-md text-foreground-muted">
            {y}
          </p>
        ))}
      </div>
    </SectionShell>
  );
}

export function AboutValues({ settings }: RegistryComponentProps) {
  const values = [
    { title: "Quality", body: "Never compromise on the details." },
    { title: "Trust", body: "Transparent, honest, reliable." },
    { title: "Care", body: "Every customer treated personally." },
  ];
  return (
    <SectionShell>
      <div className="grid gap-6 sm:grid-cols-3">
        {values.map((v) => (
          <div
            key={v.title}
            className="surface-1 rounded-[var(--radius-lg)] p-6"
          >
            <h3 className="type-heading-sm text-foreground">{v.title}</h3>
            <p className="type-body-sm text-foreground-muted mt-2">{v.body}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function GalleryFeatured({ settings }: RegistryComponentProps) {
  return (
    <SectionShell>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] md:row-span-2">
          <PreviewImage settings={settings} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)]"
            >
              <PreviewImage settings={settings} />
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function GalleryLightbox({ settings }: RegistryComponentProps) {
  return (
    <SectionShell>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="group relative aspect-square overflow-hidden rounded-[var(--radius-md)]"
          >
            <PreviewImage
              settings={settings}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function GalleryBeforeAfter({ settings }: RegistryComponentProps) {
  return (
    <SectionShell>
      <div className="grid gap-4 sm:grid-cols-2">
        {["Before", "After"].map((label) => (
          <div
            key={label}
            className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)]"
          >
            <PreviewImage settings={settings} />
            <span className="type-label bg-background/90 absolute bottom-3 left-3 rounded-full px-3 py-1">
              {label}
            </span>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function TestimonialsCards({ settings }: RegistryComponentProps) {
  const quotes = [
    { text: "Exceeded every expectation — we'll be back.", author: "Sarah M." },
    { text: "Professional, warm, and worth every penny.", author: "James L." },
    { text: "The best experience we've had in years.", author: "Priya K." },
  ];
  return (
    <SectionShell className="bg-muted/30">
      <div className="grid gap-5 sm:grid-cols-3">
        {quotes.map((q) => (
          <blockquote key={q.author} className="depth-panel p-6">
            <div className="text-accent mb-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <p className="type-body-md text-foreground">
              &ldquo;{q.text}&rdquo;
            </p>
            <footer className="type-body-sm text-foreground-muted mt-4">
              — {q.author}
            </footer>
          </blockquote>
        ))}
      </div>
    </SectionShell>
  );
}

export function TestimonialsFeatured({ settings }: RegistryComponentProps) {
  return (
    <SectionShell className="text-center">
      <div className="mx-auto max-w-2xl">
        <div className="text-accent mb-4 flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>
        <blockquote className="type-display-md text-foreground font-[family-name:var(--font-display)] leading-snug">
          &ldquo;They transformed how customers see us online.&rdquo;
        </blockquote>
        <p className="type-body-md text-foreground-muted mt-4">
          — Verified customer
        </p>
      </div>
    </SectionShell>
  );
}

export function TestimonialsLogos({ settings }: RegistryComponentProps) {
  const logos = ["Vogue", "Times", "Local Best", "Award 2024"];
  return (
    <SectionShell>
      <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
        {logos.map((l) => (
          <span key={l} className="type-heading-sm text-foreground-muted">
            {l}
          </span>
        ))}
      </div>
      <TestimonialsFeatured settings={settings} />
    </SectionShell>
  );
}

export function FaqColumns({ settings }: RegistryComponentProps) {
  const items = [
    { q: "What are your hours?", a: "Open daily with extended weekend hours." },
    {
      q: "Do you take walk-ins?",
      a: "Yes — appointments recommended on weekends.",
    },
    { q: "Is parking available?", a: "Free parking behind the building." },
    { q: "Can I cancel?", a: "Free cancellation up to 24 hours before." },
  ];
  return (
    <SectionShell>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.q}>
            <h3 className="type-heading-sm text-foreground">{item.q}</h3>
            <p className="type-body-sm text-foreground-muted mt-2">{item.a}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function FaqGrouped({ settings }: RegistryComponentProps) {
  return (
    <SectionShell>
      <p className="type-label text-accent mb-6">Booking</p>
      <FaqColumns settings={settings} />
    </SectionShell>
  );
}

export function ContactSplit({ settings }: RegistryComponentProps) {
  return (
    <SectionShell>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="type-heading-lg text-foreground">Get in touch</h2>
          <p className="type-body-md text-foreground-muted flex items-center gap-2">
            <MapPin className="text-accent size-4" /> 123 Main Street
          </p>
          <p className="type-body-md text-foreground-muted flex items-center gap-2">
            <Phone className="text-accent size-4" /> +91 98765 43210
          </p>
          <p className="type-body-md text-foreground-muted flex items-center gap-2">
            <Clock className="text-accent size-4" /> Mon–Sat 9am–6pm
          </p>
        </div>
        <div className="surface-1 space-y-3 rounded-[var(--radius-xl)] p-6">
          <div className="bg-muted h-10 rounded-[var(--radius-md)]" />
          <div className="bg-muted h-10 rounded-[var(--radius-md)]" />
          <div className="bg-muted h-24 rounded-[var(--radius-md)]" />
          <Button className="w-full">Send message</Button>
        </div>
      </div>
    </SectionShell>
  );
}

export function ContactMinimal({ settings }: RegistryComponentProps) {
  return (
    <SectionShell className="text-center">
      <h2 className="type-heading-md text-foreground">Contact</h2>
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        <span className="type-body-md text-foreground-muted flex items-center gap-2">
          <Mail className="size-4" /> hello@example.com
        </span>
        <span className="type-body-md text-foreground-muted flex items-center gap-2">
          <Phone className="size-4" /> +91 98765 43210
        </span>
      </div>
    </SectionShell>
  );
}

export function ContactBooking({ settings }: RegistryComponentProps) {
  return (
    <SectionShell>
      <div className="mx-auto max-w-md">
        <h2 className="type-heading-lg text-foreground mb-6 text-center">
          Make a reservation
        </h2>
        <div className="space-y-3">
          {["Date", "Time", "Party size", "Special requests"].map((f) => (
            <div
              key={f}
              className="flex h-11 items-center rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] px-4"
            >
              <span className="type-body-sm text-foreground-muted">{f}</span>
            </div>
          ))}
          <Button className="mt-2 w-full">Check availability</Button>
        </div>
      </div>
    </SectionShell>
  );
}

export function ContactCards({ settings }: RegistryComponentProps) {
  const locations = ["Downtown", "Westside", "Airport"];
  return (
    <SectionShell>
      <div className="grid gap-4 sm:grid-cols-3">
        {locations.map((loc) => (
          <div key={loc} className="depth-panel p-5">
            <h3 className="type-heading-sm text-foreground">{loc}</h3>
            <p className="type-body-sm text-foreground-muted mt-2">
              Mon–Sat 9–6
            </p>
            <Button variant="ghost" size="sm" className="mt-3 px-0">
              Directions <ChevronRight className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function FooterColumns({ settings }: RegistryComponentProps) {
  return (
    <footer className="border-border bg-muted/30 border-t py-12">
      <SectionShell className="py-0">
        <div className="grid gap-8 sm:grid-cols-4">
          {["Visit", "Explore", "Support", "Legal"].map((col) => (
            <div key={col}>
              <p className="type-label text-foreground mb-3">{col}</p>
              <div className="space-y-2">
                <p className="type-body-sm text-foreground-muted">Link one</p>
                <p className="type-body-sm text-foreground-muted">Link two</p>
              </div>
            </div>
          ))}
        </div>
        <p className="type-body-sm text-foreground-muted mt-10 text-center">
          © {new Date().getFullYear()} {industryName(settings)}
        </p>
      </SectionShell>
    </footer>
  );
}

export function FooterNewsletter({ settings }: RegistryComponentProps) {
  return (
    <footer className="border-border border-t py-12">
      <SectionShell className="py-0">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="type-heading-sm text-foreground">Stay in the loop</p>
            <p className="type-body-sm text-foreground-muted mt-1">
              Seasonal updates and exclusive offers.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="bg-muted h-10 w-48 rounded-[var(--radius-md)]" />
            <Button size="sm">Subscribe</Button>
          </div>
        </div>
        <p className="type-body-sm text-foreground-muted text-center">
          © {new Date().getFullYear()} {industryName(settings)}
        </p>
      </SectionShell>
    </footer>
  );
}

export function FooterLuxury({ settings }: RegistryComponentProps) {
  return (
    <footer className="border-border border-t py-16">
      <SectionShell className="py-0 text-center">
        <p className="type-display-md text-foreground font-[family-name:var(--font-display)]">
          {industryName(settings).split(" ")[0]}
        </p>
        <nav className="type-body-sm text-foreground-muted mt-6 flex justify-center gap-6">
          <span>Rooms</span>
          <span>Dining</span>
          <span>Spa</span>
          <span>Contact</span>
        </nav>
        <p className="type-body-sm text-foreground-subtle mt-10">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </SectionShell>
    </footer>
  );
}

export function MenuGrid({ settings }: RegistryComponentProps) {
  const items = [
    { name: "Signature item", price: "₹320" },
    { name: "Seasonal special", price: "₹280" },
    { name: "House favourite", price: "₹350" },
    { name: "Chef's pick", price: "₹420" },
  ];
  return (
    <SectionShell>
      <h2 className="type-heading-lg text-foreground mb-8">Menu</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.name} className="flex gap-4">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-[var(--radius-md)]">
              <PreviewImage settings={settings} />
            </div>
            <div>
              <p className="type-heading-sm text-foreground">{item.name}</p>
              <p className="type-body-sm text-accent mt-1">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function MenuCategories({ settings }: RegistryComponentProps) {
  const cats = ["Drinks", "Food", "Specials"];
  return (
    <SectionShell>
      <div className="mb-6 flex gap-2">
        {cats.map((c, i) => (
          <span
            key={c}
            className={`type-body-sm rounded-full px-4 py-2 ${i === 0 ? "bg-accent text-accent-foreground" : "bg-muted text-foreground-muted"}`}
          >
            {c}
          </span>
        ))}
      </div>
      <MenuGrid settings={settings} />
    </SectionShell>
  );
}

export function MenuBoard({ settings }: RegistryComponentProps) {
  return (
    <SectionShell className="bg-muted/40">
      <div className="mx-auto max-w-lg text-center">
        <h2 className="type-display-md text-foreground font-[family-name:var(--font-display)]">
          Today&apos;s board
        </h2>
        <div className="mt-8 space-y-3 text-left">
          {[
            "Flat white · ₹180",
            "Avocado toast · ₹320",
            "Seasonal tart · ₹240",
          ].map((line) => (
            <p
              key={line}
              className="type-body-lg text-foreground border-b border-dashed border-[var(--color-border-subtle)] pb-2"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function MenuFeatured({ settings }: RegistryComponentProps) {
  return (
    <SectionShell>
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-[var(--radius-xl)]">
          <PreviewImage settings={settings} />
        </div>
        <div>
          <p className="type-label text-accent mb-2">Chef&apos;s signature</p>
          <h2 className="type-heading-lg text-foreground">
            The dish everyone orders
          </h2>
          <p className="type-body-md text-foreground-muted mt-3">
            Prepared fresh daily with locally sourced ingredients.
          </p>
          <p className="type-heading-sm text-accent mt-4">₹480</p>
        </div>
      </div>
    </SectionShell>
  );
}

export function MenuCompact({ settings }: RegistryComponentProps) {
  const items = [
    "Espresso ₹120",
    "Cappuccino ₹160",
    "Cold brew ₹180",
    "Pastry ₹140",
  ];
  return (
    <SectionShell>
      <div className="divide-y divide-[var(--color-border-subtle)]">
        {items.map((item) => (
          <p
            key={item}
            className="type-body-md text-foreground flex justify-between py-3"
          >
            <span>
              {item.split(" ")[0]} {item.split(" ")[1]}
            </span>
            <span className="text-accent">{item.split(" ")[2]}</span>
          </p>
        ))}
      </div>
    </SectionShell>
  );
}

export function DrinksCarousel({ settings }: RegistryComponentProps) {
  const drinks = ["Pour-over", "Cold brew", "Seasonal latte"];
  return (
    <SectionShell>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {drinks.map((d) => (
          <div key={d} className="depth-panel w-48 shrink-0 overflow-hidden">
            <div className="relative aspect-square">
              <PreviewImage settings={settings} />
            </div>
            <p className="type-body-sm text-foreground p-3">{d}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function InstagramGrid({ settings }: RegistryComponentProps) {
  return (
    <SectionShell>
      <p className="type-label text-accent mb-4">@yourbrand</p>
      <GalleryLightbox settings={settings} />
    </SectionShell>
  );
}

export function PricingTiers({ settings }: RegistryComponentProps) {
  const tiers = [
    {
      name: "Essential",
      price: "₹999",
      features: ["Core access", "Email support"],
    },
    {
      name: "Premium",
      price: "₹1,999",
      features: ["Everything in Essential", "Priority booking"],
      featured: true,
    },
    {
      name: "Elite",
      price: "₹3,499",
      features: ["Unlimited access", "1:1 coaching"],
    },
  ];
  return (
    <SectionShell className="bg-muted/30">
      <div className="grid gap-5 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`depth-panel p-6 ${t.featured ? "ring-accent ring-2" : ""}`}
          >
            <p className="type-heading-sm text-foreground">{t.name}</p>
            <p className="type-display-md text-foreground mt-2 font-[family-name:var(--font-display)]">
              {t.price}
              <span className="type-body-sm text-foreground-muted">/mo</span>
            </p>
            <ul className="mt-4 space-y-2">
              {t.features.map((f) => (
                <li key={f} className="type-body-sm text-foreground-muted">
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className="mt-6 w-full"
              variant={t.featured ? "primary" : "outline"}
            >
              Choose plan
            </Button>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function PricingCompare({ settings }: RegistryComponentProps) {
  return (
    <SectionShell>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[28rem] text-left">
          <thead>
            <tr className="border-b border-[var(--color-border-subtle)]">
              <th className="type-body-sm text-foreground-muted py-3">
                Feature
              </th>
              <th className="type-body-sm text-foreground-muted py-3">Basic</th>
              <th className="type-body-sm text-foreground py-3">Pro</th>
            </tr>
          </thead>
          <tbody>
            {["Access", "Support", "Extras"].map((row) => (
              <tr
                key={row}
                className="border-b border-[var(--color-border-subtle)]"
              >
                <td className="type-body-sm text-foreground py-3">{row}</td>
                <td className="type-body-sm text-foreground-muted py-3">✓</td>
                <td className="type-body-sm text-foreground py-3">✓✓</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

export function TeamGrid({ settings }: RegistryComponentProps) {
  const team = ["Alex", "Jordan", "Sam"];
  return (
    <SectionShell>
      <div className="grid gap-6 sm:grid-cols-3">
        {team.map((name) => (
          <div key={name} className="text-center">
            <div className="relative mx-auto mb-4 aspect-square max-w-[10rem] overflow-hidden rounded-full">
              <PreviewImage settings={settings} />
            </div>
            <p className="type-heading-sm text-foreground">{name}</p>
            <p className="type-body-sm text-foreground-muted">Specialist</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function TeamFeatured({ settings }: RegistryComponentProps) {
  return (
    <SectionShell>
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[3/4] max-w-sm overflow-hidden rounded-[var(--radius-xl)]">
          <PreviewImage settings={settings} />
        </div>
        <div>
          <p className="type-label text-accent mb-2">Lead specialist</p>
          <h2 className="type-heading-lg text-foreground">
            15 years of expertise
          </h2>
          <p className="type-body-md text-foreground-muted mt-3">
            Certified professional dedicated to exceptional results for every
            client.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

export function ServicesList({ settings }: RegistryComponentProps) {
  const services = [
    { name: "Consultation", duration: "30 min", price: "₹800" },
    { name: "Standard service", duration: "60 min", price: "₹1,500" },
    { name: "Premium package", duration: "90 min", price: "₹2,400" },
  ];
  return (
    <SectionShell>
      <div className="divide-y divide-[var(--color-border-subtle)]">
        {services.map((s) => (
          <div key={s.name} className="flex items-center justify-between py-4">
            <div>
              <p className="type-heading-sm text-foreground">{s.name}</p>
              <p className="type-body-sm text-foreground-muted">{s.duration}</p>
            </div>
            <p className="type-body-md text-accent">{s.price}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function ServicesCards({ settings }: RegistryComponentProps) {
  const services = ["Service one", "Service two", "Service three"];
  return (
    <SectionShell>
      <div className="grid gap-4 sm:grid-cols-3">
        {services.map((s) => (
          <div key={s} className="depth-panel overflow-hidden">
            <div className="relative aspect-[4/3]">
              <PreviewImage settings={settings} />
            </div>
            <p className="type-heading-sm text-foreground p-4">{s}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function ServicesTabs({ settings }: RegistryComponentProps) {
  return (
    <SectionShell>
      <div className="mb-6 flex gap-2">
        {["Hair", "Skin", "Wellness"].map((t, i) => (
          <span
            key={t}
            className={`type-body-sm rounded-full px-4 py-2 ${i === 0 ? "bg-accent text-accent-foreground" : "bg-muted"}`}
          >
            {t}
          </span>
        ))}
      </div>
      <ServicesList settings={settings} />
    </SectionShell>
  );
}

export function ProgramsSchedule({ settings }: RegistryComponentProps) {
  const classes = [
    { time: "6:00 AM", name: "HIIT", coach: "Alex" },
    { time: "8:00 AM", name: "Yoga", coach: "Jordan" },
    { time: "6:00 PM", name: "Strength", coach: "Sam" },
  ];
  return (
    <SectionShell>
      <h2 className="type-heading-lg text-foreground mb-6">This week</h2>
      <div className="space-y-3">
        {classes.map((c) => (
          <div
            key={c.time}
            className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] p-4"
          >
            <div>
              <p className="type-body-sm text-foreground-muted">{c.time}</p>
              <p className="type-heading-sm text-foreground">{c.name}</p>
            </div>
            <p className="type-body-sm text-foreground-muted">{c.coach}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function StatsRow({ settings }: RegistryComponentProps) {
  const stats = [
    { value: "500+", label: "Members" },
    { value: "12", label: "Coaches" },
    { value: "98%", label: "Satisfaction" },
  ];
  return (
    <SectionShell className="bg-muted/30">
      <div className="grid gap-6 text-center sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="type-display-md text-foreground font-[family-name:var(--font-display)]">
              {s.value}
            </p>
            <p className="type-body-sm text-foreground-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function RoomsGrid({ settings }: RegistryComponentProps) {
  const rooms = [
    { name: "Deluxe Room", price: "₹8,500/night" },
    { name: "Suite", price: "₹14,000/night" },
    { name: "Penthouse", price: "₹28,000/night" },
  ];
  return (
    <SectionShell>
      <div className="grid gap-6 sm:grid-cols-3">
        {rooms.map((r) => (
          <div key={r.name} className="depth-panel overflow-hidden">
            <div className="relative aspect-[4/3]">
              <PreviewImage settings={settings} />
            </div>
            <div className="p-4">
              <p className="type-heading-sm text-foreground">{r.name}</p>
              <p className="type-body-sm text-accent mt-1">{r.price}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function RoomsFeatured({ settings }: RegistryComponentProps) {
  return (
    <SectionShell>
      <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius-xl)]">
        <PreviewImage settings={settings} />
        <div className="from-background/90 absolute inset-0 flex flex-col justify-end bg-gradient-to-t to-transparent p-8">
          <p className="type-label text-accent mb-2">Signature suite</p>
          <h2 className="type-display-md text-foreground font-[family-name:var(--font-display)]">
            Panoramic views, private terrace
          </h2>
          <Button className="mt-4 w-fit">View suite</Button>
        </div>
      </div>
    </SectionShell>
  );
}
