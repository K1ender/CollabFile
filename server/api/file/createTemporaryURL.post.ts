import { db } from "~~/server/database";
import { temporaryURLsTable } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const [{ id }] = await db
      .insert(temporaryURLsTable)
      .values({
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        userID: event.context.user.id,
      })
      .returning();

    return { id };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to create temporary URL",
    });
  }
});
