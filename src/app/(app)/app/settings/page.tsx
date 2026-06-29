"use client";

import { Bell, Moon, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/hooks/use-agency-queries";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { QueryErrorState } from "@/components/shared/query-state";

export default function SettingsPage() {
  const settingsQuery = useSettings();

  if (settingsQuery.isLoading) return <ListSkeleton rows={4} />;

  if (settingsQuery.error) {
    return (
      <QueryErrorState
        error={settingsQuery.error}
        onRetry={() => void settingsQuery.refetch()}
        isRetrying={settingsQuery.isFetching}
      />
    );
  }

  const settings = settingsQuery.data;
  const team = settings?.team ?? [];

  return (
    <div className="space-y-8">
      <header>
        <p className="type-label text-accent mb-2">Workspace</p>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          Settings
        </h1>
        <p className="type-body-sm text-foreground-muted mt-2">
          Agency preferences and team configuration.
        </p>
      </header>

      <section className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
        <div className="mb-4 flex items-center gap-2">
          <Users className="size-4" aria-hidden />
          <h2 className="type-heading-sm font-medium">Team</h2>
        </div>
        {team.length === 0 ? (
          <p className="type-body-sm text-foreground-muted">
            No team members configured yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {team.map((member) => (
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
        )}
      </section>

      <section className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="size-4" aria-hidden />
          <h2 className="type-heading-sm font-medium">Notifications</h2>
        </div>
        <ul className="type-body-sm text-foreground-muted space-y-2">
          <li>
            Email alerts:{" "}
            {settings?.notifications.email ? "Enabled" : "Disabled"}
          </li>
          <li>
            WhatsApp alerts:{" "}
            {settings?.notifications.whatsapp ? "Enabled" : "Disabled"}
          </li>
          <li>
            New enquiry alerts:{" "}
            {settings?.notifications.newEnquiries ? "Enabled" : "Disabled"}
          </li>
        </ul>
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
