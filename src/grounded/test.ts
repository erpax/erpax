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

  it('a pure convention is grounded; a raw-fs scanner is not', () => {
    // `dry` is pure math over an in-memory model. `sealed` USED to read process.cwd()/src and was
    // the ungrounding this atom exists to price; it now asks one `git grep` over the committed
    // tree, so it is grounded — this is the flip its own comment asked for when the fix landed.
    expect(isGrounded('dry')).toBe(true)
    expect(isGrounded('sealed')).toBe(true)
    // `fresh` still reads the mutable tree — the law is refutable while at least one input does.
    expect(isGrounded('fresh')).toBe(false)
  })

  it('ungrounded is the fix list — a strict subset, not the whole chain', () => {
    const u = ungrounded()
    expect(u).toContain('fresh')
    expect(u).not.toContain('sealed') // regrounded — a fixed input must leave the fix list
    expect(u.length).toBeGreaterThan(0)
    expect(u.length).toBeLessThan(TRUST_INPUTS.length)
    expect(u.every((c) => TRUST_INPUTS.includes(c))).toBe(true)
  })
})
