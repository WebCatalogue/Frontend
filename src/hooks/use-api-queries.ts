"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as authApi from "@/lib/api/auth";
import * as businessApi from "@/lib/api/business";
import * as builderApi from "@/lib/api/builder";
import * as businessDataApi from "@/lib/api/business-data";
import * as mediaApi from "@/lib/api/media";
import * as registriesApi from "@/lib/api/registries";
import * as navigationApi from "@/lib/api/navigation";
import * as pagesApi from "@/lib/api/pages";
import * as seoApi from "@/lib/api/seo";
import * as tenantApi from "@/lib/api/tenant";
import * as websiteApi from "@/lib/api/website";
import { queryKeys } from "@/lib/query/keys";
import { useAuth } from "@/providers/auth-provider";
import type {
  CreateBusinessRequest,
  CreatePageRequest,
  CreateSectionRequest,
  CreateWebsiteRequest,
  UpdateBusinessRequest,
  UpdatePageRequest,
  UpdateSectionRequest,
  UpdateWebsiteConfigRequest,
  UpdateWebsiteRequest,
  WebsiteNavigation,
  WebsiteSeo,
} from "@/types/api";
import type { BusinessDataCollection } from "@/types/api";

export function useCurrentUser() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authApi.getCurrentUser,
    enabled: isAuthenticated,
  });
}

export function useCurrentTenant() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.tenant.current,
    queryFn: tenantApi.getCurrentTenant,
    enabled: isAuthenticated,
  });
}

export function useBusinesses() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.businesses.all,
    queryFn: businessApi.listBusinesses,
    enabled: isAuthenticated,
  });
}

export function useBusiness(businessId: string) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.businesses.detail(businessId),
    queryFn: () => businessApi.getBusiness(businessId),
    enabled: isAuthenticated && Boolean(businessId),
  });
}

export function useBusinessWebsites(businessId: string) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.businesses.websites(businessId),
    queryFn: () => websiteApi.listBusinessWebsites(businessId),
    enabled: isAuthenticated && Boolean(businessId),
  });
}

export function useWebsite(websiteId: string) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.websites.detail(websiteId),
    queryFn: () => websiteApi.getWebsite(websiteId),
    enabled: isAuthenticated && Boolean(websiteId),
  });
}

export function useWebsiteConfig(websiteId: string) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.websites.config(websiteId),
    queryFn: () => websiteApi.getWebsiteConfig(websiteId),
    enabled: isAuthenticated && Boolean(websiteId),
  });
}

export function useWebsitePages(websiteId: string) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.websites.pages(websiteId),
    queryFn: () => pagesApi.listWebsitePages(websiteId),
    enabled: isAuthenticated && Boolean(websiteId),
  });
}

export function useWebsiteNavigation(websiteId: string) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.websites.navigation(websiteId),
    queryFn: () => navigationApi.getWebsiteNavigation(websiteId),
    enabled: isAuthenticated && Boolean(websiteId),
  });
}

export function useWebsiteSeo(websiteId: string) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.websites.seo(websiteId),
    queryFn: () => seoApi.getWebsiteSeo(websiteId),
    enabled: isAuthenticated && Boolean(websiteId),
  });
}

export function usePublishedWebsite(
  tenantSlug: string,
  websiteSlug: string,
  enabled = true,
) {
  return useQuery({
    queryKey: queryKeys.websites.published(tenantSlug, websiteSlug),
    queryFn: () => websiteApi.getPublishedWebsite(websiteSlug, tenantSlug),
    enabled: enabled && Boolean(tenantSlug && websiteSlug),
    staleTime: 30_000,
  });
}

export function usePage(pageId: string) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.pages.detail(pageId),
    queryFn: () => pagesApi.getPage(pageId),
    enabled: isAuthenticated && Boolean(pageId),
  });
}

export function usePageSections(pageId: string) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.pages.sections(pageId),
    queryFn: () => pagesApi.listPageSections(pageId),
    enabled: isAuthenticated && Boolean(pageId),
  });
}

