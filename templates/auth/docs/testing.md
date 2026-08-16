# Testing

Starter ini menggunakan **Vitest** sebagai test runner. Semua test berjalan di environment `node` dengan SQLite in-memory, sehingga tidak mempengaruhi file database development dan tidak memerlukan server yang berjalan.

---

## Menjalankan Test

```bash
# Jalankan semua test sekali
pnpm test:run

# Jalankan dengan watch mode (auto re-run saat file berubah)
pnpm test:watch

# Jalankan dengan UI interaktif di browser
pnpm test:ui

# Jalankan dengan laporan coverage
pnpm test:coverage
```

---

## Struktur Test

```
test/
├── setup.ts              # Konfigurasi global: mock useRuntimeConfig & useApi
└── unit/
    ├── migrations.spec.ts    # Test skema dan constraint database
    ├── db.spec.ts            # Test fungsi CRUD users & sessions
    ├── session.spec.ts       # Test parsing cookie dan Bearer token
    ├── useAuth.spec.ts       # Test composable autentikasi
    └── useUserService.spec.ts # Test composable service layer
```

---

## Penjelasan Tiap File Test

### `migrations.spec.ts`

Memverifikasi bahwa skema SQL menghasilkan tabel dengan struktur yang benar.

- Tabel `users` dan `sessions` terbuat
- Kolom sesuai dengan definisi di `schema.ts`
- Constraint `UNIQUE` pada email berfungsi
- `ON DELETE CASCADE` dari `users` ke `sessions` berfungsi

### `db.spec.ts`

Mengetes semua fungsi query di `server/utils/db.ts` menggunakan database in-memory.

- `createUser` — membuat user dan mengembalikan data
- `findUserByEmail` — pencarian case-insensitive
- `createSession` / `findSessionByToken` — lifecycle session
- `deleteSession` — penghapusan session
- Cascade delete saat user dihapus

### `session.spec.ts`

Mengetes helper `server/utils/session.ts` dengan mock H3.

- `getSessionToken` membaca dari cookie `auth_token`
- `getSessionToken` membaca dari header `Authorization: Bearer`
- Cookie diutamakan dari header jika keduanya ada
- Mengembalikan `null` jika tidak ada token

### `useAuth.spec.ts`

Mengetes composable `app/composables/useAuth.ts` dengan mock `$fetch`.

- `fetchUser` — set state saat berhasil / gagal
- `login` — set user dan status authenticated
- `logout` — reset user dan redirect ke `/login`

### `useUserService.spec.ts`

Mengetes composable `app/composables/useUserService.ts`.

- `getAll` memanggil API dengan path `/users`
- `getById` memanggil API dengan path `/users/:id`

---

## Menulis Test Baru

### Test untuk server utility / database

Gunakan SQLite in-memory langsung:

```typescript
import Database from "better-sqlite3";
import { beforeEach, afterEach, describe, it, expect } from "vitest";

describe("PostRepository", () => {
  let db: ReturnType<typeof Database>;

  beforeEach(() => {
    db = new Database(":memory:");
    db.pragma("foreign_keys = ON");
    db.exec(`
      CREATE TABLE posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
      );
    `);
  });

  afterEach(() => db.close());

  it("menyimpan dan mengambil post", () => {
    db.prepare("INSERT INTO posts (title) VALUES (?)").run("Hello");
    const post = db.prepare("SELECT * FROM posts WHERE id = 1").get();
    expect(post).toMatchObject({ title: "Hello" });
  });
});
```

### Test untuk API handler

Buat mock untuk dependency dan panggil handler secara langsung:

```typescript
import { describe, it, expect, vi } from "vitest";

vi.mock("../../server/utils/db", () => ({
  findUserByEmail: vi.fn().mockResolvedValue(null),
  createUser: vi.fn().mockResolvedValue({ id: 1, name: "Test", email: "test@example.com" }),
  createSession: vi.fn().mockResolvedValue({}),
}));

vi.mock("../../server/utils/session", () => ({
  setSessionCookie: vi.fn(),
}));

describe("register endpoint", () => {
  it("membuat user baru", async () => {
    // import handler setelah mock terdaftar
    const handler = await import("../../server/api/auth/register.post");
    // ...
  });
});
```

### Test untuk composable Vue

Gunakan `vi.stubGlobal` untuk mock Nuxt globals:

```typescript
import { describe, it, expect, vi } from "vitest";

vi.stubGlobal("$fetch", vi.fn().mockResolvedValue({ data: [] }));
vi.stubGlobal("useState", (key, init) => ({ value: init() }));

describe("useMyComposable", () => {
  it("bekerja dengan benar", async () => {
    const { useMyComposable } = await import("~/composables/useMyComposable");
    // ...
  });
});
```

---

## Konfigurasi Vitest

File `vitest.config.ts` di root proyek mengatur:

- **environment**: `node` — lebih ringan dari jsdom, cocok untuk test server
- **globals**: `true` — `describe`, `it`, `expect` tersedia tanpa import
- **setupFiles**: `test/setup.ts` — mock global Nuxt dijalankan sebelum setiap test
- **alias**: `~` dan `@` mengarah ke folder `app/`
- **coverage**: menggunakan V8, mengcover file di `server/` dan `app/`
