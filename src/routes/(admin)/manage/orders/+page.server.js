import { fail, error } from "@sveltejs/kit";
import { getAllOrders, updateOrderStatus } from "$lib/server/orders";
import { requirePermission } from "$lib/server/permissions";

const STATUSES = ["pending", "confirmed", "preparing", "ready", "completed", "cancelled"];

export async function load({ request }) {
  await requirePermission(request.headers, { order: ["view"] });
  const orders = await getAllOrders();
  return { orders, statuses: STATUSES };
}

export const actions = {
  updateStatus: async ({ request }) => {
    await requirePermission(request.headers, { order: ["update-status"] });

    const data = await request.formData();
    const _id = data.get("_id");
    const status = data.get("status");

    if (!STATUSES.includes(status)) {
      return fail(400, { error: "Invalid status" });
    }

    await updateOrderStatus(_id, status);
    return { success: true };
  },
};
