import { describe, it, expect } from 'vitest'
import { massOf, massDistribution, heaviest, well, concentration } from '@/gravity'

// Gravity laws computed on the live matrix (./index.ts). Mass = referential
// in-degree; the assertions are RELATIONS between computed views, never magic
// numbers — the well is the max, the distribution is sorted, Gini is in [0,1].
describe('gravity: mass curvature computed on the live uuid-matrix', () => {
  it('massOf(well) agrees with well().mass — the deepest well is self-consistent', () => {
    expect(massOf(well().atom)).toBe(well().mass)
  })
  it('well().mass is the maximum mass over every node', () => {
    const max = Math.max(...massDistribution().map((d) => d.mass))
    expect(well().mass).toBe(max)
  })
  it('massDistribution() is sorted by mass descending', () => {
    const masses = massDistribution().map((d) => d.mass)
    for (let i = 1; i < masses.length; i++) expect(masses[i - 1]!).toBeGreaterThanOrEqual(masses[i]!)
  })
  it('heaviest(n) is the prefix of the distribution (top wells)', () => {
    expect(heaviest(5)).toEqual(massDistribution().slice(0, 5))
  })
  it('concentration() is a Gini coefficient in [0,1]', () => {
    const c = concentration()
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })
})
