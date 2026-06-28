"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui";
import type { CreateProjectInput, ProjectSource } from "@/types/agency";

const SOURCES: { value: ProjectSource; label: string }[] = [
  { value: "website", label: "Website" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "instagram", label: "Instagram" },
  { value: "referral", label: "Referral" },
  { value: "walk-in", label: "Walk-in" },
  { value: "returning-client", label: "Returning Client" },
  { value: "phone-call", label: "Phone Call" },
];

interface NewProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: CreateProjectInput) => void;
}

export function NewProjectModal({
  open,
  onOpenChange,
  onSubmit,
}: NewProjectModalProps) {
  const [form, setForm] = useState<CreateProjectInput>({
    businessName: "",
    industry: "",
    source: "walk-in",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    notes: "",
    estimatedBudget: "",
    deadline: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
    onOpenChange(false);
    setForm({
      businessName: "",
      industry: "",
      source: "walk-in",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      notes: "",
      estimatedBudget: "",
      deadline: "",
    });
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>New Project</ModalTitle>
          </ModalHeader>
          <div className="space-y-4 py-4">
            <Input
              label="Business name"
              value={form.businessName}
              onChange={(e) =>
                setForm((f) => ({ ...f, businessName: e.target.value }))
              }
              required
            />
            <Input
              label="Industry"
              value={form.industry}
              onChange={(e) =>
                setForm((f) => ({ ...f, industry: e.target.value }))
              }
              placeholder="Café, Salon, Gym…"
              required
            />
            <div>
              <label className="type-body-sm mb-2 block font-medium">
                Source
              </label>
              <select
                value={form.source}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    source: e.target.value as ProjectSource,
                  }))
                }
                className="border-input bg-surface-1 h-11 w-full rounded-[var(--radius-lg)] border px-3 text-sm"
              >
                {SOURCES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Contact name"
              value={form.contactName}
              onChange={(e) =>
                setForm((f) => ({ ...f, contactName: e.target.value }))
              }
              required
            />
            <Input
              label="Phone"
              value={form.contactPhone}
              onChange={(e) =>
                setForm((f) => ({ ...f, contactPhone: e.target.value }))
              }
            />
            <Input
              label="Email"
              type="email"
              value={form.contactEmail}
              onChange={(e) =>
                setForm((f) => ({ ...f, contactEmail: e.target.value }))
              }
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Budget"
                value={form.estimatedBudget ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, estimatedBudget: e.target.value }))
                }
                placeholder="₹50,000"
              />
              <Input
                label="Deadline"
                type="date"
                value={form.deadline ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, deadline: e.target.value }))
                }
              />
            </div>
            <Textarea
              label="Notes"
              value={form.notes ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, notes: e.target.value }))
              }
              rows={3}
            />
          </div>
          <ModalFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
