// https://nuxt.com/docs/api/configuration/nuxt-config > For Nuxt
// https://nuxt.davingm.com/docs/api/configuration/nuxt-config > For Starter

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: (globalThis as any).process?.env?.ENABLE_DEVTOOLS === 'true',
  },
  css: ['~/app/assets/css/tailwind.css'],
  runtimeConfig: {
    public: {
      apiBase: '',
    },
  },
})
