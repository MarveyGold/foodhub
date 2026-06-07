import { getProducts } from "$lib/server/products";

export async function load({ url }) {

  const category = url.searchParams.get('category')
  const menu = await getProducts(category)
  return { menu: JSON.parse(JSON.stringify(menu)), category }
}
