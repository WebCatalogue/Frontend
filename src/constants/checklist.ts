import type { ChecklistItem } from "@/types/agency";

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
