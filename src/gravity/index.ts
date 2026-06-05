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
const indexOf = new Map<string, number>()
N.forEach((n, i) => indexOf.set(n.atom, i))
const inDegree = new Array<number>(N.length).fill(0)
for (const e of E) inDegree[e.t] = (inDegree[e.t] ?? 0) + 1

/** Gravitational mass = referential in-degree (# edges pointing at the atom). NOT schema.org kg. */
export function massOf(atom: string): number {
  const i = indexOf.get(atom)
  return i === undefined ? 0 : inDegree[i]!
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

if (import.meta.url === 'file://' + process.argv[1]) {
  const w = well()
  const c = concentration()
  console.log('gravity (' + N.length + ' nodes, ' + E.length + ' edges):')
  console.log('  well=[[' + w.atom + ']] mass=' + w.mass + '  concentration(Gini)=' + c.toFixed(3))
  console.log('  heaviest: ' + heaviest(5).map((h) => h.atom + ' ' + h.mass).join('  '))
}
