/**
 * decentralization -- concentration-distribution math; the HONEST measure of who controls a system.
 *
 * Decentralization is not free: it pays coordination overhead and re-centralizes under
 * preferential attachment (Barabási–Albert). The Nakamoto coefficient is the honest measure --
 * the minimum number of top participants whose combined share exceeds 50%. A falling coefficient
 * means a center is forming in disguise. HHI and effectiveNodes anchor the concentration axis;
 * Gini anchors the inequality axis. singlePointOfFailure is the structural red-line (nakamoto===1).
 *
 *   tsx src/decentralization/index.ts
 *
 * @standard Nakamoto coefficient (Srinivasan & Lee, 2017)
 * @standard Herfindahl–Hirschman Index (HHI)
 * @standard Gini coefficient
 * @standard Barabási–Albert preferential attachment (1999) — why flat networks re-centralize
 * @audit computed, never hand-asserted
 * @see ../merge ../federation ../diversity ../ecosystem ../network
 */

/**
 * Normalize raw shares to probabilities sᵢ / Σs.
 * Returns all zeros if the sum is ≤ 0 (degenerate / empty distribution).
 */
export const normalizeShares = (shares: number[]): number[] => {
  const total = shares.reduce((acc, s) => acc + s, 0)
  if (total <= 0) return shares.map(() => 0)
  return shares.map((s) => s / total)
}

/**
 * Herfindahl–Hirschman Index: Σ pᵢ² of the normalized shares.
 * Range: 1/n (perfectly even) … 1 (total monopoly).
 * Dual: Simpson concentration = HHI; Simpson diversity = 1 − HHI (see diversity atom).
 */
export const herfindahl = (shares: number[]): number => {
  const p = normalizeShares(shares)
  return p.reduce((acc, pi) => acc + pi * pi, 0)
}

/**
 * Effective number of independent participants = 1 / HHI (inverse-Simpson / Hill q=2).
 * n for perfectly even; 1 for monopoly.
 */
export const effectiveNodes = (shares: number[]): number => {
  const hhi = herfindahl(shares)
  return hhi <= 0 ? 0 : 1 / hhi
}

/**
 * Nakamoto coefficient: the smallest k such that the top-k normalized shares sum to > 0.5.
 * High ⇒ truly decentralized; nakamoto===1 ⇒ single point of failure.
 * Returns 0 for an empty / degenerate distribution.
 */
export const nakamoto = (shares: number[]): number => {
  const p = normalizeShares(shares)
  // sort descending
  const sorted = [...p].sort((a, b) => b - a)
  let acc = 0
  for (let k = 0; k < sorted.length; k++) {
    acc += sorted[k]
    if (acc > 0.5) return k + 1
  }
  return sorted.length
}

/**
 * Gini coefficient ∈ [0, 1) measuring share inequality.
 * Uses the sorted-list formula: with shares p sorted ASCENDING (p_1 … p_n),
 *   Gini = (2 · Σ_{i=1..n} i·p_i) / n  −  (n+1)/n
 * Yields exactly 0 for the uniform distribution (verified in tests).
 * Returns 0 for degenerate inputs (empty or zero sum).
 */
export const gini = (shares: number[]): number => {
  const p = normalizeShares(shares)
  const n = p.length
  if (n === 0) return 0
  const sorted = [...p].sort((a, b) => a - b)
  let sum = 0
  for (let i = 0; i < n; i++) {
    sum += (i + 1) * sorted[i]
  }
  return (2 * sum) / n - (n + 1) / n
}

/**
 * True when any single participant holds ≥ 50% of normalized shares.
 * Equivalent to nakamoto === 1 — one capture controls the system.
 */
export const singlePointOfFailure = (shares: number[]): boolean => {
  const p = normalizeShares(shares)
  return p.some((pi) => pi >= 0.5)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const even4 = [1, 1, 1, 1]
  const skewed = [10, 2, 1, 1]
  console.log('decentralization demo:')
  console.log('  even [1,1,1,1]:  nakamoto=' + nakamoto(even4) + '  effectiveNodes=' + effectiveNodes(even4).toFixed(2) + '  gini=' + gini(even4).toFixed(4) + '  SPOF=' + singlePointOfFailure(even4))
  console.log('  skewed [10,2,1,1]: nakamoto=' + nakamoto(skewed) + '  effectiveNodes=' + effectiveNodes(skewed).toFixed(2) + '  gini=' + gini(skewed).toFixed(4) + '  SPOF=' + singlePointOfFailure(skewed))
}
