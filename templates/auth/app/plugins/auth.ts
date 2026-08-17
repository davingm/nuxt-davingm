export default defineNuxtPlugin(async () => {
	// Cek cookie has_session (non-httpOnly) sebelum hit /api/auth/me.
	// Kalau tidak ada, user pasti belum login — skip request untuk hindari 401 di console.
	const hasSession = useCookie("has_session");
	if (!hasSession.value) {
		const status = useState<"loading" | "authenticated" | "unauthenticated">(
			"auth_status",
		);
		status.value = "unauthenticated";
		return;
	}

	const { fetchUser } = useAuth();
	await fetchUser();
});
