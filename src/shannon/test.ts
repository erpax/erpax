import { describe, it, expect } from 'vitest'
import { entropy, maxEntropy } from '@/shannon'
import { surprisal } from '@/surprisal'

// Information entropy in bits. Tests assert the RELATIONS — zero at certainty,
// log₂n at uniform (the maximum), H = expected surprisal — never a magic number.
const rel = (a: number, b: number): number => Math.abs(a - b) / Math.abs(b)

describe('shannon: H = −Σ pᵢ log₂ pᵢ', () => {
  it('a certain distribution carries zero bits', () => {
    expect(entropy([1, 0, 0, 0])).toBe(0)
  })

  it('the uniform distribution is maximal: H = log₂ n', () => {
    for (const n of [2, 4, 8]) {
      const uniform = Array.from({ length: n }, () => 1 / n)
      expect(rel(entropy(uniform), maxEntropy(n))).toBeLessThan(1e-12)
    }
    expect(entropy([0.5, 0.5])).toBe(1) // one bit
  })

  it('any distribution lies in [0, log₂ n]; uniform beats skewed', () => {
    const skewed = [0.7, 0.1, 0.1, 0.1]
    expect(entropy(skewed)).toBeGreaterThan(0)
    expect(entropy(skewed)).toBeLessThan(maxEntropy(4))
  })

  it('H is the expected surprisal: Σ pᵢ·I(pᵢ)', () => {
    const p = [0.5, 0.25, 0.25]
    const expected = p.reduce((s, x) => s + x * surprisal(x), 0)
    expect(rel(entropy(p), expected)).toBeLessThan(1e-12)
  })
})
