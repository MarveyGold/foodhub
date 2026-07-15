import type { LayoutServerLoad } from "./$types";
import { redirect, error } from "@sveltejs/kit";
export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(303, "/login");
  const user = locals.user;
  if (!["admin", "manager"].includes(user.role)) throw error(403);
};
