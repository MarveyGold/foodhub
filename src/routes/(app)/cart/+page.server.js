import { fail, redirect } from "@sveltejs/kit";
import { createOrder } from "$lib/server/orders";
import { WHATSAPP_NUMBER } from "$env/static/private";

export const actions = {
  checkout: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, "/login");

    const form = await request.formData();
    const raw = form.get("items");

    let items;
    try {
      items = JSON.parse(raw);
    } catch {
      return fail(400, { error: "Invalid cart data" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return fail(400, { error: "Your cart is empty" });
    }

    const order = await createOrder({
      userId: locals.user.id,
      customerName: locals.user.name,
      customerPhone: locals.user.username ?? locals.user.email,
      items: items.map((item) => ({
        name: item.name,
        imageUrl: item.imageUrl,
        flavour: item.flavour,
        quantity: item.quantity,
        cost: item.cost,
      })),
    });

    const lines = items.map(
      (item) =>
        `• ${item.name}${item.flavour ? ` (${item.flavour})` : ""} x${item.quantity} — ₦${item.cost.toLocaleString()}`,
    );
    const message = [
      `New order from ${locals.user.name}`,
      `Order #${order._id.slice(-6).toUpperCase()}`,
      "",
      ...lines,
      "",
      `Total: ₦${order.total.toLocaleString()}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    return { success: true, orderId: order._id, whatsappUrl };
  },
};
