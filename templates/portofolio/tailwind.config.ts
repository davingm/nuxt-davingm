import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
	content: [
		"./app/**/*.{vue,js,ts,jsx,tsx}",
		"./components/**/*.{vue,js,ts,jsx,tsx}",
		"./layouts/**/*.{vue,js,ts,jsx,tsx}",
		"./pages/**/*.{vue,js,ts,jsx,tsx}",
		"./content/**/*.md",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Geist Sans"', "system-ui", "-apple-system", "sans-serif"],
				mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
			},
			colors: {
				vp: {
					// VitePress & Geist refined neutral palette
					bg: {
						light: "#fafafa",
						dark: "#121212",
					},
					surface: {
						light: "#ffffff",
						dark: "#181818",
					},
					elevated: {
						light: "#f4f4f5",
						dark: "#202020",
					},
					border: {
						light: "#e5e5e5",
						dark: "#27272a",
					},
					"border-hover": {
						light: "#d4d4d8",
						dark: "#3f3f46",
					},
				},
			},
		},
	},
	plugins: [forms, typography],
} satisfies Config;
