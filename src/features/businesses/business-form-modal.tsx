"use client";

import { useState } from "react";
import { Button, Input, Textarea } from "@/components/ui";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import type { Business } from "@/types/api";

interface BusinessFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  business?: Business | null;
  onSubmit: (payload: {
    name: string;
    industry?: string;
    description?: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

export function BusinessFormModal({
  open,
  onOpenChange,
  business,
  onSubmit,
  isLoading = false,
}: BusinessFormModalProps) {
  const [name, setName] = useState(business?.name ?? "");
  const [industry, setIndustry] = useState(business?.industry ?? "");
  const [description, setDescription] = useState(business?.description ?? "");

  const isEdit = Boolean(business);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit({
      name: name.trim(),
      industry: industry.trim() || undefined,
      description: description.trim() || undefined,
    });
    onOpenChange(false);
  }

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          setName(business?.name ?? "");
          setIndustry(business?.industry ?? "");
          setDescription(business?.description ?? "");
        }
        onOpenChange(next);
      }}
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>
              {isEdit ? "Edit business" : "Create business"}
            </ModalTitle>
            <ModalDescription>
              {isEdit
                ? "Update your business details."
                : "Add a new business to your workspace."}
            </ModalDescription>
          </ModalHeader>

          <div className="space-y-4 py-4">
            <Input
              label="Business name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Harbor Coffee Co."
            />
            <Input
              label="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Café, Salon, Clinic…"
            />
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the business"
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
            <Button type="submit" isLoading={isLoading} disabled={!name.trim()}>
              {isEdit ? "Save changes" : "Create business"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
