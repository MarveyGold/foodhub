import { fail, error } from "@sveltejs/kit";
import { getAllOrders, updateOrderStatus } from "$lib/server/orders";
import { requirePermission } from "$lib/server/permissions";

const STATUSES = ["pending", "confirmed", "preparing", "ready", "completed", "cancelled"];

export async function load({ request, url }) {
  await requirePermission(request.headers, { order: ["view"] });

  const startDate = url.searchParams.get("start") || undefined;
  const endDate = url.searchParams.get("end") || undefined;

  const orders = await getAllOrders({ startDate, endDate });
  return { orders, statuses: STATUSES, startDate, endDate };
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
