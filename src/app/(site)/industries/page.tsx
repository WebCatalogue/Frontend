import { CtaBanner, PageHeader, PageSection } from "@/components/layout";
import { IndustriesGrid } from "@/components/marketing/industries-grid";
import { INDUSTRIES } from "@/mock/industries";

export const metadata = {
  title: "Industries — BhaiKISite",
  description:
    "Premium website templates for cafés, restaurants, salons, gyms, hotels, clinics, and more.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="A starting point for every kind of business."
        description="Browse industries to find the right fit, then open the Visualise builder to configure your website in one guided flow."
        breadcrumbs={[{ label: "Industries" }]}
      />

      <PageSection>
        <IndustriesGrid
          industries={INDUSTRIES.map((industry) => ({
            id: industry.id,
            slug: industry.slug,
            name: industry.name,
            description: industry.description,
            image: industry.image,
          }))}
        />
      </PageSection>

      <CtaBanner
        title="Don't see your industry?"
        description="Most local businesses fit one of our templates. Tell us about yours — we'll point you in the right direction."
      />
    </>
  );
}
