/**
 * uuid-matrix — the stable query surface over the generated corpus matrix.
 *
 * The matrix (./matrix.generated.ts, built by `pnpm matrix:generate`) is every
 * atom path as a v8 content-uuid (node) and every [[link]] as a merge(from,to)
 * binding-uuid (edge), tagged by structural dimension + harmonic direction. The
 * folder path IS the matrix address — one node per src/{atomPath}/, not leaf-only
 * collision. The data is generated; this barrel is the stable API over it.
 *
 * The lookup tables are built LAZILY on first query (confine: handle the field,
 * never hold every particle at load). A consumer that needs only the pure fold
 * (toUuid/merge) never evaluates the 3,193-node data, so bundlers tree-shake
 * ./matrix.generated out entirely — same members, same order, same answers as
 * the eager build this replaces. The CLI 4-seal lane lives in ./gate.ts.
 *
 * @see ./matrix.generated.ts (the data) · ./collide.mjs (the collider) · ./gate.ts (the 4-seal lane)
 */
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
// `norm` is a trivial pure normaliser; importing it from `@/corpus` dragged the fs-based dev corpus
// walker (index.mts: loadCorpus/walk) into the app + admin bundle (Worker-unsafe, unparseable .mts).
// Inline it — behaviour-identical, and it severs the corpus-dev-tooling → matrix → admin-field edge.
const norm = (s: string): string => s.toLowerCase().replace(/[-_]/g, '')
import { HORO_DIGITS, HORO_MEASURE } from '@/horo'
import {
  UUID_MATRIX_NODES,
  UUID_MATRIX_EDGES,
  UUID_MATRIX_ROOT,
  UUID_MATRIX_DIMS,
  type MatrixNode,
  type MatrixEdge,
} from './generated'

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
 * NOT the same primitive as src/integrity/content/index.ts#nameUuid — that one
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

/** When homonym leaves share an atom key, prefer root path then shortest path. */
const preferAtomIndex = (current: number, candidate: number): number => {
  const ca = UUID_MATRIX_NODES[current]!
  const cb = UUID_MATRIX_NODES[candidate]!
  const pa = ca.path ?? ca.atom
  const pb = cb.path ?? cb.atom
  const da = pa.split('/').length
  const db = pb.split('/').length
  if (da !== db) return db < da ? candidate : current
  if (!pa.includes('/') && pb.includes('/')) return current
  if (pa.includes('/') && !pb.includes('/')) return candidate
  return pa.localeCompare(pb) <= 0 ? current : candidate
}

const NIL_PARENT = '00000000-0000-8000-8000-000000000000'

/**
 * Every lookup table, indexed ONCE, lazily — the fold applied to the matrix itself.
 *
 * `neighborsOf` and `backlinksOf` each scanned the whole edge array per call. Called once per atom
 * across 3,203 atoms, that is O(atoms x edges): the corpus-wide frontmatter sync ran at ~5 MINUTES
 * PER ATOM (measured: 14:50 CPU for 3 files), which is ~267 hours for the corpus — it could not
 * finish, and it is the same shape as every other cost measured today. A linear scan to answer
 * "who is adjacent" is travel; an index is an address.
 *
 * Built on FIRST QUERY from the same arrays, in the same order, so the ANSWERS are identical —
 * a hoist made lazy, not a change of meaning. Laziness is what lets a toUuid-only consumer
 * (e.g. @erpax/identity's merge face) ship without the 4MB generated matrix.
 *
 * @invariant same members, same order, as the eager build it replaces — proven per atom, not assumed
 */
