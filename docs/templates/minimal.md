# Template Minimal

Setup minimalis Nuxt tanpa plugin tambahan — cocok untuk prototyping cepat.

## Deskripsi

Template **Minimal** adalah versi paling ringan dari `create-davingm-nuxt`. Hanya Nuxt dan TypeScript — tidak ada linter, testing framework, atau CSS utility yang dipasang. Ideal jika kamu ingin memulai dari scratch atau mencoba sesuatu dengan cepat.

## Tech Stack

| Teknologi | Versi | Keterangan |
|---|---|---|
| [Nuxt](https://nuxt.com) | v4 | Full-stack Vue framework |
| [TypeScript](https://typescriptlang.org) | Latest | Type safety |

## Kapan Menggunakan Template Ini?

- **Prototyping** — Ingin coba konsep baru tanpa setup overhead
- **Belajar** — Mulai dari Nuxt murni tanpa distraksi tooling
- **Proof of Concept** — Membangun demo atau PoC yang tidak butuh toolchain lengkap
- **Custom Setup** — Ingin mengkonfigurasi semua tooling sendiri dari nol

## Struktur Project

```
my-project/
├── app.vue                 # Root component
├── nuxt.config.ts          # Konfigurasi Nuxt
├── package.json
├── tsconfig.json
└── .gitignore
```

## Menambah Tooling Secara Manual

Setelah project dibuat, kamu bisa menambahkan tooling yang dibutuhkan:

### Tailwind CSS

```bash
npx nuxi module add tailwindcss
```

### ESLint

```bash
npx nuxi module add eslint
```

### Vitest

```bash
pnpm add -D vitest @nuxt/test-utils
```

## Scripts yang Tersedia

```bash
# Development server
pnpm dev

# Build production
pnpm build

# Preview build
pnpm preview
```
