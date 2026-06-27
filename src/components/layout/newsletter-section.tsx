"use client";

import { Button, Input } from "@/components/ui";

export function NewsletterSection() {
  return (
    <section
      className="border-b border-[var(--color-border-subtle)] bg-[var(--color-background-subtle)] px-5 py-14 sm:px-6 lg:px-12"
      aria-labelledby="newsletter-title"
    >
      <div className="mx-auto flex max-w-[var(--container-2xl)] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-md">
          <h2 id="newsletter-title" className="type-heading-md text-foreground">
            Insights for local businesses
          </h2>
          <p className="type-body-sm text-foreground-muted mt-2">
            Design tips, SEO guides, and industry insights — delivered monthly.
          </p>
        </div>
        <form
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="email"
            placeholder="you@business.com"
            aria-label="Email address"
            className="flex-1"
          />
          <Button variant="primary" type="submit" className="shrink-0">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
