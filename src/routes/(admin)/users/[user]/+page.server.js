import { error, fail } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import { requirePermission } from "$lib/server/permissions";

export async function load({ params, request }) {
  await requirePermission(request.headers, { user: ["get"] });

  const { users } = await auth.api.listUsers({
    query: {
      limit: 1,
      filterField: "username",
      filterValue: params.user,
      filterOperator: "eq",
    },
    headers: request.headers,
  });

  const user = users[0];
  if (!user) throw error(404, "User not found");

  return { user };
}

export const actions = {
  updateUser: async ({ request }) => {
    await requirePermission(request.headers, { user: ["update"] });

    const form = await request.formData();
    const userId = form.get("userId")?.toString();
    const name = form.get("name")?.toString();

    if (!userId || !name) {
      return fail(400, { error: "Name is required" });
    }

    await auth.api.adminUpdateUser({
      body: { userId, data: { name } },
      headers: request.headers,
    });

    return { success: true };
  },

  setRole: async ({ request }) => {
    await requirePermission(request.headers, { user: ["set-role"] });

    const form = await request.formData();
    const userId = form.get("userId")?.toString();
    const role = form.get("role")?.toString();

    const VALID_ROLES = ["admin", "manager", "staff", "customer"];
    if (!userId || !role || !VALID_ROLES.includes(role)) {
      return fail(400, { error: "Invalid role" });
    }

    await auth.api.setRole({
      body: { userId, role },
      headers: request.headers,
    });

    return { success: true };
  },

  deleteUser: async ({ request }) => {
    await requirePermission(request.headers, { user: ["delete"] });

    const form = await request.formData();
    const userId = form.get("userId")?.toString();

    if (!userId) return fail(400, { error: "Missing user id" });

    await auth.api.removeUser({
      body: { userId },
      headers: request.headers,
    });

    return { success: true };
  },
};
