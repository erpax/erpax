/**
 * redundancy -- the STRUCTURE in a code: R = 1 − H/H_max, the fraction of the
 * channel NOT carrying fresh information because the wiring constrains it. Zero for
 * a maximal-entropy (uniform, incompressible) source; high when symbols are
 * predictable from each other. In erpax redundancy IS coverage: wiring every
 * dimension through the content-[[uuid]] makes each input DETERMINED by — and
 * checkable against — the whole (it adds no free parameter), so the graph is
 * redundant, and that redundancy is exactly what DETECTS [[tamper]] (an
 * error-correcting code corrects what does not fit). [[redundancy]] → 1 ⇔
 * [[coverage]] → 1 ⇔ the modelled tamper-[[cost]] toward its +∞ limit.
 *
 *   tsx src/redundancy/index.ts
 *
 * @audit R = 1 − H/log₂n from ../shannon; clamped to [0,1] -- computed
 * @see ../shannon (H) -- ../coverage -- ../tamper -- ../cost -- ../proof
 */
import { entropy, maxEntropy } from '@/shannon'

/** Redundancy R = 1 − H/H_max ∈ [0,1] (0 ⇒ incompressible/no structure, 1 ⇒ fully determined). */
export function redundancy(probabilities: readonly number[]): number {
  const hmax = maxEntropy(probabilities.length)
  if (hmax === 0) return 0
  const r = 1 - entropy(probabilities) / hmax
  return r < 0 ? 0 : r > 1 ? 1 : r
}

/** Relative information efficiency H/H_max ∈ [0,1] — the complement of redundancy. */
export const efficiency = (probabilities: readonly number[]): number => 1 - redundancy(probabilities)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('redundancy -- R = 1 − H/H_max (the structure that detects tamper):')
  console.log('  uniform [¼,¼,¼,¼]     R=' + redundancy([0.25, 0.25, 0.25, 0.25]).toFixed(3) + ' (incompressible)')
  console.log('  certain [1,0,0,0]     R=' + redundancy([1, 0, 0, 0]).toFixed(3) + ' (fully determined)')
  console.log('  skewed  [.7,.1,.1,.1] R=' + redundancy([0.7, 0.1, 0.1, 0.1]).toFixed(3))
}
