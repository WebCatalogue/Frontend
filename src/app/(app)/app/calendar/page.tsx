"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { fetchCalendarEvents } from "@/services/agency";
import type { CalendarEvent } from "@/types/agency";
import { ListSkeleton } from "@/components/shared/list-skeleton";

const TYPE_COLORS: Record<CalendarEvent["type"], string> = {
  meeting: "border-l-blue-500",
  deadline: "border-l-red-500",
  launch: "border-l-emerald-500",
  maintenance: "border-l-cyan-500",
  reminder: "border-l-amber-500",
};

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchCalendarEvents().then((e) => {
      setEvents(e);
      setLoading(false);
    });
  }, []);

  if (loading) return <ListSkeleton rows={5} />;

  const sorted = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <div className="space-y-8">
      <header>
        <p className="type-label text-accent mb-2 flex items-center gap-2">
          <Calendar className="size-4" />
          Schedule
        </p>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          Calendar
        </h1>
      </header>
      <div className="space-y-3">
        {sorted.map((event) => (
          <div
            key={event.id}
            className={`surface-2 border-border rounded-[var(--radius-xl)] border border-l-4 p-5 ${TYPE_COLORS[event.type]}`}
          >
            <p className="type-body-sm font-medium">{event.title}</p>
            <p className="type-label text-foreground-subtle mt-1">
              {new Date(event.date).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
              {event.time && ` · ${event.time}`}
              {event.clientName && ` · ${event.clientName}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
