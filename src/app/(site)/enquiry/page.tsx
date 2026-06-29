"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader, PageSection } from "@/components/layout";
import { Button, Input, Textarea, useToast } from "@/components/ui";
import { INDUSTRY_PRESETS } from "@/features/platform/industry-presets";
import { ROUTES } from "@/constants";
import { useSubmitEnquiry } from "@/hooks/use-agency-queries";
import type { ProjectPriority, ProjectSource } from "@/types/agency";

const SOURCES: { value: ProjectSource; label: string }[] = [
  { value: "website", label: "Website" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "instagram", label: "Instagram" },
  { value: "referral", label: "Referral" },
  { value: "walk-in", label: "Walk-in" },
];

const selectClass =
  "border-input bg-surface-1 h-11 w-full rounded-[var(--radius-lg)] border px-3 text-sm";

export default function EnquiryPage() {
  const { addToast } = useToast();
  const submitEnquiry = useSubmitEnquiry();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [industry, setIndustry] = useState("cafe");
  const [source, setSource] = useState<ProjectSource>("website");
  const [priority, setPriority] = useState<ProjectPriority>("medium");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSubmitting(true);

    try {
      await submitEnquiry.mutateAsync({
        businessName: String(form.get("businessName") ?? ""),
        industry,
        source,
        contactName: String(form.get("contactName") ?? ""),
        contactPhone: String(form.get("contactPhone") ?? ""),
        contactEmail: String(form.get("contactEmail") ?? ""),
        notes: String(form.get("notes") ?? "") || undefined,
        estimatedBudget: String(form.get("budget") ?? "") || undefined,
        deadline: String(form.get("deadline") ?? "") || undefined,
        priority,
      });
      setSubmitted(true);
      addToast({
        title: "Enquiry received",
        description:
          "Our team will review your request and get back within 24 hours.",
        variant: "success",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <>
        <PageHeader
          eyebrow="Enquiry"
          title="Thank you — we've got your request."
          description="Aarush or Garvit will reach out shortly to discuss next steps."
          breadcrumbs={[{ label: "Enquiry" }]}
        />
        <PageSection>
          <div className="depth-panel mx-auto max-w-lg space-y-6 p-8 text-center">
            <p className="type-body-md text-foreground-muted">
              Want to explore layouts while you wait?
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild>
                <Link href={ROUTES.visualise}>Visualise your site</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={ROUTES.home}>Back to home</Link>
              </Button>
            </div>
          </div>
        </PageSection>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Enquiry"
        title="Tell us about your project."
        description="Share your business details and we'll prepare a tailored proposal. No login required."
        breadcrumbs={[{ label: "Submit Enquiry" }]}
      />

      <PageSection>
        <form
          onSubmit={handleSubmit}
          className="depth-panel mx-auto max-w-2xl space-y-5 p-7 sm:p-10"
        >
          <Input
            name="businessName"
            label="Business name"
            placeholder="Chai & Co."
            required
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="type-body-sm mb-2 block font-medium">
                Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className={selectClass}
              >
                {INDUSTRY_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="type-body-sm mb-2 block font-medium">
                How did you hear about us?
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as ProjectSource)}
                className={selectClass}
              >
                {SOURCES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              name="contactName"
              label="Your name"
              placeholder="Priya Sharma"
              required
            />
            <Input
              name="contactPhone"
              label="Phone"
              placeholder="+91 98765 43210"
              required
            />
          </div>
          <Input
            name="contactEmail"
            label="Email"
            type="email"
            placeholder="you@business.com"
            required
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              name="budget"
              label="Estimated budget (optional)"
              placeholder="₹25,000 – ₹50,000"
            />
            <Input
              name="deadline"
              label="Target launch (optional)"
              placeholder="August 2026"
            />
          </div>
          <div>
            <label className="type-body-sm mb-2 block font-medium">
              Urgency
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as ProjectPriority)}
              className={selectClass}
            >
              <option value="low">Low — flexible timeline</option>
              <option value="medium">Medium — within 4–6 weeks</option>
              <option value="high">High — need it soon</option>
              <option value="urgent">Urgent — ASAP</option>
            </select>
          </div>
          <Textarea
            name="notes"
            label="Project notes"
            placeholder="Tell us about your goals, preferred style, or any reference sites…"
            rows={4}
          />
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="type-body-sm text-foreground-muted">
              Prefer to explore first?{" "}
              <Link
                href={ROUTES.visualise}
                className="text-accent hover:underline"
              >
                Visualise your site
              </Link>
            </p>
            <Button type="submit" size="lg" isLoading={submitting}>
              Submit enquiry
            </Button>
          </div>
        </form>
      </PageSection>
    </>
  );
}
