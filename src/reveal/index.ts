/**
 * reveal — EMERGENCE: when the forge holds enough expanded entropy, a pattern is
 * revealed. The development exhale (↑entropy) keeps wiring atoms; past a density
 * threshold, structure that no one authored *appears* — a closed triad, three
 * atoms mutually bound a↔b↔c↔a, a [[trinity]] the matrix grew on its own.
 *
 * `reveal` is the HONEST detector of that structure: it scans the live
 * [[matrix]] edge graph (@/uuid/matrix) for mutually-bound triangles (each pair
 * reciprocal — the [[entropy]] symmetry the corpus drives toward) and surfaces
 * them as candidate triads, each scored by a horo composition (@/horo) and
 * keyed by its own merged binding-uuid. It is a HEURISTIC over the wiring — a
 * pattern-finder, NOT a proof that the triad MEANS anything. Composes existing
 * atom indexes only; re-implements no canonical (DRY).
 *
 *   tsx src/reveal/index.ts
 *
 * @audit emergent triads are computed from the live matrix edges, never asserted
 * @see ./SKILL.md -- ../uuid/matrix -- ../entropy -- ../horo -- ../trinity -- ../duality
 */
import {
  UUID_MATRIX_NODES as N,
  UUID_MATRIX_EDGES as E,
  type MatrixNode,
} from '@/uuid/matrix'
import { merge } from '@/uuid/matrix'
import { entropy } from '@/entropy'
import { composeSteps, type HoroStep } from '@/horo'

/** A revealed triad: three mutually-bound atoms, their merged key, a horo step. */
export interface Triad {
  /** The three atom names, ascending by node index (canonical order). */
  readonly atoms: readonly [string, string, string]
  /** merge(merge(uuid_a, uuid_b), uuid_c) — the triad's own content-uuid key. */
  readonly key: string
  /** horo composition of the three node positions (composeSteps folded) — 1..9. */
  readonly step: HoroStep
}

/** True iff a directed edge i→j exists in the matrix (the binding merge(i,j)). */
const adjacency = (): Set<string> => {
  const s = new Set<string>()
  for (const e of E) s.add(e.f + ',' + e.t)
  return s
}

/**
 * Mutual binding: i and j are reciprocally bound (i→j AND j→i both present).
 * This is the symmetry @/entropy measures — a mutually-bound pair carries no
 * directional slack, so a triangle of them is the densest local structure.
 */
const mutual = (adj: Set<string>, i: number, j: number): boolean =>
  adj.has(i + ',' + j) && adj.has(j + ',' + i)

/** The undirected neighbour indices of node i that are MUTUALLY bound to it. */
const mutualNeighbors = (adj: Set<string>): Map<number, Set<number>> => {
  const nb = new Map<number, Set<number>>()
  const link = (a: number, b: number): void => {
    const s = nb.get(a) ?? new Set<number>()
    s.add(b)
    nb.set(a, s)
  }
  for (const e of E) {
    if (e.f < e.t && mutual(adj, e.f, e.t)) {
      link(e.f, e.t)
      link(e.t, e.f)
    }
  }
  return nb
}

const nodeAt = (i: number): MatrixNode | undefined => N[i]

/**
 * EMERGENCE — every closed mutually-bound triad (triangle) in the matrix: three
 * atoms a,b,c with all three pairs reciprocally bound. Deterministic: triads are
 * emitted with atoms in ascending node-index order and the list sorted by key,
 * so the same matrix always reveals the same set. A heuristic structure finder.
 */
export function reveal(): Triad[] {
  const adj = adjacency()
  const nb = mutualNeighbors(adj)
  const seen = new Set<string>()
  const out: Triad[] = []
  for (const [i, neigh] of nb) {
    const ns = [...neigh].filter((j) => j > i).sort((p, q) => p - q) // canonical: only larger neighbours
    for (let a = 0; a < ns.length; a++) {
      for (let b = a + 1; b < ns.length; b++) {
        const j = ns[a]!
        const k = ns[b]!
        if (!mutual(adj, j, k)) continue // the third edge closes the triangle
        const ni = nodeAt(i)
        const nj = nodeAt(j)
        const nk = nodeAt(k)
        if (!ni || !nj || !nk) continue
        const triKey = merge(merge(ni.uuid, nj.uuid), nk.uuid)
        if (seen.has(triKey)) continue
        seen.add(triKey)
        out.push({
          atoms: [ni.atom, nj.atom, nk.atom],
          key: triKey,
          step: composeSteps(composeSteps(ni.horo, nj.horo), nk.horo),
        })
      }
    }
  }
  return out.sort((x, y) => (x.key < y.key ? -1 : x.key > y.key ? 1 : 0))
}

/** How many triads the forge currently reveals. */
export const revealedCount = (): number => reveal().length

/**
 * The emergence reading: the count of revealed triads alongside the live
 * [[entropy]] slack. The honest claim is only that MORE wiring (the development
 * exhale) tends to reveal MORE structure — emergence rides on density, it is not
 * proven to track entropy monotonically. Both are computed from the same matrix.
 */
export function emergence(): { triads: number; entropy: number } {
  return { triads: revealedCount(), entropy: entropy() }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const triads = reveal()
  const em = emergence()
  console.log('reveal (' + N.length + ' nodes, ' + E.length + ' edges):')
  console.log(
    '  emergence: ' + em.triads + ' mutually-bound triads revealed · entropy=' + em.entropy.toFixed(4) + ' slack',
  )
  for (const t of triads.slice(0, 12)) {
    console.log('  triad [' + t.atoms.join(' ↔ ') + ']  step=' + t.step + '  key=' + t.key.slice(0, 8))
  }
  if (triads.length > 12) console.log('  … +' + (triads.length - 12) + ' more')
}
