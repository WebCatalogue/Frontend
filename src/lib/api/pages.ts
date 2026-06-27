import { apiClient, unwrapApiData } from "@/lib/api/client";
import type {
  CreatePageRequest,
  CreateSectionRequest,
  Page,
  PaginatedList,
  Section,
  UpdatePageRequest,
  UpdateSectionRequest,
} from "@/types/api";

function normalizePageList(payload: unknown): Page[] {
  const data = unwrapApiData<Page[] | PaginatedList<Page> | Page>(payload);

  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && "items" in data) {
    return (data as PaginatedList<Page>).items ?? [];
  }
  if (data && typeof data === "object" && "id" in data) {
    return [data as Page];
  }
  return [];
}

function normalizeSectionList(payload: unknown): Section[] {
  const data = unwrapApiData<Section[] | PaginatedList<Section> | Section>(
    payload,
  );

  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && "items" in data) {
    return (data as PaginatedList<Section>).items ?? [];
  }
  if (data && typeof data === "object" && "id" in data) {
    return [data as Section];
  }
  return [];
}

export async function listWebsitePages(websiteId: string): Promise<Page[]> {
  const { data } = await apiClient.get(`/websites/${websiteId}/pages`);
  return normalizePageList(data);
}

export async function createWebsitePage(
  websiteId: string,
  payload: CreatePageRequest,
): Promise<Page> {
  const { data } = await apiClient.post(
    `/websites/${websiteId}/pages`,
    payload,
  );
  return unwrapApiData<Page>(data);
}

export async function getPage(pageId: string): Promise<Page> {
  const { data } = await apiClient.get(`/pages/${pageId}`);
  return unwrapApiData<Page>(data);
}

export async function updatePage(
  pageId: string,
  payload: UpdatePageRequest,
): Promise<Page> {
  const { data } = await apiClient.patch(`/pages/${pageId}`, payload);
  return unwrapApiData<Page>(data);
}

export async function deletePage(pageId: string): Promise<void> {
  await apiClient.delete(`/pages/${pageId}`);
}

export async function listPageSections(pageId: string): Promise<Section[]> {
  const { data } = await apiClient.get(`/pages/${pageId}/sections`);
  return normalizeSectionList(data);
}

export async function createPageSection(
  pageId: string,
  payload: CreateSectionRequest,
): Promise<Section> {
  const { data } = await apiClient.post(`/pages/${pageId}/sections`, payload);
  return unwrapApiData<Section>(data);
}

export async function updateSection(
  sectionId: string,
  payload: UpdateSectionRequest,
): Promise<Section> {
  const { data } = await apiClient.patch(`/sections/${sectionId}`, payload);
  return unwrapApiData<Section>(data);
}

export async function deleteSection(sectionId: string): Promise<void> {
  await apiClient.delete(`/sections/${sectionId}`);
}

export async function reorderPageSections(
  pageId: string,
  sectionIds: string[],
): Promise<Section[]> {
  const { data } = await apiClient.put(`/pages/${pageId}/sections/reorder`, {
    sectionIds,
  });
  return normalizeSectionList(data);
}
