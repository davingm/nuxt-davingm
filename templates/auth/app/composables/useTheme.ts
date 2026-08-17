export type Theme = "light" | "dark";

export const useTheme = () => {
	// Inisialisasi state dari kelas DOM yang sudah di-set oleh inline script
	// agar tidak ada mismatch antara SSR state dan DOM saat hydration
	const theme = useState<Theme>("theme", () => {
		if (import.meta.client) {
			return document.documentElement.classList.contains("dark")
				? "dark"
				: "light";
		}
		return "light";
	});

	const applyTheme = (newTheme: Theme) => {
		theme.value = newTheme;
		if (import.meta.client) {
			document.documentElement.classList.remove("light", "dark");
			document.documentElement.classList.add(newTheme);
			localStorage.setItem("theme", newTheme);
		}
	};

	const toggleTheme = () => {
		const nextTheme = theme.value === "light" ? "dark" : "light";
		applyTheme(nextTheme);
	};

	// Sinkronkan Vue state dengan kelas DOM (dijalankan di client setelah hydration)
	const syncTheme = () => {
		if (import.meta.client) {
			const domTheme = document.documentElement.classList.contains("dark")
				? "dark"
				: "light";
			if (theme.value !== domTheme) {
				theme.value = domTheme;
			}
		}
	};

	return {
		theme,
		toggleTheme,
		syncTheme,
	};
};
