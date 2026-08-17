// Plugin client-side: sinkronkan Vue state tema dengan kelas DOM
// yang sudah di-set oleh inline critical script di app.vue (anti FOUC)
export default defineNuxtPlugin(() => {
	const { syncTheme } = useTheme();
	syncTheme();
});
