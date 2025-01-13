import { lt } from "drizzle-orm";
import { db } from "~~/server/database";
import { sessionTable } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  if (
    event.node.req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  try {
    await db.delete(sessionTable).where(lt(sessionTable.expiresAt, new Date()));
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete expired sessions",
    });
  }

  return "OK";
});
