// https://nuxt.com/docs/api/configuration/nuxt-config > For Nuxt
// https://nuxt.davingm.com/docs/api/configuration/nuxt-config > For Starter

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: (globalThis as any).process?.env?.ENABLE_DEVTOOLS === 'true',
  },
  modules: ['@nuxt/icon'],
  
  components: [
    {
      path: '~/components/ui',
      pathPrefix: false, // Wajib: agar <Breadcrumb>, bukan <UiBreadcrumbBreadcrumb>
    },
    '~/components', // Wajib: kembalikan scan default untuk komponen di luar folder ui/
  ],

  icon: {
    serverBundle: {
      collections: ['heroicons', 'simple-icons'],
    },
    // Hanya bundle icon yang benar-benar dipakai — drastis kurangi ukuran bundle
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
  },
  features: {
    devLogs: 'silent',
  },
  // Prerender halaman statis agar tidak perlu SSR setiap request
  routeRules: {
    '/': { prerender: true },
  },
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
    build: {
      // Pisah chunk agar browser bisa cache lebih efisien
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/vue') || id.includes('node_modules/vue-router')) {
              return 'vue-vendor'
            }
          },
        },
      },
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
