/**
 * millennium/correspondence — what physics says about the open problems, and why none of it is a proof.
 *
 * [[millennium]] names the seven problems and refuses to solve them. What it did not carry is the
 * question people actually arrive with: **string theory is said to bear on these — does it?**
 *
 * It does, in one direction and one only: a physical duality can *predict* a mathematical statement,
 * and mathematicians can then prove that statement by their own means. Mirror symmetry is the real
 * instance — a string-theoretic argument produced enumerative predictions for the quintic threefold
 * (Candelas–de la Ossa–Green–Parkes 1991) that were later **proved** (Givental 1996; Lian–Liu–Yau
 * 1997). That is a genuine, documented case of physics generating a theorem.
 *
 * What never happens is the reverse: **a correspondence is not a proof of the problem it corresponds
 * to.** AdS/CFT is itself a conjecture; a numerical spectrum is not a construction; matching
 * statistics do not locate a zero. Every row below therefore carries `establishes` (what is really
 * known) beside `notProof` (the precise gap that remains), because a correspondence stated without
 * its gap reads as a solution.
 *
 * ## And the security question, answered plainly
 *
 * `bearsOnSecurity` is **false in every row**, and it is not a hedge. Cryptographic hardness rests on
 * lattice problems (module-LWE, module-SIS — what ML-KEM and ML-DSA reduce to), on factoring, and on
 * discrete logarithms. No result in any of these programmes constrains the difficulty of those
 * problems. The lattice mathematics that *does* touch security — the hexagonal ring in
 * [[rodin]]/phase, sphere packing in dimensions 8 and 24 (Viazovska 2016; Cohn–Kumar–Miller–
 * Radchenko–Viazovska 2017) — are proven theorems about **packing density**, which is not a hardness
 * result either. Density bounds and computational hardness are different questions.
 *
 * So the honest answer to *"use string theory to increase security"* is that there is nothing to use,
 * and `assertSecurityClaim` refuses the claim rather than producing a plausible sentence about it —
 * exactly what [[anchor]]/claims does for the post-quantum surfaces.
 *
 * @law a correspondence predicts; it does not prove. A physical duality may generate a mathematical
 *      statement, and only a mathematical proof settles it — and none of them bears on cryptographic
 *      hardness, which rests on lattice, factoring and discrete-log problems.
 * @invariant every row states its notProof gap — a correspondence without one reads as a solution
 * @invariant bearsOnSecurity is false in every row, and a claim otherwise is refused
 * @invariant the one PROVEN physics-to-mathematics result is marked, and it does not settle its problem
 * @standard ISO 80000-2 — mathematical signs and symbols
 * @see ./SKILL.md -- ../index.ts -- ../../anchor/claims
 */

/** A physics programme said to bear on a Millennium Problem. */
export interface Correspondence {
  /** must name a problem in the millennium register */
  readonly problem: string
  /** the programme, with its primary citation */
  readonly programme: string
  /** what is genuinely established by it */
  readonly establishes: string
  /** the precise gap that remains — never empty, or the row reads as a solution */
  readonly notProof: string
  /** true only where the physics produced a statement later PROVED by mathematics */
  readonly producedATheorem: boolean
  /** false everywhere — declared per row so the claim is refuted individually, not waved away */
  readonly bearsOnSecurity: false
}

