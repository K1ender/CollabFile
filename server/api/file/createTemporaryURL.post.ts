import { eq } from "drizzle-orm";
import { maxUrls } from "~~/server/constants";
import { db } from "~~/server/database";
import { temporaryURLsTable } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
	const links = await db
		.select()
		.from(temporaryURLsTable)
		.where(eq(temporaryURLsTable.userID, event.context.user.id));

	if (links.length >= maxUrls) {
		throw createError({
			statusCode: 400,
			statusMessage: "Bad Request",
			message: `You have reached the limit of ${maxUrls} temporary URLs`,
		});
	}

	try {
		const [{ id }] = await db
			.insert(temporaryURLsTable)
			.values({
				expiresAt: new Date(Date.now() + 5 * 60 * 1000),
				userID: event.context.user.id,
			})
			.returning();

		return { id };
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Internal Server Error",
			message: "Failed to create temporary URL",
		});
	}
});
