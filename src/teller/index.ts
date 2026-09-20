/**
 * teller — the branch counter: a cash drawer mounted on [[float]].
 *
 * Everything structural — the derived total, the signed variance, the void-on-illegal-count rule —
 * lives in [[float]], because a casino tray and a bureau till obey the same law. What is teller's
 * OWN is the unit set (what the euro issues) and the branch's thresholds. That split is the point:
 * when the reconciliation law changes it changes once, and no case can drift from it.
 *
 * @standard ISO 4217 — EUR, minor units
 * @standard ECB — euro legal tender denominations
 * @standard ISA 501 — physical count as audit evidence
 */
import { illegalUnits, needsDualControl as dualControl, reconcile, type Count, type Session, type Verdict } from '@/float'
import { EURO_TENDER } from '@/currency'

export const atomPath = 'teller' as const

/**
 * What a drawer may be counted in — the euro's own list, read from [[currency]] rather than
 * restated here. A drawer counted in anything else has not been counted.
 */
export { EURO_TENDER as DENOMINATIONS }

/**
 * DECLARED branch policy: the four-eyes floor.
 *
 * There is no exported TOLERANCE any more. It was zero, and a caller never needed the VALUE — only
 * the behaviour, which `investigable` already gives at its own default of zero. An exported
 * constant a caller reads but never varies is a static a theorem could fold ([[matrix]] calls it a
 * crack), and three of them across these cases said the same nothing.
 */
export const DUAL_CONTROL_THRESHOLD = 1000000

/** A teller's shift is a [[float]] session counted in euro cash. */
export type DrawerShift = Session
export type DrawerCount = Count
export type DrawerVerdict = Verdict

/** Reconcile the drawer against euro legal tender. */
export function reconcileDrawer(shift: DrawerShift): DrawerVerdict {
  return reconcile(shift, EURO_TENDER)
}

/**
 * The face is preserved. [[rules]]/face: a refactor may move matter anywhere and may add to a face
 * freely, but it may never quietly take a name away — a caller writing `import { countTotal } from
 * '@/teller'` must keep working after the reconciliation law moved into [[float]].
 */
export { countTotal, expectedClose, investigable } from '@/float'
export type { Count, Movement, Session, Units, Verdict } from '@/float'

/**
 * Four-eyes at the BRANCH's floor. Re-exporting the core's version would have kept the name and
 * silently dropped the default — the caller's second argument was the branch policy, and without
 * it every amount compared against `undefined` and returned false. A four-eyes check that answers
 * "no" to everything is the fail-open case [[rules]]/unraised names, and a test caught it: that is
 * the boundary [[rules]]/face states about itself — a preserved NAME is not a preserved MEANING.
 */
export function needsDualControl(amount: number, threshold: number = DUAL_CONTROL_THRESHOLD): boolean {
  return dualControl(amount, threshold)
}

/** Euro denominations the count claims that the ECB does not issue. */
export function illegalDenominations(count: DrawerCount): readonly number[] {
  return illegalUnits(count, EURO_TENDER)
}
