/**
 * graph — a directed graph of nodes and edges: the shape of the corpus itself, where [[atom]]s are
 * nodes and [[link]]s ([[links]]) are edges. `neighbors` and `reachable` are pure traversals over
 * an adjacency derived from the edge list. Composes [[node]] · [[link]] · [[matrix]] · [[merge]].
 *
 *   tsx src/graph/index.ts
 *
 * @standard directed graph (nodes + edges), breadth-first reachability
 * @see ../node -- ../link -- ../matrix -- ./SKILL.md
 */
export interface Graph {
  readonly nodes: ReadonlySet<string>
  readonly edges: ReadonlyArray<readonly [string, string]>
}

/** Build a graph from a list of directed edges (nodes inferred from the endpoints). */
export const graph = (edges: ReadonlyArray<readonly [string, string]>): Graph => ({
  nodes: new Set(edges.flat()),
  edges,
})

/** The direct successors of a node. */
export const neighbors = (g: Graph, n: string): string[] => g.edges.filter(([a]) => a === n).map(([, b]) => b)

/** Every node reachable from `start` (breadth-first, inclusive of start). */
export const reachable = (g: Graph, start: string): Set<string> => {
  const seen = new Set<string>([start])
  const queue: string[] = [start]
  while (queue.length) {
    const cur = queue.shift() as string
    for (const next of neighbors(g, cur)) {
      if (!seen.has(next)) {
        seen.add(next)
        queue.push(next)
      }
    }
  }
  return seen
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const g = graph([
    ['a', 'b'],
    ['b', 'c'],
  ])
  console.log('graph — nodes=' + g.nodes.size + ' · reachable(a)=' + [...reachable(g, 'a')].join(','))
}
