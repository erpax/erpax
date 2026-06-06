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
import { massOf, heaviest } from '@/gravity'
import { singularity, isEventHorizon, type Singularity } from '@/singularity'

/** Mass = entanglement: an atom's gravitational mass IS its link-entanglement (ER=EPR; the in-link is one edge). */
export const entanglementMass = (atom: string): number => massOf(atom)

// The singularity (the gravity well closing to ∞ — the event horizon) lives in its own
// atom by gravity-pull; re-exported here as the ER=EPR view (mass = entanglement at the well).
export { singularity, isEventHorizon, type Singularity }

if (import.meta.url === 'file://' + process.argv[1]) {
  const s = singularity()
  console.log('quantum/gravity — ER=EPR (mass = entanglement):')
  console.log('  singularity (the gravity well): ' + s.atom + '  mass/entanglement=' + s.mass + '  curvature=' + s.curvature.toFixed(3))
  console.log('  tamper-cost at the horizon (no gap): ' + (s.tamperCostLog2 === Infinity ? '∞ (event horizon)' : s.tamperCostLog2.toFixed(1)))
  console.log('  heaviest (most-entangled) atoms:')
  for (const h of heaviest(5)) console.log('    ' + h.atom.padEnd(14) + ' mass ' + h.mass)
}
