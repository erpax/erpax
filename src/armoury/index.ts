/**
 * armoury — sensitive items held, issued, returned and counted: [[float]] with a unit set of one.
 *
 * A weapon or a round of ammunition is counted in ITEMS, so the unit set is `{1}` and the "total"
 * is a headcount. That makes the mount look trivial, and the triviality is the finding: an armoury
 * ledger and a cash drawer are the same control, and the only reason they are usually written
 * twice is that one says "euro" and the other says "rounds".
 *
 * TOLERANCE IS ZERO AND IS NOT A POLICY DIAL. A branch may absorb a cent; an armoury absorbs
 * nothing — one item unaccounted for is the whole event, and a tolerance parameter here would be a
 * way to make it disappear. So `investigable` is called with the default and the constant is stated
 * rather than configured.
 *
 * @standard ISA 501 — physical count as audit evidence
 * @standard ISO/IEC 27001 A.5.9 — inventory of assets; A.7.9 — assets off-premises
 */
import { investigable, reconcile, type Session, type Units, type Verdict } from '@/float'

export const atomPath = 'armoury' as const

/** Items are counted one at a time. There is no larger unit, and no fractional one. */
export const ITEMS: Units = [1]

export type ArmourySession = Session
export type ArmouryVerdict = Verdict

/** Reconcile an armoury against its issue and return movements. */
export function reconcileArmoury(session: ArmourySession): ArmouryVerdict {
  return reconcile(session, ITEMS)
}

/**
 * Any discrepancy at all is reportable. The tolerance is zero and is deliberately NOT a parameter
 * and NOT an exported constant: either would be a supported way to make one item disappear, and
 * one item unaccounted for is the whole event.
 */
export function reportable(verdict: ArmouryVerdict): boolean {
  return investigable(verdict)
}

/**
 * Items issued and not yet returned: the open custody chain, derived from the movements.
 *
 * Summed as magnitudes rather than negated. Negating a sum of zero yields `-0`, which is a real
 * value that formats as "-0" on a custody report — a test caught it, and an armoury report reading
 * "-0 outstanding" is the kind of detail that makes a reader distrust the whole sheet.
 */
export function outstanding(session: ArmourySession): number {
  return session.movements.reduce((sum, m) => sum + (m.amount < 0 ? -m.amount : 0), 0)
}
