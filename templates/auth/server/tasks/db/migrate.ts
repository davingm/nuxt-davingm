import { runMigrations } from '../../database/migrations'

const defineTask = typeof defineNitroTask !== 'undefined' ? defineNitroTask : (fn: any) => fn

export default defineTask(async () => {
  console.log('[Nitro Task] Memulai tugas db:migrate...')
  await runMigrations()
  return { result: 'Migrasi database berhasil diselesaikan.' }
})

if (process.argv[1]?.includes('migrate')) {
  runMigrations().catch((err) => {
    console.error('[Migration] Migrasi database gagal:', err)
    process.exit(1)
  })
}
