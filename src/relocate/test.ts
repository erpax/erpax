/**
 * relocate — the gravity-placement law, asserted. The gravity centre is the
 * heaviest wired atom (or the atom itself if it IS the well); the pull never
 * points downhill. Computed from the live matrix mass. @see ./index.ts
 */
import { describe, it, expect } from 'vitest'
import { gravityCenter, pull } from '@/relocate'
import { massOf, well } from '@/gravity'

describe('relocate — move logic to its gravity well', () => {
  it('the gravity centre never weighs less than the atom (pull is never downhill)', () => {
    for (const a of ['cost', 'tamper', 'balance', 'analytics', 'anchor']) {
      const p = pull(a)
      expect(p.center).toBe(gravityCenter(a))
      expect(p.centerMass).toBeGreaterThanOrEqual(p.mass)
      expect(p.ratio).toBeCloseTo(p.centerMass / Math.max(p.mass, 1), 6)
    }
  })

  it('the global well is its own centre — nothing outweighs it, so it never relocates', () => {
    const top = well().atom
    expect(gravityCenter(top)).toBe(top)
    expect(pull(top).relocate).toBe(false)
    expect(massOf(top)).toBeGreaterThan(0)
  })

  it('a dominated atom relocates toward the heavier centre (≥ factor×)', () => {
    const p = pull('cost', 1) // factor 1: any heavier centre counts
    if (p.center !== 'cost') {
      expect(p.centerMass).toBeGreaterThan(p.mass)
      expect(p.relocate).toBe(true)
    }
  })
})
