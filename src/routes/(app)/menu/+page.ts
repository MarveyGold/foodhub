import { menuCache } from "#lib/cache.svelte.ts";
import { filterMenu } from "#lib/menu";
import type { PageLoad } from './$types'

export const load = (async ({ url }) => {
  const category = url.searchParams.get("category");
  return { menu: filterMenu(await menuCache.load(), category), category };
}) satisfies PageLoad;