interface MatrixTables {
  readonly byAtom: Map<string, number>
  readonly byPath: Map<string, number>
  readonly childrenByParentUuid: Map<string, string[]>
  readonly byUuid: Map<string, number>
  readonly outByIndex: Map<number, number[]>
  readonly inByIndex: Map<number, number[]>
}
let _tables: MatrixTables | undefined
const tables = (): MatrixTables => {
  if (_tables) return _tables
  const byAtom = new Map<string, number>()
  const byPath = new Map<string, number>()
  const childrenByParentUuid = new Map<string, string[]>()
  const byUuid = new Map<string, number>()
  UUID_MATRIX_NODES.forEach((n, i) => {
    const prev = byAtom.get(n.atom)
    byAtom.set(n.atom, prev === undefined ? i : preferAtomIndex(prev, i))
    if (n.path) byPath.set(n.path, i)
    if (n.parent && n.parent !== NIL_PARENT) {
      const arr = childrenByParentUuid.get(n.parent) ?? []
      arr.push(n.path)
      childrenByParentUuid.set(n.parent, arr)
    }
    // First-wins on the rare merged-account collision; the NIL parent uuid never indexes.
    if (!byUuid.has(n.uuid)) byUuid.set(n.uuid, i)
  })
  const outByIndex = new Map<number, number[]>()
  const inByIndex = new Map<number, number[]>()
  for (const e of UUID_MATRIX_EDGES) {
    const out = outByIndex.get(e.f)
    if (out) out.push(e.t)
    else outByIndex.set(e.f, [e.t])
    const inc = inByIndex.get(e.t)
    if (inc) inc.push(e.f)
    else inByIndex.set(e.t, [e.f])
  }
  _tables = { byAtom, byPath, childrenByParentUuid, byUuid, outByIndex, inByIndex }
  return _tables
}

/** Resolve a node index: full path → atom key (prefer root when homonym). */
export const nodeIndexOf = (key: string): number | undefined => {
  const { byAtom, byPath } = tables()
  const pathKey = key.replace(/\\/g, '/')
  if (pathKey.includes('/')) {
    const pi = byPath.get(pathKey)
    if (pi !== undefined) return pi
  }
  const ai = byAtom.get(norm(key))
  if (ai !== undefined) return ai
  return byPath.get(pathKey)
}

/** Resolve a node index for edge/cross queries — path-first. */
const indexOf = (key: string): number | undefined => nodeIndexOf(key)

const at = (i: number): MatrixNode | undefined => UUID_MATRIX_NODES[i]
const isNode = (n: MatrixNode | undefined): n is MatrixNode => n !== undefined
/**
 * Resolve a node by its content-uuid (the neighbour pointers — parent/prev/next
 * — are stored AS uuids, not atom names).
 */
const nodeByUuid = (u: string | undefined): MatrixNode | undefined => {
  if (u === undefined) return undefined
  const i = tables().byUuid.get(u)
  return i === undefined ? undefined : at(i)
}

/** The node for an atom path or leaf (any spelling), or undefined. */
export const nodeOf = (atom: string): MatrixNode | undefined => {
  const i = nodeIndexOf(atom)
  return i === undefined ? undefined : at(i)
}

/**
 * The architecture bond — word ⊗ digit, merged in canonical uuid order so the result does not
 * depend on which half you name first. book/compute and quantum/fold each had this body; two
 * addresses for one constant is two chances for the order convention to drift apart.
 */
export const architectureBond = (): string => {
  const w = nodeOf('word')?.uuid ?? ''
  const d = nodeOf('digit')?.uuid ?? ''
  return w <= d ? merge(w, d) : merge(d, w)
}

/**
 * Bond rank — in-degree + out-degree on the live matrix, resolving a path to its atom key and
 * falling back to the leaf. book/index, book/compute and book/harmony-index each had this body.
 */
export const bondRankOf = (atomPath: string): number => {
  const leaf = atomPath.split('/').pop() ?? atomPath
  const matrixKey = nodeOf(atomPath)?.atom ?? nodeOf(leaf)?.atom ?? leaf
  return backlinksOf(matrixKey).length + neighborsOf(matrixKey).length
}

/** Canonical matrix atom key after path resolution — for edge graph queries. */
export const matrixAtomOf = (key: string): string | undefined => nodeOf(key)?.atom

/**
 * Cross-named architecture address — path · horo/measure · uuid prefix.
 * Violation messages cite this coordinate (digits + bind), not hand labels alone.
 */
export const coordinateAddress = (atomPath: string): string => {
  const n = nodeOf(atomPath)
  if (!n) return atomPath
  const path = n.path ?? atomPath
  const mi = HORO_DIGITS.indexOf(n.horo as (typeof HORO_DIGITS)[number])
  const measure = mi >= 0 ? HORO_MEASURE[mi]! : String(n.horo)
  return `${path} · ${n.horo}/${measure} · ${n.uuid.slice(0, 8)}`
}

