import { auth } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "../login/$types";
import { dev } from "$app/environment";
export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const phone = form.get("phone");

    if (!name || !email || !password) {
      return fail(400, { error: "All fields are required", email, name });
    }

    let response: Response;
    try {
      response = await auth.api.signUpEmail({
        body: { email, password, name, username: phone },
        asResponse: true,
      });
      console.log("stat:", response.status);
      const body = await response.clone().json();
      console.log("body:", body);
    } catch (err) {
      console.log(err);

      return fail(400, {
        error: "Signup failed. Try a different email.",
        email,
        name,
      });
    }

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      return fail(response.status, {
        error: body?.message ?? "Signup failed",
        email,
        name,
      });
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
        httpOnly: true,
        sameSite: "lax",
        secure: !dev,
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    throw redirect(303, "/dashboard");
  },
};
