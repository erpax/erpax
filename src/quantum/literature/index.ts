/**
 * quantum/literature — infinite word-chain: identical text collapses to one id.
 *
 * Every text is content-addressed — editions and copies merge to one work; plagiarism
 * is a detected id-collision.
 *
 *   tsx src/quantum/literature/index.ts
 *
 * @audit text uuid from @/integrity; never hand-pinned canon
 * @see ../../word — ../../merge — ./SKILL.md
 */
import { uuid } from '@/integrity'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

/** Content-address a text — same bytes ⇒ same work id. */
export const workUuid = (text: string): string => uuid({ kind: 'literature', text })

/** Editions and copies merge — identical content is one work. */
export const sameWork = (a: string, b: string): boolean => workUuid(a) === workUuid(b)

/** Plagiarism is a detected collision — same uuid, different claimed authorship is impurity. */
export function plagiarismCollision(a: string, b: string): boolean {
  return a !== b && workUuid(a) === workUuid(b)
}

/** Canonical ledger hook — record quantum/literature path step (append-only). */
export function recordLiteratureOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/literature', { kind: 'literature.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const t = 'To be or not to be'
  console.log('quantum/literature — workUuid=' + workUuid(t) + ' · sameWork=' + sameWork(t, t))
}