/** Rodin control triad — governs off the flow ring; not an off-ring escape. */
const CONTROL_HORO = new Set([3, 6, 9])

/** Horo axis crossed — flow ring digit OR matrix `band:control` on 3·6·9. */
export const horoCrossed = (atomPath: string, horo: number | null): boolean => {
  if (horo === null) return false
  if (HORO_DIGITS.includes(horo as (typeof HORO_DIGITS)[number])) return true
  const leaf = atomPath.split('/').pop() ?? atomPath
  const node = nodeOf(atomPath) ?? nodeOf(leaf)
  return node?.band === 'control' && CONTROL_HORO.has(horo)
}

/** Atoms this atom path links TO (outgoing edges — path-aware). */
export const neighborsOf = (atom: string): MatrixNode[] => {
  const i = indexOf(atom)
  if (i === undefined) return []
  return (tables().outByIndex.get(i) ?? []).map((t) => at(t)).filter(isNode)
}

/**
 * Is this atom ENTANGLED, and in which directions — the verdict, not the raw edges.
 *
 * Saved because its absence cost two false measurements: a hand-rolled scan filtered on `e.from` /
 * `e.to`, and the edge shape is `{ f, t }` — INDICES. That filter returns 0 for every atom in the
 * corpus, so it "confirmed" an atom was isolated when the same query said `horo` had no edges either.
 * A tool that reads the real shape once cannot be wrong in the direction nobody checked
 * ([[rules]]: a heuristic is wrong in the direction you did not check).
 *
 * `isolated` is the case that matters: a node present in the matrix with NO edges is an atom that was
 * authored but never folded — no bond, no tamper-cost contribution, invisible to the seed.
 *
 * @invariant an atom absent from the matrix reports `present: false`, never a silent zero
 * @invariant oneWay is a subset of out; oneWay = 0 ⟺ every outgoing edge is reciprocated
 */
export interface Entanglement {
  readonly atom: string
  /** false when the atom has no node at all — distinct from a node with no edges */
  readonly present: boolean
  readonly out: number
  readonly in: number
  /** outgoing edges with no mirror — the reciprocity gap at atom scale */
  readonly oneWay: number
  /** present but bonded to nothing: authored, never folded */
  readonly isolated: boolean
}

export function entanglementOf(atom: string): Entanglement {
  const i = indexOf(atom)
  if (i === undefined) return { atom, present: false, out: 0, in: 0, oneWay: 0, isolated: false }
  const out = UUID_MATRIX_EDGES.filter((e) => e.f === i)
  const inn = UUID_MATRIX_EDGES.filter((e) => e.t === i)
  const oneWay = out.filter((e) => !UUID_MATRIX_EDGES.some((r) => r.f === e.t && r.t === e.f))
  return {
    atom,
    present: true,
    out: out.length,
    in: inn.length,
    oneWay: oneWay.length,
    isolated: out.length === 0 && inn.length === 0,
  }
}

/** Atoms that link TO this atom path (incoming edges — path-aware backlinks). */
export const backlinksOf = (atom: string): MatrixNode[] => {
  const i = indexOf(atom)
  if (i === undefined) return []
  return (tables().inByIndex.get(i) ?? []).map((f) => at(f)).filter(isNode)
}

