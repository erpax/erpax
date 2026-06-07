import { describe, it, expect } from 'vitest'
import { intensity, constructive, destructive, crossTerm, visibility } from '@/interference'

// Two-path interference. Tests assert the wave RELATIONS — constructive/destructive
// extremes, the classical mean, bounded fringes, energy conservation — never a magic number.
const a1 = 0.8
const a2 = 0.5
const classical = a1 * a1 + a2 * a2

describe('interference: amplitudes combine by phase', () => {
  it('constructive in phase (φ=0) is the max; destructive out of phase (φ=π) is the min', () => {
    expect(intensity(a1, a2, 0)).toBeCloseTo(constructive(a1, a2), 12)
    expect(intensity(a1, a2, Math.PI)).toBeCloseTo(destructive(a1, a2), 12)
    expect(constructive(a1, a2)).toBeGreaterThan(destructive(a1, a2))
  })

  it('at quadrature (φ=π/2) the cross term vanishes — the classical sum a1²+a2²', () => {
    expect(intensity(a1, a2, Math.PI / 2)).toBeCloseTo(classical, 12)
    expect(crossTerm(a1, a2, Math.PI / 2)).toBeCloseTo(0, 12)
  })

  it('intensity stays within [destructive, constructive] for every phase', () => {
    for (let k = 0; k < 16; k++) {
      const phi = (2 * Math.PI * k) / 16
      const I = intensity(a1, a2, phi)
      expect(I).toBeGreaterThanOrEqual(destructive(a1, a2) - 1e-12)
      expect(I).toBeLessThanOrEqual(constructive(a1, a2) + 1e-12)
      expect(crossTerm(a1, a2, phi)).toBeCloseTo(I - classical, 12)
    }
  })

  it('energy is conserved — intensity averaged over a full period is the classical sum', () => {
    const N = 360
    let sum = 0
    for (let k = 0; k < N; k++) sum += intensity(a1, a2, (2 * Math.PI * k) / N)
    expect(sum / N).toBeCloseTo(classical, 9) // the cross term averages to zero
  })

  it('visibility is fringe contrast in [0,1] — full (1) for equal amplitudes, less when unequal', () => {
    expect(visibility(1, 1)).toBeCloseTo(1, 12)
    expect(visibility(a1, a2)).toBeGreaterThan(0)
    expect(visibility(a1, a2)).toBeLessThan(1)
    expect(visibility(1, 0)).toBe(0) // one path only — no fringes
  })
})
