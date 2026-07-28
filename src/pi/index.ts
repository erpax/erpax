/**
 * pi — π is not a hardcoded constant; it is a THEOREM, computable at every step.
 * Algebra only — no host Math.* ([[algebra]]/host). BBP digit extraction is the carrier.
 *
 * @standard Bailey–Borwein–Plouffe (1997) — the base-16 digit-extraction formula for π
 *
 * Composes [[merge]] · [[fold]] · [[trinity]] · [[law]] · [[algebra]].
 */

/** The seed — the finite, given, incompressible whole part of π (left of the point). */
export const PI_SEED = 3

const floor0 = (x: number): number => {
  const t = x | 0
  return x < 0 && t !== x ? t - 1 : t
}

/** Integer power base^exp for exp ≥ 0; for exp < 0 returns 1/base^(-exp). */
const powInt = (base: number, exp: number): number => {
  if (exp === 0) return 1
  if (exp < 0) return 1 / powInt(base, -exp)
  let r = 1
  let b = base
  let e = exp
  while (e > 0) {
    if (e & 1) r *= b
    e >>= 1
    b *= b
  }
  return r
}

/** b^e mod m by fast exponentiation (e ≥ 0). */
function modpow(base: number, exp: number, mod: number): number {
  if (mod === 1) return 0
  let result = 1
  let b = base % mod
  let e = exp
  while (e > 0) {
    if (e & 1) result = (result * b) % mod
    e >>= 1
    b = (b * b) % mod
  }
  return result
}

/** The BBP partial sum {16^n · Σ 1/(16^k (8k+j))} (fractional). */
function series(j: number, n: number): number {
  let s = 0
  for (let k = 0; k <= n; k++) {
    s += modpow(16, n - k, 8 * k + j) / (8 * k + j)
    s -= floor0(s)
  }
  for (let k = n + 1; k <= n + 15; k++) s += powInt(16, n - k) / (8 * k + j)
  return s
}

/** The n-th hexadecimal digit of π AFTER the point (n = 0 → the first). */
export function piHexDigit(n: number): number {
  const x = 4 * series(1, n) - 2 * series(4, n) - series(5, n) - series(6, n)
  const frac = x - floor0(x)
  return floor0(frac * 16)
}

/** The first `count` hex digits of the tail, each computed independently. */
export function piHex(count: number): number[] {
  return Array.from({ length: count }, (_, n) => piHexDigit(n))
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const tail = piHex(12).map((d) => d.toString(16))
  console.log('pi — the seed, the fold, the infinite computable tail:')
  console.log(`  ${PI_SEED} . ${tail.join('')}…  (hex — each digit computed directly at its index)`)
  console.log('  not hardcoded: every digit past the . is a theorem, read not stored.')
}
