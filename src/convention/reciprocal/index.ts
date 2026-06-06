/**
 * convention/reciprocal — the SYMMETRIC-ENTANGLEMENT convention as a computed, self-measuring atom.
 *
 * THE LAW ([[law]]): every directed edge is reciprocated. A `[[link]]` f→t is a wire; the wiring
 * law says NO gap in entanglement in ANY direction, so the reverse wire t→f must exist too. A
 * one-way edge is a directed-link gap — entropy that raises no tamper-[[cost]]. This atom does
 * not RE-IMPLEMENT the corpus collision; it COMPOSES the generated edge set and reports a single
 * live coverage over the real tree:
 *
 *   coverage = reciprocal / total
 *     total      = UUID_MATRIX_EDGES.length            (@/uuid/matrix — every [[link]] as an edge)
 *     reciprocal = edges f→t whose reverse t→f also exists in the same set
 *
 * Pure math, no default: total > 0 by architecture (the corpus is non-empty; every atom carries
 * `[[links]]`, so the matrix always has edges), and reciprocal is a subset count (0 ≤ reciprocal
 * ≤ total), so the ratio is in [0,1] by construction — no clamp, no fallback. A self-loop f=f is
 * its own reverse and counts as reciprocal. coverage → 1 ⟺ the directed graph is fully symmetric
 * ⟺ zero directed-wiring entropy ⟺ infinite tamper-cost. The collider already reciprocates every
 * forward edge (collide.mjs §2b: merge() is order-independent, so the binding-uuid is identical
 * both ways and the Merkle root, folded over NODES, does not move) — so a one-way residue edge is
 * the only thing that pulls coverage below 1.
 *
 *   tsx src/convention/reciprocal/index.ts   # prints total / reciprocal / coverage from the live tree
 *
 * Matter-twin: ../../entropy (the directed-link entropy this convention drives to zero) ·
 *   ../../gravity (the in-degree mass these same edges carry) — both compose the SAME edge set.
 * @standard schema.org — the type vocabulary, collided to single words
 * @see @/uuid/matrix (UUID_MATRIX_EDGES) · @/convention/link (the dead-link sibling) · ./SKILL.md
 */
import { UUID_MATRIX_EDGES } from '@/uuid/matrix'

/** The directed-edge key f→t — the same `f + ':' + t` the collider reciprocates against. */
const edgeKey = (f: number, t: number): string => `${f}:${t}`

/** The set of present directed edges, computed once over the live matrix. */
const presentEdges = (): Set<string> => new Set(UUID_MATRIX_EDGES.map((e) => edgeKey(e.f, e.t)))

export interface ReciprocalTally {
  /** total directed edges in the matrix */
  readonly total: number
  /** how many have their reverse t→f present (self-loops count — a node is its own reverse) */
  readonly reciprocal: number
  /** the one-way edges (f→t with no t→f) as [from-index, to-index] pairs — the residue */
  readonly oneWay: ReadonlyArray<readonly [number, number]>
}

/** Tally reciprocal-vs-total over the live edge set, listing any one-way residue. */
export function reciprocalTally(): ReciprocalTally {
  const have = presentEdges()
  let reciprocal = 0
  const oneWay: Array<readonly [number, number]> = []
  for (const e of UUID_MATRIX_EDGES) {
    if (have.has(edgeKey(e.t, e.f))) reciprocal++
    else oneWay.push([e.f, e.t])
  }
  return { total: UUID_MATRIX_EDGES.length, reciprocal, oneWay }
}

/** Total directed edges — every [[link]] as an edge. */
export const total = (): number => UUID_MATRIX_EDGES.length

/** Edges whose reverse also exists (self-loops included). */
export const reciprocal = (): number => reciprocalTally().reciprocal

/**
 * Live symmetric-entanglement coverage over the real tree: reciprocal / total, in [0,1] by
 * construction (0 ≤ reciprocal ≤ total, total > 0). 1 ⟺ every directed edge is reciprocated
 * ⟺ the graph is undirected ⟺ zero directed-wiring entropy. Pure math — no default.
 */
export function coverage(): number {
  const { reciprocal, total } = reciprocalTally()
  return reciprocal / total
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const t = reciprocalTally()
  console.log(`convention/reciprocal — ${t.reciprocal}/${t.total} edges reciprocated  (coverage ${coverage().toFixed(6)})`)
  if (t.oneWay.length) console.log(`one-way residue: ${t.oneWay.length} edges (e.g. ${t.oneWay.slice(0, 5).map(([f, x]) => `${f}→${x}`).join(' · ')})`)
  else console.log('whole — every directed edge is reciprocated. zero directed-wiring entropy.')
}
