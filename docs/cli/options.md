# Opsi & Prompt

Detail setiap prompt yang ditampilkan oleh CLI beserta opsi yang tersedia.

## Prompt 1: Pilih Template

```
◆  Template mana yang ingin Anda gunakan?
```

**Tipe:** Single select  
**Opsi:** Daftar folder yang ada di direktori `templates/`

| Nilai | Label | Hint |
|---|---|---|
| `default` | Default | "Davingm recommended starter" |
| `minimal` | Minimal | — |
| `jawa` | Jawa | — |

Nama template diformat otomatis: `my-template` → `My Template`.

---

## Prompt 2: Lokasi Project

```
◆  Di mana project ingin dibuat?
```

**Tipe:** Text input  
**Default:** `./my-project`

**Validasi:**
- Tidak boleh kosong
- Tidak boleh menggunakan `.` (folder saat ini)
- Nama folder hanya boleh mengandung: huruf, angka, `-`, `_`
- Tidak boleh sama dengan direktori kerja saat ini

---

## Prompt 3: Folder Sudah Ada

Hanya muncul jika folder tujuan sudah ada dan tidak kosong.

```
◆  Folder "[path]" sudah ada. Apa yang ingin dilakukan?
```

**Tipe:** Single select

| Nilai | Label | Hint |
|---|---|---|
| `replace` | Replace | "Hapus isi folder dan buat project baru" |
| `cancel` | Cancel | "Batalkan pembuatan project" |

---

## Prompt 4: Package Manager

```
◆  Package manager mana yang ingin digunakan?
```

**Tipe:** Single select  
**Opsi:** Hanya package manager yang terdeteksi di PATH sistem

| Nilai | Label | Deteksi |
|---|---|---|
| `pnpm` | pnpm | `which pnpm` |
| `npm` | npm | `which npm` |
| `yarn` | Yarn | `which yarn` |
| `bun` | Bun | `which bun` |

---

## Prompt 5: Initialize Git

Hanya muncul jika `git` terdeteksi di sistem.

```
◆  Initialize git repository?
```

**Tipe:** Confirm (Yes/No)  
**Default:** `Yes`

Jika `git` tidak ditemukan, langkah ini dilewati dengan peringatan:

```
⚠  Git tidak ditemukan. Repository Git akan dilewati.
```

---

## Membatalkan Prompt

Tekan `Ctrl + C` kapan saja untuk membatalkan proses. CLI akan menampilkan:

```
◆  Dibatalkan.
```

dan keluar dengan exit code `0`.
