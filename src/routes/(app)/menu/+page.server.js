import { getProducts } from "$lib/server/products";

const cache = new Map();
const TTL = 1800_000


async function getCachedProducts(category) {
  const key = category ?? "all";
  const cached = cache.get(key);

  if (cached && Date.now() - cached.time < TTL) {
    return cached.data;
  }

  const data = await getProducts(category);
  cache.set(key, { data, time: Date.now() });
  return data;
}
export async function load({ url }) {
  const category = url.searchParams.get("category");
  const menu = await getCachedProducts(category);
  return { menu: JSON.parse(JSON.stringify(menu)), category };
}
