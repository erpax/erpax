import { describe, it, expect } from 'vitest'
import { coverage } from '@/convention/shallow'

describe('convention/shallow — import the index, not a deep file', () => {
  it('coverage is the index-only fraction in [0,1]', () => {
    const c = coverage()
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })
  it('coverage is deterministic — the same live tree yields the same value', () => {
    expect(coverage()).toBe(coverage())
  })
})
