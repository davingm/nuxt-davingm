# Git Integration

`create-davingm-nuxt` dapat menginisialisasi git repository secara otomatis saat membuat project baru.

## Cara Kerja

Jika `git` terdeteksi di sistem, CLI akan menampilkan prompt:

```
◆  Initialize git repository?
│  ● Yes / ○ No
```

Jika memilih **Yes**, CLI akan menjalankan `git init` di folder project yang baru dibuat.

## Jika Git Tidak Tersedia

Jika `git` tidak ditemukan di PATH sistem, CLI akan menampilkan peringatan dan melewati langkah ini:

```
⚠  Git tidak ditemukan. Repository Git akan dilewati.
```

Project akan tetap dibuat tanpa git repository.

## Inisialisasi Manual

Jika melewati langkah git saat setup, kamu bisa menginisialisasinya secara manual kapan saja:

```bash
cd my-project
git init
git add .
git commit -m "chore: initial commit"
```

## Setup Remote Repository

Setelah git diinisialisasi, tambahkan remote dan push ke GitHub/GitLab:

```bash
# Tambahkan remote origin
git remote add origin https://github.com/username/my-project.git

# Push commit pertama
git branch -M main
git push -u origin main
```

## .gitignore

Semua template sudah menyertakan file `.gitignore` yang dikonfigurasi untuk project Nuxt, mencakup:

- `node_modules/`
- `.nuxt/`
- `.output/`
- `.env` dan file environment lainnya
- File build dan cache
