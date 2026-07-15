import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    flavour: { type: String },
    cost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: false, index: true }, // optional, set when signed in
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true, index: true }, // always required — this is your real lookup key
    deliveryType: { type: String, enum: ["pickup", "delivery"], required: true },
    address: { type: String },
    notes: { type: String },
    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "ready", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);
export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
