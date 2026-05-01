import type { H3Event } from "h3";
import { cookieName } from "../constants";
import { validateSession } from "../session";

export async function useAuth(event: H3Event) {
  const cookie = getCookie(event, cookieName);
  if (!cookie) {
    throw createError({ statusMessage: "Unauthorized", statusCode: 401 });
  }

  const { session, user } = await validateSession(cookie);
  if (session === null || user === null) {
    throw createError({ statusMessage: "Unauthorized", statusCode: 401 });
  }

  return {
    user,
    session,
  };
}
