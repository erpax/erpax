/**
 * treasury — a public cash office: [[float]] under a rule the private cases do not carry.
 *
 * A government till reconciles exactly as a bank drawer does. What differs is what happens to the
 * variance: public money has no owner who may absorb a shortfall, so an over is not a windfall and
 * a short is not a cost of business — both are REPORTABLE, and the tolerance is zero for the same
 * reason an armoury's is.
 *
 * The mount therefore adds one thing to [[float]]: the disposition of the variance. An over must be
 * surrendered to the consolidated fund rather than carried forward, which is the rule most often
 * broken by a system that simply nets the next day's opening float against today's over.
 *
 * @standard IPSAS 1 — presentation; IPSAS 2 — cash flow statements
 * @standard INTOSAI GOV 9100 — internal control for the public sector
 * @standard ISA 501 — physical count as audit evidence
 */
import { investigable, reconcile, type Session, type Verdict } from '@/float'
import { EURO_TENDER } from '@/currency'

export const atomPath = 'treasury' as const

/** The same euro the branch counts, read from [[currency]] rather than restated. */
export { EURO_TENDER as TENDER }

export type TreasurySession = Session
export type TreasuryVerdict = Verdict

/** What must be done with a variance. Never "carry it forward". */
export type Disposition = 'none' | 'surrender-to-fund' | 'raise-deficiency'

export function reconcileOffice(session: TreasurySession): TreasuryVerdict {
  return reconcile(session, EURO_TENDER)
}

/** Every non-zero variance has a disposition, and neither of them is silence. */
export function disposition(verdict: TreasuryVerdict): Disposition {
  if (verdict.variance > 0) return 'surrender-to-fund'
  if (verdict.variance < 0) return 'raise-deficiency'
  return 'none'
}

/**
 * Reportable at any difference, and at any illegal count.
 *
 * The tolerance is zero and is not a parameter: public money has no owner with standing to absorb
 * a difference, so there is nobody a dial could be set on behalf of.
 */
export function reportable(verdict: TreasuryVerdict): boolean {
  return investigable(verdict)
}
