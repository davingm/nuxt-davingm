import { describe, expect, it, vi } from "vitest";

describe("useUserService", () => {
	it("calls api with /users on getAll", async () => {
		const mockApi = vi.fn().mockResolvedValue([]);
		// @ts-ignore
		globalThis.useApi = () => mockApi;

		const { useUserService } = await import("~/composables/useUserService");
		const svc = useUserService();

		await svc.getAll();

		expect(mockApi).toHaveBeenCalled();
		expect(mockApi.mock.calls[0][0]).toBe("/users");
	});

	it("calls api with /users/:id on getById", async () => {
		const mockApi = vi.fn().mockResolvedValue({ id: 1, name: "Alice" });
		// @ts-ignore
		globalThis.useApi = () => mockApi;

		const { useUserService } = await import("~/composables/useUserService");
		const svc = useUserService();

		await svc.getById(1);

		expect(mockApi).toHaveBeenCalled();
		expect(mockApi.mock.calls[0][0]).toBe("/users/1");
	});
});
