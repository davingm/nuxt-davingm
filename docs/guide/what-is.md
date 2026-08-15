# Apa itu Nuxt Starter?

`create-davingm-nuxt` adalah CLI generator untuk membuat project [Nuxt](https://nuxt.com) baru dengan opinionated setup yang sudah dikurasi. Terinspirasi dari `create-vite` dan `create-nuxt`, tool ini dirancang agar proses scaffolding project menjadi semudah dan secepat mungkin.

## Motivasi

Setiap kali memulai project Nuxt baru, kita sering menghabiskan waktu untuk setup yang berulang — instalasi Tailwind CSS, konfigurasi ESLint, setup TypeScript, dan lain-lain. `create-davingm-nuxt` hadir untuk menghilangkan boilerplate tersebut.

Cukup satu perintah, dan kamu mendapat project yang:

- Sudah dikonfigurasi dengan **best practices**
- Siap untuk **development** maupun **production**
- Menggunakan **tooling modern** seperti Biome, Vitest, dan Tailwind CSS v4

## Cara Kerja

```bash
npx create-davingm-nuxt
```

CLI akan menampilkan serangkaian prompt interaktif:

1. **Pilih template preset** — Default, Minimal, atau Auth
2. **Tentukan lokasi project** — path relatif atau absolut
3. **Pilih package manager** — pnpm, npm, yarn, atau bun
4. **Initialize git repository** — opsional (jika git tersedia)

Setelah konfirmasi, CLI akan:

- Menyalin template yang dipilih ke folder tujuan
- Menginisialisasi git repository (jika dipilih)
- Menginstall semua dependencies secara otomatis
- Menampilkan **next steps** untuk langsung mulai development

## Perbandingan dengan create-nuxt

| Fitur | `create-davingm-nuxt` | `create-nuxt` (official) |
|---|---|---|
| Setup Tailwind CSS | ✅ Otomatis | ⚙️ Manual |
| Konfigurasi ESLint | ✅ Biome terintegrasi | ⚙️ Manual |
| Konfigurasi Vitest | ✅ Siap pakai | ❌ Tidak termasuk |
| Pilihan template | ✅ Multiple presets | Terbatas |
| Multi package manager | ✅ 4 opsi | ✅ |

> **Catatan:** `create-davingm-nuxt` adalah opinionated tool — pilihan teknologi sudah ditentukan berdasarkan preferensi dan best practice dari davingm dan beberapa insinyur Nuxt Di indonesia.
