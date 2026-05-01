import { useAuth } from "~~/server/hooks/auth";
import { invalidateSession } from "~~/server/session";

export default defineEventHandler(async (event) => {
  const { session } = await useAuth(event);

  invalidateSession(session.id);
  deleteCookie(event, "session");
  return sendNoContent(event);
});
