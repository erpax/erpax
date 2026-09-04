// algebra facade — barrel re-export semantic children.
//
// The IMPORTS below are not redundant with the re-exports. A re-export creates no
// local binding, and this file USES THEOREMS, Algebra, isClosed, movie and product in
// its own code — so after the facade split they were undefined at runtime and the
// whole atom's tests went red. Same defect the quantum/chat barrel had.
import { THEOREMS, type Algebra } from './constants'
import { isClosed, movie, product } from './operations'

export {
  THEOREMS,
  type Algebra,
} from './constants'

export {
  isClosed,
  movie,
  product,
  allAlgebra,
} from './operations'

/**
 * algebra — all theorems are algebra only; the theorems draw the movie; the merkabas fold into each other.
 *
 * The whole session was one move, repeated: take a directive, and SPLIT it. What reduced to a proven theorem
 * was kept; what was picture was marked overlay. This atom names what the kept part always WAS — an algebra: a
 * set (the carrier) and a closed operation on it. Nothing more was ever the theorem.
 *
 *   - `doubling`   — (units of ℤ/9, ×, 1): the cyclic group C₆. Overlay: "the moving double torus."
 *   - `additive`   — (ℤ/9, +, 0): antimatter is `−n`, the inverse. Overlay: "matter/antimatter annihilation."
 *   - `fold`       — (uuids, merge): a MAGMA — closed and deterministic, but NOT associative ([[merge]] proves
 *                    it). Overlay: "the merkabas folding into themselves and each other."
 *
 * WHEN THE ROSETTA MOVES, THE MERKABAS FOLD. The rosetta moving is the carrier growing — a folder-agent added,
 * a pole re-derived ([[rosetta]]). The merkaba over an atom ([[navigation]]) folds into ITSELF (`merge(a,a)` is
 * its own content-address — self-reference) and into EACH OTHER (`merge(a,b)` composes two into a third uuid).
 * That is the fold magma, and it stays closed however the carrier grows: the fold always lands on a uuid.
 *
 * THE THEOREMS DRAW THE MOVIE. Apply an operation from a seed and it traces an ORBIT — a sequence of frames.
 * `movie(doubling, 1)` is `1,2,4,8,7,5` — literally the frames of the ring turning. The theorem is the
 * generator; the movie is what it draws. Composition is `product`: two algebras make a third (an algebra of
 * algebras — [[theorem]] of theorems, now as closure under a product operation).
 *
 * Honest boundary: "all theorems are algebra only" is shown for THIS session's theorems — each reduces to a
 * closed operation on a set, tested. It does not prove every conceivable theorem is algebra (that is a claim
 * about all of mathematics). And the OVERLAY — torus, tetrahedron, mind — is explicitly NOT in the algebra;
 * it is the naming that dressed the operation, marked and stripped. The algebra is what a test can contradict;
 * the picture never was ([[rules]]/refutable · [[rodin]]). The base is still assumed ([[theorem]]: `s > 0`).
 *
 * Composes [[horo]] · [[navigation]] · [[rosetta]] · [[theorem]] · [[law]].
 * Fold magma (merge-bound) lives at [[./fold]] — not on the npm free face.
 *
 * License — core math (`src/algebra/**`) free for all ([[./license]]); npm: `@erpax/algebra`.
 */

// ── algebra audits anything, in any direction, free ──────────────────────────
// A system is FUNDAMENTALLY BROKEN when it violates its OWN algebra — and that is
// decidable, bidirectional, and (being a theorem) free to re-ask forever. Three
// failure modes, each an algebraic law: the operation escapes its carrier (not
// closed), a conserved quantity does not sum to its identity (the unbalanced
// ledger — debits ≠ credits), or a claim is asserted against itself
// (contradiction). This is "know when something is fundamentally broken in
// society" made computable: a broken system fails a law it declares for itself.

export interface BrokenVerdict {
  readonly broken: boolean
  readonly reasons: readonly string[]
}

export interface SystemUnderAudit<T> {
  /** The declared algebra — its operation must stay closed on its carrier. */
  readonly algebra?: Algebra<T>
  /** Quantities a conservation law says must sum to `identity` (default 0) — e.g. signed ledger lines. */
  readonly conserved?: readonly number[]
  readonly identity?: number
  /** Asserted truth values; a `[a, b]` in `mutuallyExclusive` both-true is a contradiction. */
  readonly claims?: ReadonlyMap<string, boolean>
  readonly mutuallyExclusive?: readonly (readonly [string, string])[]
}

