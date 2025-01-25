import { eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { filesTable } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const user = event.context.user;

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
