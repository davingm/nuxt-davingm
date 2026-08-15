# Package Manager

`create-davingm-nuxt` mendukung empat package manager populer.

## Package Manager yang Didukung

| Package Manager | Perintah Install | Kecepatan | Disk Usage |
|---|---|---|---|
| **pnpm** | `npm install -g pnpm` | ⭐⭐⭐ Cepat | ⭐⭐⭐ Efisien |
| **npm** | Bawaan Node.js | ⭐⭐ | ⭐ |
| **yarn** | `npm install -g yarn` | ⭐⭐ | ⭐⭐ |
| **bun** | [bun.sh](https://bun.sh) | ⭐⭐⭐ Sangat cepat | ⭐⭐ |

## Deteksi Otomatis

CLI secara otomatis mendeteksi package manager mana saja yang tersedia di PATH sistem. Hanya package manager yang terinstall yang akan ditampilkan sebagai opsi.

Jika tidak ada satu pun package manager yang terdeteksi (seharusnya tidak terjadi karena npm bundled bersama Node.js), CLI akan menampilkan error.

## Rekomendasi

> Untuk pengalaman terbaik, gunakan **pnpm**. pnpm menggunakan content-addressable storage yang membuat instalasi lebih cepat dan menghemat ruang disk, terutama jika kamu bekerja dengan banyak project Nuxt.

Install pnpm:

```bash
npm install -g pnpm
```

## Mengubah Package Manager Setelah Project Dibuat

Jika ingin beralih package manager setelah project dibuat, hapus folder `node_modules` dan lockfile yang ada, lalu install ulang:

::: code-group

```bash [Pindah ke pnpm]
rm -rf node_modules package-lock.json yarn.lock bun.lockb
pnpm install
```

```bash [Pindah ke npm]
rm -rf node_modules pnpm-lock.yaml yarn.lock bun.lockb
npm install
```

:::
