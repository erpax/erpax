import { describe, it, expect } from 'vitest'
import { volume, atomPath, spreadOf } from './index'
describe('generate — book matter', () => {
  it('exports volume identity', () => {
    expect(volume).toBe('generate')
    expect(atomPath).toBe('generate')
  })
  it('spreadOf is non-negative', () => {
    const s = spreadOf()
    expect(s.debit).toBeGreaterThanOrEqual(0)
    expect(s.credit).toBeGreaterThanOrEqual(0)
  })
})
