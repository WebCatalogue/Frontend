"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { BUILD_TIMELINE, HERO_EASE } from "./hero-motion";

interface SectionProps {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  y?: number;
}

function Section({ show, children, className, y = 16 }: SectionProps) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? 0 : y,
      }}
      transition={{ duration: 0.6, ease: HERO_EASE }}
      aria-hidden
    >
      {children}
    </motion.div>
  );
}

interface BrowserContentProps {
  elapsed: number;
  theme: ReturnType<typeof import("./hero-motion").getPreviewTheme>;
}

export const BrowserContent = memo(function BrowserContent({
  elapsed,
  theme,
}: BrowserContentProps) {
  const t = BUILD_TIMELINE;
  const show = (mark: number) => elapsed >= mark;
  const accent = theme.gradient.match(/#[0-9A-Fa-f]{3,8}/g)?.[0] ?? "#5e6ad2";

  return (
    <div
      className="relative flex h-[calc(100%-0px)] flex-col overflow-hidden bg-[#fafaf8] transition-colors duration-1000"
      style={{ fontFamily: theme.bodyFont }}
    >
      <div className="flex-1 overflow-hidden">
        <section className="px-4 pt-4 pb-3 sm:px-5 sm:pt-5">
          <Section show={show(t.heroHeading)}>
            <p
              className="text-[0.5rem] tracking-[0.18em] uppercase sm:text-[0.55rem]"
              style={{ color: accent }}
            >
              Premium Website
            </p>
            <h2
              className="mt-2 text-[1rem] leading-tight tracking-tight text-[#111110] sm:text-[1.35rem]"
              style={{ fontFamily: theme.displayFont }}
            >
              Crafted for your brand.
            </h2>
            <p className="mt-1.5 max-w-[90%] text-[0.55rem] leading-relaxed text-[#6b6b68] sm:text-[0.65rem]">
              Beautifully composed sections, ready to launch.
            </p>
          </Section>

          <Section show={show(t.heroButtons)} className="mt-3 flex gap-2">
            <div
              className="rounded-md px-3 py-1.5 text-[0.55rem] font-medium text-white sm:text-[0.6rem]"
              style={{ background: "#111110", borderRadius: theme.radius }}
            >
              Book a table
            </div>
            <div
              className="rounded-md border border-[rgba(17,17,16,0.08)] px-3 py-1.5 text-[0.55rem] text-[#6b6b68] sm:text-[0.6rem]"
              style={{ borderRadius: theme.radius }}
            >
              View menu
            </div>
          </Section>

          <Section show={show(t.heroImage)} className="mt-3">
            <div
              className="relative aspect-[16/9] overflow-hidden"
              style={{
                background: theme.gradient,
                borderRadius: theme.radius,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-0.5 text-[0.5rem] font-medium text-[#111]">
                Your hero image
              </div>
            </div>
          </Section>
        </section>

        <Section
          show={show(t.about)}
          className="border-t border-[rgba(17,17,16,0.05)] px-4 py-3 sm:px-5"
        >
          <h3
            className="text-[0.7rem] font-medium text-[#111110] sm:text-[0.8rem]"
            style={{ fontFamily: theme.displayFont }}
          >
            About us
          </h3>
          <p className="mt-1.5 text-[0.55rem] leading-relaxed text-[#6b6b68] sm:text-[0.6rem]">
            A welcoming space designed with intention — every detail composed
            from premium BhaiKiSite components.
          </p>
        </Section>

        <Section show={show(t.gallery)} className="px-4 py-3 sm:px-5">
          <h3
            className="mb-2 text-[0.7rem] font-medium text-[#111110] sm:text-[0.8rem]"
            style={{ fontFamily: theme.displayFont }}
          >
            Gallery
          </h3>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-md"
                style={{
                  background: `linear-gradient(135deg, ${accent}33, #f0f0ed)`,
                  borderRadius: theme.radius,
                }}
              />
            ))}
          </div>
        </Section>

        <Section
          show={show(t.testimonials)}
          className="mx-4 mb-3 rounded-lg p-3 sm:mx-5"
          y={10}
        >
          <div
            className="rounded-lg p-3"
            style={{ background: "rgba(94,106,210,0.12)" }}
          >
            <div className="mb-1.5 flex gap-0.5 text-[#5e6ad2]">{"★★★★★"}</div>
            <p className="text-[0.55rem] leading-relaxed text-[#6b6b68] italic sm:text-[0.6rem]">
              &ldquo;Looks like we hired a studio — launched in days.&rdquo;
            </p>
            <p className="mt-1 text-[0.5rem] font-medium text-[#111110]">
              — Happy client
            </p>
          </div>
        </Section>
      </div>

      <Section
        show={show(t.footer)}
        className="border-t border-[rgba(17,17,16,0.05)] px-4 py-2.5"
        y={8}
      >
        <div className="flex items-center justify-between">
          <span className="text-[0.5rem] text-[#6b6b68]">
            © {theme.name} · Built with BhaiKiSite
          </span>
          <div className="flex gap-2">
            {["IG", "WA"].map((s) => (
              <span
                key={s}
                className="rounded border border-[rgba(17,17,16,0.08)] px-1.5 py-0.5 text-[0.45rem] text-[#6b6b68]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
});
