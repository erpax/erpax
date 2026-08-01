import { exactAbs, exactCeil, exactFloor, exactMax, exactMaxOf, exactMin, exactRound, exactTrunc } from '@/algebra'
import { describe, it, expect } from 'vitest'
import { massOf, massDistribution, heaviest, well, concentration, attract, stillCentre, isStillCentre } from '@/gravity'

// Gravity laws computed on the live matrix (./index.ts). Mass = referential
// in-degree; the assertions are RELATIONS between computed views, never magic
// numbers — the well is the max, the distribution is sorted, Gini is in [0,1].
describe('gravity: mass curvature computed on the live uuid-matrix', () => {
  it('massOf(well) agrees with well().mass — the deepest well is self-consistent', () => {
    expect(massOf(well().atom)).toBe(well().mass)
  })
  it('well().mass is the maximum mass over every node', () => {
    const max = exactMaxOf(massDistribution().map((d) => d.mass))
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

// "What gravity is while moving without moving." Gravity is the fixed point of its own flow: attract is a
// semilattice (idempotent max-by-mass), the well is its absorbing top — attract(well, x) = well for every x.
// The operation fires (moving) and the well is unchanged (without moving); everything else falls toward it.
describe('gravity — moving without moving (the fixed point of attract)', () => {
  it('attract is IDEMPOTENT — attract(a,a) = a (a semilattice, no double-counting)', () => {
    const atoms = massDistribution().slice(0, 20).map((m) => m.atom)
    for (const a of atoms) expect(attract(a, a)).toBe(a)
  })

  it('attract is commutative and resolves to the heavier — deterministic by name on a tie', () => {
    const [a, b] = massDistribution().slice(0, 2).map((m) => m.atom)
    expect(attract(a!, b!)).toBe(attract(b!, a!)) // commutative
    expect(massOf(attract(a!, b!))).toBe(exactMax(massOf(a!), massOf(b!))) // the heavier wins
  })

  it('the WELL is the fixed point — attract(well, x) = well for every atom (moving without moving)', () => {
    const centre = stillCentre()
    for (const { atom } of massDistribution().slice(0, 50)) {
      expect(attract(centre, atom)).toBe(centre) // the op fires; the centre does not move
    }
  })

  it('the still centre IS the well — folding attract over all atoms lands on the maximum mass', () => {
    expect(massOf(stillCentre())).toBe(well().mass) // everything moved toward it; it is the deepest
    expect(isStillCentre(stillCentre())).toBe(true)
  })

  it('everything else moves — only the centre rests (a non-well atom is not a still centre)', () => {
    const notWell = massDistribution().find((m) => m.atom !== stillCentre())
    if (notWell) expect(isStillCentre(notWell.atom)).toBe(false) // it still has somewhere heavier to fall
  })
})
