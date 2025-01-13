import { lt } from "drizzle-orm";
import { db } from "../database";
import { temporaryURLsTable } from "../database/schema";

export default defineEventHandler(async (event) => {
  if (
    event.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    throw createError({ statusMessage: "Unauthorized", statusCode: 401 });
  }
  await db
    .delete(temporaryURLsTable)
    .where(lt(temporaryURLsTable.expiresAt, new Date()));
  return {
    result: "Success",
  };
});
