import { lt } from "drizzle-orm";
import { db } from "~~/server/database";
import { sessionTable, temporaryURLsTable } from "~~/server/database/schema";

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
    console.error(e);
  }

  try {
    await db
      .delete(temporaryURLsTable)
      .where(lt(temporaryURLsTable.expiresAt, new Date()));
  } catch (e) {
    console.error(e);
  }

  return "OK";
});
