"use client";

import { Bell, Moon, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TEAM = [
  { name: "Garvit", role: "Co-founder", email: "garvit@bhaikisite.com" },
  { name: "Aarush", role: "Co-founder", email: "aarush@bhaikisite.com" },
] as const;

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="type-label text-accent mb-2">Workspace</p>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          Settings
        </h1>
        <p className="type-body-sm text-foreground-muted mt-2">
          Agency preferences — mock configuration until backend APIs are
          connected.
        </p>
      </header>

      <section className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
        <div className="mb-4 flex items-center gap-2">
          <Users className="size-4" aria-hidden />
          <h2 className="type-heading-sm font-medium">Team</h2>
        </div>
        <ul className="space-y-3">
          {TEAM.map((member) => (
            <li
              key={member.email}
              className="border-border flex items-center justify-between rounded-[var(--radius-lg)] border px-4 py-3"
            >
              <div>
                <p className="type-body-sm font-medium">{member.name}</p>
                <p className="type-body-sm text-foreground-muted">
                  {member.email}
                </p>
              </div>
              <Badge variant="outline">{member.role}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="size-4" aria-hidden />
          <h2 className="type-heading-sm font-medium">Notifications</h2>
        </div>
        <p className="type-body-sm text-foreground-muted">
          Email and WhatsApp alerts for new enquiries will connect when
          notification APIs are available.
        </p>
      </section>

      <section className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
        <div className="mb-4 flex items-center gap-2">
          <Moon className="size-4" aria-hidden />
          <h2 className="type-heading-sm font-medium">Appearance</h2>
        </div>
        <p className="type-body-sm text-foreground-muted">
          Use the theme toggle in the header to switch between light and dark
          mode.
        </p>
      </section>
    </div>
  );
}
