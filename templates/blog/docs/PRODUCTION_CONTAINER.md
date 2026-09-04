# Production Container (Devcontainer) — Petunjuk

File `./.devcontainer/Dockerfile` berisi multi-stage Dockerfile yang dirancang untuk produksi Nuxt 4 (SSR).

Prinsip desain
- Multi-stage build: builder stage membangun aplikasi, runner stage hanya berisi runtime dan dependensi produksi.
- Non-root runtime: image menjalankan server sebagai user `app` (UID 1000) untuk keamanan.
- Menggunakan `corepack` + `pnpm` untuk instalasi yang konsisten.
- `NODE_ENV=production` secara default.

Cara membangun image secara manual

```bash
# dari folder proyek
docker build -f .devcontainer/Dockerfile -t nuxt-starter:prod .
```

Menjalankan container

```bash
docker run -p 3000:3000 --env NODE_ENV=production --name nuxt-starter nuxt-starter:prod
```

Tips keamanan dan produksi ketat
- Gunakan image base yang di-scan vulnerabilitas secara berkala.
- Pertimbangkan mengganti `node:20-bullseye-slim` dengan distroless atau `gcr.io/distroless/nodejs:20` untuk footprint lebih kecil dan attack surface lebih kecil.
- Jalankan image di orchestrator (Kubernetes) dengan `readOnlyRootFilesystem` dan resource limits.
- Tambahkan healthcheck yang sesuai (health endpoint) dan metrics.
- Jangan simpan secrets di image; gunakan secret manager atau environment variables di runtime platform.

Integrasi VS Code Remote (devcontainer)
- `devcontainer.json` sudah disediakan untuk membuka workspace di VS Code langsung ke container.
- `postCreateCommand` menjalankan `pnpm install` (cenderung tidak diperlukan untuk image produksi tapi membantu devcontainer).

Perlu bantuan lebih lanjut
- Saya bisa membuat varian distroless yang lebih ketat.
- Saya bisa menambahkan healthcheck, non-root capabilities drop, dan small init process (`tini`).

***
Dokumentasi singkat ini ditujukan sebagai panduan cepat; mau saya tambahkan varian distroless sekarang?"