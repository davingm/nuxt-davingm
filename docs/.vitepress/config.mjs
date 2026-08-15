import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Nuxt Starter',
  description: 'Opinionated Nuxt starter generator — scaffold project baru dalam hitungan detik.',
  lang: 'id',

  // Base URL untuk GitHub Pages
  base: '/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#00DC82' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'create-davingm-nuxt' }],
    ['meta', { property: 'og:description', content: 'Opinionated Nuxt starter generator — scaffold project baru dalam hitungan detik.' }],
  ],

  themeConfig: {
    logo: 'https://nuxt.com/assets/design-kit/icon-green.svg',
    siteTitle: 'Nuxt Starter',

    nav: [
      { text: 'Panduan', link: '/guide/getting-started' },
      { text: 'Template', link: '/templates/overview' },
      { text: 'CLI Reference', link: '/cli/usage' },
      {
        text: 'v0.1.0',
        items: [
          { text: 'Changelog', link: '/changelog' },
          { text: 'Kontribusi', link: '/contributing' },
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Pengenalan',
          items: [
            { text: 'Apa itu Nuxt Starter?', link: '/guide/what-is' },
            { text: 'Mulai Cepat', link: '/guide/getting-started' },
            { text: 'Persyaratan', link: '/guide/requirements' },
          ]
        },
        {
          text: 'Penggunaan',
          items: [
            { text: 'Membuat Project Baru', link: '/guide/create-project' },
            { text: 'Package Manager', link: '/guide/package-managers' },
            { text: 'Git Integration', link: '/guide/git-integration' },
          ]
        },
      ],
      '/templates/': [
        {
          text: 'Template Presets',
          items: [
            { text: 'Overview', link: '/templates/overview' },
            { text: 'Default', link: '/templates/default' },
            { text: 'Minimal', link: '/templates/minimal' },
            { text: 'Jawa', link: '/templates/jawa' },
          ]
        }
      ],
      '/cli/': [
        {
          text: 'CLI Reference',
          items: [
            { text: 'Penggunaan', link: '/cli/usage' },
            { text: 'Opsi & Prompt', link: '/cli/options' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/davingm/nuxt-davingm' },
    ],

    footer: {
      message: 'Dirilis di bawah MIT License.',
      copyright: '© 2026 <a href="https://davingm.com">Davingm</a>'
    },

    editLink: {
      pattern: 'https://github.com/davingm/nuxt-davingm/edit/main/docs/:path',
      text: 'Edit halaman ini di GitHub'
    },

    lastUpdated: {
      text: 'Terakhir diperbarui',
    },

    search: {
      provider: 'local'
    },

    docFooter: {
      prev: 'Sebelumnya',
      next: 'Selanjutnya'
    },
  }
})
