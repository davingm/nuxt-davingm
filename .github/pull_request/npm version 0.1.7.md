## Rangkuman Perbaikan PR (Summary of Changes)

### 1. Sinkronisasi Tema Light/Dark & State Vue

* **Root Cause:** State Vue (`useState`) tidak tersinkron dengan kelas DOM yang di-set oleh inline script saat pertama kali *load*, sehingga ikon dan state tidak sesuai setelah *hydration*.
* **Fix:**
* Membuat plugin client (`theme.client.ts`) untuk memastikan sinkronisasi tema berjalan dengan benar setelah *hydration*.
* Menggunakan `<ClientOnly>` pada komponen ikon *theme toggle* untuk mencegah *hydration mismatch error* antara SSR (Server-Side Rendering) dan Client.



### 2. Pemisahan Warna Sidebar vs Content Area (Theme Mode)

* **Root Cause:** Sidebar, top bar, dan area *content* sebelumnya menggunakan warna gelap (`#0A0A0A`) secara permanen di semua mode.
* **Fix:**
* **Light Mode:** Sidebar menggunakan warna warm off-white (`#f0ede8`), sedangkan top bar dan area *content utama* menggunakan putih bersih (`#ffffff`) agar memiliki kontras visual yang jelas dan tidak membingungkan.
* **Dark Mode:** Sidebar tetap konsisten bernuansa gelap (`#121212`), dan area *content* menggunakan abu-abu gelap (`#111111`).
* Memperbaiki semua komponen *dropdown*, *separator*, dan *menu item* agar ikut berubah mengikuti tema aktif (tidak lagi *hardcode* warna gelap).



### 3. Penambahan Menu "Home" di Sidebar Menu Bawah

* **Fix:**
* Menambahkan menu navigasi **Home** pada komponen `NavUser.vue` di bagian bawah sidebar, ditempatkan berdampingan bersama menu *Settings* dan *Logout*.