// https://nuxt.com/docs/api/configuration/nuxt-config > For Nuxt
// https://nuxt.davingm.com/docs/api/configuration/nuxt-config > For Starter

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: (globalThis as any).process?.env?.ENABLE_DEVTOOLS === 'true',
  },
  modules: ['@nuxt/icon'],
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiBase: '',
    },
  },
})
