import { eq } from "drizzle-orm";
import { maxUrls } from "~~/server/constants";
import { db } from "~~/server/database";
import { temporaryURLsTable } from "~~/server/database/schema";
import { useAuth } from "~~/server/hooks/auth";

export default defineEventHandler(async (event) => {
  const { user } = await useAuth(event);

  const links = await db
    .select()
    .from(temporaryURLsTable)
    .where(eq(temporaryURLsTable.userID, user.id));

  if (links.length >= maxUrls) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: `You have reached the limit of ${maxUrls} temporary URLs`,
    });
  }

  try {
    const [temporaryURL] = await db
      .insert(temporaryURLsTable)
      .values({
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        userID: user.id,
      })
      .returning();

    if (!temporaryURL) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: "Failed to create temporary URL",
      });
    }

    return { id: temporaryURL.id };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to create temporary URL",
    });
  }
});
