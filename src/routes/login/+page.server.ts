import { auth } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    let response: Response;
    try {
      response = await auth.api.signInEmail({
        body: { email, password },
        asResponse: true,
      });
    } catch (err) {
      console.error(err);
      return fail(401, { error: "Invalid email or password", email });
    }

    if (!response.ok) {
      return fail(401, { error: "Invalid email or password", email });
    }

    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      const [nameValue] = setCookie.split(";");
      const [cookieName, cookieValue] = nameValue.split("=");
      cookies.set(cookieName, cookieValue, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    throw redirect(303, "/dashboard");
  },
};
