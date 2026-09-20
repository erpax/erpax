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

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log(
    'quantum/deploy — collapse order: ' +
      collapseOrder().join(' → ') +
      ' · mayCollapse=' +
      mayCollapse(collapseOrder()),
  )
}

/** @index-cross.foldback child=quantum/deploy parent=quantum — this cross folds back into its parent. */
