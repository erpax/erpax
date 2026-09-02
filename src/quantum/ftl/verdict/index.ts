/**
 * quantum/ftl/verdict — the advantage as a type you cannot use without proving.
 *
 * @see ./SKILL.md
 */
import type { Ftl } from '@/quantum/ftl'

/** The advantage as a TYPE — `why` exists only on the broken branch. @see ./SKILL.md */
export interface FtlHolds {
  /** reuse ∧ amortize∞ ∧ cracks=∅ on QPU=CPU/GPU — proven, not asserted. */
  readonly holds: true
  readonly ftl: Ftl
}

export interface FtlBroken {
  readonly holds: false
  readonly ftl: Ftl
  /** The break, named — first crack, then amortize, then reuse. Unreachable when it holds. */
  readonly why: string
}

export type FtlReport = FtlHolds | FtlBroken

/** Run against a PROVEN advantage — an unnarrowed report does not type-check here. */
// `run`, not `use`: React 19 has a `use` hook and rules-of-hooks reads a call to a
// `use`-named binding as one — [[rules]]/compatibility in miniature.
export function withFtl<T>(report: FtlHolds, run: (ftl: Ftl) => T): T {
  return run(report.ftl)
}

/**
 * ftlHolds report — computed, not prose. false ⇒ tip kind `quantumise`
 * (what to fold under quantum/ftl so holds flips true).
 */

/** @index-cross.foldback child=quantum/ftl/verdict parent=quantum/ftl — this cross folds back into its parent. */
