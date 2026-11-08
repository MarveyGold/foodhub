import { createSwr } from "./swr.svelte.ts";
import { getMenu, getMyOrders } from "./data.remote.ts";

export const menuCache = createSwr(() => getMenu());
export const ordersCache = createSwr(() => getMyOrders());
