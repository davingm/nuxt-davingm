# Requirement

Daftar requirement untuk menggunakan `create-davingm-nuxt`.

## Node.js

**Minimum versi: `18.0.0`**

CLI menggunakan fitur ES Modules (`"type": "module"`) dan beberapa API Node.js modern. Pastikan kamu menggunakan Node.js versi 18 atau lebih baru.

Cek versi Node.js:

```bash
node --version
```

Rekomendasi menggunakan [nvm](https://github.com/nvm-sh/nvm) atau [fnm](https://github.com/Schniz/fnm) untuk mengelola versi Node.js.

```bash
# Install versi LTS terbaru menggunakan fnm
fnm install --lts
fnm use lts-latest
```

## Package Manager

Setidaknya satu dari package manager berikut harus tersedia:

| Package Manager | Versi Min | Install |
|---|---|---|
| **npm** | `8.x` | Sudah termasuk di Node.js |
| **pnpm** | `8.x` | `npm install -g pnpm` |
| **yarn** | `1.x` | `npm install -g yarn` |
| **bun** | `1.x` | [bun.sh](https://bun.sh) |

CLI akan otomatis mendeteksi package manager mana saja yang tersedia.

> **Rekomendasi:** Gunakan **pnpm** untuk performa terbaik dan penggunaan disk yang lebih efisien.

## Git (Opsional)

Jika `git` tersedia di sistem, CLI menawarkan opsi untuk langsung menginisialisasi repository. Jika tidak ada, langkah ini akan dilewati otomatis.

Cek apakah git tersedia:

```bash
git --version
```

## Sistem Operasi

`create-davingm-nuxt` mendukung semua sistem operasi utama:

- ✅ macOS
- ✅ Linux
- ✅ Windows (CMD, PowerShell, Git Bash)
