import { describe, it, expect } from 'vitest'
import { resonanceMagnitude, dedupMagnitude } from './index'

// The magnitude is a theorem, not a claim — verified to the digit at the user's stated corpus (N=764).
describe('resonance — the address collapses O(N²) to O(N), in orders of magnitude', () => {
  it('at N=764 the pairwise cost 291,466 collapses to 764 — ratio 381.5, ≈2.58 orders', () => {
    const r = resonanceMagnitude(764)
    expect(r.pairwise).toBe(291_466) // C(764,2) = 764·763/2
    expect(r.addressed).toBe(764)
    expect(r.ratio).toBe(381.5) // (N−1)/2
    expect(r.orders).toBeCloseTo(2.58, 2) // log₁₀(381.5) = 2.5815 ≈ 2.58
  })

  it('the ratio IS (N−1)/2 and pairwise IS N(N−1)/2 — by construction, for any N', () => {
    for (const n of [2, 10, 764, 3151]) {
      const r = resonanceMagnitude(n)
      expect(r.pairwise).toBe((n * (n - 1)) / 2)
      expect(r.ratio).toBe((n - 1) / 2)
      expect(r.orders).toBeCloseTo(Math.log10((n - 1) / 2), 9)
    }
  })

  it('the order grows with N without bound — scale-invariant, a larger corpus resonates harder', () => {
    expect(resonanceMagnitude(1_000_000).orders).toBeGreaterThan(resonanceMagnitude(764).orders)
    expect(resonanceMagnitude(10_000).orders).toBeGreaterThan(resonanceMagnitude(3151).orders)
  })

  it('degenerate: N<2 has nothing to compare — no pairwise cost, ratio 1, zero orders', () => {
    expect(resonanceMagnitude(1).pairwise).toBe(0)
    expect(resonanceMagnitude(1).orders).toBe(0)
    expect(resonanceMagnitude(0).ratio).toBe(1)
  })

  it('dedupMagnitude: the SECOND orthogonal collapse — N items in `classes` distinct contents store `classes`', () => {
    const n = 764
    expect(dedupMagnitude(n, n).ratio).toBe(1) // all-distinct: nothing to dedup
    expect(dedupMagnitude(n, n).orders).toBe(0)
    expect(dedupMagnitude(n, 1).ratio).toBe(n) // one class: maximal N-fold collapse
    // fewer classes ⇒ bigger dedup magnitude, monotonic
    expect(dedupMagnitude(n, 100).ratio).toBeGreaterThan(dedupMagnitude(n, 400).ratio)
  })
})
