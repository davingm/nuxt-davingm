import { freshDatabase } from "../../database/migrations";

const defineTask =
	typeof defineNitroTask !== "undefined" ? defineNitroTask : (fn: any) => fn;

export default defineTask(async (event: any) => {
	console.log("[Nitro Task] Memulai tugas db:fresh...");
	const shouldSeed = Boolean(event?.payload?.seed);
	await freshDatabase(shouldSeed);
	return { result: "Reset fresh database berhasil diselesaikan." };
});

if (process.argv[1]?.includes("fresh")) {
	const shouldSeed = process.argv.includes("--seed");
	freshDatabase(shouldSeed).catch((err) => {
		console.error("[Database] Reset database gagal:", err);
		process.exit(1);
	});
}
