export const useApi = () => {
  const config = useRuntimeConfig()

  return $fetch.create({
    baseURL: config.public.apiBase,

    headers: {
      Accept: 'application/json',
    },

    onRequest({ options }) {
      // Tempat untuk request configuration.
      // Nanti authentication token bisa dipasang di sini.
    },

    onResponse({ response }) {
      // Tempat untuk menangani response global.
      console.debug('API Response:', response.status)
    },

    onRequestError({ error }) {
      console.error('API Request Error:', error)
    },

    onResponseError({ response }) {
      console.error(
        'API Response Error:',
        response.status,
        response._data,
      )
    },
  })
}