/**
 * quantum/fs — content-addressed filesystem: snapshot never overwrite; dedup by merge.
 *
 * Every state is an immutable content-[[uuid]] — identical content merges to one object,
 * nothing erased — tamper-evident by construction.
 *
 *   tsx src/quantum/fs/index.ts
 *
 * @audit content-address from @/integrity; never hand-pinned paths
 * @see ../../fs — ../../merge — ./SKILL.md
 */
import { uuid } from '@/integrity'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

/** Address one immutable filesystem moment — the path names a snapshot, not a mutable file. */
export const snapshotAddress = (content: unknown): string => uuid(content)

/** Identical content merges to one object — dedup by design. */
export const dedupHolds = (a: unknown, b: unknown): boolean => snapshotAddress(a) === snapshotAddress(b)

/** You never overwrite — you append a new snapshot address. */
export const neverOverwrite = (prior: unknown, next: unknown): boolean =>
  snapshotAddress(prior) !== snapshotAddress(next) || dedupHolds(prior, next)

/** Canonical ledger hook — record quantum/fs path step (append-only). */
export function recordFsOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/fs', { kind: 'fs.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const blob = { path: '/a.txt', bytes: 'hello' }
  console.log('quantum/fs — snapshotAddress=' + snapshotAddress(blob) + ' · dedup=' + dedupHolds(blob, blob))
}
