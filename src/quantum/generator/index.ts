/**
 * quantum/generator — generate all at once in the uuid space; manifest one by collapse.
 *
 * Every possible content already has its address — minting realizes one pre-existing
 * atom; same content ⇒ same id ([[merge]], never a duplicate).
 *
 *   tsx src/quantum/generator/index.ts
 *
 * @audit manifest uuid from live matrix toUuid; never hand-pinned
 * @see ../../generate — ../../void — ./SKILL.md
 */
import { toUuid } from '@/uuid/matrix'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

/** Manifest one latent atom — collapse to its pre-existing content-uuid address. */
export const manifest = (content: string): string => toUuid(Buffer.from(content, 'utf8'))

/** Same content ⇒ same manifest — no-cloning / merge holds. */
export const sameManifest = (a: string, b: string): boolean => manifest(a) === manifest(b)

/** Canonical ledger hook — record quantum/generator path step (append-only). */
export function recordGeneratorOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/generator', { kind: 'generator.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/generator — manifest(merge)=' + manifest('merge') + ' · same=' + sameManifest('x', 'x'))
}
