import Link from "next/link";
import { CtaBanner, PageHeader, PageSection } from "@/components/layout";
import { Reveal } from "@/components/playground/motion/primitives";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants";
import { PRICING_COMPARISON, PRICING_PLANS } from "@/mock/pricing";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Pricing — BhaiKISite",
  description:
    "Transparent pricing for premium business websites. Starter, Business, and Premium plans.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Invest in a website that pays for itself."
        description="Clear packages. No hidden fees. Premium quality at every tier."
        breadcrumbs={[{ label: "Pricing" }]}
      />

      <PageSection>
        <div className="grid gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08}>
              <article
                className={cn(
                  "depth-panel flex h-full flex-col p-8",
                  plan.highlighted && "ring-accent ring-2",
                )}
              >
                {plan.highlighted && (
                  <span className="type-label text-accent mb-4">
                    Most popular
                  </span>
                )}
                <h2 className="type-heading-lg text-foreground">{plan.name}</h2>
                <p className="type-display-md text-foreground mt-4">
                  {plan.price}
                </p>
                <p className="type-body-sm text-foreground-subtle">
                  {plan.period}
                </p>
                <p className="type-body-sm text-foreground-muted mt-4">
                  {plan.description}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-[var(--color-border-subtle)] pt-6">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="type-body-sm text-foreground-muted flex items-start gap-2"
                    >
                      <span className="bg-accent mt-1.5 size-1 shrink-0 rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlighted ? "accent" : "primary"}
                  className="mt-8 w-full"
                  asChild
                >
                  <Link href={ROUTES.contact}>{plan.cta}</Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection subdued>
        <Reveal>
          <h2 className="type-heading-lg text-foreground mb-8 text-center">
            Compare plans
          </h2>
        </Reveal>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-subtle)]">
                <th className="type-body-sm text-foreground-muted py-4 text-left font-medium">
                  Feature
                </th>
                <th className="type-body-sm text-foreground-muted py-4 text-center font-medium">
                  Starter
                </th>
                <th className="type-body-sm text-foreground py-4 text-center font-medium">
                  Business
                </th>
                <th className="type-body-sm text-foreground-muted py-4 text-center font-medium">
                  Premium
                </th>
              </tr>
            </thead>
            <tbody>
              {PRICING_COMPARISON.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-[var(--color-border-subtle)]"
                >
                  <td className="type-body-sm text-foreground py-4">
                    {row.feature}
                  </td>
                  <td className="type-body-sm text-foreground-muted py-4 text-center">
                    {row.starter}
                  </td>
                  <td className="type-body-sm text-foreground py-4 text-center font-medium">
                    {row.business}
                  </td>
                  <td className="type-body-sm text-foreground-muted py-4 text-center">
                    {row.premium}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <CtaBanner />
    </>
  );
}
