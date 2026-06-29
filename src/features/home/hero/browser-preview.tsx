"use client";

import { memo, useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { BrowserContent } from "./browser-content";
import { BrowserNavbar } from "./browser-navbar";
import { BUILD_TIMELINE, getPreviewTheme, PREVIEW_THEMES } from "./hero-motion";

interface BrowserPreviewProps {
  mouseX?: number;
  mouseY?: number;
}

const BUSINESS_NAMES: Record<string, string> = {
  cafe: "Harbor Coffee",
  luxury: "Atelier Salon",
  modern: "Northline Studio",
  gym: "Pulse Fitness",
};

export const BrowserPreview = memo(function BrowserPreview({
  mouseX = 0,
  mouseY = 0,
}: BrowserPreviewProps) {
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);

  const theme = getPreviewTheme(themeIndex);
  const businessName = BUSINESS_NAMES[theme.id] ?? "Your Business";

  const tiltX = useSpring(reduced ? 0 : mouseY * -2.5, {
    stiffness: 120,
    damping: 20,
  });
  const tiltY = useSpring(reduced ? 0 : mouseX * 2.5, {
    stiffness: 120,
    damping: 20,
  });

  useEffect(() => {
    if (reduced) {
      setElapsed(BUILD_TIMELINE.cycleDuration);
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const totalSec = (now - start) / 1000;
      const cycle = Math.floor(totalSec / BUILD_TIMELINE.cycleDuration);
      const t = totalSec % BUILD_TIMELINE.cycleDuration;
      setElapsed(t);
      setThemeIndex(cycle % PREVIEW_THEMES.length);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const showNavbar = reduced || elapsed >= BUILD_TIMELINE.navbar;

  return (
    <motion.div
      className="flex h-full flex-col"
      style={
        reduced
          ? undefined
          : {
              rotateX: tiltX,
              rotateY: tiltY,
              transformPerspective: 800,
            }
      }
    >
      {/* Browser chrome */}
      <div
        className="flex shrink-0 items-center gap-2 border-b border-white/8 px-3 py-2"
        style={{ background: "rgba(10,10,12,0.95)" }}
        aria-hidden
      >
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-1 items-center gap-1 overflow-hidden rounded-md bg-black/40 px-2 py-1">
          <span className="truncate font-mono text-[0.55rem] text-white/40 sm:text-[0.6rem]">
            bhaikisite.com/{theme.id}
          </span>
        </div>
        <div className="hidden gap-1 sm:flex">
          <span className="rounded bg-white/8 px-2 py-0.5 text-[0.5rem] text-white/50">
            Preview
          </span>
        </div>
      </div>

      {/* Tab strip */}
      <div
        className="flex gap-1 border-b border-white/6 px-2 pt-1.5"
        style={{ background: "rgba(14,14,18,0.9)" }}
        aria-hidden
      >
        <div className="rounded-t-md border border-b-0 border-white/10 bg-white/5 px-3 py-1 text-[0.5rem] text-white/70">
          Home
        </div>
        <div className="px-3 py-1 text-[0.5rem] text-white/30">Menu</div>
      </div>

      {/* Live preview */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <BrowserNavbar
          visible={showNavbar}
          businessName={businessName}
          accent={theme.gradient.match(/#[0-9A-Fa-f]{3,8}/g)?.[0] ?? "#5e6ad2"}
          fontDisplay={theme.displayFont}
        />
        <BrowserContent elapsed={elapsed} theme={theme} />
      </div>
    </motion.div>
  );
});
