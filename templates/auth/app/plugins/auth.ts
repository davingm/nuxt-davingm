export default defineNuxtPlugin(async () => {
	const { fetchUser } = useAuth();
	await fetchUser();
});
