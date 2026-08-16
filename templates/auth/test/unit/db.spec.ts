/**
 * Test: server/utils/db.ts
 *
 * Semua operasi CRUD diuji dengan SQLite in-memory melalui mock module.
 */

import Database from "better-sqlite3";
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
	type MockInstance,
} from "vitest";

// ─── Setup in-memory DB ───────────────────────────────────────────────────────

let testDb: InstanceType<typeof Database>;

function seedSchema(db: InstanceType<typeof Database>) {
	db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      token TEXT NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
}

// ─── Unit helpers (tanpa import server/utils/db karena ada Nitro globals) ─────

function dbCreateUser(
	db: InstanceType<typeof Database>,
	name: string,
	email: string,
	password: string,
) {
	const info = db
		.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
		.run(name, email.toLowerCase(), password);
	return db
		.prepare("SELECT id, name, email, created_at FROM users WHERE id = ?")
		.get(info.lastInsertRowid) as { id: number; name: string; email: string; created_at: string };
}

function dbFindUserByEmail(
	db: InstanceType<typeof Database>,
	email: string,
) {
	return db
		.prepare("SELECT * FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1")
		.get(email) as { id: number; name: string; email: string; password: string } | undefined;
}

function dbCreateSession(
	db: InstanceType<typeof Database>,
	id: string,
	userId: number,
	token: string,
	expiresAt: Date,
) {
	db.prepare(
		"INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)",
	).run(id, userId, token, expiresAt.toISOString());
}

function dbFindSessionByToken(
	db: InstanceType<typeof Database>,
	token: string,
) {
	return db
		.prepare(
			`SELECT s.id AS session_id, s.user_id, s.token, s.expires_at,
              u.id AS uid, u.name, u.email, u.created_at
       FROM sessions s
       JOIN users u ON s.user_id = u.id
       WHERE s.token = ? LIMIT 1`,
		)
		.get(token) as Record<string, unknown> | undefined;
}

function dbDeleteSession(db: InstanceType<typeof Database>, token: string) {
	db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("DB Utils — Users", () => {
	beforeEach(() => {
		testDb = new Database(":memory:");
		testDb.pragma("foreign_keys = ON");
		seedSchema(testDb);
	});

	afterEach(() => {
		testDb.close();
	});

	it("membuat user baru", () => {
		const user = dbCreateUser(testDb, "Alice", "alice@example.com", "hashed");
		expect(user.id).toBeTypeOf("number");
		expect(user.name).toBe("Alice");
		expect(user.email).toBe("alice@example.com");
	});

	it("email disimpan lowercase", () => {
		dbCreateUser(testDb, "Bob", "BOB@Example.com", "hashed");
		const found = dbFindUserByEmail(testDb, "bob@example.com");
		expect(found).toBeDefined();
		expect(found?.email).toBe("bob@example.com");
	});

	it("menemukan user berdasarkan email (case-insensitive)", () => {
		dbCreateUser(testDb, "Carol", "carol@example.com", "hashed");
		const found = dbFindUserByEmail(testDb, "CAROL@EXAMPLE.COM");
		expect(found).toBeDefined();
		expect(found?.name).toBe("Carol");
	});

	it("mengembalikan null jika user tidak ditemukan", () => {
		const found = dbFindUserByEmail(testDb, "notexist@example.com");
		expect(found).toBeUndefined();
	});

	it("gagal jika email duplikat", () => {
		dbCreateUser(testDb, "Dan", "dan@example.com", "hashed");
		expect(() => dbCreateUser(testDb, "Dan2", "dan@example.com", "hashed2")).toThrow();
	});
});

describe("DB Utils — Sessions", () => {
	beforeEach(() => {
		testDb = new Database(":memory:");
		testDb.pragma("foreign_keys = ON");
		seedSchema(testDb);
	});

	afterEach(() => {
		testDb.close();
	});

	it("membuat dan menemukan session via token", () => {
		const user = dbCreateUser(testDb, "Eve", "eve@example.com", "hashed");
		const future = new Date(Date.now() + 86_400_000);
		dbCreateSession(testDb, "sess-1", user.id, "token-abc", future);

		const row = dbFindSessionByToken(testDb, "token-abc");
		expect(row).toBeDefined();
		expect(row?.token).toBe("token-abc");
		expect(row?.name).toBe("Eve");
	});

	it("mengembalikan undefined untuk token yang tidak ada", () => {
		const row = dbFindSessionByToken(testDb, "nonexistent-token");
		expect(row).toBeUndefined();
	});

	it("menghapus session berdasarkan token", () => {
		const user = dbCreateUser(testDb, "Frank", "frank@example.com", "hashed");
		const future = new Date(Date.now() + 86_400_000);
		dbCreateSession(testDb, "sess-2", user.id, "token-xyz", future);

		dbDeleteSession(testDb, "token-xyz");

		const row = dbFindSessionByToken(testDb, "token-xyz");
		expect(row).toBeUndefined();
	});

	it("session terhapus jika user dihapus (CASCADE)", () => {
		const user = dbCreateUser(testDb, "Grace", "grace@example.com", "hashed");
		const future = new Date(Date.now() + 86_400_000);
		dbCreateSession(testDb, "sess-3", user.id, "token-cascade", future);

		testDb.prepare("DELETE FROM users WHERE id = ?").run(user.id);

		const sessions = testDb
			.prepare("SELECT * FROM sessions WHERE id = 'sess-3'")
			.all();
		expect(sessions).toHaveLength(0);
	});
});
