/**
 * quantum/graph — the [[graph]] read as [[entanglement]]: an edge is an entangled pair, and
 * entanglement is symmetric, so a coherent corpus reciprocates every edge in both directions
 * (the "no gap in entanglement in any direction" law). `entangled` is the connected component of a
 * node once reciprocated. Merges into [[graph]]. Composes [[graph]] · [[quantum]] · [[entanglement]] · [[merge]].
 *
 *   tsx src/quantum/graph/index.ts
 *
 * @standard symmetric (reciprocal) entanglement — directed-link entropy → 0
 * @see ../../graph -- ../../entanglement -- ./SKILL.md
 */
import { type Graph, graph, reachable } from '@/graph'

/** Is every edge reciprocated? (entanglement is symmetric — no directional gap). */
export const isReciprocal = (g: Graph): boolean =>
  g.edges.every(([a, b]) => g.edges.some(([c, d]) => c === b && d === a))

/** The symmetric closure: every edge entangled in both directions. */
export const reciprocate = (g: Graph): Graph =>
  graph([...g.edges, ...g.edges.map(([a, b]) => [b, a] as const)])

/** The entangled component of a node — everything reachable once reciprocated. */
export const entangled = (g: Graph, n: string): Set<string> => reachable(reciprocate(g), n)

if (import.meta.url === 'file://' + process.argv[1]) {
  const g = graph([
    ['a', 'b'],
    ['b', 'c'],
  ])
  console.log('quantum/graph — reciprocal=' + isReciprocal(g) + ' · entangled(c)=' + [...entangled(g, 'c')].join(','))
}