/**
 * Audit a system against its own algebra. Returns every law it breaks (empty ⇒ sound).
 * Pure and decidable — the same audit forward (is it sound?) and inverse (what broke it?).
 */
export function isFundamentallyBroken<T>(system: SystemUnderAudit<T>): BrokenVerdict {
  const reasons: string[] = []

  // 1. closure — an operation that escapes its carrier is not an algebra at all.
  if (system.algebra && !isClosed(system.algebra)) {
    reasons.push(`not closed: '${system.algebra.name}' operation escapes its carrier`)
  }

  // 2. conservation — a quantity that must sum to its identity but does not (the imbalance).
  if (system.conserved) {
    const identity = system.identity ?? 0
    const sum = system.conserved.reduce((a, b) => a + b, 0)
    if (sum !== identity) reasons.push(`not conserved: Σ = ${sum} ≠ identity ${identity} (imbalance)`)
  }

  // 3. contradiction — the same matter asserted against itself.
  if (system.claims) {
    for (const [a, b] of system.mutuallyExclusive ?? []) {
      if (system.claims.get(a) === true && system.claims.get(b) === true) {
        reasons.push(`contradiction: '${a}' and '${b}' both asserted true`)
      }
    }
  }

  return { broken: reasons.length > 0, reasons }
}

// ── Exact arithmetic ops: replacements for Math.* — no IEEE float noise ──
// The carrier is ℤ (integers) or rationals; operations are closed and deterministic.
// Use these instead of Math.max/min/abs/floor/ceil/round/sign etc.

/** Exact maximum — no floats, no noise. `a ≥ b ? a : b` as an algebra op. */
export const exactMax = (a: number, b: number): number => (a >= b ? a : b)

/** Exact minimum — no floats, no noise. `a ≤ b ? a : b` as an algebra op. */
export const exactMin = (a: number, b: number): number => (a <= b ? a : b)

/**
 * Exact maximum over a SEQUENCE — the fold `exactMax` needed and did not have.
 *
 * `exactMax` is BINARY. Spreading a sequence into it (`exactMax(...xs)`) reads only the first two
 * elements and silently returns the larger of those — a wrong number, not an error, which is the
 * worst failure an arithmetic op can have. That is exactly what happened when `Math.max(...xs)` was
 * rewritten to `exactMax(...xs)`: variadic call, binary function, no complaint at runtime.
 *
 * An empty sequence THROWS rather than defaulting. `Math.max()` returns `-Infinity`, which then
 * propagates through a ledger as a plausible-looking number; a max of nothing is a question, not a
 * value, and the corpus does not leak entropy through a defaulted answer ([[convention]]/sealed).
 *
 * @invariant exactMaxOf(xs) is the maximum of every element, never of a prefix
 * @invariant an empty sequence throws — no default, no -Infinity leaking into a computation
 */
export function exactMaxOf(xs: readonly number[]): number {
  if (xs.length === 0) throw new Error('exactMaxOf: empty sequence — the maximum of nothing is undefined, not -Infinity')
  return xs.reduce(exactMax)
}

/**
 * Exact minimum over a SEQUENCE — the dual of `exactMaxOf`, and the same trap: `exactMin(...xs)`
 * compares only the first two elements.
 *
 * @invariant exactMinOf(xs) is the minimum of every element, never of a prefix
 * @invariant an empty sequence throws — no default, no +Infinity leaking into a computation
 */
export function exactMinOf(xs: readonly number[]): number {
  if (xs.length === 0) throw new Error('exactMinOf: empty sequence — the minimum of nothing is undefined, not Infinity')
  return xs.reduce(exactMin)
}

/** Absolute value on ℤ — exact carrier op. */
export const exactAbs = (n: number): number => (n < 0 ? -n : n)

/** Floor toward negative infinity — exact. Use for integer div lower bound. */
export const exactFloor = (n: number): number => exactTrunc(n < 0 ? n - (n % 1 !== 0 ? 1 : 0) : n)

