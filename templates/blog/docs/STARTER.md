# Nuxt Starter — Dokumentasi

Ringkasan singkat dan panduan penggunaan untuk starter project Nuxt ini.

## Tujuan
Starter ini menyediakan struktur minimal namun rapi untuk membangun aplikasi Nuxt dengan pola berikut:
- `app/composables` untuk composables & service yang di-auto-import
- `app/service` (jika digunakan) untuk layanan non-autoinput (hindari untuk kemudahan)
- `app/types` untuk definisi TypeScript

## Menjalankan proyek
Instal dependensi lalu jalankan dev server:

```bash
pnpm install
pnpm dev
```

atau

```bash
npm install
npm run dev
```

## Environment
Gunakan variabel lingkungan untuk mengonfigurasi base API. Contoh ada di `.env.example`:

- `API_BASE` — base URL API publik (mis. `http://localhost:3000/api`)

Nuxt runtime config membaca `public.apiBase` pada `nuxt.config.ts`. Pastikan mengisi `API_BASE` sebelum menjalankan server.

## Cara memakai API service (composable)
Project menyertakan sebuah composable `useApi` dan contoh service `useUserService`.

Contoh di halaman:

```vue
<script setup lang="ts">
const userService = useUserService()

const { data: users, error } = await useAsyncData('users', () => userService.getAll())
</script>
```

Karena `useUserService` berada di `app/composables`, Nuxt akan otomatis mengimportnya.

## Rekomendasi perbaikan / best practices
- Letakkan semua composable yang ingin di-auto-import di `app/composables`.
- Buat `types` untuk semua model data dan gunakan generic pada client fetch.
- Tambahkan linting (`eslint` + `@typescript-eslint`) dan `prettier` untuk konsistensi kode.
- Tangani error global pada `useApi` dan tampilkan pesan user-friendly di UI.
- Tambahkan contoh test unit/integrasi untuk service API (Vitest).

## Testing (Vitest)

Proyek sudah disiapkan dengan Vitest. Struktur `test/` yang disarankan:

- `test/unit` — unit tests (Vitest + Vue Test Utils)
- `test/e2e` — end-to-end tests (Playwright / Cypress) — belum ditambahkan

Perintah tes yang tersedia:

```bash
pnpm test        # jalankan vitest (watch mode)
pnpm test:run    # menjalankan tes sekali (non-watch)
pnpm test:coverage
```

Contoh: ada unit test untuk `useUserService` di `test/unit/useUserService.spec.ts` yang memock `useApi`.

Jika butuh e2e saya bisa menambahkan Playwright dan contoh workflow CI.

## Menggunakan Biome (lint & format)

Proyek ini direkomendasikan menggunakan `biome` sebagai pengganti kombinasi `eslint` + `prettier`.

1. Instal biome sebagai dev dependency:

```bash
pnpm add -D biome
```

2. Perintah yang tersedia di `package.json`:

```bash
pnpm format    # menjalankan biome format
pnpm check     # menjalankan biome check (lint dan diagnostics)
pnpm lint      # alias ke biome check
```

3. Konfigurasi minimal disertakan di `.biome.json` untuk mendukung JS/TS/Vue.

Catatan: Jika kamu pakai VS Code, pasang extension Biome untuk integrasi format-on-save.

## Tailwind CSS

Proyek telah menambahkan Tailwind CSS beserta konfigurasi dasar (Tailwind + PostCSS + Autoprefixer)。

Langkah cepat:

```bash
pnpm add -D tailwindcss postcss autoprefixer @tailwindcss/forms
pnpm exec tailwindcss init -p
```

File penting:
- `tailwind.config.ts` — path content menuju `app/`、`components/`、`pages/` 已配置
- `postcss.config.cjs` — 插件已启用
- `app/assets/css/tailwind.css` — 已包含 `@tailwind base/components/utilities`

Tailwind 已在 `nuxt.config.ts` 中被注册为全局 CSS。现在你可以在组件或页面使用 Tailwind 原子类来快速样式化界面。

## Struktur penting
- `app/composables/` — composables & service yang auto-import
- `app/pages/` — halaman aplikasi
- `app/types/` — TypeScript model
- `public/` — asset publik
- `docs/` — dokumentasi proyek

## Pertanyaan umum
Jika ada service yang tidak di-auto-import, pindahkan file ke `app/composables` atau importnya secara manual dari path relatif.

---
Dokumentasi ini singkat; mau saya tambahkan bagian setup ESLint/Prettier/CI dan contoh test juga?