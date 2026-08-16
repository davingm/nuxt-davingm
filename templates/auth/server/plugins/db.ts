import { initDb } from "../utils/db";

/**
 * Plugin Nitro: inisialisasi database saat server pertama kali start.
 *
 * - Mode "update"      → buat tabel jika belum ada, data tetap
 * - Mode "create-drop" → drop & buat ulang semua tabel (set DB_TYPE=create-drop di .env)
 *
 * Seeder hanya dijalankan jika tabel users masih kosong.
 */
export default defineNitroPlugin(async () => {
	console.log("[Server] Menginisialisasi database...");
	await initDb();
	console.log("[Server] Database siap.");
});
