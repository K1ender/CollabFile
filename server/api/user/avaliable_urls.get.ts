import { eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { temporaryURLsTable } from "~~/server/database/schema";
import { useAuth } from "~~/server/hooks/auth";

export default defineEventHandler(async (event) => {
  const { user } = await useAuth(event);

  try {
    const urls = await db
      .select()
      .from(temporaryURLsTable)
      .where(eq(temporaryURLsTable.userID, user.id));
    return urls;
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to get temporary URL",
    });
  }
});
