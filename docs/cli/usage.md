# Penggunaan CLI

Referensi lengkap penggunaan `create-davingm-nuxt` dari command line.

## Sinopsis

```bash
npx create-davingm-nuxt
# atau
pnpm create davingm-nuxt
# atau
yarn create davingm-nuxt
# atau
bunx create-davingm-nuxt
```

CLI tidak menerima argumen langsung — semua konfigurasi dilakukan melalui prompt interaktif.

## Alur Eksekusi

Berikut adalah alur lengkap yang terjadi saat CLI dijalankan:

```
1. Tampilkan banner dan intro
         ↓
2. Scan folder templates/ yang tersedia
         ↓
3. Prompt: Pilih template preset
         ↓
4. Prompt: Tentukan lokasi project
         ↓
5. Validasi nama folder
         ↓
6. Cek jika folder sudah ada (→ Replace atau Cancel)
         ↓
7. Prompt: Pilih package manager
         ↓
8. Prompt: Initialize git? (jika git tersedia)
         ↓
9. Salin template ke folder tujuan
         ↓
10. Initialize git repository (jika dipilih)
         ↓
11. Install dependencies
         ↓
12. Tampilkan next steps
```

## Exit Codes

| Code | Keterangan |
|---|---|
| `0` | Sukses atau dibatalkan oleh user |
| `1` | Error — folder templates tidak ditemukan, validasi gagal, atau error instalasi |

## Variabel Environment

CLI tidak menggunakan variabel environment apapun.

## Contoh Output

```
        .d$b.
       i$$A$$L  .d$b
     .$$F` `$$L.$$A$$.
    j$$'    `4$$:` `$$.

  Davingm Nuxt Starter  —  scaffold project baru dalam hitungan detik

◆  create-davingm-nuxt
◇  Template mana yang ingin Anda gunakan?
│  Default
◇  Di mana project ingin dibuat?
│  ./my-app
◇  Package manager mana yang ingin digunakan?
│  pnpm
◇  Initialize git repository?
│  Yes
●  Creating project in ./my-app
✔  Downloaded Default template
✔  Git repository initialized.

> my-app@0.0.1 install
> pnpm install

✔  Dependencies installed.

╭── 👉 Next steps ───╮
│                    │
│   › cd ./my-app    │
│   › pnpm run dev   │
│                    │
╰────────────────────╯

  Made with ❤ by Davingm
  Support: https://davingm.com/sponsor
```
