import { PageHeader, PageSection } from "@/components/layout";

export const metadata = {
  title: "Terms & Conditions — BhaiKISite",
  description:
    "Terms and conditions for using BhaiKISite services and website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms & Conditions"
        description="Last updated: June 2025"
        breadcrumbs={[{ label: "Terms & Conditions" }]}
      />
      <PageSection>
        <div className="prose-custom mx-auto max-w-3xl space-y-6">
          {[
            {
              title: "Services",
              body: "BhaiKISite provides web design and development services as described in individual project agreements. Scope, timeline, and deliverables are defined per project.",
            },
            {
              title: "Payment",
              body: "Payment terms are outlined in your project proposal. Typically, a deposit is required to begin work, with remaining balance due upon completion or per agreed milestones.",
            },
            {
              title: "Intellectual property",
              body: "Upon full payment, clients receive ownership of custom design work created for their project. BhaiKISite retains the right to showcase completed work in our portfolio unless otherwise agreed.",
            },
            {
              title: "Revisions",
              body: "Revision rounds are included per your selected plan. Additional revisions beyond the agreed scope may incur extra charges.",
            },
            {
              title: "Limitation of liability",
              body: "BhaiKISite's liability is limited to the amount paid for services. We are not liable for indirect, incidental, or consequential damages.",
            },
            {
              title: "Contact",
              body: "Questions about these terms? Email hello@bhaikisite.com.",
            },
          ].map((section) => (
            <section key={section.title}>
              <h2 className="type-heading-md text-foreground">
                {section.title}
              </h2>
              <p className="type-body-md text-foreground-muted mt-3">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </PageSection>
    </>
  );
}
