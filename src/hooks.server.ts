import { auth } from "$lib/server/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";

const handleAuth: Handle = async ({ event, resolve }) => {
  return svelteKitHandler({ event, resolve, auth, building });
};

const populateLocals: Handle = async ({ event, resolve }) => {
  console.log("Headers:", Object.fromEntries(event.request.headers));
  const session = await auth.api.getSession({
    headers: event.request.headers,
  });
  console.log("Session found:", !!session);
  event.locals.session = session?.session ?? null;
  event.locals.user = session?.user ?? null;
  return resolve(event);
};
export const handle = sequence(handleAuth, populateLocals);
