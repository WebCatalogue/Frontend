"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isMockAuthEnabled, MOCK_AUTH_CREDENTIALS } from "@/services/auth";
import { cn } from "@/lib/utils";

interface DevCredentialsPanelProps {
  onFill: (email: string, password: string) => void;
}

export function DevCredentialsPanel({ onFill }: DevCredentialsPanelProps) {
  const [open, setOpen] = useState(false);

  if (!isMockAuthEnabled()) return null;

  return (
    <div className="border-border mt-6 rounded-[var(--radius-xl)] border border-dashed">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-foreground-muted hover:text-foreground flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium">Development Credentials</span>
        {open ? (
          <ChevronUp className="size-4 shrink-0" aria-hidden />
        ) : (
          <ChevronDown className="size-4 shrink-0" aria-hidden />
        )}
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-border space-y-4 border-t px-4 pt-3 pb-4">
            {MOCK_AUTH_CREDENTIALS.map((cred) => (
              <div
                key={cred.email}
                className="bg-muted/40 rounded-[var(--radius-lg)] px-3 py-2.5"
              >
                <p className="type-body-sm font-medium">{cred.name}</p>
                <p className="type-body-sm text-foreground-muted mt-0.5">
                  {cred.email}
                </p>
                <p className="type-label text-foreground-subtle mt-0.5 font-mono">
                  {cred.password}
                </p>
              </div>
            ))}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() =>
                  onFill(
                    MOCK_AUTH_CREDENTIALS[0].email,
                    MOCK_AUTH_CREDENTIALS[0].password,
                  )
                }
              >
                Fill Garvit
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() =>
                  onFill(
                    MOCK_AUTH_CREDENTIALS[1].email,
                    MOCK_AUTH_CREDENTIALS[1].password,
                  )
                }
              >
                Fill Aarush
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
