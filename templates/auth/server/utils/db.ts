import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
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

let db: InstanceType<typeof Database> | null = null;
let initialized = false;

function getDbPath(): string {
	let dbPath = ".data/database.sqlite";

	try {
		const config = useRuntimeConfig();
		if (config.dbDatabase) dbPath = config.dbDatabase as string;
	} catch {
		// CLI fallback — useRuntimeConfig tidak tersedia di luar Nitro context
		dbPath = process.env.DB_DATABASE || ".data/database.sqlite";
	}

	return path.isAbsolute(dbPath)
		? dbPath
		: path.resolve(process.cwd(), dbPath);
}

function getConnection(): InstanceType<typeof Database> {
	if (db) return db;

	const dbPath = getDbPath();
	const dbDir = path.dirname(dbPath);

	if (!fs.existsSync(dbDir)) {
		fs.mkdirSync(dbDir, { recursive: true });
	}

	db = new Database(dbPath);
	db.pragma("journal_mode = WAL");
	db.pragma("foreign_keys = ON");

	return db;
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
	const row = conn
		.prepare("SELECT * FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1")
		.get(email) as UserRecord | undefined;
	return row ?? null;
}

export async function findUserById(id: number): Promise<UserRecord | null> {
	await initDb();
	const conn = getConnection();
	const row = conn
		.prepare(
			"SELECT id, name, email, created_at, updated_at FROM users WHERE id = ? LIMIT 1",
		)
		.get(id) as UserRecord | undefined;
	return row ?? null;
}

export async function createUser(
	name: string,
	email: string,
	hashedPassword: string,
): Promise<UserRecord> {
	await initDb();
	const conn = getConnection();
	const info = conn
		.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
		.run(name, email.toLowerCase(), hashedPassword);

	const user = await findUserById(info.lastInsertRowid as number);
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
	conn
		.prepare(
			"INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)",
		)
		.run(id, userId, token, isoExpires);
	return { id, user_id: userId, token, expires_at: isoExpires };
}

export async function findSessionByToken(
	token: string,
): Promise<{ session: SessionRecord; user: UserRecord } | null> {
	await initDb();
	const conn = getConnection();

	const row = conn
		.prepare(
			`SELECT
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
		)
		.get(token) as Record<string, unknown> | undefined;

	if (!row) return null;

	// Cek apakah session sudah kadaluarsa
	if (new Date(String(row.expires_at)).getTime() < Date.now()) {
		await deleteSession(token);
		return null;
	}

	return {
		session: {
			id: String(row.session_id),
			user_id: row.user_id as number,
			token: String(row.token),
			expires_at: String(row.expires_at),
		},
		user: {
			id: row.uid as number,
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
	conn.prepare("DELETE FROM sessions WHERE token = ?").run(token);
}
