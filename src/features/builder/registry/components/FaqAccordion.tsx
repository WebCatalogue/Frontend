import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { SectionShell } from "../section-shell";
import type { RegistryComponentProps } from "../../registry";

export function FaqAccordion({ settings }: RegistryComponentProps) {
  const items = Array.isArray(settings?.items)
    ? (settings.items as { question?: string; answer?: string }[])
    : [
        {
          question: "How does it work?",
          answer: "We design and launch your site.",
        },
        { question: "How long does it take?", answer: "Typically 2–4 weeks." },
      ];

  return (
    <SectionShell>
      <h2 className="type-heading-md mb-6 font-medium">FAQ</h2>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger>
              {item.question ?? `Question ${index + 1}`}
            </AccordionTrigger>
            <AccordionContent>{item.answer ?? ""}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionShell>
  );
}
