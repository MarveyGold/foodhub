import { redirect } from "@sveltejs/kit";
import { getOrdersForUser } from "#lib/server/orders.js";

export async function load({ locals }) {
  if (!locals.user) throw redirect(303, "/login");
  const orders = await getOrdersForUser(locals.user.id);
  return { orders };
}
