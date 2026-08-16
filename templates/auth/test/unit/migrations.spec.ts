/**
 * Test: Database Migrations
 *
 * Menggunakan SQLite in-memory database sehingga tidak mempengaruhi
 * file database development.
 */

import { createClient, type Client } from "@libsql/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

// ─── Helper: buat in-memory DB dan jalankan migrasi manual ───────────────────

async function createTestDb(): Promise<Client> {
	const db = createClient({ url: "file::memory:" });

	// Skema yang sama dengan migrations/index.ts
	await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      name      TEXT    NOT NULL,
      email     TEXT    NOT NULL UNIQUE,
      password  TEXT    NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
	await db.execute(`
    CREATE TABLE IF NOT EXISTS sessions (
      id         TEXT     PRIMARY KEY,
      user_id    INTEGER  NOT NULL,
      token      TEXT     NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

	return db;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Database Migrations", () => {
	let db: Client;

	beforeEach(async () => {
		db = await createTestDb();
	});

	afterEach(() => {
		db.close();
	});

	it("membuat tabel users", async () => {
		const result = await db.execute(
			"SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
		);
		expect(result.rows).toHaveLength(1);
	});

	it("membuat tabel sessions", async () => {
		const result = await db.execute(
			"SELECT name FROM sqlite_master WHERE type='table' AND name='sessions'",
		);
		expect(result.rows).toHaveLength(1);
	});

	it("kolom users sesuai schema", async () => {
		const result = await db.execute("PRAGMA table_info(users)");
		const colNames = result.rows.map((r) => r.name as string);
		expect(colNames).toContain("id");
		expect(colNames).toContain("name");
		expect(colNames).toContain("email");
		expect(colNames).toContain("password");
		expect(colNames).toContain("created_at");
		expect(colNames).toContain("updated_at");
	});

	it("kolom sessions sesuai schema", async () => {
		const result = await db.execute("PRAGMA table_info(sessions)");
		const colNames = result.rows.map((r) => r.name as string);
		expect(colNames).toContain("id");
		expect(colNames).toContain("user_id");
		expect(colNames).toContain("token");
		expect(colNames).toContain("expires_at");
	});

	it("email users bersifat UNIQUE", async () => {
		await db.execute({
			sql: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
			args: ["Alice", "alice@example.com", "hash1"],
		});

		await expect(
			db.execute({
				sql: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
				args: ["Alice2", "alice@example.com", "hash2"],
			}),
		).rejects.toThrow();
	});

	it("sessions ON DELETE CASCADE dari users", async () => {
		const insertResult = await db.execute({
			sql: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
			args: ["Bob", "bob@example.com", "hash"],
		});

		const userId = insertResult.lastInsertRowid!;
		const future = new Date(Date.now() + 86_400_000).toISOString();
		await db.execute({
			sql: "INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)",
			args: ["sess-1", userId, "tok-1", future],
		});

		await db.execute({
			sql: "DELETE FROM users WHERE id = ?",
			args: [userId],
		});

		const sessions = await db.execute(
			"SELECT * FROM sessions WHERE id = 'sess-1'",
		);
		expect(sessions.rows).toHaveLength(0);
	});
});
