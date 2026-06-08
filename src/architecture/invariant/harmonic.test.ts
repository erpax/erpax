/**
 * The rodin closure law, asserted. Green by construction: this test IS the proof
 * that flow×flow stays in the {1,2,4,8,7,5} helix across the whole uuid matrix —
 * the closed-multiplicative-subgroup law the harmonic-band assignment relies on.
 * @see ./checks.ts (checkHarmonicHelixClosure), src/services/uuid-matrix
 */
import { describe, it, expect } from 'vitest'
import { checkHarmonicHelixClosure } from './checks'

describe('architecture-invariants: harmonic-helix-closure (Conservation Law 62, harmonic axis)', () => {
  it('flow×flow never escapes the helix; stored dir matches recompute', () => {
    const r = checkHarmonicHelixClosure({})
    expect(r.axis).toBe('entropy')
    expect(r.check).toBe('harmonic-helix-closure')
    expect(r.severity).toBe('pass')
  })
})
