// https://nuxt.com/docs/api/configuration/nuxt-config > For Nuxt
// https://nuxt.davingm.com/docs/api/configuration/nuxt-config > For Starter

export default defineNuxtConfig({
				compatibilityDate: "2025-07-15",
				ssr: true,

				modules: ["@nuxt/icon", "@nuxtjs/color-mode", "@nuxt/content"],

				colorMode: {
								classSuffix: "",
								preference: "system",
								fallback: "dark",
				},

				content: {
								// Nuxt Content config
				},

				vite: {
								optimizeDeps: {
												exclude: [
																"remark-gfm",
																"remark-emoji",
																"remark-mdc",
																"remark-rehype",
																"rehype-raw",
																"parse5",
																"unified",
																"debug",
																"extend",
												],
								},
				},

				nitro: {
								prerender: {
												crawlLinks: true,
												routes: ["/"],
								},
				},

				css: ["~/assets/css/tailwind.css"],

				postcss: {
								plugins: {
												tailwindcss: {},
												autoprefixer: {},
								},
				},

				devtools: {
								enabled: true,
				},

				runtimeConfig: {
								public: {
												apiBase: "",
								},
				},
});
