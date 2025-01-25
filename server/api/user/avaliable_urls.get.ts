import { eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { temporaryURLsTable } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
	const user = event.context.user;

	try {
		const urls = await db
			.select()
			.from(temporaryURLsTable)
			.where(eq(temporaryURLsTable.userID, user.id));
		return urls;
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Internal Server Error",
			message: "Failed to get temporary URL",
		});
	}
});
