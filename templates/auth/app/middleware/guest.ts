export default defineNuxtRouteMiddleware(async () => {
	const { user, fetchUser, status } = useAuth();

	if (status.value === "loading") {
		await fetchUser();
	}

	if (user.value) {
		return navigateTo("/dashboard");
	}
});
