import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import { DatabaseSeeder } from "../seeders/DatabaseSeeder";

/**
 * Konfigurasi database dibaca dari environment variables.
 *
 * DB_CONNECTION  : Driver database — sqlite (default)
 * DB_DATABASE    : Path file SQLite (default: .data/database.sqlite)
 * DB_TYPE        : Behavior saat server start:
 *                    - "update"      : Buat tabel jika belum ada, data tetap (default)
 *                    - "create-drop" : Drop & buat ulang semua tabel setiap start
 */

function loadEnv() {
	const proc = process as unknown as { loadEnvFile?: (path?: string) => void };
	if (typeof proc.loadEnvFile === "function") {
		try {
			proc.loadEnvFile(".env");
		} catch {
			// Abaikan jika .env tidak ditemukan
		}
	}
}

export function getDbConfig() {
	loadEnv();
	return {
		connection: (process.env.DB_CONNECTION || "sqlite").toLowerCase(),
		database: process.env.DB_DATABASE || ".data/database.sqlite",
		dbType: (process.env.DB_TYPE || "update").toLowerCase() as
			| "update"
			| "create-drop",
	};
}

function getSqliteUrl(database: string): string {
	if (database === ":memory:") return "file::memory:";
	const absPath = path.isAbsolute(database)
		? database
		: path.resolve(process.cwd(), database);

	const dir = path.dirname(absPath);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	return `file:${absPath}`;
}

const CREATE_USERS = `
  CREATE TABLE IF NOT EXISTS users (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    name      TEXT    NOT NULL,
    email     TEXT    NOT NULL UNIQUE,
    password  TEXT    NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

const CREATE_SESSIONS = `
  CREATE TABLE IF NOT EXISTS sessions (
    id         TEXT     PRIMARY KEY,
    user_id    INTEGER  NOT NULL,
    token      TEXT     NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`;

const DROP_SESSIONS = "DROP TABLE IF EXISTS sessions";
const DROP_USERS = "DROP TABLE IF EXISTS users";

/**
 * Jalankan migrasi SQLite.
 * Mode ditentukan oleh DB_TYPE:
 *   - "update"      → CREATE TABLE IF NOT EXISTS (aman untuk data existing)
 *   - "create-drop" → drop semua tabel lalu buat ulang (data hilang)
 */
export async function runMigrations() {
	const cfg = getDbConfig();

	if (cfg.connection !== "sqlite") {
		console.warn(
			`[Migration] Driver "${cfg.connection}" tidak didukung. Project ini hanya mendukung SQLite.`,
		);
		return;
	}

	const db = createClient({ url: getSqliteUrl(cfg.database) });

	try {
		if (cfg.dbType === "create-drop") {
			console.log(
				"[Migration] Mode: create-drop — menghapus dan membuat ulang semua tabel...",
			);
			await db.execute(DROP_SESSIONS);
			await db.execute(DROP_USERS);
		} else {
			console.log("[Migration] Mode: update — membuat tabel jika belum ada...");
		}

		await db.execute(CREATE_USERS);
		await db.execute(CREATE_SESSIONS);
		console.log("[Migration] Migrasi SQLite selesai.");
	} finally {
		db.close();
	}
}

/**
 * Drop semua tabel lalu jalankan migrasi ulang.
 * Opsional: jalankan seeder setelah fresh.
 */
export async function freshDatabase(shouldSeed = false) {
	const cfg = getDbConfig();
	console.log("[Database] Memulai reset ulang database...");

	if (cfg.connection !== "sqlite") {
		console.warn(
			`[Database] Driver "${cfg.connection}" tidak didukung. Project ini hanya mendukung SQLite.`,
		);
		return;
	}

	const db = createClient({ url: getSqliteUrl(cfg.database) });

	try {
		await db.execute(DROP_SESSIONS);
		await db.execute(DROP_USERS);
		await db.execute(CREATE_USERS);
		await db.execute(CREATE_SESSIONS);
		console.log("[Database] Reset database selesai.");
	} finally {
		db.close();
	}

	if (shouldSeed) {
		console.log("[Database] Menjalankan seeder setelah reset...");
		await new DatabaseSeeder().run();
	}
}

// Eksekusi langsung via CLI: tsx server/database/migrations/index.ts
if (process.argv[1]?.includes("migrations")) {
	runMigrations().catch((err) => {
		console.error("[Migration] Gagal:", err);
		process.exit(1);
	});
}
