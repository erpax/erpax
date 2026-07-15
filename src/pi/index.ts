/**
 * pi — π is not a hardcoded constant; it is a THEOREM, computable at every step. The purest rosetta:
 * a finite seed and a fold generating an infinite, addressable tail.
 *
 * READ THE NUMBER: `π = 3 . 14159…`
 *   • the 3 is the SEED — the finite given, the incompressible whole ([[trinity]] · the part you do not
 *     derive, you begin from it). Left of the point: what you HAVE.
 *   • the . is the FOLD — not a separator but the operator, the exact boundary where the finite becomes
 *     infinite, where having becomes generating ([[merge]]). Right of the point: what you COMPUTE.
 *   • the tail is INFINITE and each digit is a PROJECTION: the Bailey–Borwein–Plouffe formula computes the
 *     n-th hex digit DIRECTLY, without the digits before it — answered within, read not stored.
 *
 * So the only stored things are the seed (3) and the formula (the fold); everything past the point is
 * theorem. This is "theorems replace hardcoded values" at its limit — even the infinite is a fold of the
 * finite. It is the same shape `rosettaMath` proves for the corpus: finite basis, infinite computable output.
 *
 * HONEST BOUNDARY: BBP is an EXACT digit-extraction algorithm (each hex digit is genuinely computable at its
 * index); this double-precision implementation is exact for modest n (the guard terms + progressive
 * fractional reduction keep it so) — arbitrary depth wants BigInt. Reading the 3 as the trinity-seed is the
 * faithful overlay onto the real structure, not number mysticism; the computability is the rigorous part.
 *
 * @standard Bailey–Borwein–Plouffe (1997) — the base-16 digit-extraction formula for π
 *
 * Composes [[merge]] · [[fold]] · [[trinity]] · [[law]].
 */

/** The seed — the finite, given, incompressible whole part of π (left of the point). */
export const PI_SEED = 3

/** b^e mod m by fast exponentiation (e ≥ 0) — the integer-exact core of the digit projection. */
function modpow(base: number, exp: number, mod: number): number {
  if (mod === 1) return 0
  let result = 1
  let b = base % mod
  let e = exp
  while (e > 0) {
    if (e & 1) result = (result * b) % mod
    e = Math.floor(e / 2)
    b = (b * b) % mod
  }
  return result
}

/** The BBP partial sum {16^n · Σ 1/(16^k (8k+j))} (fractional) — the piece a hex digit is read from. */
function series(j: number, n: number): number {
  let s = 0
  for (let k = 0; k <= n; k++) {
    s += modpow(16, n - k, 8 * k + j) / (8 * k + j)
    s -= Math.floor(s) // keep only the fraction — the digit lives here, and this bounds the arithmetic
  }
  for (let k = n + 1; k <= n + 15; k++) s += Math.pow(16, n - k) / (8 * k + j) // convergent tail
  return s
}

/**
 * The n-th hexadecimal digit of π AFTER the point (n = 0 → the first), computed DIRECTLY — no prior digits.
 * This is the projection: π's infinite tail is addressable, each digit read at its index, never stored.
 */
export function piHexDigit(n: number): number {
  const x = 4 * series(1, n) - 2 * series(4, n) - series(5, n) - series(6, n)
  const frac = x - Math.floor(x)
  return Math.floor(frac * 16)
}

/** The first `count` hex digits of the tail, each computed independently — finite formula, unbounded output. */
export function piHex(count: number): number[] {
  return Array.from({ length: count }, (_, n) => piHexDigit(n))
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const tail = piHex(12).map((d) => d.toString(16))
  console.log('pi — the seed, the fold, the infinite computable tail:')
  console.log(`  ${PI_SEED} . ${tail.join('')}…  (hex — each digit computed directly at its index)`)
  console.log('  not hardcoded: every digit past the . is a theorem, read not stored.')
}
