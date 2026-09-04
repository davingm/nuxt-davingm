import { describe, expect, it } from "vitest";
import { readonly, ref } from "vue";

// @ts-ignore
globalThis.ref = ref;
// @ts-ignore
globalThis.readonly = readonly;

/**
 * usePortfolio masih dipertahankan sebagai legacy utility
 * untuk helper getFullTitle(). Data user kini bersumber dari
 * content/www/*.yml via useUser composables.
 */
describe("usePortfolio (legacy title helper)", () => {
	it("generates page title correctly", async () => {
		const { usePortfolio } = await import("../../app/composables/usePortfolio");
		const { getFullTitle } = usePortfolio();

		expect(getFullTitle("Projects")).toBe("Projects — Davin");
		expect(getFullTitle()).toBe("Davin — Full-Stack Engineer & CLI Creator");
	});
});
