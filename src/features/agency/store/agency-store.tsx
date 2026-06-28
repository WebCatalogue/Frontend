"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createDefaultChecklist,
  fetchClients,
  fetchProjects,
} from "@/services/agency";
import type {
  AgencyProject,
  ChecklistItem,
  Client,
  Contributor,
  CreateProjectInput,
  KanbanColumn,
  ProjectNote,
  ProjectStatus,
} from "@/types/agency";

interface AgencyStoreState {
  projects: AgencyProject[];
  clients: Client[];
  isLoading: boolean;
  moveToTodo: (projectId: string) => void;
  deleteProject: (projectId: string) => void;
  updateProjectStatus: (projectId: string, status: ProjectStatus) => void;
  moveKanban: (projectId: string, column: KanbanColumn) => void;
  toggleChecklist: (
    projectId: string,
    itemId: string,
    contributor: Contributor,
  ) => void;
  addNote: (
    projectId: string,
    content: string,
    contributor: Contributor,
  ) => void;
  createProject: (input: CreateProjectInput) => AgencyProject;
  getProject: (id: string) => AgencyProject | undefined;
  getClient: (id: string) => Client | undefined;
}

const AgencyStoreContext = createContext<AgencyStoreState | null>(null);

const KANBAN_TO_STATUS: Record<KanbanColumn, ProjectStatus> = {
  planning: "planning",
  design: "design",
  development: "development",
  review: "review",
  publishing: "ready-to-publish",
  maintenance: "maintenance",
};

export function AgencyStoreProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<AgencyProject[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const [p, c] = await Promise.all([fetchProjects(), fetchClients()]);
      const { getStoredEnquiries } = await import("@/services/enquiry-storage");
      const stored = getStoredEnquiries();
      const merged = [
        ...stored,
        ...p.filter((mock) => !stored.some((s) => s.id === mock.id)),
      ];
      setProjects(merged);
      setClients(c);
      setIsLoading(false);
    })();
  }, []);

  const addTimeline = useCallback(
    (
      projectId: string,
      message: string,
      contributor?: Contributor,
      type: AgencyProject["timeline"][0]["type"] = "general",
    ) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                updatedAt: new Date().toISOString(),
                timeline: [
                  {
                    id: `tl-${Date.now()}`,
                    projectId,
                    type,
                    message,
                    contributor,
                    timestamp: new Date().toISOString(),
                  },
                  ...p.timeline,
                ],
              }
            : p,
        ),
      );
    },
    [],
  );

  const moveToTodo = useCallback(
    (projectId: string) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                status: "our-todo" as ProjectStatus,
                kanbanColumn: "planning" as KanbanColumn,
                updatedAt: new Date().toISOString(),
              }
            : p,
        ),
      );
      addTimeline(projectId, "Moved to Our To-Do", "Garvit", "status");
    },
    [addTimeline],
  );

  const deleteProject = useCallback((projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  }, []);

  const updateProjectStatus = useCallback(
    (projectId: string, status: ProjectStatus) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, status, updatedAt: new Date().toISOString() }
            : p,
        ),
      );
      addTimeline(projectId, `Status updated to ${status}`, "Garvit", "status");
    },
    [addTimeline],
  );

  const moveKanban = useCallback(
    (projectId: string, column: KanbanColumn) => {
      const status = KANBAN_TO_STATUS[column];
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                kanbanColumn: column,
                status,
                updatedAt: new Date().toISOString(),
              }
            : p,
        ),
      );
      addTimeline(
        projectId,
        `Moved to ${column.charAt(0).toUpperCase() + column.slice(1)}`,
        "Garvit",
        "status",
      );
    },
    [addTimeline],
  );

  const toggleChecklist = useCallback(
    (projectId: string, itemId: string, contributor: Contributor) => {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p;
          const checklist = p.checklist.map((item) => {
            if (item.id !== itemId) return item;
            const completed = !item.completed;
            return {
              ...item,
              completed,
              completedBy: completed ? contributor : undefined,
              completedAt: completed ? new Date().toISOString() : undefined,
            } satisfies ChecklistItem;
          });
          const toggled = checklist.find((c) => c.id === itemId);
          if (toggled?.completed) {
            setTimeout(() => {
              addTimeline(
                projectId,
                `${toggled.label} completed`,
                contributor,
                "checklist",
              );
            }, 0);
          }
          return { ...p, checklist, updatedAt: new Date().toISOString() };
        }),
      );
    },
    [addTimeline],
  );

  const addNote = useCallback(
    (projectId: string, content: string, contributor: Contributor) => {
      const note: ProjectNote = {
        id: `note-${Date.now()}`,
        projectId,
        content,
        contributor,
        createdAt: new Date().toISOString(),
      };
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                projectNotes: [note, ...p.projectNotes],
                updatedAt: new Date().toISOString(),
              }
            : p,
        ),
      );
      addTimeline(projectId, "Note added", contributor, "note");
    },
    [addTimeline],
  );

  const createProject = useCallback(
    (input: CreateProjectInput): AgencyProject => {
      const id = `proj-${Date.now()}`;
      const project: AgencyProject = {
        id,
        businessName: input.businessName,
        industry: input.industry,
        status: "new-enquiry",
        source: input.source,
        priority: input.priority ?? "medium",
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deadline: input.deadline,
        estimatedBudget: input.estimatedBudget,
        contactName: input.contactName,
        contactPhone: input.contactPhone,
        contactEmail: input.contactEmail,
        notes: input.notes,
        checklist: createDefaultChecklist(),
        timeline: [
          {
            id: `tl-${id}-0`,
            projectId: id,
            type: "general",
            message: `Project created via ${input.source}`,
            contributor: "Garvit",
            timestamp: new Date().toISOString(),
          },
        ],
        projectNotes: [],
        attachments: [],
      };
      setProjects((prev) => [project, ...prev]);
      return project;
    },
    [],
  );

  const getProject = useCallback(
    (id: string) => projects.find((p) => p.id === id),
    [projects],
  );

  const getClient = useCallback(
    (id: string) => clients.find((c) => c.id === id),
    [clients],
  );

  const value = useMemo(
    () => ({
      projects,
      clients,
      isLoading,
      moveToTodo,
      deleteProject,
      updateProjectStatus,
      moveKanban,
      toggleChecklist,
      addNote,
      createProject,
      getProject,
      getClient,
    }),
    [
      projects,
      clients,
      isLoading,
      moveToTodo,
      deleteProject,
      updateProjectStatus,
      moveKanban,
      toggleChecklist,
      addNote,
      createProject,
      getProject,
      getClient,
    ],
  );

  return (
    <AgencyStoreContext.Provider value={value}>
      {children}
    </AgencyStoreContext.Provider>
  );
}

export function useAgencyStore(): AgencyStoreState {
  const ctx = useContext(AgencyStoreContext);
  if (!ctx) {
    throw new Error("useAgencyStore must be used within AgencyStoreProvider");
  }
  return ctx;
}