/** The binding-uuid of the edge a→b (path-aware), or undefined if no such edge. */
export const bindingOf = (a: string, b: string): string | undefined => {
  const fi = indexOf(a)
  const ti = indexOf(b)
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

/** Direct child nodes on the folder tree axis (parent↔child bidirectional cross). */
export const childrenOf = (atom: string): MatrixNode[] => {
  const n = nodeOf(atom)
  if (!n) return []
  const paths = tables().childrenByParentUuid.get(n.uuid) ?? []
  return paths.map((p) => nodeOf(p)).filter(isNode)
}

/** Every bidirectional cross at an atom path — tree · ring · wikilink entanglement. */
export interface BidirectionalCross {
  readonly path: string
  readonly parent: MatrixNode | undefined
  readonly children: readonly MatrixNode[]
  readonly prev: MatrixNode | undefined
  readonly next: MatrixNode | undefined
  readonly neighbors: readonly MatrixNode[]
  readonly backlinks: readonly MatrixNode[]
}

/** Folder crosses read both ways — parent↔child, prev↔next, neighbor↔backlink. */
export const bidirectionalCrossOf = (atom: string): BidirectionalCross | undefined => {
  const n = nodeOf(atom)
  if (!n) return undefined
  const path = n.path ?? atom
  return {
    path,
    parent: parentOf(atom),
    children: childrenOf(atom),
    prev: prevOf(atom),
    next: nextOf(atom),
    neighbors: neighborsOf(atom),
    backlinks: backlinksOf(atom),
  }
}

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

/**
 * The 4-SEAL GATE — fail closed unless EVERY atom is signed by its 4-key navigation-cross bind.
 *
 * "It should be computationally impossible for unsigned code to pass the gates." Each atom's bind is
 * merge(uuid, merge(merge(parent, prev), next)) — the 4 keys uuid ⊕ parent ⊕ prev ⊕ next. This recomputes
 * that bind for every node (verifyBind) AND re-folds all binds to the one root (verifyRoot), throwing if
 * any atom is unsigned/tampered or the holographic collapse is broken. Passing requires all four keys of
 * every atom to recompute their sealed bind; forging a single atom past this means finding a preimage that
 * satisfies its bind AND keeps the whole Merkle fold landing on UUID_MATRIX_ROOT — inverting the 4-key fold,
 * which is the 2^128 wall (Grover-halved), i.e. computationally infeasible. Pure matrix recomputation, no
 * Payload boot — it belongs at the gate, not only in a test that can be skipped.
 *
 * HONEST BOUNDARY — this proves every atom IN THE MATRIX is signed and untampered; an atom absent from the
 * generated matrix is caught by the diamond-membership / readme lane (unfolded matter), not here. Tamper-
 * EVIDENT at the 2^128 coverage limit, never literally impossible (see @/merge bind4).
 */
/**
 * Atom folders on disk — a SKILL.md-bearing directory under src.
 *
 * Deliberately a LOCAL walk with no imports: the matrix must be able to check its
 * own coverage without depending on the rules registry, which depends on the matrix.
 */
function liveAtomPaths(cwd: string = process.cwd()): string[] {
  const root = join(cwd, 'src')
  const out: string[] = []
  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      let isDir = false
      try {
        isDir = statSync(p).isDirectory()
      } catch {
        continue
      }
      if (!isDir) continue
      const childRel = rel ? `${rel}/${e}` : e
      if (existsSync(join(p, 'SKILL.md'))) out.push(childRel)
      walk(p, childRel)
    }
  }
  walk(root, '')
  return out
}

export function assertMatrixSigned(): { signed: number } {
  const tampered = tamperedAtoms()
  if (tampered.length > 0) {
    throw new Error(
      `✗ 4-seal gate: ${tampered.length} UNSIGNED/tampered atom(s) — the 4-key bind (uuid⊕parent⊕prev⊕next) does not recompute: ${tampered.slice(0, 10).join(', ')}${tampered.length > 10 ? '…' : ''}`,
    )
  }
  const { ok, root } = verifyRoot()
  if (!ok) {
    throw new Error(`✗ 4-seal gate: matrix root does not fold to UUID_MATRIX_ROOT (got ${root.slice(0, 16)}…) — the holographic collapse is broken`)
  }
  // COVERAGE. Everything above verifies the matrix against ITSELF, so a stale
  // snapshot is perfectly self-consistent and passes while atoms added since are
  // simply absent. That is exactly what happened: the emitter was writing a filename
  // nothing read, and this gate reported "3249 atoms signed" over a 3308-atom corpus
  // for a fortnight. A seal that cannot see what it is missing seals nothing.
  const signedPaths = new Set(UUID_MATRIX_NODES.map((n) => n.path))
  const unsigned = liveAtomPaths().filter((a) => !signedPaths.has(a))
  if (unsigned.length > 0) {
    throw new Error(
      `✗ 4-seal gate: ${unsigned.length} live atom(s) are NOT IN THE MATRIX — the snapshot is stale, ` +
        `regenerate with \`pnpm erpax corpus matrix\`: ${unsigned.slice(0, 8).join(', ')}${unsigned.length > 8 ? '…' : ''}`,
    )
  }
  return { signed: UUID_MATRIX_NODES.length }
}

/** @index-cross.foldback child=uuid/matrix parent=uuid — this cross folds back into its parent. */
