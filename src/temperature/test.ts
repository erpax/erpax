import { describe, it, expect } from 'vitest'
import { factor, partition, distribution, ratio } from '@/temperature'

// The Boltzmann distribution over energy levels. Tests assert the RELATIONS —
// normalisation, descending occupancy, detailed-balance ratio, the hot/cold limits.
const rel = (a: number, b: number): number => Math.abs(a - b) / Math.abs(b)
const levels = [0, 1e-21, 2e-21] // ascending energies (J)

describe('temperature: the Boltzmann distribution', () => {
  it('the distribution is normalised, with the ground reference factor = 1', () => {
    expect(factor(0, 100)).toBe(1)
    const p = distribution(levels, 100)
    expect(p.reduce((s, x) => s + x, 0)).toBeCloseTo(1, 12)
    for (const x of p) {
      expect(x).toBeGreaterThan(0)
      expect(x).toBeLessThanOrEqual(1)
    }
  })

  it('higher energy is less occupied (at finite T)', () => {
    const p = distribution(levels, 100)
    expect(p[0]).toBeGreaterThan(p[1]!)
    expect(p[1]!).toBeGreaterThan(p[2]!)
  })

  it('detailed balance: pᵢ/pⱼ = e^(−(Eᵢ−Eⱼ)/kT); equal energies ⇒ ratio 1', () => {
    expect(ratio(5e-21, 5e-21, 100)).toBe(1)
    const p = distribution(levels, 100)
    expect(rel(p[1]! / p[0]!, ratio(levels[1]!, levels[0]!, 100))).toBeLessThan(1e-12)
  })

  it('cold (T→0) freezes into the ground state; hot (T→∞) spreads to uniform', () => {
    const cold = distribution(levels, 1e-3)
    expect(cold[0]).toBeGreaterThan(0.999) // ground dominates
    const hot = distribution(levels, 1e12)
    for (const x of hot) expect(x).toBeCloseTo(1 / levels.length, 6) // all equal = max entropy
  })

  it('the partition function is the sum of the Boltzmann factors', () => {
    const T = 100
    expect(rel(partition(levels, T), levels.reduce((z, e) => z + factor(e, T), 0))).toBeLessThan(1e-12)
  })
})
