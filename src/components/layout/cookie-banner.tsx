"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants";

import { STORAGE_KEYS } from "@/constants";

const COOKIE_KEY = STORAGE_KEYS.cookieConsent;

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="animate-fade-up fixed right-4 bottom-4 left-4 z-[var(--z-index-toast)] sm:right-6 sm:left-auto sm:max-w-sm"
    >
      <div className="depth-panel p-5 shadow-xl">
        <p className="type-body-sm text-foreground font-medium">
          We value your privacy
        </p>
        <p className="type-body-sm text-foreground-muted mt-2">
          We use cookies to improve your experience. Read our{" "}
          <Link href={ROUTES.privacy} className="text-accent hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={accept}
            className="flex-1"
          >
            Accept
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={accept}
            className="flex-1"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
