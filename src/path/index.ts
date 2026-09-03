/**
 * path — THE merge point: every external surface collapses to one canonical atom path.
 * fs ⊕ url ⊕ github ⊕ mcp ⊕ api ⊕ http ⊕ cloudflare — all follow THE path, entangle at
 * content-uuid ([[integrity]]), and merge with erpax in every [[dimension]].
 *
 * Canonical form: `atom/subatom` — forward slashes, no `src/` prefix, no leading
 * slash, no trailing slash, folder chain only (leaf files stripped).
 *
 *   tsx src/path/index.ts law/folder
 *
 * @audit paths computed deterministically; never hand-mapped per surface
 * @see ../fs -- ../github -- ../mcp -- ../api -- ../quantum -- ../integrity -- ./SKILL.md
 */
// Both live in the leaf sub-atom (node:crypto + @/uuid/format only); the @/integrity barrel is
// inside the import component, so taking them from it kept path/ entangled for no benefit.
// THE CUT: one pure string function used to cost the whole @/seal barrel.
import { parentAtomPath } from '@/seal/parent'
import { recordPathVisit, type PathCanonicalEntry } from './record'
/*
 * The ADDRESS FOLD moved to ./fold — pure string work that was loading the 4.2 MB corpus matrix
 * because this barrel imports it for the ring walk below. Re-exported here in full, so no caller
 * anywhere loses a name ([[rules]]/face); a consumer that needs only the fold imports @/path/fold
 * and stops paying for navigation it never uses.
 */
import { type PathSurface, ONE_WORD, isValidAtomPath, toAtomPath as foldAtomPath } from './fold'

/**
 * The address fold, plus the SURROUNDINGS branch that belongs to the reveal machinery here.
 *
 * `./fold` is pure string work by construction — it cannot call `revealPathFromSurroundings`
 * without importing the matrix back through the front door, which is the whole point of the cut.
 */
export function toAtomPath(
  input: string,
  surface: PathSurface = 'fs',
  surroundings?: Omit<RevealPathContext, 'file' | 'input' | 'surface'>,
): string {
  if (surroundings && Object.keys(surroundings).length > 0) {
    return revealPathFromSurroundings({ input, surface, ...surroundings })
  }
  return foldAtomPath(input, surface)
}
export { PATH_SURFACES, isValidAtomPath, atomPathUuid } from './fold'
export type { PathSurface } from './fold'
import {
  nodeOf,
  childrenOf,
  prevOf,
  nextOf,
  UUID_MATRIX_NODES,
  type MatrixNode,
} from '@/uuid/matrix'












/** Matrix canonical path — path-aware `nodeOf` resolution, not leaf alone. */
export function canonicalMatrixPath(atomPath: string): string {
  const n = nodeOf(atomPath)
  return n?.path ?? atomPath
}

/** Surrounding context that reveals the atom path — never guessed in isolation. */
export interface RevealPathContext {
  /** Src-relative file path — folder chain is the primary revelation. */
  readonly file?: string
  /** Address before peel (alias for file when surface is set). */
  readonly input?: string
  /** Import specifier — `@/law/folder` peels to `law/folder`. */
  readonly import?: string
  /** Peel surface for `file` / `input` (default `fs`). */
  readonly surface?: PathSurface
  /** Immediate parent — connectFrontmatter `bonds.in` parent prefix. */
  readonly parent?: string | null
  /** Matrix / wikilink outgoing neighbors (`bonds.out`). */
  readonly neighbors?: readonly string[]
  /** Matrix / wikilink incoming backlinks (`bonds.in`). */
  readonly backlinks?: readonly string[]
  /** Typography partition peers. */
  readonly peers?: readonly string[]
}

