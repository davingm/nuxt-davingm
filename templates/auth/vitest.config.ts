import path from "node:path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "app"),
			"@": path.resolve(__dirname, "app"),
		},
	},
	test: {
		globals: true,
		environment: "node",
		setupFiles: "test/setup.ts",
		coverage: {
			provider: "v8",
			reporter: ["text", "lcov"],
			include: ["server/**/*.ts", "app/**/*.ts"],
			exclude: ["**/*.d.ts", "**/*.spec.ts"],
		},
	},
});
