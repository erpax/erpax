/**
 * diversity -- variety measured: Shannon H, Simpson 1-Σpᵢ², Pielou evenness.
 *
 * The mirror of decentralization's concentration: where herfindahl measures
 * HOW MUCH one class dominates, simpson = 1 − herfindahl measures how spread
 * the distribution is. The duality is exact — they are the same Σpᵢ² seen
 * from opposite poles.
 *
 *   tsx src/diversity/index.ts
 *
 * @standard Shannon (1948) A Mathematical Theory of Communication — information entropy
 * @standard Simpson (1949) Measurement of Diversity — Nature 163:688
 * @standard Pielou (1966) The Measurement of Diversity in Different Types of Biological Collections
 * @audit computed, never hand-asserted
 * @see ../decentralization (herfindahl = 1 − simpson, exact duality) -- ../ecosystem -- ../diversity
 */

/** Proportions over nonzero classes; returns [] when all abundances are 0. */
function proportions(abundances: number[]): number[] {
  const nonzero = abundances.filter((a) => a > 0)
  if (nonzero.length === 0) return []
  const total = nonzero.reduce((s, a) => s + a, 0)
  return nonzero.map((a) => a / total)
}

/** richness — count of classes with abundance > 0. */
export const richness = (abundances: number[]): number => abundances.filter((a) => a > 0).length

/** Shannon H = −Σ pᵢ·ln(pᵢ) over nonzero classes (natural log). Single class ⇒ 0. */
export const shannon = (abundances: number[]): number => {
  const ps = proportions(abundances)
  if (ps.length === 0) return 0
  const h = -ps.reduce((s, p) => s + p * Math.log(p), 0)
  return h === 0 ? 0 : h // normalize −0 (a single class: −(1·ln1)) to +0
}

/** Simpson diversity = 1 − Σ pᵢ² (equals 1 − herfindahl for the same distribution). */
export const simpson = (abundances: number[]): number => {
  const ps = proportions(abundances)
  if (ps.length === 0) return 0
  return 1 - ps.reduce((s, p) => s + p * p, 0)
}

/**
 * Pielou evenness = H / ln(S) where S = richness.
 * Returns 1 when richness ≤ 1 (a single class is perfectly "even").
 */
export const evenness = (abundances: number[]): number => {
  const S = richness(abundances)
  if (S <= 1) return 1
  return shannon(abundances) / Math.log(S)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const x = [5, 3, 2]
  console.log('diversity demo [5,3,2]:')
  console.log('  richness=' + richness(x) + '  shannon=' + shannon(x).toFixed(4))
  console.log('  simpson=' + simpson(x).toFixed(4) + '  evenness=' + evenness(x).toFixed(4))
}
