import { auth } from "$lib/server/auth";
import { fail } from "@sveltejs/kit";
import { createOrder } from "$lib/server/orders";
import { WHATSAPP_NUMBER } from "$env/static/private";

export const actions = {
  default: async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });

    const form = await request.formData();
    const customerName = form.get("customerName")?.toString().trim();
    const customerPhone = form.get("customerPhone")?.toString().trim();
    const deliveryType = form.get("deliveryType")?.toString();
    const address = form.get("address")?.toString().trim();
    const notes = form.get("notes")?.toString().trim();
    const itemsRaw = form.get("items")?.toString();

    if (!customerName || !customerPhone || !deliveryType) {
      return fail(400, { error: "Please fill in your name, phone, and delivery method." });
    }
    if (deliveryType === "delivery" && !address) {
      return fail(400, { error: "Address is required for delivery." });
    }

    let items;
    try {
      items = JSON.parse(itemsRaw);
      if (!Array.isArray(items) || items.length === 0) throw new Error();
    } catch {
      return fail(400, { error: "Your cart looks empty. Please add items first." });
    }

    const order = await createOrder({
      userId: session?.user?.id, // undefined if guest — fine now that it's optional
      customerName,
      customerPhone,
      deliveryType,
      address,
      notes,
      items,
    }); const lines = items.map(
      (i) => `- ${i.name}${i.flavour ? ` (${i.flavour})` : ""} x${i.quantity} — ₦${(i.cost * i.quantity).toLocaleString()}`
    );
    const total = items.reduce((sum, i) => sum + i.cost, 0);

    const message = [
      `New order from ${customerName}`,
      `Order ID: ${order._id}`,
      "",
      ...lines,
      "",
      `Total: ₦${total.toLocaleString()}`,
      `Delivery: ${deliveryType}${deliveryType === "delivery" ? ` — ${address}` : ""}`,
      notes ? `Notes: ${notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    return { success: true, whatsappUrl, orderId: order._id.toString() };
  },
};
