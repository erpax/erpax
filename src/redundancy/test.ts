import { describe, it, expect } from 'vitest'
import { redundancy, efficiency } from '@/redundancy'
import { entropy, maxEntropy } from '@/shannon'

// Redundancy = the structure (coverage) in a distribution. Tests assert the
// RELATIONS — 0 at uniform, 1 at certainty, R+efficiency=1 — never a magic number.
const rel = (a: number, b: number): number => Math.abs(a - b) / Math.abs(b)

describe('redundancy: R = 1 − H/H_max (structure = coverage)', () => {
  it('a uniform (incompressible) source has zero redundancy', () => {
    expect(redundancy([0.25, 0.25, 0.25, 0.25])).toBeCloseTo(0, 12)
  })

  it('a fully-determined (certain) source has full redundancy', () => {
    expect(redundancy([1, 0, 0, 0])).toBe(1)
  })

  it('redundancy is in [0,1], and rises as the distribution sharpens toward determinism', () => {
    const mild = [0.4, 0.3, 0.2, 0.1]
    const sharp = [0.85, 0.05, 0.05, 0.05]
    expect(redundancy(mild)).toBeGreaterThan(0)
    expect(redundancy(mild)).toBeLessThan(1)
    expect(redundancy(sharp)).toBeGreaterThan(redundancy(mild)) // sharper ⇒ more structure
  })

  it('redundancy and efficiency are complements (R + H/H_max = 1)', () => {
    const p = [0.5, 0.25, 0.25]
    expect(rel(redundancy(p), 1 - entropy(p) / maxEntropy(p.length))).toBeLessThan(1e-12)
    expect(redundancy(p) + efficiency(p)).toBeCloseTo(1, 12)
  })
})
