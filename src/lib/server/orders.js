import { Order } from "./models/order.ts";

export async function createOrder({ event, userId, customerName, customerPhone, deliveryType, address, notes, items }) {
  const total = items.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  const normalizedItems = items.map((item) => ({
    productId: item.id, // map cart's `id` → schema's `productId`
    name: item.name,
    flavour: item.flavour,
    cost: item.cost,
    quantity: item.quantity,
    imageUrl: item.imageUrl,
  }));
  console.log(event)
  const order = await Order.create({
    userId: userId || undefined,
    customerName,
    customerPhone,
    deliveryType,
    address,
    notes,
    items: normalizedItems,
    total,
  });

  return order;
} export async function getOrdersForUser(userId) {
  const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();
  return orders.map((o) => ({ ...o, _id: o._id.toString() }));
}

export async function getAllOrders({ startDate, endDate } = {}) {
  const filter = {};

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) {
      // push to end of day so the selected end date is inclusive
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = end;
    }
  }
  const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
  return orders.map((o) => ({ ...o, _id: o._id.toString() }));
}
export async function updateOrderStatus(_id, status) {
  return await Order.findByIdAndUpdate(_id, { status }, { new: true });
}
