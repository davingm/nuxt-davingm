# Api Collective

## Set up API

pengembang kini tidak perlu set up project cukup set end points di .env file, dan gunakan composable useApi() untuk memanggil API.

```js
NUXT_PUBLIC_API_BASE=http://localhost:8080/api
NAME_APP="Nuxt-app"
```
## Coba dan gunakan

Pengembang hanya cukup memanggil composable useApi() untuk memanggil API, contoh:

```ts
const api = useApi()

const data = await api('/users')
```




