import type {
  AgencyProject,
  ChecklistItem,
  KanbanColumn,
  ProjectAttachment,
  ProjectNote,
  ProjectStatus,
  TimelineEvent,
} from "@/types/agency";

export const DEFAULT_CHECKLIST_LABELS = [
  "Requirements Discussed",
  "Theme Selected",
  "Components Finalized",
  "Content Added",
  "Images Added",
  "Responsive Checked",
  "Backend Connected",
  "Client Review",
  "Final Approval",
  "Published",
  "Domain Connected",
  "Maintenance Started",
] as const;

export function createDefaultChecklist(
  completed: Partial<
    Record<string, { by: "Garvit" | "Aarush"; at: string }>
  > = {},
): ChecklistItem[] {
  return DEFAULT_CHECKLIST_LABELS.map((label, i) => {
    const done = completed[label];
    return {
      id: `chk-${i}`,
      label,
      completed: Boolean(done),
      completedBy: done?.by,
      completedAt: done?.at,
    };
  });
}

function timeline(
  projectId: string,
  events: Omit<TimelineEvent, "id" | "projectId">[],
): TimelineEvent[] {
  return events.map((e, i) => ({
    ...e,
    id: `tl-${projectId}-${i}`,
    projectId,
  }));
}

const MOCK_PROJECTS: AgencyProject[] = [
  {
    id: "proj-001",
    businessName: "Sunrise Café",
    industry: "cafe",
    status: "new-enquiry",
    source: "website",
    priority: "high",
    submittedAt: "2026-06-28T09:15:00Z",
    updatedAt: "2026-06-28T09:15:00Z",
    estimatedBudget: "₹45,000",
    contactName: "Priya Sharma",
    contactPhone: "+91 98765 43210",
    contactEmail: "priya@sunrisecafe.in",
    clientId: "client-001",
    draft: {
      themeId: "cafe",
      themeName: "Café",
      paletteId: "warm",
      industryId: "cafe",
      sections: ["hero.classic", "gallery.grid", "contact.map"],
      previewThumbnail: "/demo/cafe-hero.jpg",
    },
    checklist: createDefaultChecklist(),
    timeline: timeline("proj-001", [
      {
        type: "general",
        message: "Website enquiry submitted via Visualise Your Site",
        timestamp: "2026-06-28T09:15:00Z",
      },
    ]),
    projectNotes: [],
    attachments: [],
  },
  {
    id: "proj-002",
    businessName: "Iron Forge Gym",
    industry: "gym",
    status: "new-enquiry",
    source: "instagram",
    priority: "medium",
    submittedAt: "2026-06-27T14:30:00Z",
    updatedAt: "2026-06-27T14:30:00Z",
    estimatedBudget: "₹60,000",
    contactName: "Rahul Mehta",
    contactPhone: "+91 91234 56789",
    contactEmail: "rahul@ironforgegym.com",
    draft: {
      themeId: "gym",
      themeName: "Gym",
      paletteId: "blue",
      industryId: "gym",
      sections: ["hero.video", "cta.banner"],
    },
    checklist: createDefaultChecklist(),
    timeline: timeline("proj-002", [
      {
        type: "general",
        message: "Enquiry received from Instagram DM link",
        timestamp: "2026-06-27T14:30:00Z",
      },
    ]),
    projectNotes: [],
    attachments: [],
  },
  {
    id: "proj-003",
    businessName: "Bella Salon",
    industry: "salon",
    status: "our-todo",
    kanbanColumn: "planning",
    source: "referral",
    priority: "high",
    submittedAt: "2026-06-25T10:00:00Z",
    updatedAt: "2026-06-28T08:00:00Z",
    deadline: "2026-07-15",
    estimatedBudget: "₹55,000",
    contactName: "Anita Desai",
    contactPhone: "+91 99887 76655",
    contactEmail: "anita@bellasalon.in",
    clientId: "client-002",
    draft: {
      themeId: "salon",
      themeName: "Salon",
      paletteId: "rose",
      industryId: "salon",
      sections: ["hero.split", "gallery.grid", "contact.map"],
    },
    checklist: createDefaultChecklist({
      "Requirements Discussed": { by: "Garvit", at: "2026-06-26T11:00:00Z" },
      "Theme Selected": { by: "Aarush", at: "2026-06-27T15:30:00Z" },
    }),
    timeline: timeline("proj-003", [
      {
        type: "status",
        message: "Moved to Our To-Do",
        contributor: "Garvit",
        timestamp: "2026-06-26T10:00:00Z",
      },
      {
        type: "checklist",
        message: "Requirements Discussed completed",
        contributor: "Garvit",
        timestamp: "2026-06-26T11:00:00Z",
      },
      {
        type: "checklist",
        message: "Theme Selected completed",
        contributor: "Aarush",
        timestamp: "2026-06-27T15:30:00Z",
      },
    ]),
    projectNotes: [
      {
        id: "note-001",
        projectId: "proj-003",
        content:
          "Client prefers darker rose palette. Waiting for stylist photos.",
        contributor: "Garvit",
        createdAt: "2026-06-27T16:00:00Z",
      },
    ],
    attachments: [
      {
        id: "att-001",
        projectId: "proj-003",
        name: "brand-guide.pdf",
        type: "brand-guide",
        size: "2.4 MB",
        uploadedBy: "Garvit",
        uploadedAt: "2026-06-26T12:00:00Z",
      },
    ],
  },
  {
    id: "proj-004",
    businessName: "Spice Route Restaurant",
    industry: "restaurant",
    status: "development",
    kanbanColumn: "development",
    source: "website",
    priority: "medium",
    submittedAt: "2026-06-10T08:00:00Z",
    updatedAt: "2026-06-28T11:20:00Z",
    deadline: "2026-07-01",
    estimatedBudget: "₹75,000",
    contactName: "Vikram Patel",
    contactPhone: "+91 97654 32109",
    contactEmail: "vikram@spiceroute.in",
    clientId: "client-003",
    draft: {
      themeId: "restaurant",
      themeName: "Restaurant",
      paletteId: "rose",
      industryId: "restaurant",
      sections: ["hero.split", "gallery.carousel", "contact.map"],
    },
    checklist: createDefaultChecklist({
      "Requirements Discussed": { by: "Aarush", at: "2026-06-11T10:00:00Z" },
      "Theme Selected": { by: "Garvit", at: "2026-06-12T14:00:00Z" },
      "Components Finalized": { by: "Aarush", at: "2026-06-14T11:00:00Z" },
      "Content Added": { by: "Garvit", at: "2026-06-20T16:00:00Z" },
      "Images Added": { by: "Garvit", at: "2026-06-22T10:00:00Z" },
    }),
    timeline: timeline("proj-004", [
      {
        type: "integration",
        message: "Menu API integrated",
        contributor: "Aarush",
        timestamp: "2026-06-28T11:20:00Z",
      },
      {
        type: "checklist",
        message: "Gallery Section completed",
        contributor: "Garvit",
        timestamp: "2026-06-28T10:30:00Z",
      },
      {
        type: "preview",
        message: "Preview shared with client",
        contributor: "Garvit",
        timestamp: "2026-06-27T14:00:00Z",
      },
    ]),
    projectNotes: [
      {
        id: "note-002",
        projectId: "proj-004",
        content: "Needs Google Maps integration for two locations.",
        contributor: "Aarush",
        createdAt: "2026-06-25T09:00:00Z",
      },
    ],
    attachments: [
      {
        id: "att-002",
        projectId: "proj-004",
        name: "menu-photos.zip",
        type: "image",
        size: "18 MB",
        uploadedBy: "Garvit",
        uploadedAt: "2026-06-20T15:00:00Z",
      },
      {
        id: "att-003",
        projectId: "proj-004",
        name: "requirements.pdf",
        type: "pdf",
        size: "890 KB",
        uploadedBy: "Aarush",
        uploadedAt: "2026-06-11T09:00:00Z",
      },
    ],
  },
  {
    id: "proj-005",
    businessName: "Greenfield Clinic",
    industry: "clinic",
    status: "waiting-for-client",
    source: "walk-in",
    priority: "low",
    submittedAt: "2026-06-01T09:00:00Z",
    updatedAt: "2026-06-26T16:00:00Z",
    deadline: "2026-07-10",
    estimatedBudget: "₹50,000",
    contactName: "Dr. Meera Nair",
    contactPhone: "+91 94444 55566",
    contactEmail: "dr.meera@greenfieldclinic.com",
    clientId: "client-004",
    checklist: createDefaultChecklist({
      "Requirements Discussed": { by: "Garvit", at: "2026-06-02T10:00:00Z" },
      "Theme Selected": { by: "Aarush", at: "2026-06-03T11:00:00Z" },
      "Components Finalized": { by: "Garvit", at: "2026-06-05T14:00:00Z" },
      "Content Added": { by: "Aarush", at: "2026-06-15T10:00:00Z" },
      "Images Added": { by: "Garvit", at: "2026-06-18T11:00:00Z" },
      "Responsive Checked": { by: "Aarush", at: "2026-06-22T15:00:00Z" },
      "Client Review": { by: "Garvit", at: "2026-06-25T10:00:00Z" },
    }),
    timeline: timeline("proj-005", [
      {
        type: "client",
        message: "Client requested colour changes to header",
        timestamp: "2026-06-26T16:00:00Z",
      },
      {
        type: "preview",
        message: "Preview shared for client review",
        contributor: "Garvit",
        timestamp: "2026-06-25T10:00:00Z",
      },
    ]),
    projectNotes: [],
    attachments: [],
  },
  {
    id: "proj-006",
    businessName: "Harbor Coffee Co.",
    industry: "cafe",
    status: "completed",
    source: "returning-client",
    priority: "low",
    submittedAt: "2026-05-01T08:00:00Z",
    updatedAt: "2026-06-15T12:00:00Z",
    estimatedBudget: "₹40,000",
    contactName: "James Wilson",
    contactPhone: "+91 98700 11223",
    contactEmail: "james@harborcoffee.in",
    clientId: "client-005",
    checklist: createDefaultChecklist(
      Object.fromEntries(
        DEFAULT_CHECKLIST_LABELS.map((label, i) => [
          label,
          {
            by: (i % 2 === 0 ? "Garvit" : "Aarush") as "Garvit" | "Aarush",
            at: `2026-06-${String(10 + i).padStart(2, "0")}T10:00:00Z`,
          },
        ]),
      ),
    ),
    timeline: timeline("proj-006", [
      {
        type: "status",
        message: "Project published and handed over",
        contributor: "Aarush",
        timestamp: "2026-06-15T12:00:00Z",
      },
    ]),
    projectNotes: [],
    attachments: [],
  },
  {
    id: "proj-007",
    businessName: "Atelier Salon",
    industry: "salon",
    status: "maintenance",
    source: "referral",
    priority: "low",
    submittedAt: "2026-03-01T08:00:00Z",
    updatedAt: "2026-06-28T07:00:00Z",
    estimatedBudget: "₹8,000/mo",
    contactName: "Sonia Kapoor",
    contactPhone: "+91 98123 45678",
    contactEmail: "sonia@ateliersalon.in",
    clientId: "client-006",
    checklist: createDefaultChecklist(),
    timeline: timeline("proj-007", [
      {
        type: "general",
        message: "Monthly maintenance check completed",
        contributor: "Garvit",
        timestamp: "2026-06-28T07:00:00Z",
      },
    ]),
    projectNotes: [],
    attachments: [],
  },
];

