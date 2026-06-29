"use client";

import type { ReactNode } from "react";

interface HomeBackgroundProps {
  children: ReactNode;
}

export function HomeBackground({ children }: HomeBackgroundProps) {
  return (
    <div className="home-canvas relative">
      <div className="home-canvas__layers" aria-hidden>
        <div className="home-canvas__base" />
        <div className="home-canvas__light" />
        <div className="home-canvas__dark" />
        <div className="home-canvas__blob home-canvas__blob--accent" />
        <div className="home-canvas__blob home-canvas__blob--warm" />
        <div className="home-glow home-glow--violet" />
        <div className="home-glow home-glow--blue" />
        <div className="home-glow home-glow--amber" />
        <div className="home-glow home-glow--rose" />
        <div className="home-canvas__grid" />
        <div className="home-canvas__noise noise-overlay" />
        <div className="home-canvas__vignette" />
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}
