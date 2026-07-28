import { describe, it, expect } from 'vitest'
describe('algebra/host', () => {
  it('loads', async () => {
    const m = await import('./index')
    expect(m).toBeTruthy()
  })
})
