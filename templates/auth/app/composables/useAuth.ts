export interface AuthUser {
	id: number | string;
	name: string;
	email: string;
	created_at?: string;
}

export const useAuth = () => {
	const user = useState<AuthUser | null>("auth_user", () => null);
	const status = useState<"loading" | "authenticated" | "unauthenticated">(
		"auth_status",
		() => "loading",
	);

	const fetchUser = async () => {
		status.value = "loading";
		try {
			const data = await $fetch<{ user: AuthUser }>("/api/auth/me", {
				headers: useRequestHeaders(["cookie"]) as Record<string, string>,
			});
			user.value = data.user;
			status.value = "authenticated";
			return data.user;
		} catch {
			user.value = null;
			status.value = "unauthenticated";
			return null;
		}
	};

	const login = async (credentials: { email: string; password: string }) => {
		const res = await $fetch<{ message: string; user: AuthUser }>(
			"/api/auth/login",
			{
				method: "POST",
				body: credentials,
			},
		);
		user.value = res.user;
		status.value = "authenticated";
		return res;
	};

	const register = async (formData: {
		name: string;
		email: string;
		password: string;
		password_confirmation: string;
	}) => {
		const res = await $fetch<{ message: string; user: AuthUser }>(
			"/api/auth/register",
			{
				method: "POST",
				body: formData,
			},
		);
		user.value = res.user;
		status.value = "authenticated";
		return res;
	};

	const logout = async () => {
		try {
			await $fetch("/api/auth/logout", { method: "POST" });
		} catch {
			// Ignore errors on logout
		} finally {
			user.value = null;
			status.value = "unauthenticated";
			navigateTo("/login");
		}
	};

	return {
		user,
		status,
		fetchUser,
		login,
		register,
		logout,
		isAuthenticated: computed(
			() => status.value === "authenticated" && !!user.value,
		),
	};
};
