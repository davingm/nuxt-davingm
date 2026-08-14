# 🤝 Panduan Kontribusi (Contributing Guidelines)

Terima kasih telah tertarik untuk berkontribusi! Proyek ini bersifat sumber terbuka (*open-source*), dan kami menyambut baik kontribusi dalam bentuk laporan bug, perbaikan kode, penambahan fitur, maupun pembaharuan dokumentasi.

---

## Cara Memulai

### 1. Prasyarat (Prerequisites)
Pastikan perangkat Anda telah terpasang:
- **Node.js**: versi `^20.0.0` atau yang lebih baru
- **pnpm**: versi `^9.0.0` (Manajer paket utama)

### 2. Pengaturan Lokal (Local Setup)
1. *Fork* repositori ini di GitHub.
2. *Clone* repositori hasil fork ke komputer lokal Anda:
   ```bash
   git clone https://github.com/USERNAME/REPOSITORY.git
   cd REPOSITORY
   ```
3. Pasang semua dependensi:
   ```bash
   pnpm install
   ```
4. Jalankan server pengembangan lokal:
   ```bash
   pnpm dev
   ```

---

## Alur Kerja Branch & Commit

### 1. Penamaan Branch
Gunakan konvensi penamaan branch yang konsisten:
- `feat/nama-fitur`: Untuk penambahan fitur baru.
- `fix/nama-bug`: Untuk perbaikan bug.
- `docs/deskripsi`: Untuk pembaharuan dokumentasi.
- `refactor/deskripsi`: Untuk perapihan kode tanpa mengubah fungsi.

### 2. Format Pesan Commit (Conventional Commits)
Gunakan format pesan commit terstruktur:
- `feat: menambahkan dukungan dark mode`
- `fix: memperbaiki error resolusi path css`
- `docs: memperbarui petunjuk penggunaan pada README`
- `style: merapikan format kode dengan Biome`

---

## Standar Kode & Verifikasi

Sebelum mengirimkan Pull Request, pastikan kode Anda lolos pemeriksaan berikut:

1. **Linting & Format**:
   ```bash
   pnpm lint
   ```
2. **Pengujian (Testing)**:
   ```bash
   pnpm test:run
   ```
3. **Verifikasi Kompilasi Nuxt**:
   ```bash
   npx nuxt prepare
   ```

---

## Mengirimkan Pull Request (PR)

1. Pastikan branch Anda sudah terbaru dengan `main`.
2. *Push* branch Anda ke repositori fork:
   ```bash
   git push origin feat/nama-fitur
   ```
3. Buka GitHub dan buat **Pull Request** ke branch `main`.
4. Isi formulir Pull Request sesuai dengan template yang tersedia.
5. Tunggu proses **GitHub Actions CI** selesai dan tinjauan dari pengembang utama.

Terima kasih atas kontribusi Anda dalam membangun ekosistem ini!
