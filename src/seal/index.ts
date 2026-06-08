/**
 * seal — the cross of every guardian into ONE whole-corpus verdict.
 *
 * SEALED iff every guardian holds (the AND of the immune cells). Fail-closed: an
 * EMPTY set of guardians is NOT a seal — nothing checked is not the same as nothing
 * wrong. Pure (no fs, no process) ⇒ regression-locked by test.ts. This is the verdict
 * the auto-commit/push waves gate on (@/confirm): only a sealed tree may be committed.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability — the decision is a pure function
 * @see ./SKILL.md (the law) · ../guardian (one axis each) · ../law/folder (folder's two guardians sealed)
 */
import type { GuardianVerdict } from '@/guardian'

export interface SealVerdict {
  readonly sealed: boolean
  readonly guardians: readonly GuardianVerdict[]
  readonly reason: string
}

/** Cross the guardians: sealed only when all hold; an empty set is fail-closed. */
export function seal(guardians: readonly GuardianVerdict[]): SealVerdict {
  if (!Array.isArray(guardians) || guardians.length === 0)
    return { sealed: false, guardians: [], reason: 'no guardians — an empty set is NOT sealed (fail-closed)' }
  const broken = guardians.filter((g) => !g.ok)
  const sealed = broken.length === 0
  return {
    sealed,
    guardians,
    reason: sealed
      ? `sealed — all ${guardians.length} guardian(s) hold`
      : `NOT sealed — ${broken.length}/${guardians.length} guardian(s) red:\n` + broken.map((g) => '  ✗ ' + g.reason).join('\n'),
  }
}
