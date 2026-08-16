# Deployment

---

## Persiapan Sebelum Deploy

### 1. Ganti JWT_SECRET

Jangan pernah deploy dengan secret default. Generate nilai baru:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Simpan hasilnya di environment variable production.

### 2. Set DB_TYPE ke update

```ini
DB_TYPE=update
```

Mode `create-drop` akan **menghapus semua data** setiap kali server restart. Pastikan mode production selalu `update`.

### 3. Build aplikasi

```bash
pnpm build
```

Output tersimpan di `.output/`.

---

## Lokasi Database di Production

File SQLite disimpan di `.data/database.sqlite` secara default. Pastikan path ini:

1. **Persistent** — folder `.data/` tidak boleh dihapus saat deploy ulang
2. **Dapat ditulis** — proses server harus punya write permission ke folder tersebut

Kamu bisa mengubah lokasi file dengan `DB_DATABASE`:

```ini
DB_DATABASE=/var/data/myapp.sqlite
```

---

## Deploy ke Platform

### Node.js Server (VPS / Docker)

```bash
# Build
pnpm build

# Jalankan
node .output/server/index.mjs
```

Variabel lingkungan dapat diset via file `.env` di root atau via environment sistem.

```dockerfile
# Contoh Dockerfile minimal
FROM node:20-alpine
WORKDIR /app
COPY .output ./output
COPY .env .env
EXPOSE 3000
CMD ["node", "output/server/index.mjs"]
```

> Pastikan folder `.data/` di-mount sebagai volume persistent di Docker agar data tidak hilang saat container restart.

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - sqlite_data:/app/.data
    environment:
      - DB_TYPE=update
      - JWT_SECRET=your_secret_here

volumes:
  sqlite_data:
```

### Vercel

Nuxt mendukung deploy ke Vercel secara otomatis melalui preset `vercel`. File `vercel.json` sudah tersedia di root proyek.

> **Catatan:** SQLite berbasis file tidak cocok untuk serverless karena setiap instance berjalan di lingkungan yang terisolasi dan tidak bisa berbagi file. Untuk Vercel, pertimbangkan menggunakan Turso (SQLite edge) atau layanan database lain.

### Netlify

File `netlify.toml` sudah tersedia di root proyek untuk konfigurasi Netlify Functions.

Catatan yang sama berlaku: SQLite berbasis file tidak cocok untuk serverless functions.

---

## File yang Tidak Perlu Di-deploy

File berikut **tidak perlu** ada di server production karena akan di-generate atau tidak relevan:

| File / Folder    | Keterangan                                                  |
|------------------|-------------------------------------------------------------|
| `node_modules/`  | Di-install ulang via `pnpm install --prod`                  |
| `.nuxt/`         | Di-generate saat build                                      |
| `.data/`         | Di-generate saat server pertama kali start                  |
| `test/`          | Tidak relevan di production                                 |
| `docs/`          | Dokumentasi developer, tidak perlu di server                |
| `.env`           | Variabel lingkungan seharusnya diset via environment sistem |

---

## Backup Database SQLite

Karena seluruh data ada di satu file, backup sangat mudah:

```bash
# Backup dengan sqlite3
sqlite3 .data/database.sqlite ".backup .data/database.backup.sqlite"

# Atau cukup copy file
cp .data/database.sqlite .data/database.$(date +%Y%m%d).sqlite
```

Untuk production yang serius, pertimbangkan menjalankan backup terjadwal dengan cron dan menyimpan backup ke object storage (S3, R2, dll.).
