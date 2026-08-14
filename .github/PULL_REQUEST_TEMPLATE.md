### 📋 Deskripsi Ringkas

<!-- Jelaskan secara singkat perubahan yang Anda lakukan dan alasan dibaliknya. -->

---

### 🔗 Issue Terkait

Fixes # <!-- Cantumkan nomor issue jika ada, contoh: Fixes #123 -->

---

### 🛠️ Jenis Perubahan

- [ ] 🐛 Bugfix (perbaikan masalah tanpa merusak fungsi eksisting)
- [ ] 🚀 Fitur Baru (penambahan fungsi baru pada CLI)
- [ ] 📁 Template (perubahan pada template preset)
- [ ] ⚠️ Breaking Change (perubahan yang membuat penggunaan sebelumnya tidak kompatibel)
- [ ] 📖 Dokumentasi (perubahan atau penambahan dokumentasi / README)
- [ ] 🎨 Refactor (perapihan kode tanpa mengubah fungsi)
- [ ] ⚙️ CI / Build (perubahan pada konfigurasi GitHub Actions)

---

### 🧪 Cara Menguji

<!-- Jelaskan bagaimana reviewer bisa menguji perubahan ini secara lokal. -->

```bash
# Contoh:
node src/cli.js
# Pilih template '...', masukkan path '...'
# Pastikan project berhasil di-generate di folder target
```

---

### 🔍 Checklist

- [ ] Saya telah menguji perubahan ini secara lokal dengan `node src/cli.js`.
- [ ] Semua template preset (`default`, `minimal`, `jawa`) masih berfungsi dengan benar.
- [ ] Tidak ada dependency baru yang ditambahkan tanpa alasan jelas.
- [ ] Dokumentasi (README, CHANGELOG) telah diperbarui jika relevan.
- [ ] Commit message mengikuti format [Conventional Commits](https://www.conventionalcommits.org/).
