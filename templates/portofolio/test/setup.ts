import { beforeEach } from "vitest";

// Provide minimal global mocks for Nuxt composables used in tests
// Tests can override these globals as needed.

beforeEach(() => {
	// mock useRuntimeConfig to avoid runtime errors
	// @ts-ignore
	globalThis.useRuntimeConfig =
		globalThis.useRuntimeConfig || (() => ({ public: { apiBase: "" } }));

	// provide a default useApi mock that tests may override
	// @ts-ignore
	globalThis.useApi =
		globalThis.useApi || (() => (path: string) => Promise.resolve(null));
});
