---
trigger: always_on
---

# Project Guidelines & Code Standards

Proyek starter ini dibangun menggunakan **Nuxt 4**, **Vue 3**, **Tailwind CSS 3**, **Biome**, dan **@nuxt/icon**.

## Strict Rules for Code Modifications

1. **Nuxt 4 `srcDir: 'app'`**:
   - Seluruh kode aplikasi (pages, components, layouts, composables, service, assets) HARUS bertempat di folder `app/`.
   - Gunakan alias `~/` yang menunjuk ke `app/` (contoh: `~/assets/css/tailwind.css`). JANGAN gunakan `~/app/...`.

2. **No Deprecated Config Files**:
   - JANGAN buat `postcss.config.js` / `.cjs`. Konfigurasi PostCSS wajib ada di `nuxt.config.ts`.
   - Pada `tailwind.config.ts`, wajib gunakan `import type { Config } from 'tailwindcss'` dan `satisfies Config`.

3. **Layout Integrity**:
   - File `app/layouts/default.vue` HARUS memiliki `<slot />` untuk tempat render `<NuxtPage />`. JANGAN hapus `<slot />`.

4. **Synchronous Theme Switch**:
   - Hindari `transition` animasi lambat pada `body` di `tailwind.css` agar warna Light (Soft Cream) & Dark (Vercel Pitch Black) berganti secara serentak tanpa lag.

5. **Icon System**:
   - Gunakan `<Icon name="simple-icons:..." />` untuk brand & `<Icon name="heroicons:..." />` untuk UI.

6. **Code Verification**:
   - Jalankan `npx nuxt prepare` atau `pnpm lint` setelah mengubah file untuk memastikan tidak ada kesalahan kompilasi atau sintaks.