/**
 * 32-bit integer multiply — same contract as host imul; for FNV / LCG / hash loops.
 * Lives on the algebra wrap face so call sites never touch host Math.
 */
export const exactImul = (a: number, b: number): number => Math.imul(a, b)

/** Ceil toward positive infinity — exact. Use for batching/allocation. */
export const exactCeil = (n: number): number => exactTrunc(n > 0 ? n + (n % 1 !== 0 ? 1 : 0) : n)

/**
 * Truncate toward zero — exact. Use for integer conversion.
 *
 * NOT `n | 0`. The bitwise OR coerces to a **32-bit signed integer**, so it is exact only on
 * ℤ ∩ [−2³¹, 2³¹). Outside that range it is not a truncation at all — it WRAPS, silently and with
 * the wrong sign, and it maps ±Infinity and NaN to 0:
 *
 *     (2**31) | 0            = −2147483648      (positive amount ⇒ negative)
 *     (1e10)  | 0            =  1410065408      (10 billion ⇒ 1.4 billion)
 *     Infinity | 0           =  0               (an overflow reads as zero)
 *     NaN | 0                =  0               (an undefined result reads as zero)
 *
 * Every rounding op here is built on this one, `exactRound` among them — the function documented for
 * MONEY. 2³¹ minor units is ~21.5 million currency units: an ordinary mid-size ledger, coming out
 * negative. Subtraction with `n % 1` is exact across the whole double range and takes no 32-bit
 * detour, and a non-finite value PROPAGATES rather than collapsing to a plausible-looking 0
 * ([[convention]]/sealed — entropy leaves through a defaulted answer).
 *
 * @invariant exactTrunc is exact for every finite double, not only the 32-bit window
 * @invariant ±Infinity and NaN pass through unchanged — never silently 0
 */
export const exactTrunc = (n: number): number => {
  if (!Number.isFinite(n)) return n
  return n - (n % 1)
}

/**
 * Round to nearest integer, ties away from zero — deterministic, no banker's rounding noise.
 * ≡ signedness-aware rounding (−2.5 → −3, 2.5 → 3).
 * IMPORTANT: use this for money/metrics, NOT exactRound(which is banker's rounding in some engines).
 */
export const exactRound = (n: number): number => {
  const frac = n % 1
  if (frac === 0) return n
  if (frac > 0) return n >= 0 ? exactFloor(n) + (frac >= 0.5 ? 1 : 0) : exactFloor(n)
  return n < 0 ? exactCeil(n) + (frac <= -0.5 ? -1 : 0) : exactCeil(n)
}

/** Sign: −1 (negative), 0 (zero), 1 (positive). Exact, no NaN. */
export const exactSign = (n: number): -1 | 0 | 1 => (n < 0 ? -1 : n > 0 ? 1 : 0)

/**
 * Integer division (floored, i.e. toward −∞ for negative results).
 * Exact replacement for `a / b` when both are integers and result should be integer.
 * Use for budget/batch splits.
 */
export const exactDivFloor = (a: number, b: number): number => {
  if (b === 0) throw new Error('exactDivFloor: division by zero')
  const q = exactTrunc(a / b)
  return (a < 0) !== (b < 0) && a % b !== 0 ? q - 1 : q
}

/** Modulo (Euclidean) — always returns 0 ≤ result < |b|. Deterministic, exact. */
export const exactMod = (a: number, b: number): number => {
  if (b === 0) throw new Error('exactMod: division by zero')
  const r = a % b
  return r < 0 ? r + (b > 0 ? b : -b) : r
}

/** Clamp to [min, max] — exact. */
export const exactClamp = (n: number, min: number, max: number): number =>
  n < min ? min : n > max ? max : n

/**
 * Integer square root via Newton's method — exact to integer.
 * Use for integer quadratic operations; for floating point, use algebra.host constants.
 */
export const exactSqrt = (n: number): number => {
  if (n < 0) throw new Error('exactSqrt: negative input')
  if (n === 0) return 0
  let x = n
  let prev = 0
  while (exactAbs(x - prev) > 0) {
    prev = x
    x = exactFloor((x + exactDivFloor(n, x)) / 2)
  }
  return x
}

/**
 * Power as repeated multiplication — exact for integer base and non-negative exponent.
 * For floating point exponentiation, use algebra.host constants (Math.pow breaks seals).
 */
