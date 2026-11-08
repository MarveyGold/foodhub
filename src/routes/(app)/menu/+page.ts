import { menuCache } from "#lib/cache.svelte.ts";

// tolerate "cake" vs "cakes"
const norm = (s?: string | null) => s?.toLowerCase().replace(/s$/, "") ?? "";

export const load = async ({ url }) => {
  const category = url.searchParams.get("category");
  const all = await menuCache.load();
  const menu = category ? all.filter((m: any) => norm(m.category) === norm(category)) : all;
  return { menu, category };
};
