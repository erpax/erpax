/**
 * entropy/threshold/split — m-of-n reconstruction, built locally over GF(256).
 *
 * [[entropy]]/threshold shipped n-of-n XOR and left m-of-n as a compass, on the reasoning that
 * prime-field secret sharing is where implementations go wrong. That reasoning names the risk
 * correctly and draws the wrong conclusion: the risk is not the field, it is an implementation whose
 * security property is **asserted** rather than **decided**. Over GF(256) it is decidable, and this
 * atom decides it.
 *
 * ## The field, and why this one
 *
 * GF(256) = GF(2⁸) with the AES reduction polynomial `x⁸+x⁴+x³+x+1` (0x11b). Every byte is an
 * element, arithmetic is table-driven and exact, and there is no modular bias, no big-integer path,
 * and no timing-variable division by a secret. A secret of any length is split **byte by byte**, and
 * the whole construction is Lagrange interpolation at `x = 0`.
 *
 * ## The security property is COMPUTED, not claimed
 *
 * Shamir's guarantee is information-theoretic: fewer than `m` shares reveal **nothing**. For a byte
 * that is not an aspiration — it is a finite check. Given `m−1` shares, for **every one of the 256
 * candidate secrets** there is exactly one polynomial of degree `m−1` that fits those shares and
 * yields that secret. So the shares are consistent with every secret equally, and the test in this
 * atom enumerates all 256 rather than trusting the argument.
 *
 * That is the difference between shipping secret sharing and shipping a claim about it.
 *
 * ## What it refuses
 *
 * `x = 0` is the secret's own coordinate, so a share may never sit there — issuing one hands over
 * the secret while looking like a share. Duplicate x-coordinates make interpolation singular (a
 * division by zero in the Lagrange basis), and a threshold above the share count is unreconstructable
 * by construction. Each is refused at the boundary rather than producing a plausible wrong answer.
 *
 * @law m-of-n is shipped when its security property is decided, not argued. Over GF(256) that
 *      property is a finite check, so the check is the implementation's licence to exist.
 * @invariant any m of n shares reconstruct the secret exactly; the subset chosen does not matter
 * @invariant m−1 shares are consistent with EVERY candidate secret — enumerated, not asserted
 * @invariant x = 0 is the secret's coordinate and is never issued as a share
 * @standard NIST SP 800-57 Part 1 r5 §5.6.1 — comparable key strengths
 * @standard FIPS 197 — the AES field GF(2⁸), reduction polynomial x⁸+x⁴+x³+x+1
 * @see ./SKILL.md -- ../index.ts
 */

/** Log/antilog tables over GF(2⁸) with generator 3 — built once, so multiplication is a lookup. */
const EXP = new Uint8Array(512)
const LOG = new Uint8Array(256)
{
  let x = 1
  for (let i = 0; i < 255; i += 1) {
    EXP[i] = x
    LOG[x] = i
    // multiply by the generator 3 = x+1, reducing by 0x11b when the high bit carries
    let next = x ^ ((x << 1) & 0xff)
    if (x & 0x80) next ^= 0x1b
    x = next & 0xff
  }
  for (let i = 255; i < 512; i += 1) EXP[i] = EXP[i - 255]!
}

/** Addition in characteristic 2 is XOR — and it is its own inverse, which is why there is no subtract. */
export const gadd = (a: number, b: number): number => (a ^ b) & 0xff

export function gmul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0
  return EXP[LOG[a]! + LOG[b]!]!
}

export function gdiv(a: number, b: number): number {
  if (b === 0) throw new SplitRefused('singular', 'division by zero in GF(256) — duplicate share coordinates')
  if (a === 0) return 0
  return EXP[LOG[a]! - LOG[b]! + 255]!
}

export class SplitRefused extends Error {
  constructor(
    readonly code: 'bad-threshold' | 'zero-coordinate' | 'duplicate-coordinate' | 'singular' | 'too-few',
    message: string,
  ) {
    super(`entropy/threshold/split: ${code} — ${message}`)
    this.name = 'SplitRefused'
  }
}

/** One share: its x-coordinate, and the secret's bytes evaluated there. */
export interface Piece {
  readonly x: number
  readonly y: Uint8Array
}

