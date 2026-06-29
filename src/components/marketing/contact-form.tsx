"use client";

import { Send } from "lucide-react";
import { Button, Input, Textarea, useToast } from "@/components/ui";

export function ContactForm() {
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: "Enquiry sent",
      description: "We'll get back to you within 24 hours.",
      variant: "success",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form-panel depth-panel mt-8 space-y-5 p-6 sm:mt-10 sm:p-8"
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
        type="submit"
        size="lg"
        variant="primary"
        className="contact-form-submit w-full sm:w-auto"
      >
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          Send enquiry
          <Send className="size-4" aria-hidden />
        </span>
      </Button>
    </form>
  );
}
