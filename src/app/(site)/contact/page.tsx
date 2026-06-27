"use client";

import { MessageCircle, Mail, MapPin } from "lucide-react";
import { PageHeader, PageSection } from "@/components/layout";
import { Reveal } from "@/components/playground/motion/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Input,
  Textarea,
  useToast,
} from "@/components/ui";
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_WHATSAPP,
  SOCIAL_LINKS,
} from "@/constants";
import { CONTACT_FAQ } from "@/mock/testimonials";

export default function ContactPage() {
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: "Message sent",
      description: "We'll get back to you within 24 hours.",
      variant: "success",
    });
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something remarkable."
        description="Tell us about your business. We'll respond within 24 hours with next steps."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="depth-panel space-y-5 p-7 sm:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="First name" placeholder="Priya" required />
                <Input label="Last name" placeholder="Sharma" required />
              </div>
              <Input
                label="Email"
                type="email"
                placeholder="you@business.com"
                required
              />
              <Input label="Business name" placeholder="Harbor Coffee Co." />
              <Textarea
                label="Tell us about your project"
                placeholder="What are you looking to build?"
                rows={5}
                required
              />
              <Button
                variant="primary"
                size="lg"
                type="submit"
                className="w-full sm:w-auto"
              >
                Send message
              </Button>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="space-y-6">
              <div className="depth-panel p-6">
                <Mail className="text-accent size-5" strokeWidth={1.75} />
                <p className="type-heading-sm text-foreground mt-4">Email</p>
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="type-body-md text-foreground-muted hover:text-accent mt-1 transition-colors"
                >
                  {COMPANY_EMAIL}
                </a>
              </div>
              <div className="depth-panel p-6">
                <MessageCircle
                  className="text-accent size-5"
                  strokeWidth={1.75}
                />
                <p className="type-heading-sm text-foreground mt-4">WhatsApp</p>
                <a
                  href={`https://wa.me/${COMPANY_WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-body-md text-foreground-muted hover:text-accent mt-1 transition-colors"
                >
                  {COMPANY_PHONE}
                </a>
                <Button
                  variant="accent"
                  size="sm"
                  className="mt-4 w-full"
                  asChild
                >
                  <a
                    href={`https://wa.me/${COMPANY_WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
              <div className="depth-panel p-6">
                <MapPin className="text-accent size-5" strokeWidth={1.75} />
                <p className="type-heading-sm text-foreground mt-4">Office</p>
                <p className="type-body-md text-foreground-muted mt-1">
                  {COMPANY_ADDRESS}
                </p>
              </div>
              <div className="depth-panel p-6">
                <p className="type-heading-sm text-foreground">Follow us</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-body-sm text-foreground-muted hover:text-accent capitalize transition-colors"
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </PageSection>

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
