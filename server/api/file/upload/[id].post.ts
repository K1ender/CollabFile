import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { eq } from "drizzle-orm";
import { v4 } from "uuid";
import * as v from "valibot";
import { db } from "~~/server/database";
import { filesTable, temporaryURLsTable } from "~~/server/database/schema";
import { client } from "~~/server/s3";

const bodySchema = v.object({
	fileName: v.pipe(
		v.string("Filename is required"),
		v.nonEmpty("Filename is required"),
	),
	contentType: v.string("Content type is required"),
});

export default defineEventHandler(async (event) => {
	const body = await readValidatedBody(event, (body) => {
		return v.safeParse(bodySchema, body);
	});

	if (!body.success) {
		throw createError({
			statusCode: 400,
			data: body.issues,
		});
	}

	const { id } = getRouterParams(event);
	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: "Bad Request",
			message: "Bad id",
		});
	}

	const [{ userID, expiresAt }] = await db
		.select()
		.from(temporaryURLsTable)
		.where(eq(temporaryURLsTable.id, id));

	if (new Date() >= expiresAt) {
		await db.delete(temporaryURLsTable).where(eq(temporaryURLsTable.id, id));
		throw createError({
			statusCode: 404,
			statusMessage: "Not Found",
			message: "Url not found",
		});
	}

	if (!userID) {
		throw createError({
			statusCode: 404,
			statusMessage: "Not Found",
			message: "Url not found",
		});
	}

	const { fileName, contentType } = body.output;

	const key = `${v4()}-${Date.now()}-${fileName}`;

	const { url, fields } = await createPresignedPost(client, {
		Bucket: process.env.S3_BUCKET as string,
		Key: key,
		Fields: {
			"Content-Type": contentType,
		},
	});

	await db.insert(filesTable).values({
		key,
		userID,
		fileName,
	});

	await db.delete(temporaryURLsTable).where(eq(temporaryURLsTable.id, id));

	return {
		url,
		fields,
	};
});