const peelImport = (specifier: string): string =>
  specifier.replace(/^@\//, '').replace(/\/index(?:\.ts)?$/, '')

const scoreRevealedPath = (
  path: string,
  peeled: string,
  parent: string | null | undefined,
): number => {
  let score = 0
  if (path === peeled && peeled.includes('/')) score += 100
  if (nodeOf(path)) score += 50
  const depth = path.split('/').length
  if (depth > 1) score += depth * 10
  const leaf = path.split('/').pop() ?? path
  if (parent && path === `${parent}/${leaf}`) score += 30
  return score
}

/**
 * Reveal the canonical atom path from surrounding folder context — parent chain,
 * matrix backlinks/neighbors, import specifiers, and path-aware `nodeOf` resolution.
 * The path is never guessed: each surrounding segment must corroborate the fold.
 */
export function revealPathFromSurroundings(ctx: RevealPathContext): string {
  const surface = ctx.surface ?? 'fs'
  let peeled = ''
  if (ctx.file) peeled = toAtomPath(ctx.file, surface)
  else if (ctx.input) peeled = toAtomPath(ctx.input, surface)
  else if (ctx.import) peeled = toAtomPath(peelImport(ctx.import), 'fs')

  const leaf = peeled ? (peeled.split('/').pop() ?? '') : ''
  const parent =
    ctx.parent !== undefined
      ? ctx.parent
      : peeled.includes('/')
        ? parentAtomPath(peeled)
        : null

  const candidates: string[] = []
  if (peeled && isValidAtomPath(peeled)) candidates.push(peeled)

  if (leaf) {
    if (parent) {
      const composed = `${parent}/${leaf}`
      if (isValidAtomPath(composed)) candidates.push(composed)
    }
    for (const link of [
      ...(ctx.backlinks ?? []),
      ...(ctx.neighbors ?? []),
      ...(ctx.peers ?? []),
    ]) {
      const norm = link.replace(/\\/g, '/').replace(/^@\//, '').replace(/^\/+|\/+$/g, '')
      if (!norm) continue
      if (norm.includes('/')) {
        if (norm === leaf || norm.endsWith(`/${leaf}`)) candidates.push(norm)
      } else if (norm !== leaf) {
        const composed = `${norm}/${leaf}`
        if (isValidAtomPath(composed)) candidates.push(composed)
      }
    }
  }

  const ranked = [...new Set(candidates)]
    .map((c) => canonicalMatrixPath(c))
    .filter((c) => isValidAtomPath(c))
    .map((path) => ({ path, score: scoreRevealedPath(path, peeled, parent) }))
    .sort((a, b) => b.score - a.score)

  if (ranked.length > 0) return ranked[0]!.path
  const fallback = canonicalMatrixPath(peeled)
  return isValidAtomPath(fallback) ? fallback : ''
}

/** Compose one generic word onto a base path — fractal extension (pure path algebra). */
export function extendAtomPath(atomPath: string, word: string): string | null {
  if (!ONE_WORD.test(word)) return null
  const next = atomPath ? `${atomPath}/${word}` : word
  return isValidAtomPath(next) ? next : null
}

/** Ascending prefix chain from root segment through atomPath (folder fold upward). */
export function ancestorPaths(atomPath: string): readonly string[] {
  const parts = atomPath.split('/').filter(Boolean)
  return parts.map((_, i) => parts.slice(0, i + 1).join('/'))
}

/** True when `other` is the same path, an ancestor prefix, or a descendant extension. */
const isTreePathRelated = (root: string, other: string): boolean =>
  other === root || other.startsWith(`${root}/`) || root.startsWith(`${other}/`)

/**
 * Bidirectional infinite path fold — ancestors ascending, self, ring prev/next,
 * then descendants descending the matrix tree without depth cap (fractal unbounded
 * over the live corpus; each folder may extend by another generic word forever).
 */
export function* infinitePathFold(atomPath: string): Generator<string> {
  const root = canonicalMatrixPath(atomPath)
  const seen = new Set<string>()
  for (const p of ancestorPaths(root)) {
    if (seen.has(p)) continue
    seen.add(p)
    yield p
  }
  for (const ring of [prevOf(root), nextOf(root)]) {
    const rp = ring?.path
    if (rp && !seen.has(rp) && isTreePathRelated(root, rp)) {
      seen.add(rp)
      yield rp
    }
  }
  const queue = childrenOf(root)
    .map((c) => c.path)
    .filter((p): p is string => Boolean(p))
  while (queue.length > 0) {
    const p = queue.shift()!
    if (seen.has(p)) continue
    seen.add(p)
    yield p
    for (const c of childrenOf(p)) {
      const cp = c.path
      if (cp && !seen.has(cp)) queue.push(cp)
    }
  }
}

/** Collect infinitePathFold into a sorted array (test / audit helper). */
export function infinitePathFoldAll(atomPath: string): readonly string[] {
  return [...infinitePathFold(atomPath)].sort()
}

const matrixPathOf = (n: MatrixNode): string => n.path ?? n.atom

/** Every canonical atom path in the live matrix (one per node). */
export function allMatrixAtomPaths(): readonly string[] {
  return UUID_MATRIX_NODES.map(matrixPathOf)
}

/**
 * Lawful subtree descent — parent→children axis, lexicographic child order,
 * each path yielded at most once.
 */
function* descendTree(path: string, seen: Set<string>): Generator<string> {
  if (seen.has(path)) return
  seen.add(path)
  yield path
  const kids = childrenOf(path)
    .map((c) => matrixPathOf(c))
    .filter((p): p is string => Boolean(p))
    .sort((a, b) => a.localeCompare(b))
  for (const child of kids) yield* descendTree(child, seen)
}

/**
 * Follow every path — traverse the full atom path lattice via matrix bonds.
 * Ring axis (prev→next) advances the cursor; at each stop the parent→children
 * axis descends unvisited subtrees. Every matrix path is yielded exactly once.
 */
export function* followEveryPath(root?: string): Generator<string> {
  const seen = new Set<string>()
  const start = root ? nodeOf(root) : UUID_MATRIX_NODES[0]
  if (!start) return
  const startPath = matrixPathOf(start)

  let current: MatrixNode | undefined = start
  do {
    const p = matrixPathOf(current!)
    yield* descendTree(p, seen)
    const prev = prevOf(p)
    const prevPath = prev ? matrixPathOf(prev) : undefined
    if (prevPath) yield* descendTree(prevPath, seen)
    const next = nextOf(p)
    if (!next) break
    current = next
  } while (matrixPathOf(current) !== startPath || seen.size < UUID_MATRIX_NODES.length)

  if (seen.size < UUID_MATRIX_NODES.length) {
    for (const n of UUID_MATRIX_NODES) yield* descendTree(matrixPathOf(n), seen)
  }
}

/** Collect followEveryPath into a sorted array (test / audit helper). */
export function followEveryPathAll(root?: string): readonly string[] {
  return [...followEveryPath(root)].sort()
}

export interface PathWalkCoverage {
  readonly total: number
  readonly visited: number
  readonly coverage: number
  readonly missing: readonly string[]
}

/** Coverage of `visited` against required paths (default: full matrix). */
export function pathWalkCoverage(
  visited: ReadonlySet<string>,
  required: readonly string[] = allMatrixAtomPaths(),
): PathWalkCoverage {
  const missing = required.filter((p) => !visited.has(p))
  const total = required.length
  const visitedCount = total - missing.length
  return {
    total,
    visited: visitedCount,
    coverage: total > 0 ? visitedCount / total : 0,
    missing,
  }
}

export interface PathFollowVerdict {
  readonly followed: boolean
  readonly total: number
  readonly visited: number
  readonly coverage: number
  readonly missing: readonly string[]
}

/**
 * Gate — coverage must equal every required path (default: full matrix lattice).
 * Fail-closed: partial walk ⇒ not followed.
 */
export function assertEveryPathFollowed(
  visited: ReadonlySet<string>,
  required: readonly string[] = allMatrixAtomPaths(),
): PathFollowVerdict {
  const { total, visited: visitedCount, coverage, missing } = pathWalkCoverage(visited, required)
  return {
    followed: missing.length === 0,
    total,
    visited: visitedCount,
    coverage,
    missing,
  }
}








/**
 * Canonical serverless URL for an atom path — URL ≡ fs path without `src/`.
 * Pure bijection partner of `atomPathFromUrl`; no runtime fs. VitePress docs
 * routes append `/SKILL` ([[vitepress]] `routeOfPath`); both fold to the same atom.
 *
 *   urlForAtomPath('memory/session') → '/memory/session'
 */
export function urlForAtomPath(atomPath: string): string {
  const canonical = toAtomPath(atomPath, 'url') || toAtomPath(atomPath, 'fs')
  return canonical ? `/${canonical}` : ''
}

/**
 * Atom path from a serverless URL — the dual of `urlForAtomPath`.
 * Strips leading slash, `src/` prefix, `/SKILL` suffix, leaf files, query/hash.
 *
 *   atomPathFromUrl('/memory/session') → 'memory/session'
 */
export function atomPathFromUrl(url: string): string {
  return toAtomPath(url, 'url')
}

/** Two paths meet when they normalize to the same canonical atom path. */
export function pathsMeet(
  a: string,
  b: string,
  surfaceA: PathSurface = 'fs',
  surfaceB: PathSurface = 'fs',
): boolean {
  return toAtomPath(a, surfaceA) === toAtomPath(b, surfaceB)
}

/** N-way merge — every path must meet at the same atom (entanglement gate). */
export function pathsMeetAll(...entries: readonly (readonly [string, PathSurface])[]): boolean {
  if (entries.length < 2) return true
  const head = toAtomPath(entries[0]![0], entries[0]![1])
  return entries.every(([p, s]) => toAtomPath(p, s) === head)
}


export type {
  PathCanonicalEntry,
  PathCanonicalEnvelope,
  PathRecordVerdict,
} from './record'
export {
  PATH_CANONICAL_KIND,
  pathCanonicalEnvelope,
  entryUuidFromEnvelope,
  recordOnPath,
  canonicalPathLedger,
  assertEverythingOnPathRecorded,
  assertPathCanonicallyRecorded,
  recordPathVisit,
  ledgerFromPathWalk,
} from './record'

export {
  ATOM_LEDGER_PATHS,
  recordAtomOnPath,
  atomPathHasLedgerHook,
  ledgerForAtomPaths,
} from './hub'

export {
  indexBearingParent,
  indexBearingChain,
  mergePathIndices,
  canonicalPathIndex,
  recordOnPathMerged,
  assertPathIndicesMerged,
  countPathIndexGaps,
  type PathIndexMerge,
  type PathIndexGapVerdict,
} from './merge'

export { MERGED_LEDGER_CHAINS, MERGED_NESTED_PATH_COUNT } from './hooks.registry.generated'

/** Canonical ledger hook for the path atom itself. */
export function recordPathOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('path', { kind: 'path.self', payload }, at, prevEntryUuid, seq)
}
