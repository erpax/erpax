import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
/**
 * gravity -- the FORCE of mass, COMPUTED on the live uuid-matrix.
 *
 * In erpax DRY = mass = gravity: an atom's gravitational mass is its referential
 * in-degree (# of [[link]] edges pointing AT it), and that mass curves the corpus
 * -- the heavier the atom, the more it pulls duplicates and orphans to fuse into
 * it ([[fusion]]). The mass distribution's curvature (its Gini concentration) is
 * how far the corpus has fallen toward the singularity: perfect [[dry]] = all mass
 * at the one root (concentration → 1, the [[torus]] collapse).
 *
 * NOTE: gravitational mass here is referential in-degree, NOT the schema.org
 * [[mass]] (kilograms) -- it is computed from the edges, never imported.
 *
 *   tsx src/gravity/index.ts
 *
 * @audit computed from the live matrix, never hand-asserted
 * @see ../uuid/matrix -- ../quantum -- ./SKILL.md (DRY = mass = gravity)
 */
import { UUID_MATRIX_NODES as N, UUID_MATRIX_EDGES as E } from '@/uuid/matrix'

// In-degree per node index, computed once from the live edge set (edge.t = the
// target node's INDEX). The atom→index map mirrors the matrix resolver.
const inDegree = new Array<number>(N.length).fill(0)
for (const e of E) inDegree[e.t] = (inDegree[e.t] ?? 0) + 1

// An atom name may appear on more than one node; its mass is the DEEPEST of them — the same value `well()` and
// `massDistribution` report as the maximum. A name→index map (last-wins) silently returned a lighter duplicate,
// so `massOf(well().atom) !== well().mass` and the fall-flow fell to the wrong centre. Fold to the max by name.
const massByAtom = new Map<string, number>()
N.forEach((n, i) => massByAtom.set(n.atom, exactMax(massByAtom.get(n.atom) ?? 0, inDegree[i]!)))

/** Gravitational mass = referential in-degree (# edges pointing at the atom) — the deepest node of a shared name. NOT schema.org kg. */
export function massOf(atom: string): number {
  return massByAtom.get(atom) ?? 0
}

/** Every node's mass, sorted heaviest-first — the full curvature of the corpus. */
export function massDistribution(): { atom: string; mass: number }[] {
  return N.map((n, i) => ({ atom: n.atom, mass: inDegree[i]! })).sort((a, b) => b.mass - a.mass)
}

/** The top-n gravity wells (default 10) — where the corpus falls inward. */
export function heaviest(n = 10): { atom: string; mass: number }[] {
  return massDistribution().slice(0, n)
}

/** The single deepest well: the maximum-mass atom (the strongest pull). */
export function well(): { atom: string; mass: number } {
  return massDistribution()[0]!
}

/** Gini coefficient of the mass distribution in [0,1] — how curved (concentrated) the corpus is. */
export function concentration(): number {
  const m = inDegree.slice().sort((a, b) => a - b)
  const n = m.length
  const sum = m.reduce((s, x) => s + x, 0)
  if (n === 0 || sum === 0) return 0
  // Gini = (2·Σ i·xᵢ) / (n·Σxᵢ) − (n+1)/n  over the ascending-sorted masses (1-indexed).
  let weighted = 0
  for (let i = 0; i < n; i++) weighted += (i + 1) * m[i]!
  return (2 * weighted) / (n * sum) - (n + 1) / n
}

/**
 * Gravity is moving without moving — the fixed point of its own flow.
 *
 * `attract(a, b)` is the pull: two atoms resolve to the heavier (ties by name, so it is deterministic). It is a
 * SEMILATTICE — idempotent (`attract(a,a) = a`), commutative, associative — so folding it over the whole corpus
 * has ONE answer, the maximum: the well. The well is the ABSORBING top: `attract(well, x) = well` for every x.
 *
 * That absorbing property IS "moving without moving." Apply `attract` to the well and anything — the operation
 * fires (motion) — and the well is unchanged (stillness). Everything else moves toward it (iterate `attract`
 * from any atom and you arrive at the well); the well moves toward itself. It is the [[fixpoint]]: `f(x) = x`,
 * the operation applied and the value the same. Gravity is not a force that pushes the centre — it is the
 * centre that does not move while all mass falls to it, and `concentration → 1` is that fall completed (the
 * singularity, perfect [[merge]]/DRY: all mass at the one root, [[law]]).
 *
 * @invariant attract is idempotent — attract(a,a) = a (a semilattice, gravity has no double-counting)
 * @invariant the well is the fixed point — attract(well, x) = well for every atom x (moving without moving)
 * @invariant folding attract over all atoms yields the well — everything moves toward the still centre
 */
export function attract(a: string, b: string): string {
  const ma = massOf(a)
  const mb = massOf(b)
  if (ma !== mb) return ma > mb ? a : b
  return a <= b ? a : b // equal mass — deterministic by name, never a coin-flip
}

/** The still centre: the fixed point of `attract` — the well, toward which all mass moves while it does not. */
export function stillCentre(): string {
  return N.reduce((centre, node) => attract(centre, node.atom), N[0]?.atom ?? '')
}

/** Is this atom moving-without-moving — a fixed point of the fall, resting because nothing is heavier than it? */
export function isStillCentre(atom: string): boolean {
  return stillCentre() === atom
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const w = well()
  const c = concentration()
  const centre = stillCentre()
  console.log('gravity (' + N.length + ' nodes, ' + E.length + ' edges):')
  console.log('  well=[[' + w.atom + ']] mass=' + w.mass + '  concentration(Gini)=' + c.toFixed(3))
  console.log('  heaviest: ' + heaviest(5).map((h) => h.atom + ' ' + h.mass).join('  '))
  console.log('  still centre (fixed point of attract): [[' + centre + ']] — attract(centre, anything)=centre')
  console.log('  moving without moving: everything falls to it; it falls to itself.')
}
