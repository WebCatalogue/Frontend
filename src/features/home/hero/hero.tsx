"use client";

import { ContainerScroll } from "./container-scroll";
import { BrowserPreview } from "./browser-preview";
import { HeroHeader } from "./hero-header";
import { useMouseParallax } from "./hooks/use-mouse-parallax";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Hero() {
  const reduced = useReducedMotion();
  const mouse = useMouseParallax(!reduced);

  return (
    <section className="section-anchor relative" aria-labelledby="hero-heading">
      <ContainerScroll titleComponent={<HeroHeader />}>
        <BrowserPreview mouseX={mouse.x} mouseY={mouse.y} />
      </ContainerScroll>
    </section>
  );
}
