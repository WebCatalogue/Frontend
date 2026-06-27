import { PageHeader, PageSection } from "@/components/layout";

export const metadata = {
  title: "Privacy Policy — Aurevia",
  description:
    "How Aurevia collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description="Last updated: June 2025"
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />
      <PageSection>
        <div className="prose-custom mx-auto max-w-3xl space-y-6">
          {[
            {
              title: "Information we collect",
              body: "We collect information you provide directly, such as your name, email address, business name, and project details when you contact us or subscribe to our newsletter.",
            },
            {
              title: "How we use your information",
              body: "We use your information to respond to inquiries, deliver services, send relevant updates (with your consent), and improve our website and offerings.",
            },
            {
              title: "Cookies",
              body: "We use cookies to improve your browsing experience and analyze site traffic. You can control cookie preferences through our cookie banner or your browser settings.",
            },
            {
              title: "Data security",
              body: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or disclosure.",
            },
            {
              title: "Contact",
              body: "For privacy-related questions, contact us at hello@aurevia.com.",
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
