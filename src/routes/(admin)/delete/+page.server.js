import { deleteProduct } from "$lib/server/products";
import { getProducts } from "$lib/server/products";

export async function load() {
  const menu = await getProducts();
  return { menu };
}
export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    const _id = data.get("_id");
    await deleteProduct(_id);
    return { success: true };
  },
};
