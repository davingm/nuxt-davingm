# Struktur Proyek

Gambaran lengkap setiap folder dan file penting dalam starter kit ini.

```
.
├── app/                        # Semua kode frontend (Vue/Nuxt)
│   ├── assets/css/             # File CSS global (Tailwind entry point)
│   ├── components/             # Komponen Vue yang dapat digunakan ulang
│   ├── composables/            # Logika reaktif yang dapat dibagikan antar halaman
│   ├── layouts/                # Layout template halaman
│   ├── middleware/             # Middleware route (auth, guest)
│   ├── pages/                  # Halaman aplikasi (otomatis jadi route)
│   ├── plugins/                # Plugin Nuxt sisi client
│   ├── types/                  # Definisi TypeScript
│   └── app.vue                 # Root component
│
├── server/                     # Semua kode backend (Nitro)
│   ├── api/auth/               # Endpoint REST autentikasi
│   ├── database/
│   │   ├── migrations/         # Logika pembuatan tabel
│   │   ├── seeders/            # Pengisian data awal
│   │   └── schema.ts           # Definisi skema tabel (Drizzle ORM)
│   ├── plugins/
│   │   └── db.ts               # Plugin inisialisasi database saat server start
│   ├── tasks/db/               # Nitro tasks (dapat dijalankan via CLI atau HTTP)
│   └── utils/
│       ├── db.ts               # Koneksi & fungsi query SQLite
│       └── session.ts          # Helper cookie & token autentikasi
│
├── test/
│   ├── unit/                   # Unit tests (Vitest)
│   └── setup.ts                # Konfigurasi global test
│
├── docs/                       # Dokumentasi (format VitePress)
├── .data/                      # Folder runtime — TIDAK di-commit ke git
│   └── database.sqlite         # File database SQLite (di-generate otomatis)
├── .env                        # Variabel lingkungan lokal (TIDAK di-commit)
├── .env.example                # Contoh variabel lingkungan (di-commit)
├── .npmignore                  # Daftar file yang dikecualikan saat publish npm
├── nuxt.config.ts              # Konfigurasi utama Nuxt
├── tailwind.config.ts          # Konfigurasi Tailwind CSS
├── vitest.config.ts            # Konfigurasi Vitest
└── package.json                # Dependensi dan script NPM
```

---

## Detail Setiap Bagian

### `app/`

Seluruh kode frontend ada di sini. Nuxt 4 memisahkan kode client ke dalam folder `app/` agar tidak bercampur dengan kode server.

#### `app/pages/`

| File              | Route       | Keterangan                              |
|-------------------|-------------|------------------------------------------|
| `index.vue`       | `/`         | Halaman landing / beranda               |
| `login.vue`       | `/login`    | Form login, dilindungi middleware `guest` |
| `register.vue`    | `/register` | Form registrasi, dilindungi middleware `guest` |
| `dashboard.vue`   | `/dashboard`| Halaman dashboard, dilindungi middleware `auth` |

#### `app/composables/`

| File                  | Fungsi                                                          |
|-----------------------|-----------------------------------------------------------------|
| `useAuth.ts`          | State user, login, register, logout, fetchUser                  |
| `useApi.ts`           | Wrapper `$fetch` dengan baseURL dari runtimeConfig              |
| `useUserService.ts`   | Contoh service layer menggunakan `useApi`                       |
| `useTheme.ts`         | Toggle dark/light mode                                          |

#### `app/middleware/`

| File        | Deskripsi                                                         |
|-------------|-------------------------------------------------------------------|
| `auth.ts`   | Redirect ke `/login` jika user belum terautentikasi               |
| `guest.ts`  | Redirect ke `/dashboard` jika user sudah terautentikasi           |

#### `app/plugins/`

| File       | Deskripsi                                                   |
|------------|-------------------------------------------------------------|
| `auth.ts`  | Menjalankan `fetchUser()` saat aplikasi pertama kali dimuat |

---

### `server/`

Kode backend berjalan di Nitro (server-side Nuxt). Semua file di sini tidak dikirim ke browser.

#### `server/api/auth/`

| File                 | Method | Endpoint            | Fungsi                         |
|----------------------|--------|---------------------|-------------------------------|
| `login.post.ts`      | POST   | `/api/auth/login`   | Verifikasi email + password   |
| `register.post.ts`   | POST   | `/api/auth/register`| Buat akun user baru           |
| `logout.post.ts`     | POST   | `/api/auth/logout`  | Hapus session & cookie        |
| `me.get.ts`          | GET    | `/api/auth/me`      | Ambil data user dari session  |

#### `server/database/schema.ts`

