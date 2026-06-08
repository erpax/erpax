/**
 * quantum/export — computed public facet: parseTsExports / skillExportName, content-addressed.
 *
 * The export set is algorithmically derived — same bytes ⇒ same boundaryUuid; every
 * cross-atom symbol must be reachable from the atom's index barrel.
 *
 *   tsx src/quantum/export/index.ts
 *
 * @audit re-exports boundary organ; computed live, never authored
 * @see ../boundary — ../../convention/exported — ./SKILL.md
 */
export {
  parseTsExports,
  skillExportName,
  boundaryUuid,
  computeBoundary,
  verifyBoundary,
} from '@/quantum/boundary'

import { parseTsExports, boundaryUuid } from '@/quantum/boundary'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

/** Export boundary flips when any public symbol changes — tamper signal. */
export function exportBoundaryFlips(
  filePath: string,
  before: string,
  after: string,
): boolean {
  const a = boundaryUuid(filePath, [], parseTsExports(before))
  const b = boundaryUuid(filePath, [], parseTsExports(after))
  return a !== b
}

/** Canonical ledger hook — record quantum/export path step (append-only). */
export function recordExportOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/export', { kind: 'export.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const body = 'export const x = 1\nexport function y() {}\n'
  console.log('quantum/export — symbols: ' + parseTsExports(body).join(', '))
}
