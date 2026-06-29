"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DemoImage } from "@/components/marketing/demo-image";
import { Reveal } from "@/components/playground/motion/primitives";

interface IndustryCard {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
}

export function IndustriesGrid({ industries }: { industries: IndustryCard[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((industry, i) => (
        <Reveal key={industry.id} delay={i * 0.04}>
          <Link
            href={`/industries/${industry.slug}`}
            className="group depth-panel block overflow-hidden transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <DemoImage
                src={industry.image}
                alt={industry.name}
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 sm:p-7">
              <h2 className="type-heading-sm text-foreground group-hover:text-accent transition-colors">
                {industry.name}
              </h2>
              <p className="type-body-sm text-foreground-muted mt-2 line-clamp-2">
                {industry.description}
              </p>
              <p className="type-body-sm text-accent mt-4 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                Explore industry <ArrowRight className="size-4" aria-hidden />
              </p>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
