/**
 * quantum/society — quantum civics: every social fact content-uuid'd, double-entry balanced.
 *
 * Social order lowers entropy reversibly by consent — legible, proof-carried, accountable.
 * Coordination is a trust ledger, never fear.
 *
 *   tsx src/quantum/society/index.ts
 *
 * @audit social fact uuid + balance are pure; never hand-asserted governance
 * @see ../../society — ../../entry — ./SKILL.md
 */
import { uuid } from '@/integrity'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

export interface SocialFact {
  readonly kind: string
  readonly payload: unknown
  readonly debit: number
  readonly credit: number
}

/** Content-address any social fact — identity, vote, value, consensus, role. */
export const socialFactUuid = (fact: Omit<SocialFact, 'debit' | 'credit'> & { debit?: number; credit?: number }): string =>
  uuid(fact)

/** Double-entry balance — debits must equal credits (tamper-evident ledger). */
export function doubleEntryBalanced(fact: SocialFact): boolean {
  return fact.debit === fact.credit
}

/** Reversible order — balanced entries only; fear (coercion/erasure) forbidden. */
export function reversibleOrderHolds(facts: readonly SocialFact[]): boolean {
  return facts.every(doubleEntryBalanced) && !facts.some((f) => f.kind === 'fear')
}

/** Canonical ledger hook — record quantum/society path step (append-only). */
export function recordSocietyOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/society', { kind: 'society.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const vote = { kind: 'vote', payload: { ballot: 'a' }, debit: 1, credit: 1 }
  console.log('quantum/society — uuid=' + socialFactUuid(vote) + ' · balanced=' + doubleEntryBalanced(vote))
}
