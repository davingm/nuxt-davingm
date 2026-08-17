/**
 * Redirect authenticated users away from the landing page (/) to /dashboard.
 * Only runs on the CLIENT to avoid SSR payload (_payload.json) errors caused
 * when a server-side redirect prevents Nuxt from generating the page payload.
 */
export default defineNuxtRouteMiddleware(() => {
	// Skip on server — let SSR render the page normally.
	// The client will handle the redirect after hydration.
	if (import.meta.server) return;

	const { isAuthenticated } = useAuth();

	if (isAuthenticated.value) {
		return navigateTo("/dashboard", { replace: true });
	}
});
