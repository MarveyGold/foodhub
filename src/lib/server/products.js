import { connectDB } from "$lib/server/db";
import { Menu } from "$lib/server/models/Menu";

await connectDB();

const cache = new Map();
const TTL = 1_800_000_000; // deliberate ~20-day TTL

export async function getProducts(category) {
  const menu = await Menu.find(category ? { category } : {}).lean();
  return menu.map((item) => ({ ...item, _id: item._id.toString() }));
}

export async function getCachedProducts(category) {
  const key = category ?? "all";
  const cached = cache.get(key);

  if (cached && Date.now() - cached.time < TTL) {
    return cached.data;
  }

  const data = await getProducts(category);
  cache.set(key, { data, time: Date.now() });
  return data;
}

export function invalidateProductCache() {
  cache.clear();
}

export async function addProduct({ data, imageUrl }) {
  const product = await Menu.create({
    name: data.get("name"),
    category: data.get("category"),
    price: Number(data.get("price")),
    size: Number(data.get("size")) || undefined,
    layers: Number(data.get("layers")) || undefined,
    description: data.get("description"),
    stock: data.get("stock") === "on" ? 1 : 0,
    imageUrl,
  });

  invalidateProductCache();
  return product;
}

export async function deleteProduct(_id) {
  const result = await Menu.findByIdAndDelete(_id);
  invalidateProductCache();
  return result;
}
