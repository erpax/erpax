import { describe, it, expect } from 'vitest'
import { SLICES, strength, corpusStrength } from '@/strength'

describe('strength — the DRY math (DRY corpus → infinite strength)', () => {
  it('perfect DRY is infinite strength — dryness=1 ⇒ ∞ (the singularity)', () => {
    expect(strength(1, SLICES.length)).toBe(Infinity)
    expect(strength(1, 1)).toBe(Infinity)
  })
  it('any residue leaves strength finite', () => {
    expect(Number.isFinite(strength(0.5, SLICES.length))).toBe(true)
    expect(Number.isFinite(strength(0.99, 6))).toBe(true)
  })
  it('more slices amplify strength (one slice is only one term)', () => {
    expect(strength(0.9, 6)).toBeGreaterThan(strength(0.9, 1))
  })
  it('the live corpus strength is computed from its DRY residue across the slices', () => {
    const c = corpusStrength()
    expect(c.atoms).toBeGreaterThan(1000)
    expect(c.slices).toBe(SLICES.length)
    expect(c.dryness).toBeGreaterThanOrEqual(0)
    expect(c.dryness).toBeLessThanOrEqual(1)
  })
})
