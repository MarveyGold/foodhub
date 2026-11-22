import { redirect } from "@sveltejs/kit";
import { ordersCache } from "#lib/cache.svelte";
import type { PageLoad } from './$types'

export const load = (async ({ parent }) => {
  const { user } = await parent();
  if (!user) redirect(303, "/login");
  return { orders: await ordersCache.load() };
}) satisfies PageLoad;
