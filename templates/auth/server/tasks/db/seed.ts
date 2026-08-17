import { DatabaseSeeder } from "../../database/seeders/DatabaseSeeder";

const defineTask =
	typeof defineNitroTask !== "undefined" ? defineNitroTask : (fn: any) => fn;

export default defineTask(async () => {
	console.log("[Nitro Task] Memulai tugas db:seed...");
	await new DatabaseSeeder().run();
	return { result: "Seeding database berhasil diselesaikan." };
});

if (process.argv[1]?.includes("seed")) {
	new DatabaseSeeder().run().catch((err) => {
		console.error("[Seeder] Proses seeding gagal:", err);
		process.exit(1);
	});
}