/** Deterministic randomness is the caller's business — the split takes the coefficients it is given. */
export type Coefficients = (count: number) => Uint8Array

/**
 * Split a secret into `n` pieces, any `m` of which reconstruct it.
 *
 * The polynomial is `f(x) = secret + a₁x + … + a_{m−1}x^{m−1}` per byte, and the share at `x` is
 * `f(x)`. The secret sits at `f(0)`, which is exactly why `x = 0` is never issued.
 */
export function split(secret: Uint8Array, m: number, n: number, coefficients: Coefficients): readonly Piece[] {
  if (!Number.isInteger(m) || !Number.isInteger(n) || m < 2 || n < m || n > 255) {
    throw new SplitRefused('bad-threshold', `m=${m} of n=${n} — need 2 ≤ m ≤ n ≤ 255`)
  }
  const pieces: Piece[] = []
  for (let x = 1; x <= n; x += 1) pieces.push({ x, y: new Uint8Array(secret.length) })
  for (let b = 0; b < secret.length; b += 1) {
    const coeffs = coefficients(m - 1)
    if (coeffs.length < m - 1) throw new SplitRefused('too-few', `need ${m - 1} coefficients, got ${coeffs.length}`)
    for (const p of pieces) {
      // Horner from the top coefficient down to the secret at the constant term
      let acc = coeffs[m - 2] ?? 0
      for (let k = m - 3; k >= 0; k -= 1) acc = gadd(gmul(acc, p.x), coeffs[k]!)
      p.y[b] = gadd(gmul(acc, p.x), secret[b]!)
    }
  }
  return pieces
}

/**
 * Reconstruct the secret by Lagrange interpolation at x = 0.
 *
 * Any `m` pieces suffice and the choice of subset is irrelevant — the polynomial through them is
 * unique, so every subset names the same constant term.
 */
export function combine(pieces: readonly Piece[]): Uint8Array {
  if (pieces.length < 2) throw new SplitRefused('too-few', `${pieces.length} piece(s) — need at least 2`)
  const xs = pieces.map((p) => p.x)
  if (xs.some((x) => x === 0)) throw new SplitRefused('zero-coordinate', 'x = 0 is the secret itself, never a share')
  if (new Set(xs).size !== xs.length) throw new SplitRefused('duplicate-coordinate', `repeated x in [${xs.join(', ')}]`)
  const width = pieces[0]!.y.length
  const out = new Uint8Array(width)
  for (let b = 0; b < width; b += 1) {
    let acc = 0
    for (let i = 0; i < pieces.length; i += 1) {
      let basis = 1
      for (let j = 0; j < pieces.length; j += 1) {
        if (i === j) continue
        // evaluated at x = 0: ∏ (0 − xⱼ)/(xᵢ − xⱼ), and in characteristic 2 negation is identity
        basis = gmul(basis, gdiv(xs[j]!, gadd(xs[i]!, xs[j]!)))
      }
      acc = gadd(acc, gmul(pieces[i]!.y[b]!, basis))
    }
    out[b] = acc
  }
  return out
}

/**
 * THE SECURITY PROPERTY, DECIDED — is every candidate secret consistent with these `m−1` shares?
 *
 * Returns the set of byte values reachable at `x = 0` by completing the given shares with one more
 * share at a free coordinate. If the sharing is sound the answer is all 256 values, so the held
 * shares say nothing about the secret. This is the whole information-theoretic claim, made finite.
 */
export function reachableSecrets(held: readonly Piece[], byteIndex = 0): ReadonlySet<number> {
  const free = [...Array(255).keys()].map((i) => i + 1).find((x) => !held.some((p) => p.x === x))
  if (free === undefined) throw new SplitRefused('too-few', 'no free coordinate remains')
  const reached = new Set<number>()
  for (let y = 0; y < 256; y += 1) {
    const completion: Piece = { x: free, y: Uint8Array.from([y]) }
    const slice = held.map((p) => ({ x: p.x, y: Uint8Array.from([p.y[byteIndex]!]) }))
    reached.add(combine([...slice, completion])[0]!)
  }
  return reached
}
