import { Order } from "./models/order.ts";

export async function addOrder({ userId, customerName, customerPhone, deliveryType, address, notes, items }) {
  const total = items.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  const order = await Order.create({
    userId: userId || undefined, // omit rather than store null/empty string
    customerName,
    customerPhone,
    deliveryType,
    address,
    notes,
    items,
    total,
  });

  return order;
}
export async function getOrdersForUser(userId) {
  const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();
  return orders.map((o) => ({ ...o, _id: o._id.toString() }));
}

export async function getAllOrders() {
  const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
  return orders.map((o) => ({ ...o, _id: o._id.toString() }));
}

export async function updateOrderStatus(_id, status) {
  return await Order.findByIdAndUpdate(_id, { status }, { new: true });
}
