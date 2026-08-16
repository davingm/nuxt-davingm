import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Nuxt Auth Starter",
  description:
    "Dokumentasi starter kit autentikasi berbasis Nuxt 4 + SQLite + Tailwind CSS",
  lang: "id",

  themeConfig: {
    nav: [
      { text: "Beranda", link: "/" },
      { text: "Mulai", link: "/getting-started" },
    ],

    sidebar: [
      {
        text: "Pengantar",
        items: [
          { text: "Memulai", link: "/getting-started" },
          { text: "Struktur Proyek", link: "/project-structure" },
        ],
      },
      {
        text: "Panduan",
        items: [
          { text: "Konfigurasi Environment", link: "/environment" },
          { text: "Database", link: "/database" },
          { text: "Autentikasi", link: "/authentication" },
          { text: "Testing", link: "/testing" },
          { text: "Deployment", link: "/deployment" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/davingm/nuxt-davingm",
      },
    ],

    footer: {
      message: "Dirilis di bawah lisensi MIT",
      copyright: "Copyright © nuxt-davingm contributors",
    },

    search: {
      provider: "local",
    },
  },
});
