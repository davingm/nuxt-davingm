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
  nitro: {
    experimental: {
      tasks: true,
    },
    externals: {
      // @libsql/client adalah pure ESM, tidak perlu di-bundle oleh Nitro
      external: ['@libsql/client'],
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ['@libsql/client'],
    },
  },
  runtimeConfig: {
    dbConnection: process.env.DB_CONNECTION || 'sqlite',
    dbDatabase: process.env.DB_DATABASE || '.data/database.sqlite',
    dbType: process.env.DB_TYPE || 'update',
    jwtSecret: process.env.JWT_SECRET || 'supersecretkey_change_me_in_production',
    public: {
      apiBase: process.env.API_BASE || '',
      appName: process.env.NAME_APP || 'Nuxt-app',
    },
  },
})
