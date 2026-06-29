"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as calendarApi from "@/lib/api/calendar";
import * as clientsApi from "@/lib/api/clients";
import * as dashboardApi from "@/lib/api/dashboard";
import * as enquiriesApi from "@/lib/api/enquiries";
import * as notificationsApi from "@/lib/api/notifications";
import * as projectsApi from "@/lib/api/projects";
import * as settingsApi from "@/lib/api/settings";
import { queryKeys } from "@/lib/query/keys";
import { useAuth } from "@/providers/auth-provider";
import type {
  CreateEnquiryRequest,
  CreateProjectAttachmentRequest,
  CreateProjectNoteRequest,
  CreateProjectRequest,
  UpdateChecklistItemRequest,
  UpdateProjectRequest,
} from "@/types/api";
import type { Contributor, CreateProjectInput } from "@/types/agency";

function useAgencyEnabled() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

export function useProjects() {
  const enabled = useAgencyEnabled();
  return useQuery({
    queryKey: queryKeys.agency.projects.all,
    queryFn: projectsApi.listProjects,
    enabled,
  });
}

export function useProjectDetail(projectId: string) {
  const enabled = useAgencyEnabled();
  return useQuery({
    queryKey: queryKeys.agency.projects.detail(projectId),
    queryFn: () => projectsApi.getProjectDetail(projectId),
    enabled: enabled && Boolean(projectId),
  });
}

export function useClients() {
  const enabled = useAgencyEnabled();
  return useQuery({
    queryKey: queryKeys.agency.clients.all,
    queryFn: clientsApi.listClients,
    enabled,
  });
}

export function useClient(clientId: string) {
  const enabled = useAgencyEnabled();
  return useQuery({
    queryKey: queryKeys.agency.clients.detail(clientId),
    queryFn: () => clientsApi.getClient(clientId),
    enabled: enabled && Boolean(clientId),
  });
}

export function useEnquiries() {
  const enabled = useAgencyEnabled();
  return useQuery({
    queryKey: queryKeys.agency.enquiries,
    queryFn: enquiriesApi.listEnquiries,
    enabled,
  });
}

export function useDashboardSummary() {
  const enabled = useAgencyEnabled();
  return useQuery({
    queryKey: queryKeys.agency.dashboard.summary,
    queryFn: dashboardApi.getDashboardSummary,
    enabled,
  });
}

export function useDashboardActivity() {
  const enabled = useAgencyEnabled();
  return useQuery({
    queryKey: queryKeys.agency.dashboard.activity,
    queryFn: dashboardApi.getDashboardActivity,
    enabled,
  });
}

export function useDashboardAnalytics() {
  const enabled = useAgencyEnabled();
  return useQuery({
    queryKey: queryKeys.agency.dashboard.analytics,
    queryFn: dashboardApi.getDashboardAnalytics,
    enabled,
  });
}

export function useCalendarEvents() {
  const enabled = useAgencyEnabled();
  return useQuery({
    queryKey: queryKeys.agency.calendar,
    queryFn: calendarApi.listCalendarEvents,
    enabled,
  });
}

export function useNotifications() {
  const enabled = useAgencyEnabled();
  return useQuery({
    queryKey: queryKeys.agency.notifications,
    queryFn: notificationsApi.listNotifications,
    enabled,
  });
}

export function useSettings() {
  const enabled = useAgencyEnabled();
  return useQuery({
    queryKey: queryKeys.agency.settings,
    queryFn: settingsApi.getSettings,
    enabled,
  });
}

export function useSubmitEnquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateEnquiryRequest) =>
      enquiriesApi.submitEnquiry(payload),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.agency.enquiries });
      void qc.invalidateQueries({ queryKey: queryKeys.agency.projects.all });
      void qc.invalidateQueries({
        queryKey: queryKeys.agency.dashboard.summary,
      });
    },
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProjectRequest) =>
      projectsApi.createProject(payload),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.agency.projects.all });
      void qc.invalidateQueries({
        queryKey: queryKeys.agency.dashboard.summary,
      });
    },
  });
}

export function useUpdateProject(projectId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProjectRequest) =>
      projectsApi.updateProject(projectId, payload),
    onSuccess: (project) => {
      qc.setQueryData(queryKeys.agency.projects.detail(projectId), project);
      void qc.invalidateQueries({ queryKey: queryKeys.agency.projects.all });
      void qc.invalidateQueries({
        queryKey: queryKeys.agency.dashboard.summary,
      });
      void qc.invalidateQueries({
        queryKey: queryKeys.agency.dashboard.activity,
      });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => projectsApi.deleteProject(projectId),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.agency.projects.all });
      void qc.invalidateQueries({ queryKey: queryKeys.agency.enquiries });
      void qc.invalidateQueries({
        queryKey: queryKeys.agency.dashboard.summary,
      });
    },
  });
}

export function useConvertEnquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (enquiryId: string) =>
      projectsApi.convertEnquiryToProject(enquiryId),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.agency.enquiries });
      void qc.invalidateQueries({ queryKey: queryKeys.agency.projects.all });
    },
  });
}

export function useToggleChecklist(projectId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      itemId,
      payload,
    }: {
      itemId: string;
      payload: UpdateChecklistItemRequest;
    }) => projectsApi.updateChecklistItem(projectId, itemId, payload),
    onSuccess: (project) => {
      qc.setQueryData(queryKeys.agency.projects.detail(projectId), project);
      void qc.invalidateQueries({ queryKey: queryKeys.agency.projects.all });
      void qc.invalidateQueries({
        queryKey: queryKeys.agency.dashboard.activity,
      });
    },
  });
}

export function useAddProjectNote(projectId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProjectNoteRequest) =>
      projectsApi.addProjectNote(projectId, payload),
    onSuccess: (project) => {
      qc.setQueryData(queryKeys.agency.projects.detail(projectId), project);
      void qc.invalidateQueries({
        queryKey: queryKeys.agency.dashboard.activity,
      });
    },
  });
}

export function useAddProjectAttachment(projectId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProjectAttachmentRequest) =>
      projectsApi.addProjectAttachment(projectId, payload),
    onSuccess: (project) => {
      qc.setQueryData(queryKeys.agency.projects.detail(projectId), project);
    },
  });
}

export function useDeleteProjectAttachment(projectId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (attachmentId: string) =>
      projectsApi.deleteProjectAttachment(projectId, attachmentId),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.agency.projects.detail(projectId),
      });
    },
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: settingsApi.updateSettings,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.agency.settings });
    },
  });
}

export function toCreateProjectRequest(
  input: CreateProjectInput,
): CreateProjectRequest {
  return {
    businessName: input.businessName,
    industry: input.industry,
    source: input.source,
    contactName: input.contactName,
    contactPhone: input.contactPhone,
    contactEmail: input.contactEmail,
    notes: input.notes,
    estimatedBudget: input.estimatedBudget,
    deadline: input.deadline,
    priority: input.priority,
  };
}

export function contributorPayload(contributor: Contributor) {
  return { contributor };
}
