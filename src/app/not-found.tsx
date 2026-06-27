"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="absolute inset-0 bg-[var(--gradient-ambient-base)]" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <p className="type-display-2xl text-foreground/10 select-none">404</p>
        <h1
          className="type-display-md text-foreground -mt-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Page not found
        </h1>
        <p className="type-body-lg text-foreground-muted mx-auto mt-4 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="primary" size="lg" asChild>
            <Link href={ROUTES.home}>Back to home</Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <Link href={ROUTES.contact}>Contact us</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
