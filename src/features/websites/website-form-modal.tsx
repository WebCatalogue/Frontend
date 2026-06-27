"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import type { CreateWebsiteRequest } from "@/types/api";

interface WebsiteFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: CreateWebsiteRequest) => Promise<void>;
  isLoading?: boolean;
}

export function WebsiteFormModal({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: WebsiteFormModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [domain, setDomain] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit({
      name: name.trim(),
      slug: slug.trim() || undefined,
      domain: domain.trim() || undefined,
    });
    setName("");
    setSlug("");
    setDomain("");
    onOpenChange(false);
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>Create website</ModalTitle>
            <ModalDescription>
              Launch a new website for this business.
            </ModalDescription>
          </ModalHeader>

          <div className="space-y-4 py-4">
            <Input
              label="Website name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Harbor Coffee Website"
            />
            <Input
              label="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="harbor-coffee"
              hint="Used in preview URLs"
            />
            <Input
              label="Domain (optional)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="harborcoffee.com"
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
              Create website
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
