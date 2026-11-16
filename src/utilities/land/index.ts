/**
 * land — the landing decision, the twin of Arrival.lean: a push has landed exactly when something
 * judged it, nothing failed, and nothing of it is still running. `scripts/land.ts` measures the facts
 * (the PR's required checks, its merge state, the Deployed run) and asks this module what to do next;
 * every refusal here is a theorem there.
 */

/** Arrival.lean `landed`: judged, nothing failed, nothing pending. Unmeasured is never a pass. */
export const landed = (judged: boolean, failed: boolean, pending: boolean): boolean => judged && !failed && !pending

/** Arrival.lean `agreed`: the check passed and this commit is live. */
export const agreed = (checkFailed: boolean, liveIsThis: boolean): boolean => !checkFailed && liveIsThis
/** Arrival.lean `refused`: the check failed and nothing contradicts it. */
export const refused = (checkFailed: boolean, liveIsThis: boolean): boolean => checkFailed && !liveIsThis
/** Arrival.lean `contradicted`: the check failed, yet this commit is live. Neither a landing nor a refusal. */
export const contradicted = (checkFailed: boolean, liveIsThis: boolean): boolean => checkFailed && liveIsThis

/** A check as `gh pr checks --json bucket` reports it. */
export interface Check {
  readonly name: string
  readonly bucket: 'pass' | 'fail' | 'pending' | 'skipping' | 'cancel' | string
}

/** The three facts Arrival.lean decides on, read from a PR's required checks. A cancelled check is a failure. */
export const readingOf = (checks: readonly Check[]): { judged: boolean; failed: boolean; pending: boolean } => ({
  judged: checks.some((c) => c.bucket === 'pass' || c.bucket === 'fail' || c.bucket === 'cancel'),
  failed: checks.some((c) => c.bucket === 'fail' || c.bucket === 'cancel'),
  pending: checks.some((c) => c.bucket === 'pending'),
})

/** What the pipeline does next with a PR. */
export type Step = 'wait' | 'update' | 'reconcile' | 'merge' | 'stop'

/**
 * The next step, from the required checks and GitHub's merge state:
 * - a failed required check stops
 * - conflicts are reconciled
 * - a branch behind main is updated
 * - an unfinished or unmeasured run waits
 * - a landed PR GitHub calls mergeable is merged
 * Anything else stops (a review or a rule GitHub enforces that the checks do not show).
 */
export const nextStep = (checks: readonly Check[], mergeState: string): Step => {
  const { judged, failed, pending } = readingOf(checks)
  if (failed) return 'stop'
  if (mergeState === 'DIRTY') return 'reconcile'
  if (mergeState === 'BEHIND') return 'update'
  if (!landed(judged, failed, pending)) return 'wait'
  return ['CLEAN', 'UNSTABLE', 'HAS_HOOKS'].includes(mergeState) ? 'merge' : mergeState === 'UNKNOWN' ? 'wait' : 'stop'
}

/**
 * The files the repository generates. A merge conflict in them is settled by taking main's copy and
 * regenerating, never by picking a side by hand; a conflict anywhere else is a judgment the pipeline
 * leaves to a person.
 */
export const GENERATED = [
  'README.md',
  '.github/SPONSORS.md',
  'CITATION.cff',
  '.zenodo.json',
  'docs/STANDARDS_INDEX.md',
  'src/payload-types.ts',
  'src/app/(payload)/admin/importMap.js',
  'src/utilities/verify/lean/inventory.generated.json',
] as const

/** Whether every conflicted path is a generated file the pipeline can regenerate. */
export const reconcilable = (conflicts: readonly string[]): boolean =>
  conflicts.every((path) => (GENERATED as readonly string[]).includes(path))
