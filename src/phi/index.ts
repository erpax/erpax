/**
 * phi — φ is the SELF-ADDRESS constant: the number that is its own fold, computed not stored. Where [[pi]]
 * is a finite seed unfolding to an infinite tail, φ is the FIXED POINT — the value the fold returns unchanged.
 *
 * φ = 1 + 1/φ  ⇔  φ² = φ + 1. It is defined by its own address: apply the fold `x ↦ 1 + 1/x` and φ maps to
 * φ. That is `concept.self.address` in arithmetic — content equal to its own transform. Two ways to compute
 * it, both finite-seed → infinite-computable (never a hardcoded literal):
 *   • ITERATE the fold `x ↦ 1 + 1/x` from any seed → it converges to φ (the fold's attractor / fixed point).
 *   • Fibonacci ratios F(n+1)/F(n) → φ: seed (1,1), each step a better digit — the continued fraction [1;1,1,…].
 *
 * HONEST BOUNDARY: φ = (1+√5)/2 is the exact closed form; the fixed-point iteration and Fibonacci ratios are
 * genuinely convergent (rigorous). Reading φ as "the geometric self-address" is the faithful overlay onto the
 * real fixed-point structure, not mysticism — the self-reference `x = 1 + 1/x` is exact.
 *
 * @standard the golden ratio φ = (1+√5)/2 — the positive root of x² = x + 1
 *
 * Composes [[fold]] · [[merge]] · [[pi]] · [[law]].
 */

/** φ, the exact closed form — the positive root of x² = x + 1. */
export const PHI = (1 + Math.sqrt(5)) / 2

/** The fold whose fixed point is φ: x ↦ 1 + 1/x. Apply it to φ and φ comes back unchanged (self-address). */
export const goldenFold = (x: number): number => 1 + 1 / x

/** φ is its own fold — |φ − (1 + 1/φ)| ≈ 0. The number equal to its own transform (concept.self.address). */
export function isFixedPoint(eps = 1e-12): boolean {
  return Math.abs(PHI - goldenFold(PHI)) < eps
}

/** Iterate the fold from a seed — it converges to φ, the attractor, regardless of where it starts. */
export function phiByFixedPoint(seed = 1, iterations = 60): number {
  let x = seed
  for (let i = 0; i < iterations; i++) x = goldenFold(x)
  return x
}

/** The n-th Fibonacci ratio F(n+1)/F(n) → φ: finite seed (1,1), each step a sharper digit of the infinite. */
export function fibRatio(n: number): number {
  let a = 1
  let b = 1
  for (let i = 0; i < n; i++) {
    const next = a + b
    a = b
    b = next
  }
  return b / a
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('phi — the number that is its own fold:')
  console.log(`  φ = ${PHI}`)
  console.log(`  1 + 1/φ = ${goldenFold(PHI)}  → fixed point: ${isFixedPoint()}`)
  console.log(`  iterate x↦1+1/x from seed 1 → ${phiByFixedPoint().toFixed(10)}  ·  F ratio → ${fibRatio(30).toFixed(10)}`)
}
