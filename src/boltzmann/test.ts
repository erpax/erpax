import { describe, it, expect } from 'vitest'
import { BOLTZMANN_K, entropy, microstates, gibbs } from '@/boltzmann'

// Entropy as microstate-counting. Tests assert the RELATIONS — zero at W=1,
// extensivity (ln turns product into sum), the uniform max — never a magic number.
const rel = (a: number, b: number): number => Math.abs(a - b) / Math.abs(b)

describe('boltzmann: S = k·ln W', () => {
  it('one microstate has zero entropy; fewer-than-one is not a macrostate', () => {
    expect(entropy(1)).toBe(0)
    expect(() => entropy(0)).toThrow()
    expect(entropy(1000)).toBeGreaterThan(entropy(10)) // more ways ⇒ more entropy
  })

  it('is extensive: independent systems multiply microstates so their entropies add', () => {
    expect(rel(entropy(6), entropy(2) + entropy(3))).toBeLessThan(1e-12) // ln(6) = ln2 + ln3
    expect(rel(entropy(100), entropy(10) + entropy(10))).toBeLessThan(1e-12)
  })

  it('S = k·ln W round-trips through the microstate count', () => {
    for (const W of [2, 42, 1000]) expect(rel(microstates(entropy(W)), W)).toBeLessThan(1e-9)
  })

  it('Gibbs entropy equals k·ln W for the uniform distribution, and is maximal there', () => {
    const W = 4
    const uniform = Array.from({ length: W }, () => 1 / W)
    expect(rel(gibbs(uniform), entropy(W))).toBeLessThan(1e-12)
    const skewed = [0.7, 0.1, 0.1, 0.1]
    expect(gibbs(skewed)).toBeLessThan(gibbs(uniform)) // uniform is the maximum-entropy distribution
  })

  it('the constant is the exact SI-2019 value', () => {
    expect(BOLTZMANN_K).toBe(1.380649e-23)
  })
})
