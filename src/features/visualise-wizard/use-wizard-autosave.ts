"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateWebsiteConfig } from "@/lib/api/website";
import { queryKeys } from "@/lib/query/keys";
import { getErrorMessage } from "@/lib/errors/api-error";
import { mergeWizardSettings } from "./draft-utils";
import type { WizardDraftSettings } from "./types";

interface UseWizardAutosaveOptions {
  websiteId: string | null;
  settings: WizardDraftSettings | null;
  enabled?: boolean;
}

export function useWizardAutosave({
  websiteId,
  settings,
  enabled = true,
}: UseWizardAutosaveOptions) {
  const qc = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | undefined>(
    settings?.lastSavedAt,
  );
  const [error, setError] = useState<string | null>(null);
  const pendingRef = useRef<WizardDraftSettings | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flush = useCallback(async () => {
    if (!websiteId || !pendingRef.current || !enabled) return;

    const payload = pendingRef.current;
    pendingRef.current = null;
    setIsSaving(true);
    setError(null);

    try {
      await updateWebsiteConfig(websiteId, {
        themeId: payload.themeId,
        settings: {
          paletteId: payload.paletteId,
          wizard: payload,
        },
      });
      setLastSavedAt(payload.lastSavedAt);
      setIsDirty(false);
      void qc.invalidateQueries({
        queryKey: queryKeys.websites.config(websiteId),
      });
    } catch (err) {
      setError(getErrorMessage(err));
      pendingRef.current = payload;
      setIsDirty(true);
    } finally {
      setIsSaving(false);
    }
  }, [websiteId, enabled, qc]);

  const save = useCallback(
    (patch: Partial<WizardDraftSettings>, base?: WizardDraftSettings) => {
      if (!settings && !base) return;
      const merged = mergeWizardSettings(base ?? settings!, patch);
      pendingRef.current = merged;
      setIsDirty(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        void flush();
      }, 400);
    },
    [settings, flush],
  );

  const saveImmediate = useCallback(
    async (patch: Partial<WizardDraftSettings>, base?: WizardDraftSettings) => {
      if (!settings && !base) return;
      const merged = mergeWizardSettings(base ?? settings!, patch);
      pendingRef.current = merged;
      if (timerRef.current) clearTimeout(timerRef.current);
      await flush();
    },
    [settings, flush],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (pendingRef.current && websiteId) {
        void updateWebsiteConfig(websiteId, {
          themeId: pendingRef.current.themeId,
          settings: {
            paletteId: pendingRef.current.paletteId,
            wizard: pendingRef.current,
          },
        });
      }
    };
  }, [websiteId]);

  useEffect(() => {
    if (settings?.lastSavedAt) setLastSavedAt(settings.lastSavedAt);
  }, [settings?.lastSavedAt]);

  return {
    save,
    saveImmediate,
    flush,
    isSaving,
    isDirty,
    lastSavedAt,
    error,
  };
}
