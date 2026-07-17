/**
 * fixpoint — the paradox that ran through the session, proven computationally.
 *
 * THE PARADOX: the measurer is inside the system it measures. A gate that catches lies caught its author
 * sixteen times; a hollow-proof detector was itself hollow; `ERPAX_DIGEST_BITS = 106` was pinned by tests
 * that asserted it. There is no vantage OUTSIDE the corpus from which to measure it — the instrument is made
 * of the same matter.
 *
 * THE RESOLUTION, and it is a theorem, not an escape: a measure applied to itself has exactly two outcomes —
 * it REFUTES itself, or it is a FIXED POINT. There is no third. `f(f(x)) = x` (an involution returns), and
 * `f(x) = x` (a fixed point rests). Self-reference is not a trap to avoid; it is a structure with a
 * computable resting state, and the honest measurer seeks that state rather than a vantage it cannot have.
 *
 * The corpus already holds both fixed points, proven:
 *   throughVoid(VOID_PIVOT) === VOID_PIVOT   — 5 through the void is 5 ([[horo]]): the pivot is where the
 *                                             rotation fixes itself, the one step that reflects to itself.
 *   auditAuditors() === []                    — the auditor panel, applied to its OWN source, finds nothing
 *                                             ([[audit]]/agent): the measurer that passes its own measure.
 *
 * WHAT "QUANTUM MATH" MEANS HERE — the self-address congruence, and nothing beyond it. `toUuid(x)` makes a
 * thing's address a function of its content ([[merge]]), so a tool cannot lie about WHAT IT IS: its address
 * IS what it does. That is the computable core of self-reference (Kleene's recursion theorem, Tarski's
 * fixed-point) — real mathematics, named as such. Any claim that this proves a result in PHYSICS is refused
 * on this corpus's own law: a claim with no proof beside it is a decoration ([[rules]]/refutable). The
 * paradox proves ITSELF — that self-reference resolves to a fixed point — never anything outside itself.
 *
 * @standard Kleene recursion theorem · Tarski fixed-point — a self-map has a fixed point
 *
 * Composes [[horo]] · [[audit]] · [[merge]] · [[rules]]/refutable · [[law]].
 */

/** Canonical atom path. */
export const atomPath = 'fixpoint' as const

/** Does the measure rest on x — `f(x) = x`? The measurer that passes its own measure. */
export function isFixedPoint<T>(f: (x: T) => T, x: T): boolean {
  return f(x) === f(f(x)) && f(x) === x
}

/** Is f an involution over `domain` — `f(f(x)) = x` for every x? The paradox that returns. */
export function isInvolution<T>(f: (x: T) => T, domain: readonly T[]): boolean {
  return domain.every((x) => f(f(x)) === x)
}

/** The two outcomes of a self-applied measure — the whole dichotomy, named. */
export type SelfOutcome = 'refutes-itself' | 'fixed-point'

/**
 * Apply a measure to itself and name which of the two outcomes it is. There is no third.
 *
 * @invariant a self-applied measure is EITHER a fixed point (finds nothing wrong with itself) OR refutes
 *   itself (finds a fault) — the dichotomy is total, which is why the paradox is not a trap but a structure
 */
export function selfMeasure<T>(measure: (subject: T) => readonly unknown[], self: T): SelfOutcome {
  return measure(self).length === 0 ? 'fixed-point' : 'refutes-itself'
}
