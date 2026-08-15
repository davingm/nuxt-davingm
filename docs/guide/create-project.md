# Membuat Project Baru

Panduan lengkap membuat project Nuxt menggunakan `create-davingm-nuxt`.

## Perintah Dasar

```bash
npx create-davingm-nuxt
```

CLI akan memandu kamu melalui proses pembuatan project langkah demi langkah.

## Menentukan Lokasi Project

Pada prompt **"Di mana project ingin dibuat?"**, kamu bisa memasukkan:

- **Path relatif** — `./my-app` atau `my-app`
- **Subfolder** — `./projects/my-app`

::: warning Batasan Nama Folder
Nama folder hanya boleh mengandung huruf, angka, tanda hubung (`-`), dan underscore (`_`). Contoh valid: `my-project`, `app_v2`, `project123`.
:::

## Menangani Folder yang Sudah Ada

Jika folder tujuan sudah ada dan tidak kosong, CLI akan menampilkan opsi:

```
◆  Folder "./my-project" sudah ada. Apa yang ingin dilakukan?
│  ● Replace — Hapus isi folder dan buat project baru
│  ○ Cancel  — Batalkan pembuatan project
```

::: danger Perhatian
Memilih **Replace** akan menghapus semua isi folder secara permanen. Pastikan sudah ada backup jika diperlukan.
:::

## Membatalkan Proses

Kamu bisa membatalkan proses kapan saja dengan menekan `Ctrl + C`. CLI akan menampilkan pesan "Dibatalkan." dan keluar dengan bersih.

## Contoh Sesi Lengkap

```
        .d$b.
       i$$A$$L  .d$b
     .$$F` `$$L.$$A$$.
    j$$'    `4$$:` `$$.
    ...

  Davingm Nuxt Starter  —  scaffold project baru dalam hitungan detik

◆  create-davingm-nuxt

◆  Template mana yang ingin Anda gunakan?
│  ● Default (Davingm recommended starter)

◆  Di mana project ingin dibuat?
│  ./my-nuxt-app

◆  Package manager mana yang ingin digunakan?
│  ● pnpm

◆  Initialize git repository?
│  ● Yes

●  Creating project in ./my-nuxt-app
✔  Downloaded Default template
✔  Git repository initialized.
✔  Dependencies installed.

╭── 👉 Next steps ───╮
│                    │
│   › cd ./my-nuxt-app│
│   › pnpm run dev   │
│                    │
╰────────────────────╯

  Made with ❤ by Davingm
  Support: https://davingm.com/sponsor
```