export async function fetchProjects(): Promise<AgencyProject[]> {
  await delay(200);
  return structuredClone(MOCK_PROJECTS);
}

export async function fetchProjectById(
  id: string,
): Promise<AgencyProject | null> {
  await delay(150);
  const project = MOCK_PROJECTS.find((p) => p.id === id);
  return project ? structuredClone(project) : null;
}

export async function fetchProjectsByStatus(
  status: ProjectStatus | ProjectStatus[],
): Promise<AgencyProject[]> {
  await delay(150);
  const statuses = Array.isArray(status) ? status : [status];
  return structuredClone(
    MOCK_PROJECTS.filter((p) => statuses.includes(p.status)),
  );
}

export async function fetchKanbanProjects(): Promise<AgencyProject[]> {
  await delay(150);
  const todoStatuses: ProjectStatus[] = [
    "our-todo",
    "planning",
    "design",
    "development",
    "review",
    "ready-to-publish",
  ];
  return structuredClone(
    MOCK_PROJECTS.filter(
      (p) => todoStatuses.includes(p.status) || p.kanbanColumn,
    ),
  );
}

export function getKanbanColumnForStatus(
  status: ProjectStatus,
): KanbanColumn | undefined {
  const map: Partial<Record<ProjectStatus, KanbanColumn>> = {
    planning: "planning",
    design: "design",
    development: "development",
    review: "review",
    "ready-to-publish": "publishing",
    maintenance: "maintenance",
    "our-todo": "planning",
  };
  return map[status];
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export { MOCK_PROJECTS };
