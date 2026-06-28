"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectStatusBadge } from "./project-status-badge";
import type { Client } from "@/types/agency";

interface ClientCardProps {
  client: Client;
  index?: number;
}

export function ClientCard({ client, index = 0 }: ClientCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="type-heading-sm font-medium">{client.businessName}</h3>
          <p className="type-body-sm text-foreground-muted mt-1">
            {client.ownerName}
          </p>
        </div>
        <ProjectStatusBadge status={client.projectStatus} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="type-label text-foreground-subtle">Phone</dt>
          <dd className="type-body-sm mt-0.5">{client.phone}</dd>
        </div>
        <div>
          <dt className="type-label text-foreground-subtle">Email</dt>
          <dd className="type-body-sm mt-0.5 truncate">{client.email}</dd>
        </div>
        <div>
          <dt className="type-label text-foreground-subtle">Industry</dt>
          <dd className="type-body-sm mt-0.5">{client.industry}</dd>
        </div>
        <div>
          <dt className="type-label text-foreground-subtle">Projects</dt>
          <dd className="type-body-sm mt-0.5">{client.projectsCount}</dd>
        </div>
        {client.currentPlan && (
          <div className="col-span-2">
            <dt className="type-label text-foreground-subtle">Plan</dt>
            <dd className="type-body-sm mt-0.5">{client.currentPlan}</dd>
          </div>
        )}
        <div>
          <dt className="type-label text-foreground-subtle">Last contact</dt>
          <dd className="type-body-sm mt-0.5">
            {new Date(client.lastContact).toLocaleDateString()}
          </dd>
        </div>
      </dl>

      {client.notes && (
        <p className="type-body-sm text-foreground-muted mt-4 line-clamp-2 border-t pt-4">
          {client.notes}
        </p>
      )}

      <div className="mt-5 flex gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href={`/app/clients/${client.id}`}>
            Open Client
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild size="sm" variant="ghost">
          <Link href={`/app/projects/new?client=${client.id}`}>
            <Plus className="size-4" />
            New Project
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}
