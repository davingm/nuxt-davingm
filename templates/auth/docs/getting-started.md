# Memulai

## Prasyarat

- Node.js >= 18
- pnpm (direkomendasikan) atau npm/yarn

## Instalasi

Jika kamu menggunakan starter kit ini melalui CLI `nuxt-davingm`:

```bash
npx nuxt-davingm@latest init my-app --template auth
cd my-app
pnpm install
```

Atau clone langsung dari repository:

```bash
git clone <repository-url> my-app
cd my-app
pnpm install
```

## Konfigurasi awal

Salin file contoh environment dan sesuaikan nilainya:

```bash
cp .env.example .env
```

Isi minimal yang perlu diperhatikan:

```ini
# Nama aplikasi
NAME_APP="Nama Aplikasi Kamu"

# Ganti ini dengan string acak yang panjang di production!
JWT_SECRET=ganti_dengan_secret_yang_kuat

# Mode database saat server start
# update      → aman untuk production, data tidak hilang
# create-drop → reset semua tabel setiap start (cocok untuk development awal)
DB_TYPE=update
```

> File `.data/database.sqlite` akan dibuat **otomatis** saat server pertama kali dijalankan. Kamu tidak perlu membuat file ini secara manual.

## Menjalankan server development

```bash
pnpm dev
```

Server berjalan di `http://localhost:3000`. Saat pertama kali start, plugin database (`server/plugins/db.ts`) akan:

1. Membuat folder `.data/` jika belum ada
2. Menjalankan migrasi — membuat tabel `users` dan `sessions`
3. Menjalankan seeder — membuat akun admin default (jika tabel masih kosong)

## Akun default (seeder)

| Field    | Nilai                |
|----------|----------------------|
| Email    | admin@example.com    |
| Password | password             |

Akun ini hanya dibuat satu kali. Jika sudah ada user dengan email tersebut, seeder akan dilewati.

## Build untuk production

```bash
pnpm build
pnpm preview
```

Pastikan `DB_TYPE=update` di `.env` production agar data tidak terhapus saat server restart.
