import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
	throw new Error("Missing DATABASE_URL");
}

export default defineConfig({
	out: "./migrations",
	schema: "./server/database/schema.ts",
	dialect: "turso",
	dbCredentials: {
		url: process.env.DATABASE_URL,
		authToken:
			process.env.AUTH_TOKEN === "" ? undefined : process.env.AUTH_TOKEN,
	},
});
