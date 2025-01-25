import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

export const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL,
    authToken: process.env.AUTH_TOKEN,
  },
});
