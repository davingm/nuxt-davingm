/**
 * Test: server/utils/session.ts
 *
 * Menguji helper cookie session tanpa memerlukan database.
 */

import { describe, expect, it, vi, beforeEach } from "vitest";

// ─── Mock H3 ──────────────────────────────────────────────────────────────────

vi.mock("h3", () => {
	const cookies: Record<string, string> = {};
	const headers: Record<string, string> = {};

	return {
		parseCookies: vi.fn(() => ({ ...cookies })),
		getHeader: vi.fn((_, name: string) => headers[name] ?? null),
		setCookie: vi.fn((_, name: string, value: string) => {
			cookies[name] = value;
		}),
		deleteCookie: vi.fn((_, name: string) => {
			delete cookies[name];
		}),
		__cookies: cookies,
		__headers: headers,
	};
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Session Utils — getSessionToken", () => {
	it("mengembalikan null jika tidak ada cookie dan header", async () => {
		const h3 = await import("h3");
		(h3.parseCookies as ReturnType<typeof vi.fn>).mockReturnValue({});
		(h3.getHeader as ReturnType<typeof vi.fn>).mockReturnValue(null);

		const { getSessionToken } = await import("../../server/utils/session");
		const token = getSessionToken({} as any);
		expect(token).toBeNull();
	});

	it("membaca token dari cookie auth_token", async () => {
		const h3 = await import("h3");
		(h3.parseCookies as ReturnType<typeof vi.fn>).mockReturnValue({
			auth_token: "cookie-token-123",
		});

		const { getSessionToken } = await import("../../server/utils/session");
		const token = getSessionToken({} as any);
		expect(token).toBe("cookie-token-123");
	});

	it("membaca token dari Authorization Bearer header", async () => {
		const h3 = await import("h3");
		(h3.parseCookies as ReturnType<typeof vi.fn>).mockReturnValue({});
		(h3.getHeader as ReturnType<typeof vi.fn>).mockReturnValue(
			"Bearer bearer-token-456",
		);

		const { getSessionToken } = await import("../../server/utils/session");
		const token = getSessionToken({} as any);
		expect(token).toBe("bearer-token-456");
	});

	it("cookie auth_token diutamakan dari header", async () => {
		const h3 = await import("h3");
		(h3.parseCookies as ReturnType<typeof vi.fn>).mockReturnValue({
			auth_token: "cookie-wins",
		});
		(h3.getHeader as ReturnType<typeof vi.fn>).mockReturnValue(
			"Bearer header-token",
		);

		const { getSessionToken } = await import("../../server/utils/session");
		const token = getSessionToken({} as any);
		expect(token).toBe("cookie-wins");
	});
});