export function useComponentRegistry() {
  return useQuery({
    queryKey: queryKeys.builder.registry,
    queryFn: builderApi.getComponentRegistry,
    staleTime: 5 * 60_000,
  });
}

export function useComponentSchema(componentKey: string) {
  return useQuery({
    queryKey: queryKeys.builder.component(componentKey),
    queryFn: () => builderApi.getComponentSchema(componentKey),
    enabled: Boolean(componentKey),
    staleTime: 5 * 60_000,
  });
}

export function usePlatformRegistries() {
  return useQuery({
    queryKey: queryKeys.builder.registries,
    queryFn: registriesApi.getUnifiedRegistries,
    staleTime: 5 * 60_000,
  });
}

export function useMediaLibrary(search?: string) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: [...queryKeys.media.all, search ?? ""] as const,
    queryFn: () => mediaApi.listMedia({ search }),
    enabled: isAuthenticated,
    retry: false,
  });
}

export function useBusinessDataCollection(
  websiteId: string,
  collection: BusinessDataCollection,
) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.businessData.collection(websiteId, collection),
    queryFn: () => businessDataApi.listBusinessData(websiteId, collection),
    enabled: isAuthenticated && Boolean(websiteId),
    retry: false,
  });
}

export function useMedia(mediaId: string) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.media.detail(mediaId),
    queryFn: () => mediaApi.getMedia(mediaId),
    enabled: isAuthenticated && Boolean(mediaId),
  });
}

// ── Mutations ─────────────────────────────────────────────

export function useCreateBusiness() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBusinessRequest) =>
      businessApi.createBusiness(payload),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.businesses.all });
    },
  });
}

export function useUpdateBusiness(businessId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateBusinessRequest) =>
      businessApi.updateBusiness(businessId, payload),
    onMutate: async (payload) => {
      await qc.cancelQueries({
        queryKey: queryKeys.businesses.detail(businessId),
      });
      const previous = qc.getQueryData(queryKeys.businesses.detail(businessId));
      qc.setQueryData(
        queryKeys.businesses.detail(businessId),
        (old: unknown) =>
          old && typeof old === "object" ? { ...old, ...payload } : old,
      );
      return { previous };
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        qc.setQueryData(
          queryKeys.businesses.detail(businessId),
          context.previous,
        );
      }
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.businesses.all });
      void qc.invalidateQueries({
        queryKey: queryKeys.businesses.detail(businessId),
      });
    },
  });
}

export function useDeleteBusiness() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (businessId: string) => businessApi.deleteBusiness(businessId),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.businesses.all });
    },
  });
}

export function useCreateWebsite(businessId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateWebsiteRequest) =>
      websiteApi.createBusinessWebsite(businessId, payload),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.businesses.websites(businessId),
      });
    },
  });
}

export function useUpdateWebsite(websiteId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateWebsiteRequest) =>
      websiteApi.updateWebsite(websiteId, payload),
    onSettled: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.websites.detail(websiteId),
      });
    },
  });
}

export function useDeleteWebsite(businessId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (websiteId: string) => websiteApi.deleteWebsite(websiteId),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.businesses.websites(businessId),
      });
    },
  });
}

export function usePublishWebsite(websiteId: string, businessId?: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => websiteApi.publishWebsite(websiteId),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.websites.detail(websiteId),
      });
      if (businessId) {
        void qc.invalidateQueries({
          queryKey: queryKeys.businesses.websites(businessId),
        });
      }
    },
  });
}

export function useArchiveWebsite(websiteId: string, businessId?: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => websiteApi.archiveWebsite(websiteId),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.websites.detail(websiteId),
      });
      if (businessId) {
        void qc.invalidateQueries({
          queryKey: queryKeys.businesses.websites(businessId),
        });
      }
    },
  });
}

export function useCreatePage(websiteId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePageRequest) =>
      pagesApi.createWebsitePage(websiteId, payload),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.websites.pages(websiteId),
      });
    },
  });
}

