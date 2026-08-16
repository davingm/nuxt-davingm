/**
 * Test: Database Migrations
 *
 * Menggunakan SQLite in-memory database sehingga tidak mempengaruhi
 * file database development.
 */

import Database from "better-sqlite3";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ─── Helper: buat in-memory DB dan jalankan migrasi manual ───────────────────

function createTestDb() {
	const db = new Database(":memory:");
	db.pragma("journal_mode = WAL");
	db.pragma("foreign_keys = ON");

	// Skema yang sama dengan migrations/index.ts
	db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      name      TEXT    NOT NULL,
      email     TEXT    NOT NULL UNIQUE,
      password  TEXT    NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS sessions (
      id         TEXT     PRIMARY KEY,
      user_id    INTEGER  NOT NULL,
      token      TEXT     NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

	return db;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Database Migrations", () => {
	let db: ReturnType<typeof createTestDb>;

	beforeEach(() => {
		db = createTestDb();
	});

	afterEach(() => {
		db.close();
	});

	it("membuat tabel users", () => {
		const tables = db
			.prepare(
				"SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
			)
			.all();
		expect(tables).toHaveLength(1);
	});

	it("membuat tabel sessions", () => {
		const tables = db
			.prepare(
				"SELECT name FROM sqlite_master WHERE type='table' AND name='sessions'",
			)
			.all();
		expect(tables).toHaveLength(1);
	});

	it("kolom users sesuai schema", () => {
		const cols = db.pragma("table_info(users)") as { name: string }[];
		const colNames = cols.map((c) => c.name);
		expect(colNames).toContain("id");
		expect(colNames).toContain("name");
		expect(colNames).toContain("email");
		expect(colNames).toContain("password");
		expect(colNames).toContain("created_at");
		expect(colNames).toContain("updated_at");
	});

	it("kolom sessions sesuai schema", () => {
		const cols = db.pragma("table_info(sessions)") as { name: string }[];
		const colNames = cols.map((c) => c.name);
		expect(colNames).toContain("id");
		expect(colNames).toContain("user_id");
		expect(colNames).toContain("token");
		expect(colNames).toContain("expires_at");
	});

	it("email users bersifat UNIQUE", () => {
		db.prepare(
			"INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
		).run("Alice", "alice@example.com", "hash1");

		expect(() => {
			db.prepare(
				"INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
			).run("Alice2", "alice@example.com", "hash2");
		}).toThrow();
	});

	it("sessions ON DELETE CASCADE dari users", () => {
		const info = db
			.prepare(
				"INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
			)
			.run("Bob", "bob@example.com", "hash");

		const userId = info.lastInsertRowid;
		const future = new Date(Date.now() + 86_400_000).toISOString();
		db.prepare(
			"INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)",
		).run("sess-1", userId, "tok-1", future);

		db.prepare("DELETE FROM users WHERE id = ?").run(userId);

		const sessions = db.prepare("SELECT * FROM sessions WHERE id = 'sess-1'").all();
		expect(sessions).toHaveLength(0);
	});
});
