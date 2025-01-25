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
		await db.delete(temporaryURLsTable).where(eq(temporaryURLsTable.id, id));
		return sendNoContent(event);
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Internal Server Error",
		});
	}
});
