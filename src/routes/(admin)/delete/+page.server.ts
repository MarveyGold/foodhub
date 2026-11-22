import type { Actions, PageServerLoad } from "./$types";
import { deleteProduct, getProducts } from "#lib/server/products";
import { requirePermission } from "#lib/server/permissions";

export const load: PageServerLoad = async () => {
  const menu = await getProducts();
  return { menu };
};

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    const _id = data.get("_id");

    await requirePermission(request.headers, { product: ["delete"] });

    if (typeof _id !== "string" || !_id) {
      return { success: false, error: "Product ID is required" };
    }

    await deleteProduct(_id);
    return { success: true };
  },
} satisfies Actions;
