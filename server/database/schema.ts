import { text } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const filesTable = pgTable("files", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userID: integer("userID").references(() => userTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  fileName: text("fileName").notNull(),
  key: text("key").notNull().unique(),
});

export const sessionTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  userID: integer("userID")
    .notNull()
    .references(() => userTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  expiresAt: timestamp("expiresAt", {
    withTimezone: true,
  }).notNull(),
});
