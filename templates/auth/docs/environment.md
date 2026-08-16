# Konfigurasi Environment

Semua konfigurasi runtime dibaca dari file `.env`. Salin `.env.example` sebagai titik awal.

## Variabel yang Tersedia

### Aplikasi

| Variabel         | Default                        | Keterangan                         |
|------------------|--------------------------------|------------------------------------|
| `NAME_APP`       | `"Nuxt-app"`                   | Nama aplikasi (ditampilkan di UI)  |
| `API_BASE`       | `http://localhost:3000/api`    | Base URL untuk panggilan API       |
| `ENABLE_DEVTOOLS`| `true`                         | Aktifkan Nuxt DevTools             |

### Database

| Variabel        | Default                    | Keterangan                              |
|-----------------|----------------------------|-----------------------------------------|
| `DB_CONNECTION` | `sqlite`                   | Driver database. Hanya `sqlite` yang didukung |
| `DB_DATABASE`   | `.data/database.sqlite`    | Path file SQLite (relatif dari root)    |
| `DB_TYPE`       | `update`                   | Behavior saat server start (lihat bawah)|

### Autentikasi

| Variabel     | Default                                    | Keterangan                                |
|--------------|--------------------------------------------|-------------------------------------------|
| `JWT_SECRET` | `supersecretkey_change_me_in_production`   | Secret untuk signing session. **Wajib diganti di production.** |

---

## DB_TYPE: Mode Behavior Database

`DB_TYPE` mengontrol apa yang terjadi pada database saat server start.

### `update` (default — cocok untuk production)

```ini
DB_TYPE=update
```

Menjalankan `CREATE TABLE IF NOT EXISTS`. Tabel hanya dibuat jika belum ada. Data yang sudah ada **tidak akan dihapus**. Gunakan mode ini di production dan setelah data mulai masuk.

### `create-drop` (cocok untuk development awal atau testing)

```ini
DB_TYPE=create-drop
```

Setiap kali server start, semua tabel **di-drop dan dibuat ulang dari awal**. Data lama hilang. Berguna saat kamu sedang mengubah skema tabel secara aktif dan tidak peduli dengan data yang ada.

> Jangan gunakan `create-drop` di production.

---

## Contoh .env Lengkap

```ini
# Aplikasi
API_BASE=http://localhost:3000/api
NAME_APP="My Nuxt App"
ENABLE_DEVTOOLS=true

# Database
DB_CONNECTION=sqlite
DB_DATABASE=.data/database.sqlite
DB_TYPE=update

# Auth
JWT_SECRET=ganti_dengan_random_string_panjang_di_production
```

---

## Keamanan

- File `.env` sudah masuk ke `.gitignore` — tidak akan pernah ter-commit ke repository.
- File `.env` juga masuk ke `.npmignore` — tidak akan ikut saat publish ke npm.
- Hanya `.env.example` yang di-commit sebagai referensi untuk developer lain.
- `JWT_SECRET` harus diganti dengan nilai acak yang kuat di environment production. Kamu bisa generate dengan:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