export function useUpdatePage(pageId: string, websiteId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdatePageRequest) =>
      pagesApi.updatePage(pageId, payload),
    onSettled: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.websites.pages(websiteId),
      });
      void qc.invalidateQueries({ queryKey: queryKeys.pages.detail(pageId) });
    },
  });
}

export function useDeletePage(websiteId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (pageId: string) => pagesApi.deletePage(pageId),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.websites.pages(websiteId),
      });
    },
  });
}

export function useCreateSection(pageId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSectionRequest) =>
      pagesApi.createPageSection(pageId, payload),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.pages.sections(pageId),
      });
    },
  });
}

export function useUpdateSection(pageId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      sectionId,
      payload,
    }: {
      sectionId: string;
      payload: UpdateSectionRequest;
    }) => pagesApi.updateSection(sectionId, payload),
    onSettled: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.pages.sections(pageId),
      });
    },
  });
}

export function useDeleteSection(pageId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (sectionId: string) => pagesApi.deleteSection(sectionId),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.pages.sections(pageId),
      });
    },
  });
}

export function useReorderSections(pageId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (sectionIds: string[]) =>
      pagesApi.reorderPageSections(pageId, sectionIds),
    onMutate: async (sectionIds) => {
      await qc.cancelQueries({ queryKey: queryKeys.pages.sections(pageId) });
      const previous = qc.getQueryData(queryKeys.pages.sections(pageId));
      qc.setQueryData(
        queryKeys.pages.sections(pageId),
        (old: { id: string }[] | undefined) => {
          if (!old) return old;
          const map = new Map(old.map((s) => [s.id, s]));
          return sectionIds
            .map((id, index) => {
              const section = map.get(id);
              return section ? { ...section, sortOrder: index } : null;
            })
            .filter(Boolean);
        },
      );
      return { previous };
    },
    onError: (_err, _ids, context) => {
      if (context?.previous) {
        qc.setQueryData(queryKeys.pages.sections(pageId), context.previous);
      }
    },
    onSettled: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.pages.sections(pageId),
      });
    },
  });
}

export function useUpdateNavigation(websiteId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: WebsiteNavigation) =>
      navigationApi.updateWebsiteNavigation(websiteId, payload),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.websites.navigation(websiteId),
      });
    },
  });
}

export function useUpdateSeo(websiteId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: WebsiteSeo) =>
      seoApi.updateWebsiteSeo(websiteId, payload),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.websites.seo(websiteId),
      });
    },
  });
}

export function useUpdateWebsiteConfig(websiteId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateWebsiteConfigRequest) =>
      websiteApi.updateWebsiteConfig(websiteId, payload),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.websites.config(websiteId),
      });
    },
  });
}

export function useCreateBusinessDataItem(
  websiteId: string,
  collection: BusinessDataCollection,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      businessDataApi.createBusinessDataItem(websiteId, collection, payload),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.businessData.collection(websiteId, collection),
      });
    },
  });
}

export function useUpdateBusinessDataItem(
  websiteId: string,
  collection: BusinessDataCollection,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      itemId,
      payload,
    }: {
      itemId: string;
      payload: Record<string, unknown>;
    }) =>
      businessDataApi.updateBusinessDataItem(
        websiteId,
        collection,
        itemId,
        payload,
      ),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.businessData.collection(websiteId, collection),
      });
    },
  });
}

export function useDeleteBusinessDataItem(
  websiteId: string,
  collection: BusinessDataCollection,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) =>
      businessDataApi.deleteBusinessDataItem(websiteId, collection, itemId),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: queryKeys.businessData.collection(websiteId, collection),
      });
    },
  });
}

export function useUploadMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => mediaApi.uploadMedia(formData),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.media.all });
    },
  });
}

export function useDeleteMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (mediaId: string) => mediaApi.deleteMedia(mediaId),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.media.all });
    },
  });
}
