"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectStatusBadge } from "./project-status-badge";
import type { AgencyProject, KanbanColumn } from "@/types/agency";

const COLUMNS: { id: KanbanColumn; label: string }[] = [
  { id: "planning", label: "Planning" },
  { id: "design", label: "Design" },
  { id: "development", label: "Development" },
  { id: "review", label: "Review" },
  { id: "publishing", label: "Publishing" },
  { id: "maintenance", label: "Maintenance" },
];

interface KanbanBoardProps {
  projects: AgencyProject[];
  onMove: (projectId: string, column: KanbanColumn) => void;
}

export function KanbanBoard({ projects, onMove }: KanbanBoardProps) {
  const todoProjects = projects.filter(
    (p) =>
      p.status !== "new-enquiry" &&
      p.status !== "completed" &&
      p.status !== "archived" &&
      p.status !== "waiting-for-client",
  );

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {COLUMNS.map((column) => {
        const columnProjects = todoProjects.filter(
          (p) =>
            p.kanbanColumn === column.id ||
            (!p.kanbanColumn &&
              column.id === "planning" &&
              p.status === "our-todo"),
        );

        return (
          <div
            key={column.id}
            className="bg-muted/30 flex w-72 shrink-0 flex-col rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const projectId = e.dataTransfer.getData("projectId");
              if (projectId) onMove(projectId, column.id);
            }}
          >
            <div className="border-border flex items-center justify-between border-b px-4 py-3">
              <h3 className="type-body-sm font-medium">{column.label}</h3>
              <span className="type-label bg-muted rounded-full px-2 py-0.5">
                {columnProjects.length}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-3">
              {columnProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  draggable
                  onDragStart={(e) => {
                    const dragEvent =
                      e as unknown as React.DragEvent<HTMLDivElement>;
                    dragEvent.dataTransfer.setData("projectId", project.id);
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="surface-2 border-border cursor-grab rounded-[var(--radius-lg)] border p-4 active:cursor-grabbing"
                >
                  <Link href={`/app/projects/${project.id}`}>
                    <p className="type-body-sm hover:text-accent font-medium">
                      {project.businessName}
                    </p>
                  </Link>
                  <p className="type-label text-foreground-subtle mt-1 capitalize">
                    {project.industry}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <ProjectStatusBadge status={project.status} />
                    {project.deadline && (
                      <span className="type-label text-foreground-subtle">
                        {new Date(project.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
              {columnProjects.length === 0 && (
                <p className="type-body-sm text-foreground-subtle p-4 text-center">
                  Drop projects here
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