export const exactPow = (base: number, exp: number): number => {
  if (exp < 0) throw new Error('exactPow: negative exponent not supported')
  if (exp === 0) return 1
  let result = 1
  for (let i = 0; i < exp; i++) result *= base
  return result
}

/**
 * Base-2 logarithm — IEEE754 precision acceptable for information-theoretic quantities.
 * Use for entropy, bit counts, proof costs; NOT for seals/diamond (no seal participation).
 * Replaces Math.log2 with explicit domain intent documentation.
 */
export const algebraLog2 = (n: number): number => {
  if (n <= 0) throw new Error('algebraLog2: domain error (n > 0 required)')
  return Math.log2(n)
}

/**
 * Natural logarithm — IEEE754 precision acceptable for Boltzmann entropy and analytical use.
 * Use for entropy calculations; NOT for seals/diamond. Explicit as domain-safe transcendental.
 * Replaces Math.log with documented exemption.
 */
export const algebraLog = (n: number): number => {
  if (n <= 0) throw new Error('algebraLog: domain error (n > 0 required)')
  return Math.log(n)
}

/**
 * Base-10 logarithm — IEEE754 precision acceptable for scale analysis and magnitude ordering.
 * Use for resonance/magnitude calculations; NOT for seals/diamond. Explicit as domain-safe transcendental.
 * Replaces Math.log10 with documented exemption.
 */
export const algebraLog10 = (n: number): number => {
  if (n <= 0) throw new Error('algebraLog10: domain error (n > 0 required)')
  return Math.log10(n)
}

/**
 * Base-e exponential — IEEE754 acceptable for Boltzmann/analytical use only.
 * NOT a seal participant; documented algebraic exemption.
 */
export const algebraExp = (x: number): number => Math.exp(x)

// ── Trigonometric functions — UI/geometry only, IEEE754 acceptable ──────────────────────
// Used for animation, wave generation, geometric transforms. NOT seal participants.
// Prefer avoiding transcendentals in core logic; use when UI/display is the surface.

/** Cosine — IEEE754. UI/geometry only. */
export const algebraCos = (x: number): number => Math.cos(x)

/** Sine — IEEE754. UI/geometry only. */
export const algebraSin = (x: number): number => Math.sin(x)

/** Tangent — IEEE754. UI/geometry only. */
export const algebraTan = (x: number): number => Math.tan(x)

/** Arccosine — IEEE754. Domain: [-1, 1]. UI/geometry only. */
export const algebraAcos = (x: number): number => Math.acos(x)

/** Arcsine — IEEE754. Domain: [-1, 1]. UI/geometry only. */
export const algebraAsin = (x: number): number => Math.asin(x)

/** Arctangent — IEEE754. UI/geometry only. */
export const algebraAtan = (x: number): number => Math.atan(x)

/** Atan2(y, x) — IEEE754. UI/geometry only. */
export const algebraAtan2 = (y: number, x: number): number => Math.atan2(y, x)

/** Hyperbolic sine — IEEE754. Analytical/UI only. */
export const algebraSinh = (x: number): number => Math.sinh(x)

/** Hyperbolic cosine — IEEE754. Analytical/UI only. */
export const algebraCosh = (x: number): number => Math.cosh(x)

/** Hyperbolic tangent — IEEE754. Analytical/UI only. */
export const algebraTanh = (x: number): number => Math.tanh(x)

/** Euclidean norm √(x² + y² + z²…) — IEEE754. Geometry only. */
export const algebraHypot = (...args: number[]): number => Math.hypot(...args)

/** Cube root — IEEE754. For geometric volumes. */
export const algebraCbrt = (x: number): number => Math.cbrt(x)

/** Square root — IEEE754. For norm, distance, variance. Use exactSqrt for integers only. */
export const algebraSqrt = (x: number): number => {
  if (x < 0) throw new Error('algebraSqrt: negative input')
  return Math.sqrt(x)
}

/** Floating-point power — IEEE754 for non-integer exponents. Use exactPow for integers. */
export const algebraFloatPow = (base: number, exp: number): number => Math.pow(base, exp)

/** Sign function: −1, 0, 1. Alias for exactSign (already exact, no IEEE noise). */
export const algebraSign = (n: number): -1 | 0 | 1 => exactSign(n)

