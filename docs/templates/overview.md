# Overview Template

`create-davingm-nuxt` menyediakan beberapa template preset yang bisa dipilih saat membuat project baru.

## Perbandingan Template

| Fitur | Default | Minimal | Jawa |
|---|:---:|:---:|:---:|
| Nuxt 4 | ✅ | ✅ | ✅ |
| TypeScript | ✅ | ✅ | ✅ |
| Tailwind CSS | ✅ | ❌ | ✅ |
| ESLint + Biome | ✅ | ❌ | ✅ |
| Vitest | ✅ | ❌ | ✅ |
| Konfigurasi Deployment | ✅ | ❌ | ✅ |
| DevContainer | ✅ | ❌ | ✅ |
| GitHub Actions CI | ✅ | ❌ | ✅ |
| Opinionated Setup | ⚖️ Moderat | ❌ | 🔥 Maksimal |

## Cara Memilih Template

**Gunakan Default jika:**
- Kamu ingin setup lengkap dan siap production
- Membangun aplikasi Nuxt serius dengan full toolchain
- Ingin mengikuti best practices yang sudah dikurasi

**Gunakan Minimal jika:**
- Sedang prototyping atau eksperimen cepat
- Ingin kontrol penuh atas setiap konfigurasi
- Membangun sesuatu yang sederhana tanpa overhead

**Gunakan Jawa jika:**
- Kamu sudah familiar dengan workflow Davingm
- Ingin setup yang paling opinionated dan lengkap
- Membangun project dengan konfigurasi pribadi Davingm

## Menambah Template Sendiri

Kamu bisa menambahkan template custom dengan membuat folder baru di direktori `templates/` di repository ini. Lihat [CONTRIBUTING.md](https://github.com/davingm/nuxt-davingm/blob/main/CONTRIBUTING.md) untuk panduan kontribusi.
