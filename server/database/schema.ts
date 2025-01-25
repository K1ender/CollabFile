import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const userTable = sqliteTable("users", {
	id: integer("id").primaryKey(),
	username: text("username").notNull().unique(),
	password: text("password").notNull(),
});

export const filesTable = sqliteTable("files", {
	id: integer("id").primaryKey(),
	userID: integer("userID").references(() => userTable.id, {
		onDelete: "cascade",
		onUpdate: "cascade",
	}),
	fileName: text("fileName").notNull(),
	key: text("key").notNull().unique(),
});

export const temporaryURLsTable = sqliteTable("temporaryURLs", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid(6)),
	userID: integer("userID")
		.references(() => userTable.id, {
			onDelete: "cascade",
			onUpdate: "cascade",
		})
		.notNull(),
	expiresAt: integer("expiresAt", {
		mode: "timestamp_ms",
	}).notNull(),
});

export const sessionTable = sqliteTable("sessions", {
	id: text("id").primaryKey(),
	userID: integer("userID")
		.notNull()
		.references(() => userTable.id, {
			onDelete: "cascade",
			onUpdate: "cascade",
		}),
	expiresAt: integer("expiresAt", {
		mode: "timestamp_ms",
	}).notNull(),
});
