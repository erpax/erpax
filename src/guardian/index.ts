/**
 * guardian — one independent, fail-closed ratchet over a SINGLE violation axis.
 *
 * The immune cell the [[gate]] is built from. Pure (no fs, no process) so it is
 * regression-locked by test.ts. The whole point is INDEPENDENCE: a guardian's
 * verdict depends only on its own axis count and baseline, so a violation on that
 * axis is caught on its own and can never be masked by a fix on another axis. Many
 * guardians cross into one `seal` (@/seal).
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability — the decision is a pure function
 * @see ./SKILL.md (the law) · ../seal (the cross of guardians) · ../law/folder (two instances: name · trinity)
 */

export interface GuardianVerdict {
  readonly ok: boolean
  /** The single axis this guardian watches (e.g. 'name', 'trinity', 'import'). */
  readonly axis: string
  readonly violations: number
  readonly baseline: number
  readonly reason: string
}

/**
 * The pure guardian decision. Fail-closed: a non-finite / negative count or
 * baseline (a broken scan or literal) is NEVER a pass — a guardian that cannot
 * run did not pass. The only ok path is a finite count ≤ a finite baseline.
 */
export function guardian({ axis, violations, baseline }: { axis: string; violations: number; baseline: number }): GuardianVerdict {
  if (!Number.isFinite(violations) || violations < 0)
    return { ok: false, axis, violations, baseline, reason: `${axis}: violation count is not a finite, non-negative number — scan failed (DENY)` }
  if (!Number.isFinite(baseline) || baseline < 0)
    return { ok: false, axis, violations, baseline, reason: `${axis}: baseline is not a finite, non-negative number (DENY)` }
  if (violations > baseline)
    return {
      ok: false,
      axis,
      violations,
      baseline,
      reason: `${axis}: rose ${violations - baseline} above the baseline (${violations} > ${baseline}) — caught on its own axis. Fix it; this axis cannot get worse.`,
    }
  return {
    ok: true,
    axis,
    violations,
    baseline,
    reason:
      violations < baseline
        ? `${axis}: improved (${violations} < ${baseline}) — lower this axis' baseline to ${violations} in this commit to ratchet the gain`
        : `${axis}: held at the baseline (${violations})`,
  }
}
