"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardGridSkeleton } from "@/components/shared/list-skeleton";
import { ClientCard, NewProjectModal } from "@/features/agency/components";
import { useAgencyStore } from "@/features/agency";
import { useToast } from "@/components/ui/toast";

export default function ClientsPage() {
  const { clients, isLoading, createProject } = useAgencyStore();
  const { addToast } = useToast();
  const [newOpen, setNewOpen] = useState(false);

  if (isLoading) return <CardGridSkeleton count={3} />;

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="type-label text-accent mb-2">CRM</p>
          <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
            Clients
          </h1>
        </div>
        <Button onClick={() => setNewOpen(true)}>
          <Plus className="size-4" />
          New Project
        </Button>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {clients.map((client, i) => (
          <ClientCard key={client.id} client={client} index={i} />
        ))}
      </div>
      <NewProjectModal
        open={newOpen}
        onOpenChange={setNewOpen}
        onSubmit={(input) => {
          createProject(input);
          addToast({ title: "Project created", variant: "success" });
        }}
      />
    </div>
  );
}
