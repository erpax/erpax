/**
 * rules/manifest — a mass edit without a manifest is a sweep, and a sweep leaves cracks.
 *
 * The [[scalpel]] already makes a whole class of damage impossible: a `find` matching zero times or
 * twice REFUSES, a reasonless op refuses, a collision is named before a byte moves, and a batch that
 * fails the ring is restored to its pre-batch bytes. None of that is policy — the engine has no code
 * path that does otherwise.
 *
 * And it changed nothing, because **the scalpel was optional**. In one session, with the scalpel
 * sitting unused two atoms away, hand-rolled sweeps produced: a regex that spliced an import into a
 * doc comment (the import became text, the symbols unbound, an accounting service throwing at
 * runtime); a kill of a corpus-wide materialisation that left **3,184 SKILL.md** half-written and
 * compounding; and a revert whose keep-list silently destroyed the work it was written to preserve.
 * Every one is a case the scalpel refuses or rolls back.
 *
 * That is the corpus's own law about its own gates: **a gate that can be skipped is prose**
 * ([[rules]]). So this axis measures the door rather than the discipline — a changeset touching
 * `threshold` or more files, with no manifest naming the reason for its cuts, is a sweep. The number
 * is the count of sweeps, and the ceiling is where a human decides how wide a blind edit may be.
 *
 * **Honest boundary.** This proves a mass edit was *planned and reasoned*, never that the plan was
 * *wise* — a well-formed manifest can encode a bad idea, which the scalpel says of itself too. It
 * also cannot see edits made outside the repo's own tooling: it reads a changeset, so an agent that
 * writes bytes by another route is invisible to it until those bytes land. It closes the door that
 * was standing open, not every door.
 *
 * @law a changeset above the sweep threshold carries a scalpel manifest — every cut named with its
 *      reason before a byte moves — or it is a sweep, and a sweep is refused.
 * @invariant a changeset below the threshold is never a sweep; at or above it, only a manifest clears it
 * @invariant an empty reason never counts as a manifest — that is the scalpel's own refusal, restated
 * @see ./SKILL.md -- ../../scalpel -- ../../confirm -- ../
 */

/** Files in one changeset before a blind edit counts as a sweep. Declared, in the open, arguable. */
export const SWEEP_THRESHOLD = 8

/** A changeset put to the axis: the files it touches, and the manifest (if any) that planned it. */
export interface Changeset {
  readonly files: readonly string[]
  /** the reasons the manifest attached to its cuts — one per op, empty when there was no manifest */
  readonly reasons: readonly string[]
}

export interface SweepViolation {
  readonly files: number
  readonly reasons: number
  readonly law: 'manifest'
  readonly reason: string
}

/** Is this changeset wide enough that a blind edit would be a sweep? */
export function isMassEdit(changeset: Changeset, threshold: number = SWEEP_THRESHOLD): boolean {
  return changeset.files.length >= threshold
}

/**
 * A manifest covers a changeset only when every op carries a NON-EMPTY reason and there are at least
 * as many reasons as files touched. A reasonless op is the scalpel's own refusal; restating it here
 * means a manifest cannot be satisfied by an empty array of ops.
 */
export function manifestCovers(changeset: Changeset): boolean {
  const real = changeset.reasons.filter((r) => r.trim().length > 0)
  return real.length > 0 && real.length >= changeset.files.length
}

/** The violation, or none — a mass edit with no covering manifest is a sweep. */
export function sweepViolation(
  changeset: Changeset,
  threshold: number = SWEEP_THRESHOLD,
): SweepViolation | undefined {
  if (!isMassEdit(changeset, threshold)) return undefined
  if (manifestCovers(changeset)) return undefined
  const real = changeset.reasons.filter((r) => r.trim().length > 0).length
  return {
    files: changeset.files.length,
    reasons: real,
    law: 'manifest',
    reason:
      `sweep: ${changeset.files.length} files touched with ${real} reasoned cut(s) — a mass edit ` +
      'carries a scalpel manifest (planScalpel names every refusal before a byte moves) or it is blind',
  }
}

/** Every sweep across a set of changesets — the fix list, and the number the ratchet reads. */
export function sweeps(
  changesets: readonly Changeset[],
  threshold: number = SWEEP_THRESHOLD,
): readonly SweepViolation[] {
  return changesets
    .map((c) => sweepViolation(c, threshold))
    .filter((v): v is SweepViolation => v !== undefined)
}

/**
 * Fail closed on getting worse. The ceiling is where a human decides how much blind mass-editing the
 * corpus still tolerates; zero is the horizon, and reaching it means the scalpel is the only door.
 */
export function assertNoSweeps(changesets: readonly Changeset[], ceiling: number): void {
  const found = sweeps(changesets)
  if (found.length > ceiling) {
    throw new Error(
      `rules/manifest: ${found.length} sweep(s) > ceiling ${ceiling}\n` +
        found.map((v) => `  ${v.reason}`).join('\n'),
    )
  }
}

/** @index-cross.foldback child=rules/manifest parent=rules — this cross folds back into its parent. */
