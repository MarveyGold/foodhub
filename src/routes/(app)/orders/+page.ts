import { redirect } from "@sveltejs/kit";
import { ordersCache } from "#lib/cache.svelte.ts";

export const load = async ({ parent }) => {
  const { user } = await parent();
  if (!user) redirect(303, "/login");
  return { orders: await ordersCache.load() };
};
