import { invalidateSession } from "~~/server/session";

export default defineEventHandler(async (event) => {
  invalidateSession(event.context.session.id);
  deleteCookie(event, "session");
  return sendNoContent(event);
});
