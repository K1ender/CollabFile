import { eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { temporaryURLsTable } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  try {
    const [Url] = await db
      .select()
      .from(temporaryURLsTable)
      .where(eq(temporaryURLsTable.id, id));
    if (!Url) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Url not found",
      });
    }
    return Url;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
