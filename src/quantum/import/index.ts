/**
 * quantum/import — computed barrel entanglement: parseTsImports / parseSkillImports live.
 *
 * Deep imports are escapes that must collapse to `@/x` — the import graph is never
 * hand-drawn.
 *
 *   tsx src/quantum/import/index.ts
 *
 * @audit re-exports boundary organ; computed live, never authored
 * @see ../boundary — ../../convention/import — ./SKILL.md
 */
export {
  parseTsImports,
  parseSkillImports,
  classifyImports,
  computeBoundary,
  verifyBoundary,
} from '@/quantum/boundary'

import { classifyImports } from '@/quantum/boundary'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

/** Import law holds when no deep escapes remain — barrels only. */
export function importLawHolds(specs: readonly string[], root = 'src'): boolean {
  return classifyImports(specs, root).escapes.length === 0
}

/** Canonical ledger hook — record quantum/import path step (append-only). */
export function recordImportOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/import', { kind: 'import.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const { barrels, escapes } = classifyImports(['@/digit', '@/no/such/deep/path'])
  console.log('quantum/import — barrels=' + barrels.join(',') + ' · escapes=' + escapes.join(','))
}
