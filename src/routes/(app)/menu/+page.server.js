import { getCachedProducts } from "#lib/server/products.js";

export async function load({ url }) {
  const category = url.searchParams.get("category");
  const menu = await getCachedProducts(category);
  return { menu, category }; // .lean() + _id.toString() already makes this serializable — no JSON round-trip needed
}
