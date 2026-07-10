import { auth } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { dev } from "$app/environment";
export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const phone = form.get("phone");
    const password = form.get("password") as string;

    let response: Response;
    try {
      response = await auth.api.signInUsername({
        body: { username: phone, password },
        asResponse: true,
      });
    } catch (err) {
      console.error(err);
      return fail(401, { error: "Invalid email or password", username });
    }

    if (!response.ok) {
      return fail(401, { error: "Invalid email or password", username });
    }

    const cookieStrings = response.headers.getSetCookie();
    for (const setCookie of cookieStrings) {
      const nameValue = setCookie.split(";")[0];
      const eqIndex = nameValue.indexOf("=");
      const cookieName = nameValue.slice(0, eqIndex);
      const rawValue = nameValue.slice(eqIndex + 1);
      const cookieValue = decodeURIComponent(rawValue);
      cookies.set(cookieName, cookieValue, {
        path: "/",
        secure: !dev,
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    throw redirect(303, "/dashboard");
  },
};
