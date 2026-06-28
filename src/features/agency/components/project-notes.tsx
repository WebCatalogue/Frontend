"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui";
import { ContributorAvatar } from "./contributor-avatar";
import type { Contributor, ProjectNote } from "@/types/agency";

interface ProjectNotesProps {
  notes: ProjectNote[];
  onAdd: (content: string, contributor: Contributor) => void;
}

export function ProjectNotes({ notes, onAdd }: ProjectNotesProps) {
  const [content, setContent] = useState("");
  const [contributor, setContributor] = useState<Contributor>("Garvit");

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Textarea
          placeholder="Add an internal note… e.g. Client prefers darker colors."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-2">
            {(["Garvit", "Aarush"] as Contributor[]).map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setContributor(name)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  contributor === name
                    ? "border-accent bg-accent-muted"
                    : "border-border"
                }`}
              >
                <ContributorAvatar name={name} />
                {name}
              </button>
            ))}
          </div>
          <Button
            size="sm"
            disabled={!content.trim()}
            onClick={() => {
              onAdd(content.trim(), contributor);
              setContent("");
            }}
          >
            Add note
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="surface-2 border-border rounded-[var(--radius-lg)] border p-4"
          >
            <p className="type-body-sm whitespace-pre-wrap">{note.content}</p>
            <p className="type-label text-foreground-subtle mt-3 flex items-center gap-2">
              <ContributorAvatar name={note.contributor} />
              {note.contributor} · {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
        {notes.length === 0 && (
          <p className="type-body-sm text-foreground-muted py-6 text-center">
            No notes yet. Add internal context for the team.
          </p>
        )}
      </div>
    </div>
  );
}
