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
import { createHash } from 'node:crypto'
import { norm } from '@/corpus'
import {
  UUID_MATRIX_NODES,
  UUID_MATRIX_EDGES,
  UUID_MATRIX_ROOT,
  UUID_MATRIX_DIMS,
  type MatrixNode,
  type MatrixEdge,
} from './matrix.generated'

export { UUID_MATRIX_NODES, UUID_MATRIX_EDGES, UUID_MATRIX_ROOT, UUID_MATRIX_DIMS }
export type { MatrixNode, MatrixEdge }

/**
 * The v8 content-uuid + merge primitive — the second coil. This is the EXACT
 * TS twin of `toUuid`/`merge` in ./collide.mjs (the first coil): sha256 of the
 * raw buffer → first 16 bytes, byte[6] stamped version 8, byte[8] stamped
 * variant 10x, hyphenated 8-4-4-4-12. The two coils MUST agree — collide
 * emits the bind/cross/root, this recomputes them to verify. The index.test
 * pins the agreement against a known collide output (the `coordinate` node).
 *
 * NOT the same primitive as src/integrity/content-uuid.ts#nameUuid — that one
 * prefixes a namespace UUID into the hash (name-based v8); the matrix coil
 * hashes the bare bytes (no namespace), matching the collider exactly.
 *
 * @standard RFC 9562 §5.8 (uuidv8 content-uuid) + §4.1 variant
 */
export const toUuid = (buf: Buffer): string => {
  const b = Buffer.from(createHash('sha256').update(buf).digest().subarray(0, 16))
  b[6] = (b[6]! & 0x0f) | 0x80 // version 8
  b[8] = (b[8]! & 0x3f) | 0x80 // variant 10x
  const x = b.toString('hex')
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20)}`
}
const ubytes = (u: string): Buffer => Buffer.from(u.replace(/-/g, ''), 'hex')
/** Collision: two uuids → a third (concat their 16 bytes, content-hash). */
export const merge = (a: string, b: string): string => toUuid(Buffer.concat([ubytes(a), ubytes(b)]))

const byAtom = new Map<string, number>()
UUID_MATRIX_NODES.forEach((n, i) => byAtom.set(n.atom, i))

/**
 * Resolve a node by its content-uuid (the neighbour pointers — parent/prev/next
 * — are stored AS uuids, not atom names). First-wins on the rare merged-account
 * collision; the NIL parent uuid never indexes (no node carries it).
 */
const byUuid = new Map<string, number>()
UUID_MATRIX_NODES.forEach((n, i) => { if (!byUuid.has(n.uuid)) byUuid.set(n.uuid, i) })

const at = (i: number): MatrixNode | undefined => UUID_MATRIX_NODES[i]
const isNode = (n: MatrixNode | undefined): n is MatrixNode => n !== undefined
const nodeByUuid = (u: string | undefined): MatrixNode | undefined => {
  if (u === undefined) return undefined
  const i = byUuid.get(u)
  return i === undefined ? undefined : at(i)
}

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

// ── the [[coordinate]] cross: parent (tree axis) ⊕ prev ⊕ next (sequence ring) ──
// Each node binds to its three neighbour uuids. parentOf/prevOf/nextOf resolve
// those stored uuids back to nodes; the NIL parent (no tree parent) → undefined.

/** The tree-parent node (the axis), or undefined for a root / NIL parent. */
export const parentOf = (atom: string): MatrixNode | undefined => nodeByUuid(nodeOf(atom)?.parent)

/** The previous node on the sequence ring (reverse coil), or undefined. */
export const prevOf = (atom: string): MatrixNode | undefined => nodeByUuid(nodeOf(atom)?.prev)

/** The next node on the sequence ring (forward coil), or undefined. */
export const nextOf = (atom: string): MatrixNode | undefined => nodeByUuid(nodeOf(atom)?.next)

/**
 * The full coordinate of an atom: the three neighbour uuids + the merged
 * `cross` (the trinity) + the `bind` (content ⊕ coordinate). Undefined if the
 * atom is unknown OR the node predates the coordinate wiring (no `bind`).
 */
export const coordinateOf = (
  atom: string,
): { parent: string; prev: string; next: string; cross: string; bind: string } | undefined => {
  const n = nodeOf(atom)
  if (!n || n.parent === undefined || n.prev === undefined || n.next === undefined || n.cross === undefined || n.bind === undefined) {
    return undefined
  }
  return { parent: n.parent, prev: n.prev, next: n.next, cross: n.cross, bind: n.bind }
}

/**
 * Recompute merge(uuid, merge(merge(parent, prev), next)) and compare to the
 * stored bind. TRUE proves the 3-connected linkage is intact — tampering the
 * atom's content OR any of its parent/prev/next neighbours flips this false.
 * This is the trinity binding, NOT a linear prev-only chain. Unknown atom or a
 * node without a coordinate → false (nothing to prove).
 */
export const verifyBind = (atom: string): boolean => {
  const c = coordinateOf(atom)
  const n = nodeOf(atom)
  if (!c || !n) return false
  return merge(n.uuid, merge(merge(c.parent, c.prev), c.next)) === c.bind
}

/**
 * Recompute the Merkle fold over every node's bind (falling back to uuid for a
 * pre-coordinate node, exactly as the collider does) and compare to the stored
 * UUID_MATRIX_ROOT. ok ⇒ the whole holographic collapse is intact.
 */
export const verifyRoot = (): { ok: boolean; root: string } => {
  let layer = UUID_MATRIX_NODES.map((n) => n.bind ?? n.uuid).sort()
  while (layer.length > 1) {
    const next: string[] = []
    for (let i = 0; i < layer.length; i += 2) {
      const a = layer[i]!
      const b = layer[i + 1]
      next.push(b === undefined ? a : merge(a, b)) // odd element carries up
    }
    layer = next
  }
  const root = layer[0] ?? UUID_MATRIX_ROOT
  return { ok: root === UUID_MATRIX_ROOT, root }
}

/** Every atom whose verifyBind is false — the tampered (or unbound) nodes. */
export const tamperedAtoms = (): string[] =>
  UUID_MATRIX_NODES.filter((n) => !verifyBind(n.atom)).map((n) => n.atom)