export const CORRESPONDENCES: readonly Correspondence[] = [
  {
    problem: 'Yang–Mills existence & mass gap',
    programme: 'gauge/gravity duality (Maldacena 1997) and lattice gauge theory',
    establishes:
      'strong physical and numerical evidence that confining gauge theories have a positive mass gap — lattice computations give a glueball spectrum bounded away from zero',
    notProof:
      'the problem demands a rigorous construction of quantum Yang–Mills on ℝ⁴ satisfying the Osterwalder–Schrader axioms, plus a proof that Δ > 0. The duality is itself an unproven conjecture and is stated for a supersymmetric theory in a different geometry; lattice results are numerical at finite spacing and finite volume',
    producedATheorem: false,
    bearsOnSecurity: false,
  },
  {
    problem: 'Navier–Stokes existence & smoothness',
    programme: 'the fluid/gravity correspondence (Bhattacharyya–Hubeny–Minwalla–Rangamani 2008)',
    establishes:
      'relativistic hydrodynamics arises as the long-wavelength limit of a gravity dual, giving transport coefficients from geometry',
    notProof:
      'a different equation — relativistic and conformal — derived inside an unproven duality. Global regularity of the 3D incompressible equations is untouched: no a-priori bound follows',
    producedATheorem: false,
    bearsOnSecurity: false,
  },
  {
    problem: 'Riemann Hypothesis',
    programme: 'the Hilbert–Pólya spectral programme; Montgomery–Dyson pair correlation; Connes’ trace formula',
    establishes:
      'the spacings of the zeros match random-matrix (GUE) statistics numerically to high precision — a real structural correspondence with quantum chaos',
    notProof:
      'no self-adjoint operator whose spectrum is the set of zeros has been constructed. Statistics of a set do not locate it, and a matching distribution constrains no individual zero',
    producedATheorem: false,
    bearsOnSecurity: false,
  },
  {
    problem: 'Hodge Conjecture',
    programme: 'mirror symmetry (Candelas–de la Ossa–Green–Parkes 1991)',
    establishes:
      'THE genuine case: a string-theoretic argument predicted the enumerative invariants of the quintic threefold, and those predictions were later PROVED by mathematics (Givental 1996; Lian–Liu–Yau 1997)',
    notProof:
      'it concerns variations of Hodge structure and Gromov–Witten invariants — not the rationality of Hodge classes. The conjecture itself is untouched, so even the strongest instance of physics-produces-theorem does not settle its own problem',
    producedATheorem: true,
    bearsOnSecurity: false,
  },
  {
    problem: 'P vs NP',
    programme: 'quantum computation',
    establishes:
      'nothing about the separation. BQP is not known to contain NP; Grover gives a quadratic speedup, which does not collapse the classes',
    notProof:
      'a physical device does not settle a complexity-class separation. A lower bound is a mathematical object, and building a machine produces none',
    producedATheorem: false,
    bearsOnSecurity: false,
  },
]

/** Every problem in the register that has NO physics correspondence worth stating. */
export const NO_CORRESPONDENCE: readonly string[] = ['Birch–Swinnerton-Dyer', 'Poincaré Conjecture']

/** The rows where physics produced a statement mathematics later proved. Exactly one. */
export function producedTheorems(): readonly Correspondence[] {
  return CORRESPONDENCES.filter((c) => c.producedATheorem)
}

/** The rows that bear on cryptographic security. None — and the emptiness is the finding. */
export function securityBearing(): readonly Correspondence[] {
  return CORRESPONDENCES.filter((c) => c.bearsOnSecurity)
}

/** What cryptographic hardness actually rests on, so the refusal names the alternative. */
export const HARDNESS_RESTS_ON: readonly string[] = [
  'module-LWE and module-SIS (ML-KEM, ML-DSA)',
  'integer factorisation',
  'discrete logarithms',
  'hash-function preimage and collision resistance (SLH-DSA)',
]

export class CorrespondenceOverClaim extends Error {
  constructor(claim: string, why: string) {
    super(`millennium/correspondence: over-claim — "${claim}". ${why}`)
    this.name = 'CorrespondenceOverClaim'
  }
}

/**
 * Refuse the two claims this atom exists to refuse: that a correspondence solves its problem, and
 * that any of it strengthens cryptography.
 */
export function assertCorrespondenceClaim(claim: string): void {
  const lowered = claim.toLowerCase()
  const physics = /string theory|ads\/cft|ads-cft|holograph|duality|mirror symmetry|quantum comput/.test(lowered)
  if (physics && /solves|proves|proof of|settles|resolves/.test(lowered)) {
    throw new CorrespondenceOverClaim(
      claim,
      'a correspondence predicts; it does not prove. Every row states the gap that remains, and the one case where physics produced a theorem (mirror symmetry) still does not settle its own problem',
    )
  }
  if (physics && /secur|crypto|encrypt|unbreakable|harden/.test(lowered)) {
    throw new CorrespondenceOverClaim(
      claim,
      `no result here constrains the problems cryptographic hardness rests on — ${HARDNESS_RESTS_ON.join(' · ')}. Sphere-packing theorems in dimensions 8 and 24 are proven, and packing density is not a hardness result either`,
    )
  }
}

/** @index-cross.foldback child=millennium/correspondence parent=millennium — this cross folds back into its parent. */
