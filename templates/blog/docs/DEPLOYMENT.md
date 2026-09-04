# Deployment Guide — Vercel & Netlify

Panduan ini menjelaskan bagaimana mendeply starter Nuxt ini ke Vercel dan Netlify, baik sebagai static site maupun SSR (server-side rendering) menggunakan Nitro.

Prereqs
- Pastikan project dapat dibuild: `pnpm build` menghasilkan `.output` (Nuxt 4 + Nitro)
- Set `public.apiBase` di `nuxt.config.ts` via runtimeConfig atau environment variables

Terminologi singkat
- Static: aplikasi di-export ke static files (`.output/public`) — cocok untuk SPA atau prerendered sites.
- SSR (Nitro): Nuxt membangun server handler (`.output/server`) 或 platform-specific serverless functions — mendukung dynamic rendering.

1) Static deployment (Vercel / Netlify)
- Perintah build: `pnpm build`
- Publish directory: `.output/public`

Contoh Vercel (static): gunakan `vercel.json` yang ada di repo. Vercel build 设置为：
```json
{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@vercel/static-build", "config": { "distDir": ".output/public" } }
  ]
}
```

Contoh Netlify (static): 在 `netlify.toml` 中设置：
```
[build]
  command = "pnpm build"
  publish = ".output/public"
```

2) SSR deployment (recommended for full-featured starter)

Untuk SSR kamu harus mengeluarkan Nuxt/Nitro output yang sesuai dengan platform. Nitro 支持 preset untuk Vercel / Netlify：

- Vercel: 在 `nuxt.config.ts` 添加：
```ts
export default defineNuxtConfig({
  nitro: {
    preset: 'vercel'
  }
})
```

- Netlify: 在 `nuxt.config.ts` 添加：
```ts
export default defineNuxtConfig({
  nitro: {
    preset: 'netlify'
  }
})
```

构建后 Nitro 会输出 platform-specific handler：（Vercel 会生成相关 build artifact，Netlify 会生成 `server` function 到 `.netlify/functions`）

Netlify config 示例（SSR）：`netlify.toml` 包含一个 redirect，将所有请求发送到 serverless 函数：
```
[[redirects]]
  from = "/*"
  to = "/.netlify/functions/server"
  status = 200
  force = true
```

Vercel SSR
- 如果使用 Nitro preset `vercel`，Vercel 会识别并部署为 serverless / edge function（无须额外 routing 配置）。你也可以使用 `vercel.json` 覆盖构建设置。

Environment variables
- At minimum, set `API_BASE`（或 melalui Vercel/Netlify UI set `public.apiBase`）
- Di Vercel/Netlify, masukkan variabel ke Secrets/Environment settings pada dashboard

Healthchecks & production readiness
- Tambahkan `server` health endpoint (mis. `/health`) yang merespon 200.
- Setup proper logging & error tracking（Sentry, Logflare）

Troubleshooting
- Jika build menghasilkan `.output/public` tapi routes tidak berfungsi, pastikan `publish` 指向 `.output/public`。
- Untuk SSR 相关错误, periksa Nitro preset di `nuxt.config.ts` 并 inspeksi `.output` 目录结构。

Jika mau, saya bisa：
- Menambahkan `nuxt.config.ts` contoh yang mengandung `nitro` presets untuk Vercel & Netlify（pilihan）。
- 在 repo 中加入 `.vercelignore` 或 `.netlify`-specific script。

---
Dokumentasi ini bertujuan memberikan konfigurasi lengkap untuk kedua platform（static 与 SSR）。要我现在把 `nuxt.config.ts` 更新以示例 Nitro preset 吗？