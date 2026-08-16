import { describe, it, expect, vi } from 'vitest'

describe('useUserService', () => {
  it('calls api with /users on getAll', async () => {
    const mockApi = vi.fn().mockResolvedValue([])
    // @ts-ignore
    globalThis.useApi = () => mockApi

    const mod = await import('../../../app/composables/useUserService')
    const { useUserService } = mod
    const svc = useUserService()

    await svc.getAll()

    expect(mockApi).toHaveBeenCalled()
    expect(mockApi.mock.calls[0][0]).toBe('/users')
  })
})
