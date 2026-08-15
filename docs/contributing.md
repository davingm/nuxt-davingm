# Kontribusi

Terima kasih sudah tertarik untuk berkontribusi pada `create-davingm-nuxt`! 🎉

## Cara Berkontribusi

### Melaporkan Bug

1. Cek terlebih dahulu apakah bug sudah dilaporkan di [GitHub Issues](https://github.com/davingm/nuxt-davingm/issues)
2. Jika belum ada, buat issue baru menggunakan template **Bug Report**
3. Sertakan informasi: OS, versi Node.js, package manager, dan langkah reproduksi

### Mengusulkan Fitur

1. Buat issue baru menggunakan template **Feature Request**
2. Jelaskan use case dan manfaat fitur yang diusulkan
3. Tunggu feedback sebelum mulai mengerjakan

### Pull Request

1. Fork repository
2. Buat branch baru dari `main`:
   ```bash
   git checkout -b feat/nama-fitur
   ```
3. Lakukan perubahan
4. Commit dengan pesan yang deskriptif (lihat konvensi di bawah)
5. Push dan buat Pull Request

## Konvensi Commit

Proyek ini menggunakan [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Keterangan |
|---|---|
| `feat:` | Fitur baru |
| `fix:` | Perbaikan bug |
| `docs:` | Perubahan dokumentasi |
| `chore:` | Pemeliharaan, update dependency |
| `refactor:` | Refactoring tanpa perubahan fungsional |
| `test:` | Menambah atau memperbaiki test |

Contoh:
```
feat: tambahkan dukungan template custom
fix: perbaiki deteksi git di Windows
docs: update panduan quick start
```

## Menambah Template Baru

Untuk menambah template baru:

1. Buat folder baru di `templates/` dengan nama template
2. Isi dengan struktur project Nuxt yang diinginkan
3. Pastikan tidak ada `node_modules` atau `.nuxt` di dalamnya
4. Update dokumentasi di `docs/templates/`

```
templates/
├── default/      ← Template yang sudah ada
├── minimal/
├── jawa/
└── nama-template-baru/   ← Template baru kamu
```

## Setup Development

```bash
# Clone repository
git clone https://github.com/davingm/nuxt-davingm.git
cd nuxt-davingm

# Install dependencies
npm install

# Jalankan CLI secara lokal
node src/cli.js
```

## Lisensi

Dengan berkontribusi, kamu setuju bahwa kontribusimu akan dilisensikan di bawah [MIT License](https://github.com/davingm/nuxt-davingm/blob/main/LICENSE).
