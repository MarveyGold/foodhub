import { query, getRequestEvent } from "$app/server";
import { getCachedProducts } from "#lib/server/products";
import { getOrdersForUser } from "#lib/server/orders;

export const getMenu = query(async () => getCachedProducts(null));

export const getMyOrders = query(async () => {
  const { locals } = getRequestEvent();
  if (!locals.user) return [];
  return getOrdersForUser(locals.user.id);
});
