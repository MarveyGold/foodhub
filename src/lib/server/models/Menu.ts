import mongoose, { Schema, type InferSchemaType } from "mongoose";
const menuSchema = new Schema({
  name: { type: String, required: true },
  size: Number,
  layers: Number,
  imageUrl: String,
  description: String,
  price: { type: Number, required: true },
  stock: Number,
  category: String
}, { timestamps: true });
export type Menu = InferSchemaType<typeof menuSchema>;
export const Menu = mongoose.models.Menu ?? mongoose.model('Menu', menuSchema);
