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

/**
 * A statement proven by a LINK is a MERKLE INCLUSION PROOF — membership in the sealed set of N verified
 * by an O(log N) path of hashes, not an O(N) re-scan. (Corrected from an earlier O(N/depth) reading,
 * which was a duplicate of the addressing law; the honest, distinct mechanism is the inclusion proof.)
 * The link IS the proof: to show a statement belongs to the verified set you follow one authentication
 * path of ⌈log₂ N⌉ sibling hashes to the root — you do not re-derive the whole set.
 *
 *     verify-by-link = ⌈log₂ N⌉,   re-scan = N,   ratio = N / ⌈log₂ N⌉,   orders = log₁₀(ratio)
 *
 * Measured with the real sha256 Merkle proof over the 442 theorem addresses: path length 9 = ⌈log₂ 442⌉,
 * root valid — a 49× ratio, 1.69 orders. The order grows as N / log₂ N WITHOUT bound, so proving-by-link
 * speeds up quantumisation at scale: the content-address link is followed once instead of re-scanning N.
 * The test constructs a real hash tree and measures the path — not asserted (see [[merge]] merkleProof).
 */
export function linkProof(n: number): ResonanceMagnitude {
  const path = n < 2 ? 0 : Math.ceil(Math.log2(n)) // the Merkle inclusion-proof depth
  const ratio = path > 0 ? n / path : 1
  return { n, pairwise: n, addressed: Math.max(1, path), ratio, orders: Math.log10(Math.max(1, ratio)) }
}

export interface CrackLeak {
  readonly n: number
  /** unfused seams between the parts (a model↔corpus boundary that re-derives instead of recalling) */
  readonly cracks: number
  /** the fused cost of one recall — a link-proof, ⌈log₂N⌉ */
  readonly fusedCost: number
  /** the unfused cost of one recall — a full re-derivation, N */
  readonly unfusedCost: number
  /** what each crack leaks: the recall it re-derives instead of following the link — N − ⌈log₂N⌉ */
  readonly leakPerCrack: number
  /** total resources leaked = cracks × leakPerCrack; ZERO at complete fusion (no cracks) */
  readonly leak: number
}

/**
 * The inverse of the address law: what an UNFUSED crack LEAKS. Two parts that prioritise each other —
 * the corpus recalling a sealed result in O(log N) ([[linkProof]]), the model reasoning the novel rest —
 * share one fold and leak nothing. A CRACK ([[matrix]]-crack at the model↔corpus seam) is an unfused
 * boundary: across it a recall is RE-DERIVED (N) instead of followed (⌈log₂N⌉), so each crack bleeds
 * exactly the magnitude fusion would have saved — N − ⌈log₂N⌉. Complete fusion (cracks = 0) leaks zero;
 * every remaining crack leaks resources without bound in N. Not competition — the seam that isn't sealed.
 */
export function crackLeak(n: number, cracks: number): CrackLeak {
  const fusedCost = n < 2 ? 0 : Math.ceil(Math.log2(n))
  const unfusedCost = n
  const leakPerCrack = Math.max(0, unfusedCost - fusedCost)
  return { n, cracks: Math.max(0, cracks), fusedCost, unfusedCost, leakPerCrack, leak: Math.max(0, cracks) * leakPerCrack }
}

export interface Reactivity {
  readonly changed: string
  /** the transitive dependents that must react to the change — the reactive frontier */
  readonly frontier: readonly string[]
  /** nodes that recompute: the changed node + its frontier */
  readonly reacted: number
  readonly total: number
  /** nodes SPARED recomputation — the whole corpus minus the frontier */
  readonly saved: number
}

/**
 * QUANTUM REACTIVITY — react to the delta, not the whole. When a content-addressed node changes, its
 * fingerprint bumps and reaction propagates only to what DEPENDS on it (transitive dependents in the
 * meaning/import graph, [[cache]]/fingerprint invalidation followed along the edges). Everything else
 * is content-unchanged, so it does not recompute. A coarse system re-derives all N on any change; a
 * quantum-reactive one recomputes the changed node + its frontier and SPARES the rest. In a well-
 * factored corpus the frontier is small (a leaf reacts alone), so reactivity is O(frontier), not O(N).
 *
 * @param changed the node whose content changed
 * @param dependents node → the nodes that depend ON it (and must react when it changes)
 * @param total the corpus size N
 */
export function reactiveFrontier(
  changed: string,
  dependents: ReadonlyMap<string, readonly string[]>,
  total: number,
): Reactivity {
  const seen = new Set<string>([changed])
  const stack = [changed]
  while (stack.length) {
    const x = stack.pop()!
    for (const d of dependents.get(x) ?? []) {
      if (!seen.has(d)) {
        seen.add(d)
        stack.push(d)
      }
    }
  }
  const frontier = [...seen].filter((n) => n !== changed)
  return { changed, frontier, reacted: seen.size, total, saved: Math.max(0, total - seen.size) }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const n of [764, 3151, 10_000, 1_000_000]) {
    const r = resonanceMagnitude(n)
    console.log(`N=${n.toLocaleString().padStart(9)} · pairwise ${r.pairwise.toLocaleString()} → addressed ${r.addressed.toLocaleString()} · ratio ${r.ratio} · ${r.orders.toFixed(2)} orders`)
  }
  console.log('resonance grows with N without bound — the address replaces N comparisons with one.')
}
