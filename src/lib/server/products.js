import { connectDB } from "$lib/server/db";
import { Menu } from "$lib/server/models/Menu";

await connectDB();
export async function getProducts(category) {
  const menu = await Menu.find(category ? { category } : {}).lean();
  return menu.map((item) => ({ ...item, _id: item._id.toString() }));
}
export async function addProduct({ data, imageUrl }) {
  return await Menu.create({
    name: data.get("name"),
    category: data.get("category"),
    price: Number(data.get("price")),
    size: Number(data.get("size")) || undefined,
    layers: Number(data.get("layers")) || undefined,
    description: data.get("description"),
    stock: data.get("stock") === "on" ? 1 : 0,
    imageUrl,
  });
}
export async function deleteProduct(_id) {
  return await Menu.findByIdAndDelete(_id);
}
