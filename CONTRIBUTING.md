# Contributing to create-davingm-nuxt

Terima kasih sudah tertarik berkontribusi! 🎉
Semua bentuk kontribusi sangat disambut — mulai dari melaporkan bug, mengusulkan fitur, memperbaiki typo di dokumentasi, sampai mengirim pull request.

---


## Code of Conduct

Project ini mengikuti prinsip dasar: **bersikap baik dan saling menghormati**. Harap jaga komunikasi yang konstruktif dan inklusif di semua interaksi.

---

## Cara Melaporkan Bug

1. Cek dulu di [Issues](https://github.com/davingm/nuxt-davingm/issues) — pastikan belum ada laporan serupa.
2. Buat issue baru dengan template **Bug Report**.
3. Sertakan:
   - Langkah untuk mereproduksi bug
   - Output error / stack trace (jika ada)
   - Versi Node.js, OS, dan package manager yang digunakan

---

## Cara Mengusulkan Fitur

1. Buka [Issues](https://github.com/davingm/nuxt-davingm/issues) dan buat issue baru dengan template **Feature Request**.
2. Jelaskan masalah yang ingin diselesaikan dan solusi yang diusulkan.
3. Tunggu diskusi — maintainer akan merespons secepat mungkin.

---

## Setup Development

### Requirement

- Node.js `>= 18.x`
- npm (sudah termasuk dengan Node.js)

### Clone dan Install

```bash
# Clone repo
git clone https://github.com/davingm/nuxt-davingm.git
cd nuxt-davingm

# Install dependencies
npm install
```

### Jalankan CLI secara lokal

```bash
node src/cli.js
```

### Struktur Project

```
nuxt-davingm/
├── src/
│   └── cli.js          # Entry point CLI utama
├── templates/
│   ├── default/        # Template preset default
│   ├── minimal/        # Template preset minimal
│   └── jawa/           # Template preset jawa
├── .github/
│   ├── workflows/
│   │   └── ci.yml      # GitHub Actions CI
│   └── ISSUE_TEMPLATE/ # Template issue
├── package.json
├── README.md
├── LICENSE
└── CHANGELOG.md
```

---

## Panduan Pull Request

1. **Fork** repository ini dan buat branch dari `main`:
   ```bash
   git checkout -b feat/nama-fitur-kamu
   ```

2. Buat perubahan. Pastikan kode berjalan dengan benar:
   ```bash
   node src/cli.js
   ```

3. Commit dengan format konvensi (lihat bawah).

4. Push ke fork kamu dan buat **Pull Request** ke branch `main`.

5. Isi template PR dengan lengkap — termasuk deskripsi perubahan dan issue terkait (jika ada).

6. Tunggu review dari maintainer.

### Tips PR yang Bagus

- Buat PR sekecil dan sefokus mungkin (satu PR = satu tujuan).
- Jangan campur refactor dengan fitur baru dalam satu PR.
- Sertakan screenshot atau demo jika ada perubahan visual / UX.

---

## Konvensi Commit

Project ini menggunakan format [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(scope): deskripsi singkat
```

### Tipe yang Umum Digunakan

| Tipe | Kapan digunakan |
|------|-----------------|
| `feat` | Menambah fitur baru |
| `fix` | Memperbaiki bug |
| `docs` | Perubahan dokumentasi saja |
| `chore` | Maintenance, update dependency, dll. |
| `refactor` | Refactoring tanpa mengubah fungsi |
| `ci` | Perubahan CI/CD |
| `template` | Perubahan pada template preset |

### Contoh

```bash
feat: tambah preset template minimal
fix: perbaiki crash saat folder target sudah ada
docs: update README dengan contoh penggunaan bun
template(default): tambah konfigurasi ESLint flat config
```

---

Terima kasih sudah berkontribusi!
