import { beforeEach, vi } from "vitest";

// ─── Nuxt composable mocks ────────────────────────────────────────────────────

beforeEach(() => {
	// useRuntimeConfig — kembalikan konfigurasi default untuk test
	// @ts-ignore
	globalThis.useRuntimeConfig = () => ({
		dbConnection: "sqlite",
		dbDatabase: ":memory:",
		dbType: "create-drop",
		jwtSecret: "test-secret",
		public: { apiBase: "http://localhost:3000/api", appName: "Test App" },
	});

	// useApi — tests dapat override sesuai kebutuhan
	// @ts-ignore
	globalThis.useApi = globalThis.useApi || (() => (path: string) => Promise.resolve(null));
});
