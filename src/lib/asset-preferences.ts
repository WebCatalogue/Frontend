const FAVORITES_KEY = "bks_asset_favorites";
const RECENT_KEY = "bks_asset_recent";
const MAX_RECENT = 12;

export function getFavoriteAssetIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteAsset(id: string): string[] {
  const current = getFavoriteAssetIds();
  const next = current.includes(id)
    ? current.filter((x) => x !== id)
    : [...current, id];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  return next;
}

export function getRecentAssetIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function trackRecentAsset(id: string): string[] {
  const current = getRecentAssetIds().filter((x) => x !== id);
  const next = [id, ...current].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  return next;
}
