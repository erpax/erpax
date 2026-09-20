/**
 * casino — the table tray and the cage: chip floats mounted on [[float]].
 *
 * A gaming table opens with a chip float, takes and pays through the session, and is counted at
 * close. That is the SAME structure as a bank drawer, so it is the same code — only the unit set
 * and the thresholds differ. Nothing here re-implements a variance.
 *
 * Chips are denominated in the house's own scale, which is why the units are a PARAMETER rather
 * than a constant: a table's tray, the cage and a tournament set are three unit sets in one house,
 * and hard-coding one of them would make the other two uncountable.
 *
 * @standard ISO 4217 — currency and minor units
 * @standard ISA 501 — physical count as audit evidence
 */
import { needsDualControl as dualControl, reconcile, type Session, type Units, type Verdict } from '@/float'

export const atomPath = 'casino' as const

/**
 * A common European cash-chip scale in MINOR UNITS (€1 · 5 · 25 · 100 · 500 · 1,000 · 5,000).
 * DECLARED, and a default only — a house supplies its own scale, and `reconcileTray` takes it.
 */
export const CHIPS: Units = [500000, 100000, 50000, 10000, 2500, 500, 100]

/**
 * Four-eyes at the table. The floor is DECLARED house policy and lives as this function's default
 * rather than as an exported constant — a caller either accepts the house floor or passes its own,
 * and neither needs to read the number out of the module.
 */
export function needsSecondAuthoriser(amount: number, floor = 500000): boolean {
  return dualControl(amount, floor)
}

export type TraySession = Session
export type TrayVerdict = Verdict

/** Reconcile a tray or cage against the house's own chip scale. */
export function reconcileTray(session: TraySession, chips: Units = CHIPS): TrayVerdict {
  return reconcile(session, chips)
}

/**
 * The drop: what the table took in, net of what it paid out — the movements alone, without the
 * opening float. Kept separate from the variance because they answer different questions: the drop
 * is the table's RESULT, the variance is whether the count can be believed at all.
 */
export function drop(session: TraySession): number {
  return session.movements.reduce((sum, m) => sum + m.amount, 0)
}
