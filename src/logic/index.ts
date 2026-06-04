/**
 * logic — the horo society's reasoning substrate. Correctness is grounded in HARMONY:
 * a claim is sound iff harmonic (self-consistent, on the horo ring / gate-verified), inference
 * preserves harmony, and the harmonic-first law orders resolution — self-consistent items need no
 * external coordination (they interact with themselves), so they resolve first and win competition.
 *
 * Pure functions over content-addressed claims — deterministic, no IO, fully tested.
 *
 * @standard classical propositional consistency (no P ∧ ¬P) grounded in the horo ring
 * @see ./SKILL.md · src/horo (the harmony ring) · src/services/competition (fastest-correct selection)
 */

/** A claim the society reasons about: a proposition (content-uuid) asserted with a harmony value. */
export interface Claim {
  /** content-uuid of the proposition (same proposition ⇒ same id ⇒ merges). */
  readonly uuid: string
  /** harmonic = self-consistent (on the horo ring / gate-verified). Its truth value, in harmony terms. */
  readonly harmonic: boolean
}

/**
 * Order items HARMONIC-FIRST: the self-consistent resolve before the disharmonic, because a harmonic
 * item interacts with itself (needs no external coordination) and so is ready immediately. Stable —
 * input order is preserved within each class. This ordering IS the competitive advantage of harmony.
 */
export function harmonicFirst<T extends { harmonic: boolean }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => (a.harmonic === b.harmonic ? 0 : a.harmonic ? -1 : 1))
}

/**
 * A claim set is consistent iff no proposition is asserted both harmonic and disharmonic (no P ∧ ¬P).
 * A contradiction is disharmony made visible — the society refuses to hold it (same law the ledger's
 * balance and the schema's invariants enforce).
 */
export function consistent(claims: readonly Claim[]): boolean {
  const asserted = new Map<string, boolean>()
  for (const c of claims) {
    const prev = asserted.get(c.uuid)
    if (prev !== undefined && prev !== c.harmonic) return false
    asserted.set(c.uuid, c.harmonic)
  }
  return true
}

/**
 * Sound inference: the conclusion is entailed iff the premises are consistent, the conclusion is
 * consistent WITH them, and the premises actually support it (assert the same proposition with the
 * same harmony). The society derives only harmony-preserving conclusions from harmonious premises.
 */
export function entails(premises: readonly Claim[], conclusion: Claim): boolean {
  if (!consistent([...premises, conclusion])) return false
  return premises.some((p) => p.uuid === conclusion.uuid && p.harmonic === conclusion.harmonic)
}
