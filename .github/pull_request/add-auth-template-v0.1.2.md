# Tambah Template Auth dan Perbarui Versi ke 0.1.2

## Ringkasan

Pull request ini menambahkan template starter baru bernama **auth** ke dalam paket `create-davingm-nuxt`, sekaligus memperbarui versi paket dari `0.1.1` ke `0.1.2` dan menyempurnakan konfigurasi `.npmignore` agar tidak ada file yang tidak diperlukan ikut terpublish ke npm.

---

## Perubahan

### Ditambahkan

- **Template `auth`** — starter baru berbasis Nuxt 4 dengan sistem autentikasi lengkap, mencakup:
  - Login, register, logout via API route Nitro
  - Middleware autentikasi dan guest di sisi client
  - Session management menggunakan cookie terenkripsi
  - Database layer dengan Drizzle ORM (SQLite via `better-sqlite3`, siap migrasi ke PostgreSQL/MySQL)
  - Seeder database untuk data awal pengguna
  - Composable `useAuth` dan `useUserService`
  - Layout terpisah untuk halaman auth dan dashboard
  - Halaman: index, login, register, dashboard
  - Unit test dengan Vitest dan Testing Library
  - Konfigurasi Tailwind CSS, Biome, DevContainer, GitHub Actions CI
  - Dukungan deployment ke Vercel dan Netlify

### Diperbarui

- **Versi paket** dinaikkan dari `0.1.1` ke `0.1.2`
- **`.npmignore` root** diperbarui untuk mengecualikan file-file berikut dari dalam folder template saat `npm publish`:
  - `templates/**/.devcontainer/` — konfigurasi dev container tidak relevan untuk pengguna akhir
  - `templates/**/.github/` — workflow CI dan issue templates milik template itu sendiri
  - `templates/**/docs/` — dokumentasi VitePress internal template
  - `templates/**/.data/` — file SQLite yang di-generate saat runtime, tidak boleh ikut distribusi

---

## Catatan Teknis

File `.npmignore` yang berada di dalam folder `templates/auth/` tidak diproses oleh npm saat publish karena bootstrap proyek dilakukan dari root package `nuxt-davingm`. Oleh karena itu, seluruh kontrol eksklusi file template dikendalikan melalui `.npmignore` di root.

File-file berikut sengaja tetap disertakan dalam paket npm karena dibutuhkan pengguna setelah scaffold:

- Seluruh source code di `app/`, `server/`, `public/`
- `nuxt.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `vitest.config.ts`
- `.biome.json` — konfigurasi linter untuk proyek hasil scaffold
- `netlify.toml`, `vercel.json` — konfigurasi deployment
- `.env.example` — referensi environment variable
- `test/` — contoh unit test sebagai referensi pengguna

---

## Cara Menguji

```bash
# Install versi terbaru secara lokal
npm install

# Jalankan CLI dan pilih template auth
node src/cli.js

# Masuk ke folder hasil scaffold
cd nama-proyek

# Install dependencies
pnpm install

# Jalankan development server
pnpm dev
```
