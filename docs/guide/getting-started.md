# Quick Start

Cara tercepat untuk memulai project Nuxt baru dengan `create-davingm-nuxt`.

## Prerequisites

Sebelum mulai, pastikan kamu sudah memenuhi requirement berikut:

- **Node.js** versi `18.0.0` atau lebih baru
- Salah satu package manager: `npm`, `pnpm`, `yarn`, atau `bun`

Cek versi Node.js yang terpasang:

```bash
node --version
# v18.x.x atau lebih baru
```

## Membuat Project Baru

Jalankan salah satu perintah berikut sesuai package manager yang kamu gunakan:

::: code-group

```bash [npm]
npx create-davingm-nuxt
```

```bash [pnpm]
pnpm create davingm-nuxt
```

```bash [yarn]
yarn create davingm-nuxt
```

```bash [bun]
bunx create-davingm-nuxt
```

:::

## Ikuti Prompt Interaktif

Setelah perintah dijalankan, CLI akan menampilkan prompt interaktif:

### 1. Pilih Template

```
◆  Template mana yang ingin Anda gunakan?
│  ● Default (davingm recommended starter)
│  ○ Minimal
│  ○ Auth
```

Pilih template yang sesuai dengan kebutuhanmu. Lihat [perbandingan template](/templates/overview) untuk membantu memilih.

### 2. Lokasi Project

```
◆  Di mana project ingin dibuat?
│  ./my-project
```

Masukkan path untuk project baru. Defaultnya adalah `./my-project`.

### 3. Package Manager

```
◆  Package manager mana yang ingin digunakan?
│  ● pnpm
│  ○ npm
│  ○ Yarn
│  ○ Bun
```

CLI otomatis mendeteksi package manager yang tersedia di sistem kamu.

### 4. Initialize Git (Opsional)

```
◆  Initialize git repository?
│  ● Yes / ○ No
```

Jika `git` tersedia, kamu bisa langsung menginisialisasi repository.

## Setelah Instalasi

Setelah semua beres, CLI akan menampilkan next steps:

```
╭───── Next steps ────╮
│                     │
│   › cd ./my-project │
│   › pnpm run dev    │
│                     │
╰─────────────────────╯
```

Masuk ke folder project dan jalankan development server:

```bash
cd my-project
pnpm run dev
```

Buka browser di `http://localhost:3000` — project siap! 🎉
