"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { HERO_EASE } from "./hero-motion";

interface BrowserNavbarProps {
  visible: boolean;
  businessName: string;
  accent: string;
  fontDisplay: string;
}

export const BrowserNavbar = memo(function BrowserNavbar({
  visible,
  businessName,
  accent,
  fontDisplay,
}: BrowserNavbarProps) {
  return (
    <motion.header
      className="flex items-center justify-between border-b px-4 py-2.5"
      style={{
        borderColor: `${accent}22`,
        background: "rgba(255,255,255,0.03)",
        fontFamily: fontDisplay,
      }}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -16,
      }}
      transition={{ duration: 0.55, ease: HERO_EASE }}
      aria-hidden
    >
      <div className="flex items-center gap-2">
        <div className="size-5 rounded-md" style={{ background: accent }} />
        <span className="text-[0.65rem] font-medium text-white/90 sm:text-xs">
          {businessName}
        </span>
      </div>
      <nav className="hidden items-center gap-3 sm:flex">
        {["Home", "Menu", "Gallery", "Contact"].map((link) => (
          <span
            key={link}
            className="text-[0.6rem] text-white/45"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {link}
          </span>
        ))}
      </nav>
    </motion.header>
  );
});
