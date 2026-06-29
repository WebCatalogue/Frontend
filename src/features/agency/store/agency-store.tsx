"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  contributorPayload,
  toCreateProjectRequest,
  useClients,
  useCreateProject,
  useDeleteProject,
  useProjects,
} from "@/hooks/use-agency-queries";
import * as projectsApi from "@/lib/api/projects";
import { queryKeys } from "@/lib/query/keys";
import type {
  AgencyProject,
  Client,
  Contributor,
  CreateProjectInput,
  KanbanColumn,
  ProjectStatus,
} from "@/types/agency";
import type { UpdateProjectRequest } from "@/types/api";

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
  const qc = useQueryClient();
  const projectsQuery = useProjects();
  const clientsQuery = useClients();
  const createProjectMutation = useCreateProject();
  const deleteProjectMutation = useDeleteProject();

  const projects = useMemo(
    () => projectsQuery.data ?? [],
    [projectsQuery.data],
  );
  const clients = useMemo(() => clientsQuery.data ?? [], [clientsQuery.data]);
  const isLoading = projectsQuery.isLoading || clientsQuery.isLoading;

  const invalidateProject = useCallback(
    async (projectId: string) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: queryKeys.agency.projects.all }),
        qc.invalidateQueries({
          queryKey: queryKeys.agency.projects.detail(projectId),
        }),
        qc.invalidateQueries({
          queryKey: queryKeys.agency.dashboard.summary,
        }),
        qc.invalidateQueries({
          queryKey: queryKeys.agency.dashboard.activity,
        }),
      ]);
    },
    [qc],
  );

  const patchProject = useCallback(
    async (projectId: string, payload: UpdateProjectRequest) => {
      await projectsApi.updateProject(projectId, payload);
      await invalidateProject(projectId);
    },
    [invalidateProject],
  );

  const moveToTodo = useCallback(
    (projectId: string) => {
      void patchProject(projectId, {
        status: "our-todo",
        kanbanColumn: "planning",
      });
    },
    [patchProject],
  );

  const deleteProject = useCallback(
    (projectId: string) => {
      void deleteProjectMutation.mutateAsync(projectId);
    },
    [deleteProjectMutation],
  );

  const updateProjectStatus = useCallback(
    (projectId: string, status: ProjectStatus) => {
      void patchProject(projectId, { status });
    },
    [patchProject],
  );

  const moveKanban = useCallback(
    (projectId: string, column: KanbanColumn) => {
      void patchProject(projectId, {
        kanbanColumn: column,
        status: KANBAN_TO_STATUS[column],
      });
    },
    [patchProject],
  );

  const toggleChecklist = useCallback(
    (projectId: string, itemId: string, contributor: Contributor) => {
      const project = projects.find((p) => p.id === projectId);
      const item = project?.checklist.find((c) => c.id === itemId);
      if (!item) return;
      void (async () => {
        await projectsApi.updateChecklistItem(projectId, itemId, {
          completed: !item.completed,
          ...contributorPayload(contributor),
        });
        await invalidateProject(projectId);
      })();
    },
    [invalidateProject, projects],
  );

  const addNote = useCallback(
    (projectId: string, content: string, contributor: Contributor) => {
      void (async () => {
        await projectsApi.addProjectNote(projectId, {
          content,
          ...contributorPayload(contributor),
        });
        await invalidateProject(projectId);
      })();
    },
    [invalidateProject],
  );

  const createProject = useCallback(
    (input: CreateProjectInput): AgencyProject => {
      const optimistic: AgencyProject = {
        id: `temp-${Date.now()}`,
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
        checklist: [],
        timeline: [],
        projectNotes: [],
        attachments: [],
      };
      void createProjectMutation.mutateAsync(toCreateProjectRequest(input));
      return optimistic;
    },
    [createProjectMutation],
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
