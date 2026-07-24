/**
 * harmony/divisor — the 432 divisor lattice: the respected fractions, down to the bit.
 *
 * 432 = 2⁴·3³ is the A432 anchor ([[harmony]]). Its divisors, ordered by divisibility, form a lattice
 * — and because 432 is 2-smooth·3-smooth with exponents (4,3), that lattice is EXACTLY the product of
 * chains C5 × C4: 5 powers of two × 4 powers of three = 20 divisors, one for each (a,b) with a∈0..4,
 * b∈0..3. No divisor is missing and none is extra; the count is a theorem, not a measurement.
 *
 * The inversion φ(d) = 432/d is the lattice's exact self-duality, and it computes to the bit:
 *
 *   • d · φ(d) = 432                        — the product is exact (integer, no rounding)
 *   • φ(φ(d)) = d                            — an involution
 *   • d | e  ⟺  φ(e) | φ(d)                 — order-reversing: the lattice is self-dual (C5×C4 ≅ its dual)
 *   • d / 432 = 1 / φ(d)                     — EVERY divisor-fraction reduces to a UNIT fraction, exactly
 *
 * That last identity is "the respected fractions": d/432 = d/(d·φ(d)) = 1/φ(d). Each of the 20 divisors
 * names the reciprocal 1/φ(d) with denominator its own inversion — the fraction and its inversion are the
 * same fact read two ways. Verified by integer cross-multiplication (1·432 = d·φ(d)), never a float.
 *
 * This is REAL math (a distributive divisor lattice + its order-reversing involution), sealed as a
 * finite-complete theorem — the whole domain is 20 elements, so the proof exhausts it. It is not the
 * 432-Hz numerology; the number earns its place here only through the arithmetic that holds to the bit.
 *
 *   tsx src/harmony/divisor/index.ts
 *
 * @see ../index — the A432 harmony anchor
 */

/** The anchor and its prime signature — 432 = 2⁴·3³. */
export const HARMONY_ANCHOR = 432
export const FACTOR_432: Readonly<Record<number, number>> = { 2: 4, 3: 3 }

/** The 20 divisors of 432, ascending — 2^a·3^b for a∈0..4, b∈0..3. Exhaustive, exact. */
export function divisorsOf432(): number[] {
  const out: number[] = []
  for (let a = 0; a <= FACTOR_432[2]!; a++) {
    for (let b = 0; b <= FACTOR_432[3]!; b++) out.push(2 ** a * 3 ** b)
  }
  return out.sort((x, y) => x - y)
}

/** The lattice coordinate (exponents of 2 and 3) — the (a,b) node in C5 × C4. */
export function latticeCoord(d: number): readonly [number, number] {
  let a = 0
  let b = 0
  let n = d
  while (n % 2 === 0) {
    n /= 2
    a++
  }
  while (n % 3 === 0) {
    n /= 3
    b++
  }
  return [a, b]
}

/** The inversion φ(d) = 432/d — exact, because every divisor divides 432 with no remainder. */
export function invert(d: number): number {
  return HARMONY_ANCHOR / d
}

/**
 * The respected fraction of a divisor: d/432 in lowest terms — always the UNIT fraction 1/φ(d).
 * Returned as an exact {num, den} pair; the identity num·432 = d·den holds to the bit (see the assert).
 */
export function respectedFraction(d: number): { readonly num: number; readonly den: number } {
  return { num: 1, den: invert(d) }
}

export interface Lattice432Theorem {
  readonly divisors: number
  readonly sigma: number
  readonly selfDual: boolean
  readonly involution: boolean
  readonly exactProduct: boolean
  readonly unitFractions: boolean
}

/**
 * The theorem, exhausted over the whole 20-element domain (finite-complete). Returns the verified
 * facts; `assertDivisorLattice432` throws if any leg fails. All arithmetic is integer — "to the bit".
 */
export function divisorLattice432(): Lattice432Theorem {
  const ds = divisorsOf432()
  const set = new Set(ds)
  let selfDual = true
  let involution = true
  let exactProduct = true
  let unitFractions = true
  for (const d of ds) {
    const inv = invert(d)
    if (invert(inv) !== d) involution = false
    if (d * inv !== HARMONY_ANCHOR) exactProduct = false
    const f = respectedFraction(d)
    // d/432 = 1/φ(d) verified WITHOUT floats: num·432 === d·den
    if (f.num * HARMONY_ANCHOR !== d * f.den) unitFractions = false
    for (const e of ds) {
      // order-reversing: d | e  ⟺  φ(e) | φ(d)
      const dDivE = e % d === 0
      const invDivInv = invert(d) % invert(e) === 0
      if (dDivE !== invDivInv) selfDual = false
    }
    if (!set.has(inv)) selfDual = false // the lattice is closed under inversion
  }
  const sigma = ds.reduce((s, d) => s + d, 0)
  return { divisors: ds.length, sigma, selfDual, involution, exactProduct, unitFractions }
}

/** Fail-closed: the lattice must be C5×C4 (20 divisors), σ=1240, self-dual, exact to the bit. */
export function assertDivisorLattice432(): void {
  const t = divisorLattice432()
  const ok = t.divisors === 20 && t.sigma === 1240 && t.selfDual && t.involution && t.exactProduct && t.unitFractions
  if (!ok) throw new Error(`✖ harmony/divisor — the 432 lattice is not exact: ${JSON.stringify(t)}`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const t = divisorLattice432()
  console.log(`harmony/divisor — 432 = 2⁴·3³, the divisor lattice C5×C4`)
  console.log(`  divisors ${t.divisors} · σ ${t.sigma} · self-dual ${t.selfDual} · involution ${t.involution} · exact-product ${t.exactProduct} · unit-fractions ${t.unitFractions}`)
  console.log('  the respected fractions (d/432 = 1/φ(d), to the bit):')
  for (const d of divisorsOf432()) {
    const [a, b] = latticeCoord(d)
    console.log(`    ${String(d).padStart(3)} = 2^${a}·3^${b}  →  ${d}/432 = 1/${invert(d)}`)
  }
}
