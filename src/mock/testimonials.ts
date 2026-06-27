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
      "Aurevia transformed our café's online presence. Within a month, online orders increased by 40%. The website feels as warm and inviting as our space.",
    author: "Priya Sharma",
    role: "Owner",
    business: "Harbor Coffee Co.",
  },
  {
    id: "2",
    quote:
      "We went from an outdated template to a website that clients compliment before they even sit in the chair. Bookings are up, and we look premium.",
    author: "Ananya Reddy",
    role: "Founder",
    business: "Atelier Salon",
  },
  {
    id: "3",
    quote:
      "Professional, patient, and incredibly talented. Aurevia understood our clinic's need for trust and delivered a site that patients actually use.",
    author: "Dr. Rajesh Kumar",
    role: "Director",
    business: "Greenfield Clinic",
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
    question: "How long does it take to build a website?",
    answer:
      "Most business websites are delivered within 2–4 weeks. Premium projects with custom design may take 4–6 weeks. We'll provide a clear timeline during our discovery call.",
  },
  {
    id: "2",
    question: "Do I need technical knowledge to manage my site?",
    answer:
      "Not at all. We build intuitive content structures and provide training. For ongoing updates, our maintenance plans handle everything for you.",
  },
  {
    id: "3",
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely. We specialize in transforming outdated sites into modern, high-performing experiences while preserving your SEO rankings.",
  },
  {
    id: "4",
    question: "What industries do you work with?",
    answer:
      "We work with local businesses across cafés, restaurants, salons, clinics, gyms, hotels, retail, and more. Every industry gets a tailored approach.",
  },
  {
    id: "5",
    question: "Do you offer ongoing support?",
    answer:
      "Yes. All plans include post-launch support, and we offer monthly maintenance plans for updates, security, and content changes.",
  },
];

export const CONTACT_FAQ: FAQItem[] = [
  {
    id: "c1",
    question: "What's the best way to reach you?",
    answer:
      "Email us at hello@aurevia.com or message us on WhatsApp for the fastest response. We typically reply within 24 hours.",
  },
  {
    id: "c2",
    question: "Do you offer free consultations?",
    answer:
      "Yes. Every project starts with a complimentary 30-minute discovery call to understand your business and goals.",
  },
  {
    id: "c3",
    question: "Do you work with businesses outside India?",
    answer:
      "Currently we focus on Indian businesses, but we're open to international projects. Reach out and let's discuss.",
  },
];
