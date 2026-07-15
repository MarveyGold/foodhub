import { error } from "@sveltejs/kit";
import { auth } from "$lib/server/auth"
export async function load({ request }) {
  const { users, total } = await auth.api.listUsers({
    query: { limit: 50, offset: 0, sortBy: "createdAt", sortDirection: "desc" },
    headers: request.headers, // needs the admin's session cookie
  });
  return { users, total };
}
export const actions = {
  searchUser: async ({ request, locals }) => {
    if (locals.user?.role !== "manager") {
      throw error(403, "Forbidden");
    }
    const form = await request.formData();
    const query = form.get("q")?.toString() ?? "";

    const { users, total } = await auth.api.listUsers({
      query: {
        limit: 50,
        offset: 0,
        filterField: "username",
        filterValue: query,
        filterOperator: "contains",
      },
      headers: request.headers,
    });

    return { users, total, search: query };
  },
}

