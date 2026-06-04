/**
 * uuid-matrix — the stable query surface over the generated corpus matrix.
 *
 * The matrix (./matrix.generated.ts, built by `pnpm matrix:generate`) is every
 * atom as a v8 content-uuid (node) and every [[link]] as a merge(from,to)
 * binding-uuid (edge), tagged by structural dimension + harmonic direction. The
 * data is generated; this barrel is the hand-authored, stable API over it so
 * callers query atoms/edges/bindings without touching the raw arrays.
 *
 * @see ./matrix.generated.ts (the data) · src/services/uuid-matrix/collide.mjs (the collider)
 */
import {
  UUID_MATRIX_NODES,
  UUID_MATRIX_EDGES,
  UUID_MATRIX_ROOT,
  UUID_MATRIX_DIMS,
  type MatrixNode,
  type MatrixEdge,
} from '@/uuid/matrix/matrix.generated'

export { UUID_MATRIX_NODES, UUID_MATRIX_EDGES, UUID_MATRIX_ROOT, UUID_MATRIX_DIMS }
export type { MatrixNode, MatrixEdge }

/** Mirror the aura/collider resolver so callers can pass any link spelling. */
const norm = (s: string): string => s.toLowerCase().replace(/[-_]/g, '')

const byAtom = new Map<string, number>()
UUID_MATRIX_NODES.forEach((n, i) => byAtom.set(n.atom, i))

const at = (i: number): MatrixNode | undefined => UUID_MATRIX_NODES[i]
const isNode = (n: MatrixNode | undefined): n is MatrixNode => n !== undefined

/** The node for an atom (any spelling), or undefined. */
export const nodeOf = (atom: string): MatrixNode | undefined => {
  const i = byAtom.get(norm(atom))
  return i === undefined ? undefined : at(i)
}

/** Atoms this atom links TO (outgoing edges). */
export const neighborsOf = (atom: string): MatrixNode[] => {
  const i = byAtom.get(norm(atom))
  if (i === undefined) return []
  return UUID_MATRIX_EDGES.filter((e) => e.f === i).map((e) => at(e.t)).filter(isNode)
}

/** Atoms that link TO this atom (incoming edges — its backlinks; empty ⇒ orphan). */
export const backlinksOf = (atom: string): MatrixNode[] => {
  const i = byAtom.get(norm(atom))
  if (i === undefined) return []
  return UUID_MATRIX_EDGES.filter((e) => e.t === i).map((e) => at(e.f)).filter(isNode)
}

/** The binding-uuid of the edge a→b (the collision), or undefined if no such edge. */
export const bindingOf = (a: string, b: string): string | undefined => {
  const fi = byAtom.get(norm(a))
  const ti = byAtom.get(norm(b))
  if (fi === undefined || ti === undefined) return undefined
  const edge = UUID_MATRIX_EDGES.find((e) => e.f === fi && e.t === ti)
  return edge === undefined ? undefined : edge.binding
}

/** Nodes grouped by structural dimension (collections/services/fields/root/…). */
export const nodesByDim = (): Record<string, MatrixNode[]> => {
  const out: Record<string, MatrixNode[]> = {}
  for (const n of UUID_MATRIX_NODES) {
    const arr = out[n.dim] ?? []
    arr.push(n)
    out[n.dim] = arr
  }
  return out
}

/** Edge counts by harmonic direction (horo composeSteps result, 1..9). */
export const edgesByDirection = (): Record<number, number> => {
  const out: Record<number, number> = {}
  for (const e of UUID_MATRIX_EDGES) out[e.dir] = (out[e.dir] ?? 0) + 1
  return out
}

/** The whole corpus's single 128-bit address + its size. */
export const matrixDigest = (): { root: string; nodes: number; edges: number } => ({
  root: UUID_MATRIX_ROOT,
  nodes: UUID_MATRIX_NODES.length,
  edges: UUID_MATRIX_EDGES.length,
})
