import { describe, expect, it } from "vitest";
import { readonly, ref } from "vue";

// Provide global Nuxt auto-imports in test environment if needed
// @ts-ignore
globalThis.ref = ref;
// @ts-ignore
globalThis.readonly = readonly;

describe("usePortfolio", () => {
	it("returns default portfolio configuration", async () => {
		const { usePortfolio } = await import("../../app/composables/usePortfolio");
		const { config, getFullTitle } = usePortfolio();

		expect(config.value.name).toBe("Davin");
		expect(config.value.email).toBe("davin@davingm.com");
		expect(getFullTitle("Projects")).toBe("Projects — Davin");
		expect(getFullTitle()).toBe("Davin — Full-Stack Engineer & CLI Creator");
	});
});
