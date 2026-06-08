import { describe, it, expect } from 'vitest'

describe('types — Payload generated types barrel', () => {
  it('re-exports the generated payload-types surface via @/types', async () => {
    const mod = await import('@/types')
    expect(mod).toBeDefined()
  })
})
