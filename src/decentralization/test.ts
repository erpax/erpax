import { describe, it, expect } from 'vitest'
import {
  normalizeShares,
  herfindahl,
  effectiveNodes,
  nakamoto,
  gini,
  singlePointOfFailure,
} from '@/decentralization'

// All tests assert RELATIONS / IDENTITIES / INVARIANTS — never opaque magic numbers.
// The instant the math drifts these break.

describe('decentralization: concentration-distribution invariants', () => {
  // ── Invariant 1: n equal shares ──────────────────────────────────────────
  describe('n equal shares — minimum concentration', () => {
    const equal4 = [1, 1, 1, 1]
    const n = 4

    it('herfindahl toBeCloseTo 1/n (uniform = minimum concentration)', () => {
      expect(herfindahl(equal4)).toBeCloseTo(1 / n)
    })

    it('effectiveNodes toBeCloseTo n (all participants count equally)', () => {
      expect(effectiveNodes(equal4)).toBeCloseTo(n)
    })

    it('nakamoto === Math.floor(n/2)+1 (need majority of participants to control)', () => {
      expect(nakamoto(equal4)).toBe(Math.floor(n / 2) + 1)
    })

    it('gini toBeCloseTo 0 (no inequality in a uniform distribution)', () => {
      expect(gini(equal4)).toBeCloseTo(0)
    })

    it('singlePointOfFailure false (no one holds ≥ 50%)', () => {
      expect(singlePointOfFailure(equal4)).toBe(false)
    })
  })

  // ── Invariant 2: one dominant actor (full monopoly) ──────────────────────
  describe('one dominant actor — maximum concentration', () => {
    const monopoly4 = [1, 0, 0, 0]   // single non-zero share
    const monopoly3 = [10, 0, 0]     // scaled, same distribution

    it('herfindahl toBeCloseTo 1 (monopoly = maximum HHI)', () => {
      expect(herfindahl(monopoly4)).toBeCloseTo(1)
      expect(herfindahl(monopoly3)).toBeCloseTo(1)
    })

    it('effectiveNodes toBeCloseTo 1 (only one effective participant)', () => {
      expect(effectiveNodes(monopoly4)).toBeCloseTo(1)
    })

    it('nakamoto === 1 (one capture controls the system)', () => {
      expect(nakamoto(monopoly4)).toBe(1)
      expect(nakamoto(monopoly3)).toBe(1)
    })

    it('singlePointOfFailure true (single actor ≥ 50%)', () => {
      expect(singlePointOfFailure(monopoly4)).toBe(true)
      expect(singlePointOfFailure(monopoly3)).toBe(true)
    })
  })

  // ── Invariant 3: Nakamoto monotonicity ───────────────────────────────────
  describe('nakamoto monotonicity — more even ⇒ higher or equal coefficient', () => {
    // concentrated: one actor at 70%
    const concentrated = [70, 10, 10, 10]
    // even: four equal actors
    const even = [25, 25, 25, 25]

    it('nakamoto(even) >= nakamoto(concentrated) — evenness costs more captures', () => {
      expect(nakamoto(even)).toBeGreaterThanOrEqual(nakamoto(concentrated))
    })

    it('concentrated has nakamoto 1 (70% > 50% in one holder)', () => {
      expect(nakamoto(concentrated)).toBe(1)
    })

    it('even has nakamoto 3 (need 3 of 4 equal holders to exceed 50%)', () => {
      expect(nakamoto(even)).toBe(3)
    })
  })

  // ── Invariant 4: normalizeShares + scaling invariance ───────────────────
  describe('normalizeShares and HHI scaling invariance', () => {
    it('normalizeShares output sums to 1 for any positive input', () => {
      const cases = [[1, 2, 3], [10, 10], [5, 5, 5, 5], [100]]
      for (const c of cases) {
        expect(normalizeShares(c).reduce((a, b) => a + b, 0)).toBeCloseTo(1)
      }
    })

    it('herfindahl invariant to scale: [2,2] and [1,1] give the same HHI', () => {
      expect(herfindahl([2, 2])).toBeCloseTo(herfindahl([1, 1]))
    })

    it('herfindahl invariant to scale: [10,5,5] and [2,1,1] give the same HHI', () => {
      expect(herfindahl([10, 5, 5])).toBeCloseTo(herfindahl([2, 1, 1]))
    })

    it('normalizeShares degenerate (all zeros) returns all zeros', () => {
      expect(normalizeShares([0, 0, 0])).toEqual([0, 0, 0])
    })
  })

  // ── Invariant 5: Gini range and exact zero ───────────────────────────────
  describe('gini range [0, 1) and exact values', () => {
    const even4 = [1, 1, 1, 1]
    const skewed = [10, 2, 1, 1]

    it('gini(even) toBeCloseTo 0 — uniform distribution has zero inequality', () => {
      expect(gini(even4)).toBeCloseTo(0)
    })

    it('gini(skewed) > 0 — skewed distribution has positive inequality', () => {
      expect(gini(skewed)).toBeGreaterThan(0)
    })

    it('gini(skewed) < 1 — Gini never reaches 1 for finite distributions', () => {
      expect(gini(skewed)).toBeLessThan(1)
    })

    it('gini identity: skewed [10,2,1,1] is more unequal than even [1,1,1,1]', () => {
      expect(gini(skewed)).toBeGreaterThan(gini(even4))
    })
  })

  // ── Identity: singlePointOfFailure ⟺ nakamoto === 1 ─────────────────────
  // Note: SPOF uses ≥0.5 and nakamoto accumulates >0.5, so the exact boundary
  // share=0.5 is the only case they could disagree. We verify with cases safely
  // away from the boundary and assert the structural equivalence directly.
  describe('singlePointOfFailure ⟺ nakamoto === 1', () => {
    const cases: Array<{ shares: number[]; label: string }> = [
      { shares: [1, 0, 0, 0], label: 'monopoly (100%)' },
      { shares: [1, 1, 1, 1], label: 'even (25% each)' },
      { shares: [4, 1, 1, 1], label: 'clear majority (57%)' },  // 4/7 > 0.5 → both true
      { shares: [2, 3, 3, 2], label: 'no majority (30% max)' }, // 3/10 < 0.5 → both false
    ]

    for (const { shares, label } of cases) {
      it(`singlePointOfFailure ⟺ nakamoto===1 for [${shares.join(',')}] (${label})`, () => {
        expect(singlePointOfFailure(shares)).toBe(nakamoto(shares) === 1)
      })
    }
  })
})
