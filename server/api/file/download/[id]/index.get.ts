import { and, eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { filesTable } from "~~/server/database/schema";
import { client } from "~~/server/s3";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const [file] = await db
    .select()
    .from(filesTable)
    .where(
      and(eq(filesTable.id, +id), eq(filesTable.userID, event.context.user.id))
    );

  if (!file) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: "File not found",
    });
  }

  const fileObject = await client.getObject({
    Bucket: process.env.S3_BUCKET as string,
    Key: file.key,
  });

  setHeader(event, "Content-Type", fileObject.ContentType);
  setHeader(
    event,
    "Content-Disposition",
    `attachment; filename="${file.fileName}"`
  );
  setHeader(event, "Content-Length", fileObject.ContentLength);

  return fileObject.Body;
});
