/**
 * prime — the multiplicative basis, and factoring is the DECODE fold.
 *
 * [[pi]] is the POSITIONAL basis: a finite seed and a formula generate an infinite tail, each digit a
 * projection read at its index ([[merge]]). Primes are the MULTIPLICATIVE basis, and they are the mirror:
 * every integer is a unique product of primes (the fundamental theorem of arithmetic), so `factor(n)` is the
 * DECODE direction of the fold — an element taken back to its generators. That is exactly ⟨5⟩, the void
 * generator this session proved is ⟨2⟩ inverted ([[horo]]/inverseOrbit): encode is multiply-up, decode is
 * factor-down.
 *
 * Both halves are computable THEOREMS, and only theorems:
 *   `isPrime`  deterministic Miller–Rabin (a proven witness set for the full JS integer range — not a
 *              probabilistic guess; below 3.3·10^24 those witnesses are complete)
 *   `factor`   trial division to the decode; exact for the range primality covers
 *
 * THE REAL QUANTUM CONNECTION — proven, and NOT overclaimed. Shor's algorithm (1994) factors integers by
 * PERIOD-FINDING: the multiplicative group mod n has period structure, and a quantum computer reads it in
 * polynomial time. That is why the corpus's content-address is post-quantum safe where RSA/ECC are not — a
 * hash has NO period, no abelian hidden subgroup, so Shor has nothing to grip ([[tamper]]/cost reasons this
 * for the digest). Primes "fold the quantum" in this exact, bounded sense: their group structure is what a
 * quantum period-finder decodes. Anything beyond that — an unproven prime theorem, a physics claim — is
 * refused here, on this corpus's own law: a claim with no proof beside it is not a theorem, it is a
 * decoration ([[rules]]/refutable). The Riemann Hypothesis is unproven; this atom does not touch it.
 *
 * HONEST BOUNDARY — the arithmetic is rigorous; the reading of factoring AS the fold's decode leg is the
 * faithful overlay onto that structure, named as such (as [[pi]] names the 3-as-seed overlay), never number
 * mysticism. `factor` is trial division: correct, not fast — a hard factorization is exactly what classical
 * computing cannot do quickly and Shor can, which is the whole point.
 *
 * Run: `tsx src/prime/index.ts <n>`
 *
 * @standard Fundamental Theorem of Arithmetic — unique prime factorisation (Euclid; Gauss)
 * @standard Shor 1994 — integer factorisation by quantum period-finding (proven, not claimed)
 *
 * Composes [[pi]] · [[horo]] · [[merge]] · [[law]].
 */

/** Canonical atom path. */
import { piHex } from '@/pi'

export const atomPath = 'prime' as const

/** The first primes — the smallest generators of the multiplicative basis. */
export const FIRST_PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37] as const

const mulmod = (a: bigint, b: bigint, m: bigint): bigint => ((a % m) * (b % m)) % m
const powmod = (b: bigint, e: bigint, m: bigint): bigint => {
  let r = 1n
  b %= m
  while (e > 0n) {
    if (e & 1n) r = mulmod(r, b, m)
    b = mulmod(b, b, m)
    e >>= 1n
  }
  return r
}

/**
 * Deterministic primality — Miller–Rabin with the witness set proven complete for the JS integer range.
 *
 * @invariant NOT probabilistic — for n < 2^53 the witnesses {2,3,5,7,11,13,17,19,23,29,31,37} are a proof,
 *   never a guess (Sorenson & Webster); the answer is exact, or the input is out of range
 */
export function isPrime(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) return false
  if (n < 4) return true
  if (n % 2 === 0) return false
  const N = BigInt(n)
  let d = N - 1n
  let r = 0n
  while ((d & 1n) === 0n) {
    d >>= 1n
    r++
  }
  for (const a of FIRST_PRIMES) {
    const A = BigInt(a)
    if (A >= N) continue
    let x = powmod(A, d, N)
    if (x === 1n || x === N - 1n) continue
    let composite = true
    for (let i = 0n; i < r - 1n; i++) {
      x = mulmod(x, x, N)
      if (x === N - 1n) {
        composite = false
        break
      }
    }
    if (composite) return false
  }
  return true
}

/**
 * The DECODE fold — an integer taken back to its prime generators, with multiplicity, ascending.
 *
 * @invariant the product of the factors returns n (unique factorisation) — decode ∘ encode = identity
 * @invariant every element of the result isPrime — the output is the basis, not a resemblance of it
 */
export function factor(n: number): number[] {
  if (!Number.isInteger(n) || n < 2) return []
  const out: number[] = []
  let m = n
  for (let p = 2; p * p <= m; p += p === 2 ? 1 : 2) {
    while (m % p === 0) {
      out.push(p)
      m /= p
    }
  }
  if (m > 1) out.push(m)
  return out
}

// ─── the split: an astronomical value as small residues, moduli drawn from π, recomposed by CRT ────

/**
 * Prime moduli nobody chose: 31-bit windows read off the hex digits of π ([[pi]], BBP — computed, not
 * stored), bit 30 forced so every modulus exceeds 2^30, kept when Miller–Rabin proves them prime. A
 * modulus set derived from a public constant is the "nothing up my sleeve" discipline the ciphers
 * use for their tables; here it makes the split reproducible by anyone with π.
 */
export function piPrimes(count: number): bigint[] {
  const out: bigint[] = []
  for (let at = 0; out.length < count && at < 4096; at += 8) {
    const digits = piHex(at + 8).slice(at)
    let w = 0
    for (const d of digits) w = (w * 16 + d) >>> 0
    const cand = (w & 0x7fffffff) | 0x40000000
    if (isPrime(cand) && !out.includes(BigInt(cand))) out.push(BigInt(cand))
  }
  return out
}

/** Do the moduli cover `bits` — is their product above 2^bits, so the split loses nothing? */
export const coversBits = (moduli: readonly bigint[], bits: number): boolean => moduli.reduce((p, m) => p * m, 1n) > 1n << BigInt(bits)

/** The value as its residue in every modulus — a ring homomorphism, so sums and products split with it. */
export const split = (x: bigint, moduli: readonly bigint[]): bigint[] => moduli.map((m) => ((x % m) + m) % m)

const inverse = (a: bigint, m: bigint): bigint => {
  // extended Euclid — the crypto tool under every CRT
  let [old_r, r, old_s, s] = [((a % m) + m) % m, m, 1n, 0n]
  while (r !== 0n) {
    const q = old_r / r
    ;[old_r, r] = [r, old_r - q * r]
    ;[old_s, s] = [s, old_s - q * s]
  }
  return ((old_s % m) + m) % m
}

/** The Chinese Remainder recomposition — exact when `coversBits` held for the value's width. */
export function join(residues: readonly bigint[], moduli: readonly bigint[]): bigint {
  let x = 0n
  let step = 1n
  for (let i = 0; i < moduli.length; i++) {
    const m = moduli[i] as bigint
    const r = residues[i] as bigint
    const t = ((((r - x) % m) + m) % m) * inverse(step % m, m)
    x += step * (((t % m) + m) % m)
    step *= m
  }
  return x
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const n = Number(process.argv[2] ?? 360)
  const f = factor(n)
  console.log(`prime — ${n} ${isPrime(n) ? 'IS prime' : 'decodes to ' + f.join(' · ') + '  (Πf = ' + f.reduce((a, b) => a * b, 1) + ')'}`)
}
