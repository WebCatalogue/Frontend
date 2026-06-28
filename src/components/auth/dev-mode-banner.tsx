"use client";

import { isMockAuthEnabled } from "@/services/auth";

export function DevModeBanner() {
  if (!isMockAuthEnabled()) return null;

  return (
    <div
      className="fixed right-4 bottom-4 z-[var(--z-index-fixed)] max-w-[220px] rounded-[var(--radius-lg)] border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-800 shadow-sm backdrop-blur-sm dark:text-amber-200"
      role="status"
      aria-live="polite"
    >
      <p className="type-label !text-[0.65rem] font-semibold tracking-wide uppercase">
        🧪 Development Mode
      </p>
      <p className="type-body-sm mt-0.5 opacity-90">
        Mock Authentication Enabled
      </p>
    </div>
  );
}
