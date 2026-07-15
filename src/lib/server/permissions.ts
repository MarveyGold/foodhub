import { auth } from "$lib/server/auth";
import { error } from "@sveltejs/kit";

/**
 * Throws a 403 if the current session's role doesn't have the given permission.
 * Usage: await requirePermission(request.headers, { product: ["create"] });
 */
export async function requirePermission(
  headers: Headers,
  permissions: Record<string, string[]>,
) {
  const { success } = await auth.api.userHasPermission({
    body: { permissions },
    headers,
  });
  if (!success) throw error(403, "You don't have permission to do that");
}
