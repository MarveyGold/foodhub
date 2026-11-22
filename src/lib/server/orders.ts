import { Order } from "./models/order.ts";
import type { CartItem, Flavour } from "#lib/cart";

export type DeliveryType = "pickup" | "delivery";
export type OrderStatus = "pending" | "confirmed" | "ready" | "completed" | "cancelled";

export type CreateOrderInput = {
  event?: unknown;              // see §2 — drop if unused
  userId?: string;
  customerName: string;
  customerPhone: string;
  deliveryType: DeliveryType;
  address?: string;
  notes?: string;
  items: CartItem[];
};

export type LeanOrder = {
  _id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  deliveryType: DeliveryType;
  address?: string;
  notes?: string;
  items: Array<{
    productId: string;
    name: string;
    flavour?: Flavour;
    cost: number;
    quantity: number;
    imageUrl?: string;
  }>;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
};

export async function createOrder({
  event,
  userId,
  customerName,
  customerPhone,
  deliveryType,
  address,
  notes,
  items,
}: CreateOrderInput) {
  const total = items.reduce((sum, item) => sum + item.cost, 0);
  const normalizedItems = items.map((item) => ({
    productId: item.id,
    name: item.name,
    flavour: item.flavour,
    cost: item.cost,
    quantity: item.quantity,
    imageUrl: item.imageUrl,
  }));
  console.log(event);

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
}

export async function getOrdersForUser(userId: string): Promise<LeanOrder[]> {
  const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();
  return orders.map((o) => ({ ...o, _id: o._id.toString() })) as LeanOrder[];
}

export async function getAllOrders(
  { startDate, endDate }: { startDate?: string; endDate?: string } = {},
): Promise<LeanOrder[]> {
  const filter: Record<string, unknown> = {};

  if (startDate || endDate) {
    const createdAt: { $gte?: Date; $lte?: Date } = {};
    if (startDate) createdAt.$gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      createdAt.$lte = end;
    }
    filter.createdAt = createdAt;
  }

  const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
  return orders.map((o) => ({ ...o, _id: o._id.toString() })) as LeanOrder[];
}

export async function updateOrderStatus(_id: string, status: OrderStatus) {
  return await Order.findByIdAndUpdate(_id, { status }, { new: true });
}
