"use client";

import { Mail, Phone } from "lucide-react";
import { PageHeader, PageSection } from "@/components/layout";
import { ContactForm } from "@/components/marketing/contact-form";
import { ContactHeroVisual } from "@/components/marketing/contact-hero-visual";
import { Reveal } from "@/components/playground/motion/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { COMPANY_EMAIL, COMPANY_PHONES } from "@/constants";
import { CONTACT_FAQ } from "@/mock/testimonials";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s start something{" "}
            <span className="text-gradient-plum">great.</span>
          </>
        }
        description="Share a few details and we'll get back to you within 24 hours with the right next steps."
        breadcrumbs={[{ label: "Contact" }]}
        media={<ContactHeroVisual />}
        mediaAlign="start"
        className="contact-page-header"
      >
        <ContactForm />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
          <a
            href={`mailto:${COMPANY_EMAIL}`}
            className="type-body-sm text-foreground-muted hover:text-foreground inline-flex items-center gap-2 transition-colors"
          >
            <Mail className="size-4 shrink-0" aria-hidden />
            {COMPANY_EMAIL}
          </a>
          {COMPANY_PHONES.map((phone) => (
            <a
              key={phone}
              href={`tel:+91${phone}`}
              className="type-body-sm text-foreground-muted hover:text-foreground inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="size-4 shrink-0" aria-hidden />
              {phone}
            </a>
          ))}
        </div>
      </PageHeader>

      <PageSection subdued>
        <Reveal>
          <h2 className="type-heading-lg text-foreground mb-8">FAQ</h2>
        </Reveal>
        <Accordion type="single" collapsible className="max-w-2xl">
          {CONTACT_FAQ.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </PageSection>
    </>
  );
}
