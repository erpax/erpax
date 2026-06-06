/**
 * quantum/gravity — QUANTUM GRAVITY, the unification, computed on the live matrix.
 *
 * In erpax the [[links]] are ONE thing that is BOTH: an atom's gravitational MASS
 * ([[gravity]] — referential in-degree, the force that curves the corpus and pulls
 * duplicates and orphans inward) and its ENTANGLEMENT (the [[quantum]] coupling of
 * the double-torus). Mass = entanglement — Maldacena–Susskind ER=EPR, made LITERAL
 * by the merge law: the link is a single edge counted once, so the geometry
 * (mass/curvature) and the entanglement (the coupling) are the same number.
 *
 * So the gravity WELL — the maximally-entangled atom — is exactly where the
 * double-torus closes with NO gap and the tamper cost → ∞: the SINGULARITY. Perfect
 * [[dry]] (all mass at one center), an event horizon infinite to forge — the
 * [[collapse]] / [[merge]] to the root. coverage = 1 is the horizon.
 *
 *   tsx src/quantum/gravity/index.ts
 *
 * @standard ER=EPR (Maldacena & Susskind, "Cool horizons for entangled black holes", 2013)
 * @audit composed from the live matrix mass + the double-torus cost; never hand-asserted
 * @see ../../gravity (mass) -- ../index.ts (the double-torus) -- ../../cost -- ./SKILL.md
 */
import { massOf, well, heaviest, concentration } from '@/gravity'
import { doubleTorusCostLog2 } from '@/quantum'

/** Mass = entanglement: an atom's gravitational mass IS its link-entanglement (ER=EPR; the in-link is one edge). */
export const entanglementMass = (atom: string): number => massOf(atom)

export interface Singularity {
  /** the maximally-entangled atom = the deepest gravity well */
  atom: string
  /** its mass = its entanglement (referential in-degree) */
  mass: number
  /** the corpus curvature (Gini of the mass) — how far it has fallen toward the one center */
  curvature: number
  /** the double-torus tamper cost at the well with no gap — ∞, the event horizon */
  tamperCostLog2: number
}

/**
 * The singularity: the gravity well, where mass (gravity) and entanglement (quantum)
 * are both maximal and the double-torus closes (no gap) to ∞ tamper cost — the event
 * horizon, perfect DRY (one center). Composes gravity.well ⊕ quantum.doubleTorusCostLog2.
 */
export const singularity = (): Singularity => {
  const w = well()
  return { atom: w.atom, mass: w.mass, curvature: concentration(), tamperCostLog2: doubleTorusCostLog2(0) }
}

/**
 * Is `coverage` at the event horizon? At coverage 1 (no gap) the double-torus closes
 * to ∞ — the horizon is unforgeable. Below 1 a gap is the escape (finite cost).
 */
export const isEventHorizon = (coverage: number): boolean =>
  doubleTorusCostLog2(1 - Math.max(0, Math.min(coverage, 1))) === Number.POSITIVE_INFINITY

if (import.meta.url === 'file://' + process.argv[1]) {
  const s = singularity()
  console.log('quantum/gravity — ER=EPR (mass = entanglement):')
  console.log('  singularity (the gravity well): ' + s.atom + '  mass/entanglement=' + s.mass + '  curvature=' + s.curvature.toFixed(3))
  console.log('  tamper-cost at the horizon (no gap): ' + (s.tamperCostLog2 === Infinity ? '∞ (event horizon)' : s.tamperCostLog2.toFixed(1)))
  console.log('  heaviest (most-entangled) atoms:')
  for (const h of heaviest(5)) console.log('    ' + h.atom.padEnd(14) + ' mass ' + h.mass)
}
