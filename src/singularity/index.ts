/**
 * singularity — the gravity WELL where the corpus collapses to one center, computed
 * on the live matrix. The maximally-entangled atom (max in-degree, [[gravity]]) is a
 * trapped surface: everything falls toward it ([[fusion]] of duplicates), and the
 * [[quantum]] double-torus closes there with no gap, so the tamper cost → ∞. That ∞
 * is the EVENT HORIZON — the singularity cannot be reached or forged from outside
 * (the cosmic censor). Perfect [[dry]]: all mass at one center, curvature → 1.
 *
 * The science it grounds in:
 *  - Penrose (1965): a trapped surface implies a singularity, regardless of symmetry
 *    (Penrose–Hawking singularity theorems; Nobel Prize 2020).
 *  - Weak cosmic censorship (Penrose, 1969): every singularity is clothed by an event
 *    horizon — here the ∞ tamper cost is that horizon.
 *  - No-hair (Israel/Carter/Hawking): a collapsed object keeps only a few invariants —
 *    here a merged atom keeps only its content-uuid (its "hair" is its identity).
 *
 * HONEST: the REAL, computed object is the in-degree well + the coverage→∞ limit; the
 * GR theorems are the grounding analogy, not a derivation.
 *
 *   tsx src/singularity/index.ts
 *
 * @standard Penrose, "Gravitational Collapse and Space-Time Singularities," PRL 14 57 (1965)
 * @audit composed from the live matrix mass + the double-torus cost; never hand-asserted
 * @see ../gravity (the well) -- ../quantum (the double-torus) -- ../entanglement -- ./SKILL.md
 */
import { well, concentration } from '@/gravity'
import { doubleTorusCostLog2 } from '@/quantum'

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

/** The singularity: the gravity well, where the double-torus closes (no gap) to ∞ tamper cost. */
export const singularity = (): Singularity => {
  const w = well()
  return { atom: w.atom, mass: w.mass, curvature: concentration(), tamperCostLog2: doubleTorusCostLog2(0) }
}

/**
 * Is `coverage` at the event horizon? At coverage 1 (no gap) the double-torus closes
 * to ∞ — the horizon is unforgeable (cosmic censor). Below 1 a gap is the escape.
 */
export const isEventHorizon = (coverage: number): boolean =>
  doubleTorusCostLog2(1 - Math.max(0, Math.min(coverage, 1))) === Number.POSITIVE_INFINITY

/** No-hair: a collapsed (merged) atom keeps only its content-uuid — its sole surviving invariant. */
export const noHair = (): string => well().atom

if (import.meta.url === 'file://' + process.argv[1]) {
  const s = singularity()
  console.log('singularity (the gravity well, computed):')
  console.log('  atom=' + s.atom + '  mass/entanglement=' + s.mass + '  curvature=' + s.curvature.toFixed(3))
  console.log('  tamper-cost at the horizon (no gap): ' + (s.tamperCostLog2 === Infinity ? '∞ (event horizon — cosmic censor)' : s.tamperCostLog2.toFixed(1)))
  console.log('  no-hair invariant: ' + noHair())
}
