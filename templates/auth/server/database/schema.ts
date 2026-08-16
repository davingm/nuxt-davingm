import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Driver: @libsql/client (pure JS, tidak perlu compile native)
// Drizzle ORM tetap pakai sqlite-core karena dialect SQLite sama untuk libsql

/**
 * Schema database untuk SQLite (default driver project ini).
 * Tabel users & sessions digunakan untuk autentikasi berbasis session.
 */

export const users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	created_at: text("created_at"),
	updated_at: text("updated_at"),
});

export const sessions = sqliteTable("sessions", {
	id: text("id").primaryKey(),
	user_id: integer("user_id").notNull(),
	token: text("token").notNull(),
	expires_at: text("expires_at").notNull(),
	created_at: text("created_at"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
