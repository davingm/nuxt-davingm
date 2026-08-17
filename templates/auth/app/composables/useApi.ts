export const useApi = () => {
	const config = useRuntimeConfig();

	return $fetch.create({
		baseURL: config.public.apiBase,

		headers: {
			Accept: "application/json",
		},

		onRequest(_ctx) {
			// Tempat untuk request configuration.
			// Nanti authentication token bisa dipasang di sini.
		},

		onResponse({ response }) {
			if (import.meta.dev) {
				console.debug("API Response:", response.status);
			}
		},

		onRequestError({ error }) {
			if (import.meta.dev) {
				console.error("API Request Error:", error);
			}
		},

		onResponseError({ response }) {
			if (import.meta.dev) {
				console.error("API Response Error:", response.status, response._data);
			}
		},
	});
};
