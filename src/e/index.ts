/**
 * e — the growth constant, computed never stored: the number whose rate of change IS itself.
 * Algebra only — no host Math.* ([[algebra]]/host). Series + compounding are the carrier ops.
 *
 * @standard Euler's number e = Σ 1/k! = lim (1+1/n)ⁿ — the base of the natural exponential
 *
 * Composes [[pi]] · [[phi]] · [[fold]] · [[law]] · [[algebra]].
 */

const abs0 = (x: number): number => (x < 0 ? -x : x)

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

/** Integer power for compounding: (1+1/n)^n via repeated multiply — no Math.pow. */
function powPos(base: number, exp: number): number {
  let r = 1
  for (let i = 0; i < exp; i++) r *= base
  return r
}

/** e by continuous compounding (1 + 1/n)ⁿ — growth folded into itself, converging as n grows. */
export function eByCompounding(n: number): number {
  const N = n | 0
  if (N <= 0) return 1
  return powPos(1 + 1 / N, N)
}

/** exp via truncated series — carrier for self-derivative check. */
export function expSeries(x: number, terms = 24): number {
  let sum = 1
  let term = 1
  for (let k = 1; k < terms; k++) {
    term *= x / k
    sum += term
  }
  return sum
}

/**
 * The self-derivative check: (eˣ)′ ≈ eˣ at x, via the symmetric difference quotient.
 * Uses expSeries — never host Math.exp.
 */
export function selfDerivative(x: number, h = 1e-6): { rate: number; state: number; selfDriven: boolean } {
  const rate = (expSeries(x + h) - expSeries(x - h)) / (2 * h)
  const state = expSeries(x)
  return { rate, state, selfDriven: abs0(rate - state) / state < 1e-6 }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('e — the number whose rate of change is itself:')
  console.log(`  series Σ1/k!      → ${eBySeries()}`)
  console.log(`  (1+1/n)ⁿ, n=1e7  → ${eByCompounding(1e7).toFixed(8)}`)
  const d = selfDerivative(1)
  console.log(`  d/dx eˣ at x=1: rate ${d.rate.toFixed(8)} = state ${d.state.toFixed(8)} → self-driven: ${d.selfDriven}`)
}
