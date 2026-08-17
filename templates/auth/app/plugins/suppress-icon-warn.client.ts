// devLogs di-set 'silent' di nuxt.config agar built-in printer tidak jalan.
// Kita handle dev:ssr-logs sendiri — filter warn icon, print yang lain normal.
export default defineNuxtPlugin(async (nuxtApp) => {
	if (!import.meta.dev) return;

	const { createConsola } = await import("consola");
	const logger = createConsola({ formatOptions: { colors: true, date: true } });

	nuxtApp.hook("dev:ssr-logs", (logs) => {
		for (const log of logs) {
			// Skip warn dari @nuxt/icon
			if (
				log.type === "warn" &&
				Array.isArray(log.args) &&
				typeof log.args[0] === "string" &&
				log.args[0].includes("[Icon] failed to load icon")
			)
				continue;

			logger.log({
				...log,
				additional: normalizeFilenames(log.stack),
				tag: "ssr",
				stack: undefined,
			});
		}
	});
});

function normalizeFilenames(
	stack: Array<{ source: string; function?: string }> | undefined,
) {
	if (!stack) return "";
	let message = "";
	for (const item of stack) {
		if (item.function) message += `  at ${item.function} (${item.source})\n`;
		else message += `  at ${item.source}\n`;
	}
	return message;
}
