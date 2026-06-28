import type { AgencyProject, CreateProjectInput } from "@/types/agency";
import { createDefaultChecklist } from "@/services/mock-projects";

const STORAGE_KEY = "bks_pending_enquiries";

function readRaw(): AgencyProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AgencyProject[];
  } catch {
    return [];
  }
}

function writeRaw(projects: AgencyProject[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getStoredEnquiries(): AgencyProject[] {
  return readRaw();
}

export function submitPublicEnquiry(
  input: CreateProjectInput & { themeName?: string; themeId?: string },
): AgencyProject {
  const id = `enq-${Date.now()}`;
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
    draft:
      input.themeId && input.themeName
        ? {
            themeId: input.themeId,
            themeName: input.themeName,
            paletteId: "default",
            industryId: input.industry,
            sections: [],
          }
        : undefined,
    checklist: createDefaultChecklist(),
    timeline: [
      {
        id: `tl-${id}`,
        projectId: id,
        type: "general",
        message: "Enquiry submitted via website",
        timestamp: new Date().toISOString(),
      },
    ],
    projectNotes: [],
    attachments: [],
  };

  const existing = readRaw();
  writeRaw([project, ...existing]);
  return project;
}

export function clearStoredEnquiry(id: string) {
  writeRaw(readRaw().filter((p) => p.id !== id));
}
