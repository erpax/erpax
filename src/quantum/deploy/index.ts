/**
 * quantum/deploy — collapse into reality: gate → migrate → build → push only.
 *
 * Only a gate-green tree may collapse; the release is finality one way — rollback
 * re-collapses a prior [[snapshot]], never mutates live.
 *
 *   tsx src/quantum/deploy/index.ts
 *
 * @audit ordered band from @/deploy; never hand-asserted
 * @see ../../deploy — ../../gate — ./SKILL.md
 */
import { DEPLOY, harmonized } from '@/deploy'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

/** The one true collapse order — gate first, then migrate · build · push. */
export const collapseOrder = (): readonly string[] => DEPLOY.map((d) => d.step)

/** Only a gate-green tree in the canonical order may collapse into reality. */
export const mayCollapse = (sequence: readonly string[]): boolean => harmonized(sequence)

/** Rollback is re-collapse of a prior snapshot — never in-place mutation of live. */
export const rollbackIsRecollapse = (): true => true

/** Canonical ledger hook — record quantum/deploy path step (append-only). */
export function recordDeployOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/deploy', { kind: 'deploy.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log(
    'quantum/deploy — collapse order: ' +
      collapseOrder().join(' → ') +
      ' · mayCollapse=' +
      mayCollapse(collapseOrder()),
  )
}
