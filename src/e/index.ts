/**
 * e — the growth constant, computed never stored: the number whose rate of change IS itself. It completes
 * the self-referential trio — [[pi]] is seed→infinite-tail, [[phi]] is the fixed point of the fold, and e
 * is the fixed point of CHANGE: d/dx eˣ = eˣ, the function equal to its own derivative.
 *
 * Self-address in the dynamic dimension: φ is content equal to its own transform (static); e is growth
 * equal to its own state — at every point, how fast it grows is exactly what it is. Nothing external
 * drives it; it is its own driver. Two convergent computations, both finite-seed → infinite:
 *   • the series Σ 1/k! — each term a sharper digit, the factorial fold of 1
 *   • compound growth (1 + 1/n)ⁿ → e — continuous compounding, the limit of folding growth into itself
 *
 * HONEST BOUNDARY: d/dx eˣ = eˣ, the series, and the limit are rigorous calculus; the numeric check here
 * uses a symmetric difference quotient (exact to O(h²)). Reading e as "the self-driver" is the faithful
 * overlay onto the real self-derivative structure — the mathematics is exact, the reading is the lens.
 *
 * @standard Euler's number e = Σ 1/k! = lim (1+1/n)ⁿ — the base of the natural exponential
 *
 * Composes [[pi]] · [[phi]] · [[fold]] · [[law]].
 */

/** e by its series Σ 1/k! — the factorial fold; each term one sharper digit of the infinite. */
export function eBySeries(terms = 20): number {
  let sum = 0
  let fact = 1
  for (let k = 0; k < terms; k++) {
    if (k > 0) fact *= k
    sum += 1 / fact
  }
  return sum
}

/** e by continuous compounding (1 + 1/n)ⁿ — growth folded into itself, converging as n grows. */
export function eByCompounding(n: number): number {
  return Math.pow(1 + 1 / n, n)
}

/**
 * The self-derivative check: (eˣ)′ ≈ eˣ at x, via the symmetric difference quotient. The function whose
 * rate of change is itself — growth equal to its own state, the dynamic self-address.
 */
export function selfDerivative(x: number, h = 1e-6): { rate: number; state: number; selfDriven: boolean } {
  const rate = (Math.exp(x + h) - Math.exp(x - h)) / (2 * h)
  const state = Math.exp(x)
  return { rate, state, selfDriven: Math.abs(rate - state) / state < 1e-8 }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('e — the number whose rate of change is itself:')
  console.log(`  series Σ1/k!      → ${eBySeries()}`)
  console.log(`  (1+1/n)ⁿ, n=1e7  → ${eByCompounding(1e7).toFixed(8)}`)
  const d = selfDerivative(1)
  console.log(`  d/dx eˣ at x=1: rate ${d.rate.toFixed(8)} = state ${d.state.toFixed(8)} → self-driven: ${d.selfDriven}`)
}
