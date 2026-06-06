/**
 * analytics — computed tests. One aggregate invariant per aspect: each verifies
 * the COMPOSED report agrees with the measure it folds, and that the numbers sit
 * in their valid ranges. We test the fold, not the folded (each measure owns its
 * own test); a green report here means the composition is sound.
 *
 * @standard ISO/IEC-29119:2022 software testing (computed invariants, full-aspect coverage)
 * @audit the report is recomputed from the live matrix, never a fixture
 */
import { describe, it, expect } from 'vitest'
import {
  analyze,
  structure,
  entropyReport,
  coverageReport,
  harmonyReport,
  trustReport,
  economicReport,
  geometricMean,
} from '@/analytics'

describe('analytics — the all-aspects analyzer (computed, composed)', () => {
  const r = analyze()

  it('folds all six aspects (plus the matrix root)', () => {
    expect(Object.keys(r).sort()).toEqual(['coverage', 'economic', 'entropy', 'harmony', 'root', 'structure', 'trust'])
    expect(typeof r.root).toBe('string')
    expect(r.root.length).toBeGreaterThan(0)
  })

  it('structure: atoms & edges positive; bands partition the atoms', () => {
    expect(r.structure.atoms).toBeGreaterThan(0)
    expect(r.structure.edges).toBeGreaterThan(0)
    expect(r.structure.dimensions).toBeGreaterThan(0)
    const bandSum = Object.values(r.structure.byBand).reduce((a, b) => a + b, 0)
    expect(bandSum).toBe(r.structure.atoms)
    expect(r.structure.meanDegree).toBeGreaterThan(0)
  })

  it('entropy: entropy = 1 − reciprocity, both in [0,1]', () => {
    expect(r.entropy.reciprocity).toBeGreaterThanOrEqual(0)
    expect(r.entropy.reciprocity).toBeLessThanOrEqual(1)
    expect(r.entropy.entropy).toBeCloseTo(1 - r.entropy.reciprocity, 9)
    expect(r.entropy.orphanCount).toBe(r.entropy.orphans.length >= 20 ? r.entropy.orphanCount : r.entropy.orphans.length)
  })

  it('coverage: fractions in [0,1] and coverage = 1 − disbalance', () => {
    const c = r.coverage.modelCollection
    expect(c.coverage).toBeGreaterThanOrEqual(0)
    expect(c.coverage).toBeLessThanOrEqual(1)
    expect(c.coverage).toBeCloseTo(1 - c.disbalance, 9)
    expect(c.balanced).toBeLessThanOrEqual(c.collections)
    expect(r.coverage.standards.published).toBeGreaterThan(0)
  })

  it('harmony: the horo ring is the 7-position sequence with its 21 pair-intervals', () => {
    expect(r.harmony.ring).toEqual([1, 2, 4, 8, 7, 5, 9])
    expect(r.harmony.intervals).toBe(21) // C(7,2)
    expect(r.harmony.worstTenney).toBeGreaterThanOrEqual(0)
  })

  it('trust: content floor 256-bit, erpax floor 106-bit; work finite below full coverage', () => {
    expect(r.trust.contentPreimageBits).toBe(256)
    expect(r.trust.erpaxFloorBits).toBe(106)
    if (r.trust.coverage < 1) expect(Number.isFinite(r.trust.tamperWorkLog2)).toBe(true)
    else expect(r.trust.tamperWorkLog2).toBe(Infinity)
  })

  it('economic: healthIndex is the geometric mean of its components, in [0,1]', () => {
    const gm = geometricMean(Object.values(r.economic.components))
    expect(r.economic.healthIndex).toBeCloseTo(gm, 9)
    expect(r.economic.healthIndex).toBeGreaterThanOrEqual(0)
    expect(r.economic.healthIndex).toBeLessThanOrEqual(1)
  })

  it('geometricMean: a single zero caps the whole (the bottleneck law)', () => {
    expect(geometricMean([1, 1, 1])).toBeCloseTo(1, 9)
    expect(geometricMean([0.25, 1, 1])).toBeCloseTo(0.25 ** (1 / 3), 9)
    expect(geometricMean([0, 0.9, 0.9])).toBe(0)
  })

  it('the per-aspect functions agree with the fold', () => {
    expect(structure().atoms).toBe(r.structure.atoms)
    expect(entropyReport().reciprocity).toBe(r.entropy.reciprocity)
    expect(coverageReport().modelCollection.coverage).toBe(r.coverage.modelCollection.coverage)
    expect(harmonyReport().consonant).toBe(r.harmony.consonant)
    expect(trustReport().erpaxFloorBits).toBe(r.trust.erpaxFloorBits)
    expect(economicReport().healthIndex).toBe(r.economic.healthIndex)
  })
})
