import { cookieName } from "../constants";
import { validateSession } from "../session";

const publicRoutes = ["/api/auth/register", "/api/auth/login"];

export default defineEventHandler(async (event) => {
  if (!publicRoutes.includes(event.path) && !event.path.startsWith("/api")) {
    throw createError({ statusMessage: "Unauthorized", statusCode: 401 });
  }

  const cookie = getCookie(event, cookieName);
  if (!cookie)
    throw createError({ statusMessage: "Unauthorized", statusCode: 401 });

  const { session, user } = await validateSession(cookie);
  if (session === null || user === null) {
    throw createError({ statusMessage: "Unauthorized", statusCode: 401 });
  }

  event.context.user = {
    id: user.id,
    username: user.username,
  };

  event.context.session = session;

  return;
});
