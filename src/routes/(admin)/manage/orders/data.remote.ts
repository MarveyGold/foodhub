import * as v from "valibot";
import { query, form, getRequestEvent } from "$app/server";
import { error } from "@sveltejs/kit";
import { isValidObjectId } from "mongoose";
import { Order } from "#lib/server/models/order.ts";
import { requirePermission } from "#lib/server/permissions.ts";
import type { ReceiptOrder } from "#lib/utils/receipt";

const Id = v.pipe(v.string(), v.check(isValidObjectId, "Invalid order id"));

export const getReceiptOrder = query(Id, async (id) => {
  const { request } = getRequestEvent();
  await requirePermission(request.headers, { order: ["view"] });

  const o = await Order.findById(id).lean();
  if (!o) error(404, "Order not found");

  // plain, serializable shape (no ObjectId / Date objects)
  return {
    _id: String(o._id),
    customerName: o.customerName,
    deliveryType: o.deliveryType,
    address: o.address,
    items: o.items.map((i: any) => ({
      name: i.name,
      flavour: i.flavour,
      cost: i.cost,
      quantity: i.quantity,
    })),
    total: o.total,
    createdAt: o.createdAt.toISOString(),
    payment: {
      method: o.payment?.method,
      paidAt: o.payment?.paidAt?.toISOString(),
    },
  } satisfies ReceiptOrder;
});

export const markOrderPaid = form(
  v.object({
    id: Id,
    method: v.picklist(
      ["cash", "bank_transfer", "pos", "card"],
      "Pick a payment method",
    ),
  }),
  async ({ id, method }) => {
    const { request } = getRequestEvent();
    await requirePermission(request.headers, { order: ["update-status"] });

    const updated = await Order.findByIdAndUpdate(id, {
      payment: { method, paidAt: new Date() },
    });
    if (!updated) error(404, "Order not found");

    // refresh the receipt query in the same round trip
    await getReceiptOrder(id).refresh();
    return { success: true };
  },
);
