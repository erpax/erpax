import { describe, it, expect } from 'vitest'
describe('quantum/ftl/purify', () => {
  it('loads', async () => {
    const m = await import('./index')
    expect(m).toBeTruthy()
  })
})