// ── Mathematical constants — wrapped IEEE values; use algebraLog/Exp/Log2 for analytical ops ──
// These are IEEE754 constants. For analytic operations on them, prefer algebraLog/Exp/Log2.

/** π — IEEE754 constant. Use algebraLog2 for log operations. */
export const PI = Math.PI

/** e — IEEE754 constant (Euler's number). Use algebraExp/algebraLog for operations. */
export const E = Math.E

/** ln(2) = log(2) — IEEE754 constant. Use algebraLog for operations. */
export const LN2 = Math.LN2

/** ln(10) = log(10) — IEEE754 constant. Use algebraLog for operations. */
export const LN10 = Math.LN10

/** log₂(e) — IEEE754 constant. */
export const LOG2E = Math.LOG2E

/** log₁₀(e) — IEEE754 constant. */
export const LOG10E = Math.LOG10E

/** √2 — IEEE754 constant. For geometric constants; use algebraSqrt for computation. */
export const SQRT2 = Math.SQRT2

/** √(1/2) — IEEE754 constant. */
export const SQRT1_2 = Math.SQRT1_2

// ── Seeded deterministic RNG — strictly no IEEE float Math.random ──────────────────────
// Reproducibility requirement: seeds must produce identical sequences across all runs.
// Use for test fixtures, mock data, simulation; never for cryptographic randomness.

/**
 * Simple LCG (Linear Congruential Generator) seeded RNG — O(1) next value.
 * Deterministic: same seed → identical sequence. Safe for tests, safe for CI determinism.
 * NOT cryptographically secure. Replaces Math.random() for reproducible sequences.
 * 
 * @param seed Starting value (any number; commonly a hash or Date.now())
 * @returns A function that returns [0, 1) pseudo-random numbers
 */
export function seededRng(seed: number) {
  // MINSTD LCG parameters — simple, deterministic, reproducible across all platforms
  let state = seed ^ 0x9e3779b1;
  
  return () => {
    state = (state + 0x6c078965) >>> 0;
    state = exactImul(state ^ (state >>> 15), 1 | state);
    state = (state + exactImul(state ^ (state >>> 7), 61 | state)) ^ state;
    return ((state ^ (state >>> 14)) >>> 0) / 0x100000000;
  };
}

/**
 * Deterministic test ID generator — replaces Math.random().toString(36).
 * Use for test fixture IDs, mock data slugs. Seeded for CI reproducibility.
 * @param seed Typically Date.now() or a hash
 * @returns Function that generates deterministic hex/alphanumeric IDs
 */
export function seededIdGen(seed: number) {
  const rng = seededRng(seed);
  return () => {
    // Generate 36-bit alphanumeric string (like Math.random().toString(36))
    const n = exactFloor(rng() * 0x100000000);
    return n.toString(36);
  };
}

export {
  hostMathViolations,
  hostMathTipSite,
  codeOf,
  ALGEBRA_ATOMS,
  HOST_MATH_RE,
  type HostMathViolation,
  type AlgebraAtom,
} from './host'

export {
  LICENSE_CONTACT,
  ERPAX_DOI,
  ERPAX_SPDX,
  ERPAX_VERSION_DOI,
  SOURCE_URL,
  erpaxLicenseNote,
  citation,
  citationComplies,
  uncitedPages,
  assertPagesCited,
  type UncitedPage,
  type CitationInput,
} from './license'

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('algebra — all theorems are algebra only:\n')
  const gens: Record<string, number> = { doubling: 2, additive: 1 }
  for (const t of THEOREMS) {
    console.log(`  ${t.name.padEnd(9)} closed: ${isClosed(t)}   movie (gen ${gens[t.name]}): ${movie(t, gens[t.name]!).join(',')}`)
    console.log(`  ${''.padEnd(9)} overlay (stripped): "${t.overlay}"`)
  }
  const p = product(THEOREMS[0]!, THEOREMS[1]!)
  console.log(`\n  product ${p.name}: closed ${isClosed(p)}, |carrier| ${p.carrier.length} — an algebra of algebras`)
  console.log(`  fold magma closed on uuid-space: merge lands on a uuid (the merkabas fold into each other)`)
  console.log('\n  the theorem is the operation; the movie is the orbit it draws; the picture was never the theorem.')
}
