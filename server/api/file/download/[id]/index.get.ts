import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { and, eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { filesTable } from "~~/server/database/schema";
import { useAuth } from "~~/server/hooks/auth";
import { client } from "~~/server/s3";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const { user } = await useAuth(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Bad id",
    });
  }

  const [file] = await db
    .select()
    .from(filesTable)
    .where(and(eq(filesTable.id, +id), eq(filesTable.userID, user.id)));

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
      expiresIn: 60,
    },
  );

  return url;
});