Definisi struktur tabel menggunakan Drizzle ORM. Ini adalah **sumber kebenaran tunggal** untuk skema database.

```typescript
// Tabel users
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
});

// Tabel sessions
export const sessions = sqliteTable("sessions", { ... });
```

#### `server/database/migrations/index.ts`

Bertanggung jawab membuat tabel di database. Mendukung dua mode via `DB_TYPE`:

- `update` — `CREATE TABLE IF NOT EXISTS`, data tidak hilang
- `create-drop` — drop semua tabel lalu buat ulang dari nol

#### `server/database/seeders/`

| File                  | Fungsi                                                           |
|-----------------------|------------------------------------------------------------------|
| `Seeder.ts`           | Abstract base class — semua seeder extends class ini            |
| `UserSeeder.ts`       | Buat user admin default (`admin@example.com` / `password`)      |
| `DatabaseSeeder.ts`   | Titik masuk utama — mendaftarkan semua seeder yang akan dijalankan |

#### `server/plugins/db.ts`

Plugin Nitro yang berjalan **satu kali saat server start**. Menjalankan migrasi dan seeder secara otomatis. Developer tidak perlu menjalankan perintah migrasi secara manual di development.

#### `server/tasks/db/`

Nitro Tasks yang bisa dipanggil via CLI atau HTTP endpoint (`/_nitro/tasks/db:migrate`, dll.). Berguna untuk keperluan deployment atau reset database manual.

| File          | Script NPM             | Fungsi                                     |
|---------------|------------------------|--------------------------------------------|
| `migrate.ts`  | `pnpm db:migrate`      | Jalankan migrasi saja                      |
| `seed.ts`     | `pnpm db:seed`         | Jalankan seeder saja                       |
| `fresh.ts`    | `pnpm db:fresh`        | Drop semua tabel + migrasi ulang           |
|               | `pnpm db:fresh:seed`   | Drop + migrasi + seed                      |

#### `server/utils/db.ts`

Singleton koneksi SQLite + semua fungsi query yang dibutuhkan oleh API handlers.

| Fungsi                  | Keterangan                                      |
|-------------------------|-------------------------------------------------|
| `getConnection()`       | Mengembalikan koneksi SQLite (singleton)        |
| `findUserByEmail(email)`| Cari user berdasarkan email (case-insensitive)  |
| `findUserById(id)`      | Cari user berdasarkan ID                        |
| `createUser(...)`       | Buat user baru                                  |
| `createSession(...)`    | Buat session baru                               |
| `findSessionByToken()`  | Cari session + data user berdasarkan token      |
| `deleteSession(token)`  | Hapus session (logout)                          |

#### `server/utils/session.ts`

Helper untuk membaca dan menulis token autentikasi dari/ke HTTP request.

| Fungsi                   | Keterangan                                                  |
|--------------------------|-------------------------------------------------------------|
| `getSessionToken(event)` | Baca token dari cookie `auth_token` atau header `Bearer`    |
| `setSessionCookie(...)`  | Tulis token ke cookie (httpOnly, secure di production)      |
| `clearSessionCookie(...)`| Hapus cookie saat logout                                    |
| `getUserFromEvent(event)`| Shortcut: baca token → cari session → kembalikan user       |

---

### `test/`

Unit test menggunakan Vitest. Semua test berjalan di environment `node` dengan SQLite in-memory — tidak mempengaruhi database development.

| File                        | Yang Diuji                             |
|-----------------------------|----------------------------------------|
| `migrations.spec.ts`        | Pembuatan tabel, constraint, CASCADE   |
| `db.spec.ts`                | CRUD users & sessions                  |
| `session.spec.ts`           | Parsing cookie & Bearer token          |
| `useAuth.spec.ts`           | Composable fetchUser, login, logout    |
| `useUserService.spec.ts`    | Composable service layer               |

---

### File Konfigurasi Root

| File                | Fungsi                                                             |
|---------------------|--------------------------------------------------------------------|
| `nuxt.config.ts`    | Konfigurasi Nuxt: modules, runtimeConfig, Nitro tasks, CSS        |
| `tailwind.config.ts`| Konfigurasi Tailwind CSS + plugin `@tailwindcss/forms`            |
| `vitest.config.ts`  | Konfigurasi test runner: alias, environment, coverage             |
| `.biome.json`       | Konfigurasi linter & formatter (Biome, pengganti ESLint+Prettier) |
| `.env.example`      | Template variabel lingkungan yang aman untuk di-commit            |
| `.npmignore`        | File/folder yang dikecualikan saat publish ke npm                 |
| `pnpm-lock.yaml`    | Lockfile pnpm — pastikan versi dependency konsisten               |
