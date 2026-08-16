import { Seeder } from "./Seeder";
import { UserSeeder } from "./UserSeeder";

function loadEnv() {
	const processEnv = process as unknown as {
		loadEnvFile?: (path?: string) => void;
	};
	if (typeof processEnv.loadEnvFile === "function") {
		try {
			processEnv.loadEnvFile(".env");
		} catch {
			// Abaikan jika .env tidak ada atau sudah dimuat
		}
	}
}

export class DatabaseSeeder extends Seeder {
	async run(): Promise<void> {
		loadEnv();
		console.log("[Seeder] Memulai proses seeding database...");

		await this.call([
			UserSeeder,
			// Tambahkan seeder tambahan di sini, contoh:
			// ProductSeeder,
			// PostSeeder,
		]);

		console.log("[Seeder] Seluruh seeder selesai dijalankan.");
	}

	private async call(seeders: (new () => Seeder)[]): Promise<void> {
		for (const SeederClass of seeders) {
			const seeder = new SeederClass();
			await seeder.run();
		}
	}
}

// Eksekusi langsung jika dipanggil via CLI
if (process.argv[1]?.includes("DatabaseSeeder")) {
	new DatabaseSeeder().run().catch((err) => {
		console.error("[Seeder] Proses seeding gagal:", err);
		process.exit(1);
	});
}
