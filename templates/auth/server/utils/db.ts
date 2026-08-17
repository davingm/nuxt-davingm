import fs from "node:fs";
import path from "node:path";
import { type Client, createClient } from "@libsql/client";
import { runMigrations } from "../database/migrations";
import { DatabaseSeeder } from "../database/seeders/DatabaseSeeder";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserRecord {
	id: number;
	name: string;
	email: string;
	password?: string;
	created_at?: string;
	updated_at?: string;
}

export interface SessionRecord {
	id: string;
	user_id: number;
	token: string;
	expires_at: string;
	created_at?: string;
}

// ─── Singleton Connection ─────────────────────────────────────────────────────

let client: Client | null = null;
let initialized = false;

function getDbUrl(): string {
	let dbPath = ".data/database.sqlite";

	try {
		const config = useRuntimeConfig();
		if (config.dbDatabase) dbPath = config.dbDatabase as string;
	} catch {
		// CLI fallback — useRuntimeConfig tidak tersedia di luar Nitro context
		dbPath = process.env.DB_DATABASE || ".data/database.sqlite";
	}

	if (dbPath === ":memory:") return "file::memory:";

	const absPath = path.isAbsolute(dbPath)
		? dbPath
		: path.resolve(process.cwd(), dbPath);

	// Pastikan direktori ada
	const dir = path.dirname(absPath);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	return `file:${absPath}`;
}

export function getConnection(): Client {
	if (client) return client;
	client = createClient({ url: getDbUrl() });
	return client;
}

// ─── Init (migrasi + seed otomatis saat server start) ─────────────────────────

export async function initDb(): Promise<void> {
	if (initialized) return;
	initialized = true;
	await runMigrations();
	await new DatabaseSeeder().run();
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function findUserByEmail(
	email: string,
): Promise<UserRecord | null> {
	await initDb();
	const conn = getConnection();
	const result = await conn.execute({
		sql: "SELECT * FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1",
		args: [email],
	});
	if (!result.rows.length) return null;
	return rowToUser(result.rows[0]);
}

export async function findUserById(id: number): Promise<UserRecord | null> {
	await initDb();
	const conn = getConnection();
	const result = await conn.execute({
		sql: "SELECT id, name, email, created_at, updated_at FROM users WHERE id = ? LIMIT 1",
		args: [id],
	});
	if (!result.rows.length) return null;
	return rowToUser(result.rows[0]);
}

export async function createUser(
	name: string,
	email: string,
	hashedPassword: string,
): Promise<UserRecord> {
	await initDb();
	const conn = getConnection();
	const result = await conn.execute({
		sql: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
		args: [name, email.toLowerCase(), hashedPassword],
	});

	const user = await findUserById(Number(result.lastInsertRowid));
	if (!user) throw new Error("Gagal membuat akun pengguna");
	return user;
}

// ─── Sessions ─────────────────────────────────────────────────────────────────

export async function createSession(
	id: string,
	userId: number,
	token: string,
	expiresAt: Date,
): Promise<SessionRecord> {
	await initDb();
	const conn = getConnection();
	const isoExpires = expiresAt.toISOString();
	await conn.execute({
		sql: "INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)",
		args: [id, userId, token, isoExpires],
	});
	return { id, user_id: userId, token, expires_at: isoExpires };
}

export async function findSessionByToken(
	token: string,
): Promise<{ session: SessionRecord; user: UserRecord } | null> {
	await initDb();
	const conn = getConnection();

	const result = await conn.execute({
		sql: `SELECT
        s.id        AS session_id,
        s.user_id,
        s.token,
        s.expires_at,
        u.id        AS uid,
        u.name,
        u.email,
        u.created_at,
        u.updated_at
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token = ?
      LIMIT 1`,
		args: [token],
	});

	if (!result.rows.length) return null;

	const row = result.rows[0];

	// Cek apakah session sudah kadaluarsa
	if (new Date(String(row.expires_at)).getTime() < Date.now()) {
		await deleteSession(token);
		return null;
	}

	return {
		session: {
			id: String(row.session_id),
			user_id: Number(row.user_id),
			token: String(row.token),
			expires_at: String(row.expires_at),
		},
		user: {
			id: Number(row.uid),
			name: String(row.name),
			email: String(row.email),
			created_at: row.created_at ? String(row.created_at) : undefined,
			updated_at: row.updated_at ? String(row.updated_at) : undefined,
		},
	};
}

export async function deleteSession(token: string): Promise<void> {
	await initDb();
	const conn = getConnection();
	await conn.execute({
		sql: "DELETE FROM sessions WHERE token = ?",
		args: [token],
	});
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function rowToUser(row: Record<string, unknown>): UserRecord {
	return {
		id: Number(row.id),
		name: String(row.name),
		email: String(row.email),
		password: row.password ? String(row.password) : undefined,
		created_at: row.created_at ? String(row.created_at) : undefined,
		updated_at: row.updated_at ? String(row.updated_at) : undefined,
	};
}
