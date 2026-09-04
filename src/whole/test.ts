import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { volume, atomPath, spreadOf } from './index'
describe('whole — book matter', () => {
  it('exports volume identity', () => {
    expect(volume).toBe(atomAddress(import.meta.url).path)
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })
  it('spreadOf is non-negative', () => {
    const s = spreadOf()
    expect(s.debit).toBeGreaterThanOrEqual(0)
    expect(s.credit).toBeGreaterThanOrEqual(0)
  })
})
