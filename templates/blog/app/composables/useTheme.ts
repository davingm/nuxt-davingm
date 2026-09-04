export type Theme = "light" | "dark";

export const useTheme = () => {
	const theme = useState<Theme>("theme", () => "light");

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

	const initTheme = () => {
		if (import.meta.client) {
			const savedTheme = localStorage.getItem("theme") as Theme | null;
			if (savedTheme === "light" || savedTheme === "dark") {
				applyTheme(savedTheme);
			} else {
				const systemDark = window.matchMedia(
					"(prefers-color-scheme: dark)",
				).matches;
				applyTheme(systemDark ? "dark" : "light");
			}
		}
	};

	return {
		theme,
		toggleTheme,
		initTheme,
	};
};
