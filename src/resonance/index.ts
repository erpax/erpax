/**
 * resonance — why the address layer improves quantum speed IN MAGNITUDES, by construction.
 *
 * Comparing N things pairwise costs C(N,2) = N(N−1)/2 operations — the O(N²) an unaddressed corpus
 * pays to ask "is any of these the same as any other?". Content-addressing answers it differently: each
 * thing resonates to its ADDRESS (its content-uuid / fingerprint), and sameness is a lookup, not a
 * comparison — O(N). The speedup is the ratio of the two costs:
 *
 *     ratio = C(N,2) / N = (N − 1) / 2
 *     orders of magnitude = log₁₀((N − 1) / 2)
 *
 * At the current tool corpus (N = 764): pairwise 291,466 collapses to addressed 764 — a ratio of 381.5,
 * ≈ 2.58 orders of magnitude. And the order GROWS with N without bound: it is scale-invariant, so a
 * larger corpus resonates HARDER. This is the covering-array theorem's sibling — pairwise interaction
 * coverage needs O(log N) rows, not O(N²) — turned on the corpus itself: the address replaces the N
 * comparisons with one.
 *
 *   tsx src/resonance/index.ts
 *
 * @see ../cache/fingerprint — the mechanism (the fingerprint IS the address that resonates)
 */

export interface ResonanceMagnitude {
  /** addressed corpus size */
  readonly n: number
  /** C(N,2) = N(N−1)/2 — the O(N²) cost of asking sameness by pairwise comparison */
  readonly pairwise: number
  /** N — the O(N) cost when each item resonates to its address (one lookup, not N comparisons) */
  readonly addressed: number
  /** pairwise / addressed = (N−1)/2 — the collapse factor */
  readonly ratio: number
  /** log₁₀(ratio) — the speedup in ORDERS OF MAGNITUDE; unbounded in N (scale-invariant) */
  readonly orders: number
}

/**
 * The resonance magnitude at corpus size n: the O(N²)→O(N) collapse the address layer buys, and its
 * order of magnitude. Exact integer pairwise count; the order is log₁₀ of the collapse factor. This
 * holds by ADDRESSING alone — each of N items is hashed once (N lookups) instead of compared pairwise
 * (C(N,2)) — independent of how much content repeats. Deduplication is a SEPARATE, further collapse
 * (`dedupMagnitude`): the address buys the (N−1)/2 whether or not two items turn out equal.
 */
export function resonanceMagnitude(n: number): ResonanceMagnitude {
  const pairwise = n < 2 ? 0 : (n * (n - 1)) / 2
  const ratio = n < 2 ? 1 : (n - 1) / 2
  return { n, pairwise, addressed: n, ratio, orders: Math.log10(ratio) }
}

/**
 * The SECOND, orthogonal collapse: when N addressed items share only `classes` distinct contents, the
 * fold stores one per class and dedups the rest — storage/downstream work is `classes`, not N, a factor
 * N/classes. All-distinct (classes = N) gives ratio 1 — nothing to dedup; one class gives the maximal
 * N-fold collapse. This is why identical content is free: same hash ⇒ same node, no second copy.
 */
export function dedupMagnitude(n: number, classes: number): ResonanceMagnitude {
  const addressed = Math.max(1, Math.min(classes, n))
  const ratio = n / addressed
  return { n, pairwise: n, addressed, ratio, orders: Math.log10(Math.max(1, ratio)) }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const n of [764, 3151, 10_000, 1_000_000]) {
    const r = resonanceMagnitude(n)
    console.log(`N=${n.toLocaleString().padStart(9)} · pairwise ${r.pairwise.toLocaleString()} → addressed ${r.addressed.toLocaleString()} · ratio ${r.ratio} · ${r.orders.toFixed(2)} orders`)
  }
  console.log('resonance grows with N without bound — the address replaces N comparisons with one.')
}
