import { describe, it, expect } from 'vitest'
import { CONVENTIONS, conventionChecks } from '@/convention'

describe('convention — the registry the collider composes', () => {
  it('registers conventions, each with a coverage function', () => {
    expect(CONVENTIONS.length).toBeGreaterThanOrEqual(17)
    for (const c of CONVENTIONS) expect(typeof c.coverage).toBe('function')
  })
  it('conventionChecks computes every coverage in [0,1] — no default, pure math', () => {
    const checks = conventionChecks()
    expect(checks.length).toBe(CONVENTIONS.length)
    for (const k of checks) {
      expect(k.coverage).toBeGreaterThanOrEqual(0)
      expect(k.coverage).toBeLessThanOrEqual(1)
    }
  })
})
