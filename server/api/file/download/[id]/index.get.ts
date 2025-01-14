import { and, eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { filesTable } from "~~/server/database/schema";
import { client } from "~~/server/s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

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

  const url = await getSignedUrl(
    client,
    new GetObjectCommand({
      Key: file.key,
      Bucket: process.env.S3_BUCKET,
      ResponseContentDisposition: `attachment; filename="${file.fileName}"`,
    }),
    {
      expiresIn: 5 * 60,
    }
  );

  return url;
});
