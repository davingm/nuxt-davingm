# Autentikasi

Sistem autentikasi menggunakan **session berbasis cookie**. Token acak disimpan di cookie `httpOnly` di browser pengguna, dan sesi yang sesuai disimpan di tabel `sessions` di database.

---

## Alur Autentikasi

### Register

```
Client                          Server
  │                               │
  ├─ POST /api/auth/register ────►│
  │   { name, email, password,    │
  │     password_confirmation }   │
  │                               ├─ Validasi input
  │                               ├─ Cek duplikat email
  │                               ├─ Hash password (bcrypt, salt 10)
  │                               ├─ INSERT INTO users
  │                               ├─ INSERT INTO sessions (expires 7 hari)
  │◄─ 201 + Set-Cookie ──────────┤
  │   { message, user }          │
```

### Login

```
Client                          Server
  │                               │
  ├─ POST /api/auth/login ───────►│
  │   { email, password }         │
  │                               ├─ Cari user by email
  │                               ├─ bcrypt.compare(password, hash)
  │                               ├─ INSERT INTO sessions
  │◄─ 200 + Set-Cookie ──────────┤
  │   { message, user }          │
```

### Validasi Session (setiap request ke halaman protected)

```
Client                          Server
  │                               │
  ├─ GET /api/auth/me ───────────►│
  │   Cookie: auth_token=<token>  │
  │                               ├─ Baca token dari cookie
  │                               ├─ JOIN sessions + users WHERE token = ?
  │                               ├─ Cek expires_at > sekarang
  │◄─ 200 { user } / 401 ────────┤
```

### Logout

```
Client                          Server
  │                               │
  ├─ POST /api/auth/logout ──────►│
  │                               ├─ DELETE FROM sessions WHERE token = ?
  │                               ├─ Clear cookie
  │◄─ 200 ────────────────────────┤
```

---

## API Endpoints

### `POST /api/auth/register`

**Request body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "password_confirmation": "secret123"
}
```

**Response 201:**

```json
{
  "statusCode": 201,
  "message": "Registrasi berhasil",
  "user": { "id": 1, "name": "John Doe", "email": "john@example.com" }
}
```

**Error yang mungkin:**

| Kode | Pesan                           |
|------|---------------------------------|
| 400  | Nama wajib diisi                |
| 400  | Email tidak valid               |
| 400  | Password minimal 6 karakter     |
| 400  | Konfirmasi password tidak cocok |
| 409  | Email sudah terdaftar           |

---

### `POST /api/auth/login`

**Request body:**

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response 200:**

```json
{
  "statusCode": 200,
  "message": "Login berhasil",
  "user": { "id": 1, "name": "John Doe", "email": "john@example.com" }
}
```

**Error yang mungkin:**

| Kode | Pesan                       |
|------|-----------------------------|
| 400  | Email wajib diisi           |
| 400  | Password wajib diisi        |
| 401  | Email atau password salah   |

---

### `POST /api/auth/logout`

Tidak memerlukan request body. Token dibaca dari cookie secara otomatis.

**Response 200:**

```json
{
  "statusCode": 200,
  "message": "Logout berhasil"
}
```

---

### `GET /api/auth/me`

Memerlukan cookie `auth_token` yang valid atau header `Authorization: Bearer <token>`.

**Response 200:**

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response 401:**

```json
{
  "statusCode": 401,
  "statusMessage": "Unauthenticated"
}
```

---

## Proteksi Route

### Halaman yang memerlukan login (`middleware: auth`)

Tambahkan di bagian `<script setup>` halaman:

```typescript
definePageMeta({
  middleware: "auth",
});
```

Jika user belum login, akan diredirect ke `/login`.

### Halaman yang hanya untuk tamu (`middleware: guest`)

```typescript
definePageMeta({
  middleware: "guest",
});
```

Jika user sudah login, akan diredirect ke `/dashboard`.

---

## Proteksi API Endpoint (Server)

Untuk membuat endpoint yang memerlukan autentikasi, gunakan `getUserFromEvent`:

```typescript
import { getUserFromEvent } from "../../utils/session";

export default defineEventHandler(async (event) => {
  const user = await getUserFromEvent(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthenticated",
    });
  }

  // user sudah tersedia dan terverifikasi
  return { data: `Halo ${user.name}` };
});
```

---

## Cookie Session

Token disimpan di cookie dengan konfigurasi berikut:

| Properti    | Nilai                              | Keterangan                                  |
|-------------|-------------------------------------|---------------------------------------------|
| `httpOnly`  | `true`                              | Tidak dapat diakses via JavaScript di browser |
| `sameSite`  | `lax`                               | Perlindungan CSRF dasar                     |
| `secure`    | `true` di production                | Hanya dikirim via HTTPS                     |
| `expires`   | 7 hari dari waktu login             | Sesi berakhir otomatis                      |
| `path`      | `/`                                 | Berlaku untuk seluruh halaman               |

Token juga dapat dikirim via header `Authorization: Bearer <token>` untuk keperluan API client non-browser.

---

## Menggunakan `useAuth` di Komponen

```vue
<script setup lang="ts">
const { user, status, login, logout, isAuthenticated } = useAuth();
</script>

<template>
  <div v-if="isAuthenticated">
    <p>Halo, {{ user?.name }}</p>
    <button @click="logout">Keluar</button>
  </div>
  <div v-else>
    <p>Kamu belum login.</p>
  </div>
</template>
```

### State yang tersedia dari `useAuth()`

| Property          | Tipe                                        | Keterangan                              |
|-------------------|---------------------------------------------|-----------------------------------------|
| `user`            | `Ref<AuthUser \| null>`                     | Data user yang sedang login             |
| `status`          | `Ref<'loading' \| 'authenticated' \| 'unauthenticated'>` | Status autentikasi saat ini |
| `isAuthenticated` | `ComputedRef<boolean>`                      | Shortcut: true jika sudah login         |
| `fetchUser()`     | `() => Promise<AuthUser \| null>`           | Ambil ulang data user dari server       |
| `login(creds)`    | `(credentials) => Promise<...>`             | Login dengan email & password           |
| `register(form)`  | `(formData) => Promise<...>`                | Registrasi akun baru                    |
| `logout()`        | `() => Promise<void>`                       | Logout dan redirect ke `/login`         |
