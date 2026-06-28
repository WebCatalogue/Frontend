import * as pagesApi from "@/lib/api/pages";
import { updateWebsite } from "@/lib/api/website";
import { buildSectionPayloads } from "./draft-utils";
import type { WizardDraftSettings } from "./types";

export async function materializeWizardDraft(
  websiteId: string,
  settings: WizardDraftSettings,
): Promise<string> {
  await updateWebsite(websiteId, {
    themeId: settings.themeId,
    status: "draft",
  });

  const pages = await pagesApi.listWebsitePages(websiteId);
  let page =
    pages.find((p) => p.title === "Home" || p.slug === "home") ?? pages[0];

  if (!page) {
    page = await pagesApi.createWebsitePage(websiteId, {
      title: "Home",
      slug: "home",
    });
  }

  const existingSections = await pagesApi.listPageSections(page.id);

  if (existingSections.length === 0) {
    const payloads = buildSectionPayloads(settings);
    for (const payload of payloads) {
      await pagesApi.createPageSection(page.id, payload);
    }
  }

  return page.id;
}
