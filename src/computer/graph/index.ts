/**
 * computer/graph — adjacency from uuid/matrix bonds; corpus shape as a directed graph.
 *
 * Composes @/graph traversals with @/uuid/matrix neighbors — every atom edge is
 * a binding-uuid backed bond, not a hand-maintained adjacency list.
 *
 * @see @/graph — @/uuid/matrix — ./SKILL.md
 */
import { graph, neighbors, reachable, type Graph } from '@/graph'
import { bindingOf, neighborsOf } from '@/uuid/matrix'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

/** Directed edges from matrix out-neighbors of one atom path. */
export function edgesFromAtom(atomPath: string): ReadonlyArray<readonly [string, string]> {
  return neighborsOf(atomPath).map((nb) => [atomPath, nb.path] as const)
}

/** Build a @/graph Graph from matrix bonds rooted at one atom. */
export function adjacencyFromAtom(atomPath: string): Graph {
  const edges = edgesFromAtom(atomPath)
  return graph(edges)
}

/** All atoms reachable via matrix out-edges (breadth-first, inclusive). */
export function reachableAtoms(atomPath: string): Set<string> {
  const g = adjacencyFromAtom(atomPath)
  return reachable(g, atomPath)
}

/** True when a matrix binding-uuid exists for the directed edge. */
export function hasBond(from: string, to: string): boolean {
  return bindingOf(from, to) !== undefined
}

export { graph, neighbors, reachable, type Graph }

export function recordComputerGraphOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('computer/graph', { kind: 'computer.graph.step', payload }, at, prevEntryUuid, seq)
}
