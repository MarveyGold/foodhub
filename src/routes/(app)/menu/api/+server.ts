import { json } from "@sveltejs/kit";
import { getProducts } from "$lib/server/products"
export const GET = async (): Response => {
  const menu = await getProducts()
  return json(menu, { headers: { "Content-Disposition": 'attachment; filename="backup.json"' } })
};
