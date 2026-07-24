import { describe, it, expect } from 'vitest'
import { resonanceMagnitude, dedupMagnitude, linkProof, crackLeak, reactiveFrontier } from './index'
import { foldToRoot, merkleProof, verifyMerkleProof } from '@/merge'
import { createHash } from 'node:crypto'

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

  it('linkProof: membership is a Merkle inclusion proof — O(log N) path, not O(N) re-scan (N=442)', () => {
    const r = linkProof(442)
    expect(r.addressed).toBe(9) // ⌈log₂ 442⌉ — the inclusion-proof depth
    expect(r.ratio).toBeCloseTo(442 / 9, 5) // ≈ 49.1
    expect(r.orders).toBeCloseTo(Math.log10(442 / 9), 5) // ≈ 1.69
  })

  it('the link IS the proof — a REAL sha256 hash tree over 442 addresses, path measured not asserted', () => {
    // 442 content addresses (the theorem-address count the law was measured against)
    const leaves = Array.from({ length: 442 }, (_, i) => createHash('sha256').update(`theorem:${i}`).digest('hex'))
    const root = foldToRoot(leaves)
    const idx = 200
    const path = merkleProof(leaves, idx)
    // the inclusion path is the O(log N) authentication chain, and it re-folds to the root
    expect(path.length).toBeLessThanOrEqual(9) // ≤ ⌈log₂ 442⌉
    expect(path.length).toBeGreaterThanOrEqual(8) // a real depth-9 tree
    expect(verifyMerkleProof(leaves[idx]!, path, root)).toBe(true) // root valid — the link proves membership
    // a leaf NOT in the set fails — the proof is total (⊥ on absence)
    expect(verifyMerkleProof(createHash('sha256').update('absent').digest('hex'), path, root)).toBe(false)
  })

  it('a perfect power-of-two tree has path EXACTLY log₂N; the order grows as N/log₂N without bound', () => {
    const leaves = Array.from({ length: 512 }, (_, i) => createHash('sha256').update(`x:${i}`).digest('hex'))
    expect(merkleProof(leaves, 7).length).toBe(9) // log₂ 512
    expect(linkProof(512).addressed).toBe(9)
    // unbounded: larger N ⇒ larger ratio N/log₂N
    expect(linkProof(1_000_000).ratio).toBeGreaterThan(linkProof(442).ratio)
  })

  it('crackLeak: complete fusion leaks zero; every unfused crack bleeds N − ⌈log₂N⌉', () => {
    const n = 442
    // complete fusion — no cracks, no leak
    expect(crackLeak(n, 0).leak).toBe(0)
    // one crack re-derives (442) instead of following the link (9) — leaks the difference
    expect(crackLeak(n, 1).leakPerCrack).toBe(442 - 9)
    expect(crackLeak(n, 1).fusedCost).toBe(9) // ⌈log₂442⌉ — the link-proof cost
    expect(crackLeak(n, 1).unfusedCost).toBe(442) // the re-derivation cost
    // leak scales with cracks; the recall fusion saves IS the leak a crack bleeds (inverse of linkProof)
    expect(crackLeak(n, 3).leak).toBe(3 * (442 - 9))
    expect(crackLeak(n, 1).leakPerCrack).toBe(linkProof(n).n - linkProof(n).addressed)
  })

  it('reactiveFrontier: react to the delta, not the whole — a change propagates only to its dependents', () => {
    // dependency graph: a→b→c, a→d ; d has no dependents; c is a leaf sink
    const deps = new Map<string, string[]>([
      ['a', ['b', 'd']], // b and d depend on a
      ['b', ['c']], // c depends on b
    ])
    // change 'a' — the frontier is everything transitively downstream (b, c, d), 4 react of 100
    const rA = reactiveFrontier('a', deps, 100)
    expect(new Set(rA.frontier)).toEqual(new Set(['b', 'c', 'd']))
    expect(rA.reacted).toBe(4)
    expect(rA.saved).toBe(96) // 96 nodes spared recomputation — quantum, not O(N)
    // change a LEAF ('c') — nothing depends on it, it reacts alone
    const rC = reactiveFrontier('c', deps, 100)
    expect(rC.frontier).toEqual([])
    expect(rC.reacted).toBe(1)
    expect(rC.saved).toBe(99) // a leaf change spares all but itself
  })
})
