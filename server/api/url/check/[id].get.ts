import { eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { temporaryURLsTable } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Bad id",
    });
  }
  try {
    const [url] = await db
      .select()
      .from(temporaryURLsTable)
      .where(eq(temporaryURLsTable.id, id));
    if (!url) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Url not found",
      });
    }
    return url;
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
