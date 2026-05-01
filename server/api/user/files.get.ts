import { eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { filesTable } from "~~/server/database/schema";
import { useAuth } from "~~/server/hooks/auth";

export default defineEventHandler(async (event) => {
  const { user } = await useAuth(event);

  try {
    const files = await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.userID, user.id));
    return files;
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to get files",
    });
  }
});
