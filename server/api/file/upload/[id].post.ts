import { eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { filesTable, temporaryURLsTable } from "~~/server/database/schema";
import { v4 } from "uuid";
import { client } from "~~/server/s3";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  try {
    const [{ userID }] = await db
      .select()
      .from(temporaryURLsTable)
      .where(eq(temporaryURLsTable.id, id));

    if (!userID) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Url not found",
      });
    }

    const formdata = await readMultipartFormData(event);
    if (!formdata) return;
    const file = formdata[0];

    if (!file || file.name !== "file" || !file.filename) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Bad file",
      });
    }

    const key = `${v4()}-${Date.now()}-${file.filename}`;

    await client.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: file.data,
      ContentType: file.type,
    });
    await db.insert(filesTable).values({
      fileName: file.filename,
      userID,
      key,
    });

    await db.delete(temporaryURLsTable).where(eq(temporaryURLsTable.id, id));

    return sendNoContent(event);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
