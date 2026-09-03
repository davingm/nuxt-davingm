import path from "path";
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
		environment: "jsdom",
		setupFiles: "test/setup.ts",
		coverage: {
			provider: "v8",
			reporter: ["text", "lcov"],
			all: true,
		},
	},
});
