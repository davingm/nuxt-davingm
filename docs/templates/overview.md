# Overview Template

`create-davingm-nuxt` menyediakan beberapa template preset yang bisa dipilih saat membuat project baru.

## Perbandingan Template

| Fitur | Default | Minimal | auth | blog | portofolio | dasbor |
|---|:---:|:---:|:---:|:---:| :---:| :---:| 
| Nuxt 4 | ✔ | ✔ | ✔ |  ✔ | ✔ | ✔ 
| TypeScript | ✔ | ✔ |  ✔ |  ✔ | ✔ | ✔
| Tailwind CSS | ✔ | ✔ |  ✔ |  ✔ | ✔ | ✔
| ESLint + Biome | ✔ | ✘  |  ✔ |  ✔ | ✔ | ✔
| Vitest | ✔ | ✘  |  ✔ |  ✔ | ✘ | ✔
| Konfigurasi Deployment | ✔ | ✘  |  ✔ |  ✔ | ✔ | ✔
| DevContainer | ✔ | ✘  |  ✔ |  ✔ | ✔ | ✔
| GitHub Actions CI | ✔ | ✘  |  ✔ |  ✔ | ✔ | ✔
| Opinionated Setup |  Moderat | ✘  |  Maksimal |  ✔ | ✘ | ✘
| use SEO |  ✔ |  ✘  | ✔ |  ✔ | ✔ | ✘
| Open Graph |  ✔ |  ✔ |  ✔ |  ✔ | ✔ | ✘
| simpel-icons |  ✔ | ✘  |  ✔ |  ✔ | ✔ | ✔
| hero-icons |  ✔ | ✘  |  ✔  |  ✔ | ✘ | ✔
| markdown UI | ✘  | ✘  | ✘ |  ✔ | ✔ | ✘
| Twikoo |  ✘ | ✘  | ✘  |  ✔  | ✔ | ✘
| migration |  ✘ | ✘  | ✔ | ✘ | ✘ | ✘
| seeders| ✘ | ✘ |  ✔ | ✘ | ✘ | ✘
| SSG | ✔ | ✔ |  ✔ |  ✔ | ✔ | ✘
| SSR | ✔ | ✔ |  ✔ |  ✔ | ✔ | ✔
| CSR | ✔ | ✔ |  ✔ |  ✔ | ✘ | ✔
| middleware | ✘ | ✘ |  ✔ |  ✘ | ✘ | ✔
| service | ✔ | ✘ | ✔ | ✘ | ✘ | ✘
| I81N ( multi bahasa ) | ✘ | ✘ | ✘ | ✔ |✘ | ✘
| Dasbor | ✘ | ✘ | ✘ | ✘ | ✘ | ✔
| authentikasi | ✘ | ✘ | ✔ | ✘ | ✘ | hanya ui



## Cara Memilih Template

**Gunakan Default jika:**
- Kamu ingin setup lengkap dan siap production
- Membangun aplikasi Nuxt serius dengan full toolchain
- Ingin mengikuti best practices yang sudah dikurasi

**Gunakan Minimal jika:**
- Sedang prototyping atau eksperimen cepat
- Ingin kontrol penuh atas setiap konfigurasi
- Membangun sesuatu yang sederhana tanpa overhead

**Gunakan auth jika:**
- Kamu sudah familiar dengan workflow moderen
- Ingin setup yang paling opinionated dan lengkap
- Memiliki sistem full stack tanpa memiliki proyek backend sendiri

**Gunakan blog jika:**
- Membutuhkan dukungan markdown menjadi html minimalis
- Membangun sistem Blog sendiri
- Membutuhkan dukungan *Search Engine Optimization* (SEO)

**Gunakan Portofolio jika:**
- Sedang Membangun Branding Pribadi
- Membutuhkan Situs Statis Cepat 
- Ingin terlihat Profesional dan Proper

**Gunakan Portofolio Dasbor jika:**
- Sedang Membangun dashbor interaktif 
- Membutuhkan menejemen ERD bisnis dan dashboard realtime 
- Dukungan SLA penuh terhadap sistem anda

## Menambah Template Sendiri

Kamu bisa menambahkan template custom dengan membuat folder baru di direktori `templates/` di repository ini. Lihat [CONTRIBUTING.md](https://github.com/davingm/nuxt-davingm/blob/main/CONTRIBUTING.md) untuk panduan kontribusi.
