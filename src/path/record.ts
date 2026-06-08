/**
 * path/record — canonical path ledger: every step content-addressed, append-only.
 *
 * Law: everything on the path is recorded canonically — each visit, ancestor segment,
 * and persist effect appends a sealed entry (entryUuid + prev chain). Pairs with
 * `followEveryPath` via `assertEverythingOnPathRecorded`.
 *
 * Canonical bytes (JCS, RFC 8785):
 *   { kind: "path.canonical", atomPath, at, payloadUuid, prevEntryUuid, seq }
 *   entryUuid = uuid(jcsCanonicalize(envelope))
 *
 * @audit pure; never silent mutation of ledger entries
 * @see ./index.ts · ../seal · ../integrity/uuid-linked-chain
 */
import { uuid, jcsCanonicalize, stripNonContentFields } from '@/integrity'
import { canonicalPathIndex } from './merge'

const normalizeAtomPath = (atomPath: string): string =>
  atomPath.replace(/^src\//, '').replace(/^\//, '').replace(/\/+$/, '')

export const PATH_CANONICAL_KIND = 'path.canonical' as const

/** One append-only ledger row — content-addressed, prev-chained. */
export interface PathCanonicalEntry {
  readonly entryUuid: string
  readonly atomPath: string
  readonly at: string
  readonly payloadUuid: string
  readonly prevEntryUuid: string | null
  readonly seq: number
  readonly kind: string
}

/** Canonical envelope hashed for entryUuid — stable across substrates. */
export interface PathCanonicalEnvelope {
  readonly kind: typeof PATH_CANONICAL_KIND
  readonly atomPath: string
  readonly at: string
  readonly payloadUuid: string
  readonly prevEntryUuid: string | null
  readonly seq: number
}

export const pathCanonicalEnvelope = (args: {
  readonly atomPath: string
  readonly at: string
  readonly payload: unknown
  readonly prevEntryUuid?: string | null
  readonly seq?: number
}): PathCanonicalEnvelope => {
  const atomPath = normalizeAtomPath(args.atomPath)
  const payloadUuid = uuid(jcsCanonicalize(stripNonContentFields(args.payload)))
  return {
    kind: PATH_CANONICAL_KIND,
    atomPath,
    at: args.at,
    payloadUuid,
    prevEntryUuid: args.prevEntryUuid ?? null,
    seq: args.seq ?? 0,
  }
}

export const entryUuidFromEnvelope = (envelope: PathCanonicalEnvelope): string =>
  uuid(jcsCanonicalize(envelope))

/**
 * Content-addressed append — one canonical row for a path step.
 * Returns a new entry; callers append to their ledger (never mutate in place).
 */
export function recordOnPath(
  atomPath: string,
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  const timestamp = at ?? new Date().toISOString()
  const envelope = pathCanonicalEnvelope({ atomPath, at: timestamp, payload, prevEntryUuid, seq })
  const kind =
    typeof payload === 'object' && payload !== null && 'kind' in payload
      ? String((payload as { kind: unknown }).kind)
      : 'path.step'
  return {
    entryUuid: entryUuidFromEnvelope(envelope),
    atomPath: envelope.atomPath,
    at: envelope.at,
    payloadUuid: envelope.payloadUuid,
    prevEntryUuid: envelope.prevEntryUuid,
    seq: envelope.seq,
    kind,
  }
}

const foldRank = (atomPath: string): number => atomPath.split('/').filter(Boolean).length

/** Ordered ledger — path fold depth, then atomPath, then at (append-only replay order). */
export function canonicalPathLedger(entries: readonly PathCanonicalEntry[]): readonly PathCanonicalEntry[] {
  return [...entries].sort((a, b) => {
    const dr = foldRank(a.atomPath) - foldRank(b.atomPath)
    if (dr !== 0) return dr
    const pr = a.atomPath.localeCompare(b.atomPath)
    if (pr !== 0) return pr
    const sr = a.seq - b.seq
    if (sr !== 0) return sr
    return a.at.localeCompare(b.at)
  })
}

export interface PathRecordVerdict {
  readonly recorded: boolean
  readonly total: number
  readonly covered: number
  readonly coverage: number
  readonly missing: readonly string[]
}

/**
 * Gate — every visited path must have at least one ledger entry.
 * Fail-closed: silent steps ⇒ not recorded.
 */
export function assertEverythingOnPathRecorded(
  visitedPaths: ReadonlySet<string> | Iterable<string>,
  ledger: readonly PathCanonicalEntry[],
): PathRecordVerdict {
  const recorded = new Set(ledger.map((e) => e.atomPath))
  const required = [...visitedPaths].map((p) => normalizeAtomPath(p))
  const missing = [...new Set(required)].filter((p) => p.length > 0 && !recorded.has(p))
  const total = new Set(required.filter((p) => p.length > 0)).size
  const covered = total - missing.length
  return {
    recorded: missing.length === 0 && total > 0,
    total,
    covered,
    coverage: total > 0 ? covered / total : 0,
    missing,
  }
}

/** Seal alias — path ledger coverage before persist/seal. */
export const assertPathCanonicallyRecorded = assertEverythingOnPathRecorded

/** Record one path visit — thin hook for session-touched atoms. */
export const recordPathVisit = (
  atomPath: string,
  payload: unknown = { kind: 'path.visit' },
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry => recordOnPath(atomPath, payload, at, prevEntryUuid, seq)

/**
 * Walk `followEveryPath` and build an append-only ledger — merged index-bearing
 * ancestor chains precede each leaf (`recordOnPathMerged` / `canonicalPathIndex`).
 * Pairs lattice coverage with canonical recording for seal/strict-apply gates.
 */
export function ledgerFromPathWalk(
  walk: Iterable<string>,
  at?: string,
): readonly PathCanonicalEntry[] {
  const walkList = [...walk].map((p) => normalizeAtomPath(p)).filter(Boolean)
  const walkSet = new Set(walkList)
  const order: string[] = []
  const seen = new Set<string>()
  for (const p of walkList) {
    const { ledgerChain } = canonicalPathIndex(p)
    const chain = ledgerChain.length > 0 ? ledgerChain : [p]
    for (const prefix of chain) {
      if (!seen.has(prefix)) {
        seen.add(prefix)
        order.push(prefix)
      }
    }
  }
  const entries: PathCanonicalEntry[] = []
  let prev: string | null = null
  let seq = 0
  const timestamp = at ?? new Date().toISOString()
  for (const p of order) {
    const entry = recordOnPath(
      p,
      { kind: walkSet.has(p) ? 'path.visit' : 'path.ancestor', walkSeq: seq },
      timestamp,
      prev,
      seq,
    )
    entries.push(entry)
    prev = entry.entryUuid
    seq++
  }
  return entries
}
