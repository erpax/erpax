/**
 * path/merge — compose nested index.ts barrels: parent ledger hooks precede child.
 *
 * Law: path-in-path must merge at the index face — parent exports + child matter share
 * one recordOnPath chain for every index-bearing prefix (no skipped parent barrel).
 *
 * @see ./hooks.registry.generated.ts — ./hub.ts — ./record.ts
 */
import { recordOnPath, type PathCanonicalEntry } from './record'
import { ATOM_LEDGER_PATHS, MERGED_LEDGER_CHAINS } from './hooks.registry.generated'

const normalize = (atomPath: string): string =>
  atomPath.replace(/^src\//, '').replace(/^\//, '').replace(/\/+$/, '')

/** Ascending prefix chain from root segment through atomPath. */
const ancestorPaths = (atomPath: string): readonly string[] => {
  const parts = normalize(atomPath).split('/').filter(Boolean)
  return parts.map((_, i) => parts.slice(0, i + 1).join('/'))
}

const registrySet = (registry: readonly string[]): ReadonlySet<string> => new Set(registry)

/** Nearest index-bearing parent of atomPath (null at root / no parent barrel). */
export function indexBearingParent(
  atomPath: string,
  registry: readonly string[] = ATOM_LEDGER_PATHS,
): string | null {
  const set = registrySet(registry)
  const parts = normalize(atomPath).split('/').filter(Boolean)
  for (let i = parts.length - 1; i >= 1; i--) {
    const prefix = parts.slice(0, i).join('/')
    if (set.has(prefix)) return prefix
  }
  return null
}

/** Index-bearing prefixes from root through atomPath (registry order preserved). */
export function indexBearingChain(
  atomPath: string,
  registry: readonly string[] = ATOM_LEDGER_PATHS,
): readonly string[] {
  const set = registrySet(registry)
  return ancestorPaths(atomPath).filter((p) => set.has(p))
}

export interface PathIndexMerge {
  readonly childPath: string
  readonly parentPath: string | null
  /** Index-bearing ancestors from root → child (inclusive). */
  readonly ledgerChain: readonly string[]
}

/**
 * Compose parent + child path indices — single ledger chain for the full prefix.
 * Parent hooks run before child; phantom intermediate folders (no index.ts) are skipped.
 */
export function mergePathIndices(parentPath: string, childPath: string): PathIndexMerge {
  const child = normalize(childPath)
  const parent = normalize(parentPath)
  if (child !== parent && !child.startsWith(`${parent}/`)) {
    throw new Error(`mergePathIndices: child ${child} not under parent ${parent}`)
  }
  const fullChain = indexBearingChain(child)
  const parentIdx = fullChain.indexOf(parent)
  const ledgerChain = parentIdx >= 0 ? fullChain.slice(parentIdx) : fullChain
  return {
    childPath: child,
    parentPath: parentIdx >= 0 ? parent : indexBearingParent(child),
    ledgerChain,
  }
}

/** One merged entry point per path — precomputed chain from the generated registry. */
export function canonicalPathIndex(atomPath: string): PathIndexMerge {
  const child = normalize(atomPath)
  const chain = MERGED_LEDGER_CHAINS[child] ?? indexBearingChain(child)
  const parent = chain.length > 1 ? chain[chain.length - 2]! : indexBearingParent(child)
  return { childPath: child, parentPath: parent ?? null, ledgerChain: chain }
}

/**
 * Append-only ledger for the merged index chain — ancestors recorded before the leaf.
 * Returns one entry per index-bearing prefix; the last entry is the leaf visit.
 */
export function recordOnPathMerged(
  atomPath: string,
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): readonly PathCanonicalEntry[] {
  const { childPath, ledgerChain } = canonicalPathIndex(atomPath)
  const chain = ledgerChain.length > 0 ? ledgerChain : [childPath]
  const entries: PathCanonicalEntry[] = []
  let prev = prevEntryUuid ?? null
  let s = seq ?? 0
  for (let i = 0; i < chain.length; i++) {
    const p = chain[i]!
    const isLeaf = p === childPath
    const entry = recordOnPath(
      p,
      isLeaf ? payload : { kind: 'path.ancestor', leaf: childPath },
      at,
      prev,
      s,
    )
    entries.push(entry)
    prev = entry.entryUuid
    s++
  }
  return entries
}

export interface PathIndexGapVerdict {
  readonly merged: boolean
  readonly gaps: readonly string[]
  /** Nested registry paths checked (child with index-bearing parent). */
  readonly checked: number
}

/**
 * Gap gate — no index-bearing parent may sit outside the merged ledger chain for its child.
 * Fail-closed: parent barrel + child barrel without merged chain ⇒ gap.
 */
export function assertPathIndicesMerged(
  registry: readonly string[] = ATOM_LEDGER_PATHS,
): PathIndexGapVerdict {
  const gaps: string[] = []
  let checked = 0
  for (const child of registry) {
    if (!child.includes('/')) continue
    const parent = indexBearingParent(child, registry)
    if (!parent) continue
    checked++
    const chain = MERGED_LEDGER_CHAINS[child] ?? indexBearingChain(child, registry)
    if (!chain.includes(parent)) {
      gaps.push(`${child}: unmerged parent ${parent}`)
    }
    if (chain[chain.length - 1] !== child) {
      gaps.push(`${child}: chain does not terminate at child`)
    }
  }
  return { merged: gaps.length === 0, gaps, checked }
}

/** Count nested paths whose parent barrel was outside the chain before merge (audit helper). */
export function countPathIndexGaps(registry: readonly string[] = ATOM_LEDGER_PATHS): number {
  let gaps = 0
  for (const child of registry) {
    if (!child.includes('/')) continue
    const parent = indexBearingParent(child, registry)
    if (!parent) continue
    const chain = indexBearingChain(child, registry)
    if (chain.indexOf(parent) < 0 || chain[chain.length - 1] !== child) gaps++
  }
  return gaps
}
