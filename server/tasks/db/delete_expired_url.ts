import { lt } from "drizzle-orm";
import { db } from "~~/server/database";
import { temporaryURLsTable } from "~~/server/database/schema";

export default defineTask({
  meta: {
    name: "db:delete_expired_url",
    description: "Delete expired temporary URLs",
  },
  async run(event) {
    console.log("Delete expired temporary URLs");
    await db
      .delete(temporaryURLsTable)
      .where(lt(temporaryURLsTable.expiresAt, new Date()));

    return {
      result: "Success",
    };
  },
});
