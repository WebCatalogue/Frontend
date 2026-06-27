export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  business: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "We replaced a PDF menu link with a proper site in under two weeks. Weekend foot traffic picked up — people tell us they found us on Google and liked what they saw.",
    author: "Priya Sharma",
    role: "Owner",
    business: "Harbor Coffee Co., Kochi",
  },
  {
    id: "2",
    quote:
      "Our old site hid our prices and made booking confusing. The new one is straightforward — clients book online and we spend less time on the phone explaining services.",
    author: "Ananya Reddy",
    role: "Owner",
    business: "Atelier Salon, Hyderabad",
  },
  {
    id: "3",
    quote:
      "Patients mentioned the website in their first visit — that never happened before. It looks calm and professional, which is exactly what a clinic needs.",
    author: "Dr. Rajesh Kumar",
    role: "Director",
    business: "Greenfield Clinic, Pune",
  },
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const HOME_FAQ: FAQItem[] = [
  {
    id: "1",
    question: "Do I need to know how to code?",
    answer:
      "No. Pick a template, swap sections, upload photos, and publish. If you want us to handle it, we do that too — same platform, less work for you.",
  },
  {
    id: "2",
    question: "How long until my site is live?",
    answer:
      "If your photos and copy are ready, many businesses publish within a few days. Full custom projects with our team typically take 2–4 weeks.",
  },
  {
    id: "3",
    question: "Can I preview before paying?",
    answer:
      "Yes. Browse industry templates, open live previews, and try the composer before you commit to a plan.",
  },
  {
    id: "4",
    question: "What if I already have a website?",
    answer:
      "We migrate content, preserve your SEO where possible, and relaunch on a faster, cleaner foundation. Redesigns are a core part of what we do.",
  },
  {
    id: "5",
    question: "Do you only work with certain industries?",
    answer:
      "We have dedicated templates for cafés, restaurants, salons, gyms, hotels, clinics, and more. If your business isn't listed, we still have flexible layouts that adapt.",
  },
];

export const CONTACT_FAQ: FAQItem[] = [
  {
    id: "c1",
    question: "What's the best way to reach you?",
    answer:
      "Email hello@bhaikisite.com or WhatsApp us for the fastest reply. We respond within one business day.",
  },
  {
    id: "c2",
    question: "Is the first consultation free?",
    answer:
      "Yes — a 30-minute call to understand your business and recommend the right template or service. No obligation.",
  },
  {
    id: "c3",
    question: "Do you work outside India?",
    answer:
      "Our templates and platform work anywhere. Most of our clients are in India, but we're happy to discuss international projects.",
  },
];
