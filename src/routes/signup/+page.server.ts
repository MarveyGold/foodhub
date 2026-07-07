import { auth } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "../login/$types";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    if (!name || !email || !password) {
      return fail(400, { error: "All fields are required", email, name });
    }

    let response: Response;
    try {
      response = await auth.api.signUpEmail({
        body: { email, password, name },
        asResponse: true,
      });
      console.log("stat:", response.status);
      const body = await response.clone().json();
      console.log("body:", body);


    } catch (err) {
      console.log(err);

      return fail(400, { error: "Signup failed. Try a different email.", email, name });
    }

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      return fail(response.status, { error: body?.message ?? "Signup failed", email, name });
    }
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {

      const [nameValue] = setCookie.split(";");
      const [cookieName, cookieValue] = nameValue.split("=");
      cookies.set(cookieName, cookieValue, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    throw redirect(303, "/dashboard");
  },
};
