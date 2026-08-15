# Template Jawa

Preset opinionated dengan konfigurasi pribadi Davingm.

## Deskripsi

Template **Jawa** adalah setup paling opinionated di `create-davingm-nuxt`. Template ini mencerminkan konfigurasi yang digunakan Davingm secara pribadi untuk project-project aktifnya. Cocok jika kamu ingin menggunakan workflow dan konvensi yang sama persis.

## Tech Stack

Sama dengan template Default, namun dengan konfigurasi tambahan dan opinionated choices yang lebih kuat.

| Teknologi | Versi | Keterangan |
|---|---|---|
| [Nuxt](https://nuxt.com) | v4 | Full-stack Vue framework |
| [TypeScript](https://typescriptlang.org) | Latest | Type safety yang ketat |
| [Tailwind CSS](https://tailwindcss.com) | v4 | Utility-first CSS framework |
| [Biome](https://biomejs.dev) | Latest | Linter & formatter |
| [Vitest](https://vitest.dev) | Latest | Unit testing framework |
| [Nuxt Icon](https://github.com/nuxt/icon) | Latest | Icon component |

## Perbedaan dari Template Default

Template Jawa memiliki beberapa perbedaan dibanding Default:

- **Konvensi penamaan** yang lebih ketat dan konsisten
- **Konfigurasi Biome** yang lebih strict
- **Struktur folder** tambahan yang mencerminkan workflow Davingm
- **Konfigurasi TypeScript** yang lebih strict (`strict: true` dengan aturan tambahan)
- **Preset Tailwind** dengan design tokens custom

::: info
Template ini akan terus berkembang seiring workflow Davingm yang berubah. Jika kamu menggunakan template ini, pastikan untuk mengecek update secara berkala.
:::

## Kapan Menggunakan Template Ini?

Gunakan template Jawa jika:

- Kamu sudah familiar dengan cara kerja dan preferensi Davingm
- Ingin setup yang paling lengkap dan opinionated
- Bekerja bersama Davingm dalam satu project
- Ingin mempelajari workflow dan best practices Davingm secara langsung

## Scripts yang Tersedia

```bash
# Development server
pnpm dev

# Build production
pnpm build

# Preview build
pnpm preview

# Lint & format dengan Biome
pnpm lint

# Run tests
pnpm test

# Type check
pnpm typecheck
```
