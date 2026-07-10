import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(303, "/login");
  const user = locals.user;
  if (user.role = "manager") throw redirect(302, "/manage");
  if (user.role == "customer") throw redirect(302, "/menu");
  return { user: locals.user };
};
