import { describe, expect, it } from 'vitest'

import { coverage, isGrounded, sealedSource, TRUST_INPUTS, ungrounded } from './index'

describe('grounded — a trust computation may source only from sealed content', () => {
  it('coverage is the grounded fraction ∈ [0,1]', () => {
    const c = coverage()
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
    // equals |grounded| / |inputs| — the @invariant
    expect(c).toBeCloseTo(TRUST_INPUTS.filter(isGrounded).length / TRUST_INPUTS.length, 10)
  })

  it('sealedSource reads committed content (git blob), not the mutable tree', () => {
    // This atom itself is (or will be) committed; a nonexistent path is never sealed.
    expect(sealedSource('src/does/not/exist.ts')).toBeNull()
  })

  it('a pure convention is grounded; a process.cwd() scanner is not', () => {
    // `dry` is pure math over an in-memory model; `sealed` reads process.cwd()/src — the very
    // ungrounding this atom exists to price. If `sealed` is ever regrounded, flip this and raise
    // the ceiling — the test tracks the fix.
    expect(isGrounded('dry')).toBe(true)
    expect(isGrounded('sealed')).toBe(false)
  })

  it('ungrounded is the fix list — a strict subset, not the whole chain', () => {
    const u = ungrounded()
    expect(u).toContain('sealed')
    expect(u.length).toBeGreaterThan(0)
    expect(u.length).toBeLessThan(TRUST_INPUTS.length)
    expect(u.every((c) => TRUST_INPUTS.includes(c))).toBe(true)
  })
})
