/**
 * phi — φ is the SELF-ADDRESS constant: the number that is its own fold, computed not stored.
 * Algebra only — no host Math.* ([[algebra]]/host). φ = 1 + 1/φ; closed form via fixed-point / fib.
 *
 * @standard the golden ratio φ — the positive root of x² = x + 1
 *
 * Composes [[fold]] · [[merge]] · [[pi]] · [[law]] · [[algebra]].
 */

const abs0 = (x: number): number => (x < 0 ? -x : x)

/** The fold whose fixed point is φ: x ↦ 1 + 1/x. */
export const goldenFold = (x: number): number => 1 + 1 / x

/** Iterate the fold from a seed — converges to φ (attractor). */
export function phiByFixedPoint(seed = 1, iterations = 60): number {
  let x = seed
  for (let i = 0; i < iterations; i++) x = goldenFold(x)
  return x
}

/** The n-th Fibonacci ratio F(n+1)/F(n) → φ. */
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

/**
 * φ as computed fixed point (not Math.sqrt). Same attractor as fibRatio(∞).
 * Closed form (1+√5)/2 is the theorem; the value is the fold, never host √.
 */
export const PHI = phiByFixedPoint(1, 80)

/** φ is its own fold — |φ − (1 + 1/φ)| ≈ 0. */
export function isFixedPoint(eps = 1e-12): boolean {
  return abs0(PHI - goldenFold(PHI)) < eps
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('phi — the number that is its own fold:')
  console.log(`  φ = ${PHI}`)
  console.log(`  1 + 1/φ = ${goldenFold(PHI)}  → fixed point: ${isFixedPoint()}`)
  console.log(`  iterate x↦1+1/x from seed 1 → ${phiByFixedPoint().toFixed(10)}  ·  F ratio → ${fibRatio(30).toFixed(10)}`)
}
