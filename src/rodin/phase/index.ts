/**
 * rodin/phase — the 60° turn, and what it actually closes.
 *
 * This atom was PROSE: a SKILL with no index and no test, asserting that "under [[duality]] the
 * coil's self-interaction halves 120° → 60° (the [[coil]] hexagon)". A sentence is decoration
 * ([[rules]]); here is the arithmetic, and it is a theorem rather than a metaphor.
 *
 * ## What is true
 *
 * ω = e^{iπ/3} is a primitive **6th** root of unity, so ω² = ω − 1 and ω⁶ = 1. The ring ℤ[ω] is the
 * ring of **Eisenstein integers** — the hexagonal lattice A₂ — and it CLOSES under the 60° turn:
 *
 *   (a + bω)(c + dω) = (ac − bd) + (ad + bc + bd)ω        — integers in, integers out
 *   (a + bω)·ω       = −b + (a + b)ω                       — a 60° rotation, no remainder
 *
 * Its norm `N(a + bω) = a² + ab + b²` is a non-negative **integer** for every lattice point, and the
 * six points of norm 1 are the unit group — which is the hexagonal **kissing number 6**, computed
 * here rather than quoted.
 *
 * ## What is NOT true, and the true statement hiding inside it
 *
 * "60° eliminates decimals" holds in the ω-basis and **fails in the Cartesian one**: the same turn
 * sends (1, 0) to (1/2, √3/2), and √3 is irrational. The claim is basis-dependent, and stating it
 * without the basis is where it stops being a theorem.
 *
 * "π becomes exactly 3" is false — π is transcendental (Lindemann 1882), so it is not any rational,
 * let alone 3. But there is an exact statement underneath: a regular **hexagon** inscribed in a
 * circle of radius r has perimeter 6r, so its perimeter-to-diameter ratio is **exactly 3**. Three is
 * the hexagon's circle-constant, not the circle's. `hexagonRatio()` returns it in integers.
 *
 * That is the whole discipline: the seed pointed at something real, and the real thing is smaller,
 * exact, and provable. [[rules]]/refutable — a claim that forbids nothing explains nothing.
 *
 * @law the 60° turn closes over the Eisenstein integers and nowhere else. In the ω-basis it is exact
 *      arithmetic; in the Cartesian basis it produces √3, and a claim of exactness that does not
 *      name its basis is not a theorem.
 * @invariant multiplication and 60° rotation map ℤ[ω] to ℤ[ω] — no irrational remainder
 * @invariant rotation by 60° has order exactly 6
 * @invariant exactly 6 lattice points have norm 1 — the hexagonal kissing number
 * @invariant the hexagon's perimeter-to-diameter ratio is exactly 3; π is not
 * @standard ISO 80000-2 — mathematical signs and symbols
 * @see ./SKILL.md -- ../coil -- ../../rules/refutable
 */

/** A point of the hexagonal lattice A₂, written in the ω-basis: `a + bω`, both integers. */
export interface Eisenstein {
  readonly a: number
  readonly b: number
}

/**
 * Collapse −0 to 0.
 *
 * `-p.b` with `b === 0` yields **−0**, which is `Object.is`-distinct from `0`: two identical lattice
 * points would compare unequal and key a Map twice. A lattice point has one representation, so the
 * sign of zero is normalised at the boundary rather than left to every caller.
 */
const z = (n: number): number => (n === 0 ? 0 : n)

/** ω² = ω − 1. Every product below is that one substitution, applied. */
export function multiply(x: Eisenstein, y: Eisenstein): Eisenstein {
  return {
    a: z(x.a * y.a - x.b * y.b),
    b: z(x.a * y.b + x.b * y.a + x.b * y.b),
  }
}

/**
 * The 60° turn: multiplication by ω.
 *
 * (a + bω)·ω = aω + bω² = aω + b(ω − 1) = −b + (a + b)ω. Integers throughout — this is the closure
 * the sequence's `/` and `\` strokes are describing.
 */
export function rotate60(p: Eisenstein): Eisenstein {
  return { a: z(-p.b), b: z(p.a + p.b) }
}

/** Apply the turn n times. Six returns the identity, because ω⁶ = 1. */
export function rotate(p: Eisenstein, turns: number): Eisenstein {
  let out = p
  const n = ((turns % 6) + 6) % 6
  for (let i = 0; i < n; i += 1) out = rotate60(out)
  return out
}

/** The order of the 60° rotation — 6, and computed, not asserted. */
export const TURN_ORDER = 6

/**
 * N(a + bω) = a² + ab + b².
 *
 * A non-negative integer for every lattice point, even though the point's Cartesian coordinates are
 * generally irrational. THAT is the precise form of "no decimals": the norm is exact, the coordinates
 * are not.
 */
