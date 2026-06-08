/**
 * seal — the cross of every guardian into ONE whole-corpus verdict.
 *
 * SEALED iff every guardian holds (the AND of the immune cells). Fail-closed: an
 * EMPTY set of guardians is NOT a seal — nothing checked is not the same as nothing
 * wrong. Pure (no fs, no process) ⇒ regression-locked by test.ts. This is the verdict
 * the auto-commit/push waves gate on (@/confirm): only a sealed tree may be committed.
 *
 * **Propagation law:** parentSealed ⇒ ∀ child sealed. An unsealed parent (missing
 * trinity, phantom prefix, impure diamond) forbids any descendant from reporting sealed
 * — the child seal is subsumed by the parent envelope ([[readme]]/deriveFolderModel).
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability — the decision is a pure function
 * @see ./SKILL.md (the law) · ../guardian (one axis each) · ../law/folder (folder's two guardians sealed)
 */
import type { GuardianVerdict } from '@/guardian'

/** Immediate parent atom path, or null at root / single-segment paths. */
export function parentAtomPath(atomPath: string): string | null {
  const i = atomPath.lastIndexOf('/')
  return i > 0 ? atomPath.slice(0, i) : null
}

/**
 * Seal propagation — child sealed only when locally sealed AND every ancestor holds.
 * Fail-closed: parent unsealed ⇒ child never sealed (save(thought) ⇐ isDiamond).
 */
export function assertSealPropagation(localSealed: boolean, ancestorsSealed: boolean): boolean {
  return localSealed && ancestorsSealed
}

/**
 * Walk path prefixes — every atom ancestor must be sealed; a phantom prefix
 * (path segment with no SKILL.md atom) is unsealed and forbids descendants.
 * Pure on injected predicates (no fs).
 */
export function sealPropagatedFromAncestors(
  atomPath: string,
  localSealed: boolean,
  isAtom: (path: string) => boolean,
  ancestorSealed: (path: string) => boolean,
): boolean {
  if (!localSealed) return false
  const parts = atomPath.split('/')
  for (let i = 1; i < parts.length; i++) {
    const prefix = parts.slice(0, i).join('/')
    if (!isAtom(prefix)) return false
    if (!ancestorSealed(prefix)) return false
  }
  return true
}

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
