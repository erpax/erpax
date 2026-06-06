import { describe, it, expect } from 'vitest'
import { coverage } from '@/convention/sealed'

describe('convention/sealed — entropy leaves through error handling', () => {
  it('coverage is a fraction in [0,1], computed (no default)', () => {
    const c = coverage()
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })
  it('is deterministic — the same tree gives the same seal', () => {
    expect(coverage()).toBe(coverage())
  })
})
