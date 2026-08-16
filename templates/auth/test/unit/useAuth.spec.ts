/**
 * Test: app/composables/useAuth.ts
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

// ─── Mock $fetch ──────────────────────────────────────────────────────────────

const mockFetch = vi.fn();
vi.stubGlobal("$fetch", mockFetch);

// ─── Mock Nuxt globals ────────────────────────────────────────────────────────

const userState = { value: null as any };
const statusState = { value: "loading" as string };

vi.stubGlobal("useState", (key: string, init: () => any) => {
	if (key === "auth_user") return userState;
	if (key === "auth_status") return statusState;
	return { value: init() };
});

vi.stubGlobal("useRequestHeaders", () => ({}));
vi.stubGlobal("navigateTo", vi.fn());
vi.stubGlobal("computed", (fn: () => any) => ({ value: fn() }));

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("useAuth — fetchUser", () => {
	beforeEach(() => {
		userState.value = null;
		statusState.value = "loading";
		mockFetch.mockReset();
	});

	it("set user dan status authenticated saat fetch berhasil", async () => {
		mockFetch.mockResolvedValue({
			user: { id: 1, name: "Alice", email: "alice@example.com" },
		});

		const { useAuth } = await import("~/composables/useAuth");
		const auth = useAuth();
		await auth.fetchUser();

		expect(auth.user.value).toEqual({
			id: 1,
			name: "Alice",
			email: "alice@example.com",
		});
		expect(auth.status.value).toBe("authenticated");
	});

	it("set user null dan status unauthenticated saat fetch gagal", async () => {
		mockFetch.mockRejectedValue(new Error("Unauthorized"));

		const { useAuth } = await import("~/composables/useAuth");
		const auth = useAuth();
		await auth.fetchUser();

		expect(auth.user.value).toBeNull();
		expect(auth.status.value).toBe("unauthenticated");
	});
});

describe("useAuth — login", () => {
	beforeEach(() => {
		userState.value = null;
		statusState.value = "loading";
		mockFetch.mockReset();
	});

	it("set user dan status authenticated setelah login berhasil", async () => {
		mockFetch.mockResolvedValue({
			message: "Login berhasil",
			user: { id: 2, name: "Bob", email: "bob@example.com" },
		});

		const { useAuth } = await import("~/composables/useAuth");
		const auth = useAuth();
		await auth.login({ email: "bob@example.com", password: "secret" });

		expect(auth.user.value?.email).toBe("bob@example.com");
		expect(auth.status.value).toBe("authenticated");
	});

	it("melempar error jika login gagal", async () => {
		mockFetch.mockRejectedValue(new Error("Invalid credentials"));

		const { useAuth } = await import("~/composables/useAuth");
		const auth = useAuth();

		await expect(
			auth.login({ email: "wrong@example.com", password: "bad" }),
		).rejects.toThrow("Invalid credentials");
	});
});

describe("useAuth — logout", () => {
	beforeEach(() => {
		userState.value = { id: 1, name: "Alice", email: "alice@example.com" };
		statusState.value = "authenticated";
		mockFetch.mockReset();
	});

	it("reset user dan redirect ke /login setelah logout", async () => {
		mockFetch.mockResolvedValue({});
		const navigateTo = vi.fn();
		vi.stubGlobal("navigateTo", navigateTo);

		const { useAuth } = await import("~/composables/useAuth");
		const auth = useAuth();
		await auth.logout();

		expect(auth.user.value).toBeNull();
		expect(auth.status.value).toBe("unauthenticated");
		expect(navigateTo).toHaveBeenCalledWith("/login");
	});
});