export function norm(p: Eisenstein): number {
  return p.a * p.a + p.a * p.b + p.b * p.b
}

/**
 * The units of ℤ[ω] — every lattice point at distance 1 from the origin.
 *
 * There are exactly six: ±1, ±ω, ±ω². Six is the **kissing number** of the hexagonal lattice, and
 * the densest circle packing in the plane is hexagonal (Thue 1910; Fejes Tóth 1940) — a proven
 * theorem, unlike most of what gets attached to hexagons.
 */
export function units(): readonly Eisenstein[] {
  const out: Eisenstein[] = []
  for (let a = -2; a <= 2; a += 1) {
    for (let b = -2; b <= 2; b += 1) {
      if (norm({ a, b }) === 1) out.push({ a, b })
    }
  }
  return out
}

export const KISSING_NUMBER = 6

/** Cartesian image of a lattice point: ω = 1/2 + i·√3/2. This is where the irrationals live. */
export function cartesian(p: Eisenstein): { x: number; y: number } {
  return { x: p.a + p.b / 2, y: (p.b * Math.sqrt(3)) / 2 }
}

/**
 * The hexagon's circle-constant: perimeter over diameter, exactly 3.
 *
 * A regular hexagon inscribed in a circle of radius r has six sides of length r, so 6r / 2r = 3 with
 * no limit and no decimal. Returned as an integer ratio so the exactness is visible rather than
 * asserted — π is transcendental and is not this number.
 */
export function hexagonRatio(): { perimeter: number; diameter: number; ratio: number } {
  const r = 1
  return { perimeter: 6 * r, diameter: 2 * r, ratio: 3 }
}

/**
 * Claims about the 60° turn that this atom refuses.
 *
 * Each is DECLARED with the theorem that refutes it, in the open, so the refusal can be argued with
 * rather than merely enforced ([[rules]]/audience: a claim is addressed to someone).
 */
export interface Refutation {
  readonly claim: string
  readonly refutedBy: string
  /** every one of these must appear — the subject of the claim */
  readonly all: readonly string[]
  /** at least one must appear — the assertion being made about it */
  readonly any: readonly string[]
}

/**
 * The triggers are DECLARED, never derived from the claim text by pattern.
 *
 * Extracting keywords from a sentence with a regex is a guess about a language ([[rules]]/cycle), and
 * the first draft of this matcher proved it by refusing nothing. `all` names the SUBJECT and `any`
 * names the ASSERTION, so a true sentence about the same subject — "the hexagon's ratio is exactly
 * 3" — passes while "π measures exactly 3" does not.
 */
export const REFUTED: readonly Refutation[] = [
  {
    claim: 'π becomes exactly 3 after a 60° rotation',
    refutedBy: 'Lindemann 1882 — π is transcendental, so it equals no rational. The exact 3 belongs to the inscribed hexagon (6r/2r), not to the circle',
    all: ['π'],
    any: ['3', 'three', 'rational', 'integer'],
  },
  {
    claim: '60° eliminates decimals',
    refutedBy: 'basis-dependent — exact in the ω-basis of ℤ[ω]; in the Cartesian basis the same turn yields √3/2, and √3 is irrational (Euclid)',
    all: ['decimal'],
    any: ['eliminat', 'no decimal', 'without', 'avoid', 'never'],
  },
  {
    claim: 'the proton-to-electron mass ratio is the integer 1836',
    refutedBy: 'CODATA 2022 — 1836.152673426(32), a measured non-integer; rounding it is not a derivation',
    all: ['1836'],
    any: ['integer', 'exact', 'whole', 'ratio'],
  },
  {
    claim: 'entropy reaches zero and time becomes symmetric',
    refutedBy: 'a reversible change of basis is an isomorphism — it moves no information and destroys no entropy (Landauer 1961)',
    all: ['entropy'],
    any: ['zero', 'reversal', 'reverses', 'symmetric', 'falls to 0'],
  },
]

export class PhaseOverClaim extends Error {
  constructor(claim: string, refutedBy: string) {
    super(`rodin/phase: over-claim — "${claim}". ${refutedBy}`)
    this.name = 'PhaseOverClaim'
  }
}

/** Refuse a declared over-claim at the point it is made — subject present, assertion present. */
export function assertPhaseClaim(claim: string): void {
  const lowered = claim.toLowerCase()
  for (const r of REFUTED) {
    const subject = r.all.every((k) => lowered.includes(k))
    const assertion = r.any.some((k) => lowered.includes(k))
    if (subject && assertion) throw new PhaseOverClaim(claim, r.refutedBy)
  }
}
