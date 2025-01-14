import { cookieName } from "../constants";
import { validateSession } from "../session";

const publicRoutes = [
  "/api/auth/register",
  "/api/auth/login",
  "/api/url/check/[id]",
];

export default defineEventHandler(async (event) => {
  if (
    event.path.startsWith("/api") &&
    !event.path.startsWith("/api/url/check") &&
    !event.path.startsWith("/api/file/upload")
  ) {
    if (!publicRoutes.includes(event.path)) {
      const cookie = getCookie(event, cookieName);
      if (!cookie) {
        throw createError({ statusMessage: "Unauthorized", statusCode: 401 });
      }

      const { session, user } = await validateSession(cookie);
      if (session === null || user === null) {
        throw createError({ statusMessage: "Unauthorized", statusCode: 401 });
      }

      event.context.user = {
        id: user.id,
        username: user.username,
      };

      event.context.session = session;
    }
  }

  return;
});
