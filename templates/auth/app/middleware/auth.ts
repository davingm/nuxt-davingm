export default defineNuxtRouteMiddleware(async () => {
	const { user, fetchUser, status } = useAuth();

	if (status.value === "loading" || !user.value) {
		await fetchUser();
	}

	if (!user.value) {
		return navigateTo("/login");
	}
});
