/**
 * Test: server/utils/db.ts
 *
 * Semua operasi CRUD diuji dengan SQLite in-memory melalui @libsql/client.
 */

import { createClient, type Client } from "@libsql/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

// ─── Setup in-memory DB ───────────────────────────────────────────────────────

let db: Client;

async function seedSchema(client: Client) {
	await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
	await client.execute(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      token TEXT NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
}

// ─── Unit helpers ─────────────────────────────────────────────────────────────

async function dbCreateUser(
	client: Client,
	name: string,
	email: string,
	password: string,
) {
	const result = await client.execute({
		sql: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
		args: [name, email.toLowerCase(), password],
	});
	const row = await client.execute({
		sql: "SELECT id, name, email, created_at FROM users WHERE id = ?",
		args: [result.lastInsertRowid!],
	});
	return row.rows[0] as unknown as {
		id: number;
		name: string;
		email: string;
		created_at: string;
	};
}

async function dbFindUserByEmail(client: Client, email: string) {
	const result = await client.execute({
		sql: "SELECT * FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1",
		args: [email],
	});
	return result.rows[0] as
		| { id: number; name: string; email: string; password: string }
		| undefined;
}

async function dbCreateSession(
	client: Client,
	id: string,
	userId: number,
	token: string,
	expiresAt: Date,
) {
	await client.execute({
		sql: "INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)",
		args: [id, userId, token, expiresAt.toISOString()],
	});
}

async function dbFindSessionByToken(client: Client, token: string) {
	const result = await client.execute({
		sql: `SELECT s.id AS session_id, s.user_id, s.token, s.expires_at,
              u.id AS uid, u.name, u.email, u.created_at
       FROM sessions s
       JOIN users u ON s.user_id = u.id
       WHERE s.token = ? LIMIT 1`,
		args: [token],
	});
	return result.rows[0] as Record<string, unknown> | undefined;
}

async function dbDeleteSession(client: Client, token: string) {
	await client.execute({
		sql: "DELETE FROM sessions WHERE token = ?",
		args: [token],
	});
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("DB Utils — Users", () => {
	beforeEach(async () => {
		db = createClient({ url: "file::memory:" });
		await seedSchema(db);
	});

	afterEach(() => {
		db.close();
	});

	it("membuat user baru", async () => {
		const user = await dbCreateUser(db, "Alice", "alice@example.com", "hashed");
		expect(user.id).toBeTypeOf("number");
		expect(user.name).toBe("Alice");
		expect(user.email).toBe("alice@example.com");
	});

	it("email disimpan lowercase", async () => {
		await dbCreateUser(db, "Bob", "BOB@Example.com", "hashed");
		const found = await dbFindUserByEmail(db, "bob@example.com");
		expect(found).toBeDefined();
		expect(found?.email).toBe("bob@example.com");
	});

	it("menemukan user berdasarkan email (case-insensitive)", async () => {
		await dbCreateUser(db, "Carol", "carol@example.com", "hashed");
		const found = await dbFindUserByEmail(db, "CAROL@EXAMPLE.COM");
		expect(found).toBeDefined();
		expect(found?.name).toBe("Carol");
	});

	it("mengembalikan undefined jika user tidak ditemukan", async () => {
		const found = await dbFindUserByEmail(db, "notexist@example.com");
		expect(found).toBeUndefined();
	});

	it("gagal jika email duplikat", async () => {
		await dbCreateUser(db, "Dan", "dan@example.com", "hashed");
		await expect(
			dbCreateUser(db, "Dan2", "dan@example.com", "hashed2"),
		).rejects.toThrow();
	});
});

describe("DB Utils — Sessions", () => {
	beforeEach(async () => {
		db = createClient({ url: "file::memory:" });
		await seedSchema(db);
	});

	afterEach(() => {
		db.close();
	});

	it("membuat dan menemukan session via token", async () => {
		const user = await dbCreateUser(db, "Eve", "eve@example.com", "hashed");
		const future = new Date(Date.now() + 86_400_000);
		await dbCreateSession(db, "sess-1", user.id, "token-abc", future);

		const row = await dbFindSessionByToken(db, "token-abc");
		expect(row).toBeDefined();
		expect(row?.token).toBe("token-abc");
		expect(row?.name).toBe("Eve");
	});

	it("mengembalikan undefined untuk token yang tidak ada", async () => {
		const row = await dbFindSessionByToken(db, "nonexistent-token");
		expect(row).toBeUndefined();
	});

	it("menghapus session berdasarkan token", async () => {
		const user = await dbCreateUser(db, "Frank", "frank@example.com", "hashed");
		const future = new Date(Date.now() + 86_400_000);
		await dbCreateSession(db, "sess-2", user.id, "token-xyz", future);

		await dbDeleteSession(db, "token-xyz");

		const row = await dbFindSessionByToken(db, "token-xyz");
		expect(row).toBeUndefined();
	});

	it("session terhapus jika user dihapus (CASCADE)", async () => {
		const user = await dbCreateUser(
			db,
			"Grace",
			"grace@example.com",
			"hashed",
		);
		const future = new Date(Date.now() + 86_400_000);
		await dbCreateSession(db, "sess-3", user.id, "token-cascade", future);

		await db.execute({
			sql: "DELETE FROM users WHERE id = ?",
			args: [user.id],
		});

		const sessions = await db.execute(
			"SELECT * FROM sessions WHERE id = 'sess-3'",
		);
		expect(sessions.rows).toHaveLength(0);
	});
});
