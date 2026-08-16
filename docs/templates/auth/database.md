# Database

Starter ini menggunakan **SQLite** via `better-sqlite3` — database berbasis file yang berjalan langsung tanpa perlu server database eksternal. File database disimpan di `.data/database.sqlite` dan dibuat otomatis saat server pertama kali dijalankan.

---

## Cara Kerja Inisialisasi

Saat `pnpm dev` atau `pnpm start` dijalankan, plugin `server/plugins/db.ts` dipanggil satu kali oleh Nitro:

```
Server start
    └─ server/plugins/db.ts
           └─ initDb()
                 ├─ runMigrations()   → buat tabel jika belum ada
                 └─ DatabaseSeeder.run() → isi data awal jika tabel kosong
```

Developer **tidak perlu menjalankan perintah migrasi secara manual** untuk mulai development.

---

## Skema Tabel

Skema didefinisikan di `server/database/schema.ts` menggunakan Drizzle ORM.

### Tabel `users`

| Kolom        | Tipe     | Keterangan                        |
|--------------|----------|-----------------------------------|
| `id`         | INTEGER  | Primary key, auto increment       |
| `name`       | TEXT     | Nama lengkap pengguna             |
| `email`      | TEXT     | Email unik, disimpan lowercase    |
| `password`   | TEXT     | Hash bcrypt dari password         |
| `created_at` | DATETIME | Waktu pembuatan (auto)            |
| `updated_at` | DATETIME | Waktu terakhir diubah (auto)      |

### Tabel `sessions`

| Kolom        | Tipe     | Keterangan                                           |
|--------------|----------|------------------------------------------------------|
| `id`         | TEXT     | UUID sesi                                            |
| `user_id`    | INTEGER  | Foreign key ke `users.id` (CASCADE DELETE)           |
| `token`      | TEXT     | Token acak yang disimpan di cookie                   |
| `expires_at` | DATETIME | Waktu kadaluarsa sesi (7 hari dari login)            |
| `created_at` | DATETIME | Waktu pembuatan (auto)                               |

---

## Membuat Tabel Baru

Ini adalah alur lengkap untuk menambahkan tabel baru ke proyek.

### Langkah 1 — Definisikan skema di `schema.ts`

Buka `server/database/schema.ts` dan tambahkan definisi tabel:

```typescript
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// ... tabel yang sudah ada ...

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
```

### Langkah 2 — Tambahkan SQL ke migrations

Buka `server/database/migrations/index.ts` dan tambahkan SQL `CREATE TABLE` baru:

```typescript
const CREATE_POSTS = `
  CREATE TABLE IF NOT EXISTS posts (
    id         INTEGER  PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER  NOT NULL,
    title      TEXT     NOT NULL,
    body       TEXT     NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;
```

Lalu panggil di fungsi `runMigrations()`:

```typescript
db.exec(CREATE_USERS + CREATE_SESSIONS + CREATE_POSTS);
```

Dan tambahkan juga ke `DROP_ALL` agar `create-drop` dan `db:fresh` berfungsi dengan benar:

```typescript
const DROP_ALL = `
  DROP TABLE IF EXISTS posts;      // ← tambahkan sebelum tabel yang menjadi foreign key target
  DROP TABLE IF EXISTS sessions;
  DROP TABLE IF EXISTS users;
`;
```

> Urutan DROP penting: tabel yang memiliki foreign key ke tabel lain harus di-drop lebih dulu.

### Langkah 3 — Tambahkan fungsi query di `server/utils/db.ts`

```typescript
import type { Post } from "../database/schema";

export async function findPostsByUserId(userId: number): Promise<Post[]> {
  await initDb();
  const conn = getConnection();
  return conn
    .prepare("SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC")
    .all(userId) as Post[];
}

export async function createPost(
  userId: number,
  title: string,
  body: string,
): Promise<Post> {
  await initDb();
  const conn = getConnection();
  const info = conn
    .prepare("INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)")
    .run(userId, title, body);
  const post = conn
    .prepare("SELECT * FROM posts WHERE id = ?")
    .get(info.lastInsertRowid) as Post;
  if (!post) throw new Error("Gagal membuat post");
  return post;
}
```

### Langkah 4 — Buat API endpoint

Buat file `server/api/posts/index.get.ts`:

```typescript
export default defineEventHandler(async (event) => {
  const user = await getUserFromEvent(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  const posts = await findPostsByUserId(user.id as number);
  return { posts };
});
```

### Langkah 5 — Restart server

Jika `DB_TYPE=update`, cukup restart `pnpm dev`. Tabel baru akan dibuat otomatis karena kita pakai `CREATE TABLE IF NOT EXISTS`.

Jika ingin reset dari awal (hapus semua data):

```bash
pnpm db:fresh:seed
```

---

## Perintah Database CLI

Semua perintah ini dapat dijalankan langsung dari terminal tanpa server berjalan.

```bash
# Jalankan migrasi (buat tabel jika belum ada)
pnpm db:migrate

# Jalankan seeder (isi data awal)
pnpm db:seed

# Reset database: drop semua tabel + migrasi ulang
pnpm db:fresh

# Reset database + isi data awal
pnpm db:fresh:seed
```

---

## Menambahkan Seeder Baru

Buat file seeder baru di `server/database/seeders/PostSeeder.ts`:

```typescript
import { Seeder } from "./Seeder";
import { createPost } from "../../utils/db";

export class PostSeeder extends Seeder {
  async run(): Promise<void> {
    console.log("  [PostSeeder] Membuat post contoh...");
    // logika seeding di sini
    console.log("  [PostSeeder] Selesai.");
  }
}
```

Lalu daftarkan di `DatabaseSeeder.ts`:

```typescript
import { PostSeeder } from "./PostSeeder";

export class DatabaseSeeder extends Seeder {
  async run(): Promise<void> {
    await this.call([
      UserSeeder,
      PostSeeder,  // ← tambahkan di sini
    ]);
  }
}
```

---

## Lokasi File Database

```
.data/
└── database.sqlite    ← file database utama
```

Folder `.data/` sudah masuk ke `.gitignore` dan `.npmignore`. File ini tidak akan ter-commit ke repository dan tidak akan ikut saat publish ke npm. Setiap developer yang menjalankan proyek akan mendapat database segar miliknya sendiri.
