/**
 * float — a stock of value, opened, moved, counted independently, reconciled.
 *
 * A bank teller's drawer, a casino table tray, a bureau's till and a desk's position are the SAME
 * STRUCTURE wearing four vocabularies: something is opened with a float, signed movements pass
 * through it, and at close somebody COUNTS it in discrete units. The count either agrees with the
 * book or it does not, and by how much and in which direction.
 *
 * So the law lives here once and each case mounts it with its own unit set ([[rules]]/copy: one
 * truth at one address; three reconcilers would be one implementation and two decoys).
 *
 * THE CONTROL, and the reason the unit set is not optional: whoever can enter a closing TOTAL can
 * always make the float balance — enter what the book expects and the difference disappears. A
 * count expressed as UNITS cannot do that, because the total is derived from items claimed to be
 * physically present. That is this corpus's computed-not-typed law ([[rules]]/ask) applied to
 * value, and it is the difference between a control and a formality.
 *
 * A "float" here is a stock of value and never a floating-point number — every amount is in MINOR
 * UNITS, because 0.1 + 0.2 is not 0.3 in binary and a till out by a hundredth reports noise.
 *
 * @standard ISO 4217 — currency and minor units
 * @standard ISA 501 — physical count as audit evidence
 */
export const atomPath = 'float' as const

/** The discrete values this kind of float may be counted in, in minor units. Descending. */
export type Units = readonly number[]

/** How many of each unit are present. A count, never a sum. */
export type Count = Readonly<Partial<Record<number, number>>>

/**
 * Units the count claims that this float does not deal in, or quantities that are not whole
 * non-negative numbers. Either makes the count unusable as evidence — and a count that is unusable
 * must not silently become a total.
 */
export function illegalUnits(count: Count, units: Units): readonly number[] {
  const legal = new Set<number>(units)
  return Object.keys(count)
    .map(Number)
    .filter((u) => {
      const q = count[u]
      return !legal.has(u) || typeof q !== 'number' || !Number.isInteger(q) || q < 0
    })
    .sort((a, b) => b - a)
}

/**
 * The total the count implies, in minor units. DERIVED — there is deliberately no parameter for a
 * total, because a supplied total is exactly what this atom exists to refuse.
 */
export function countTotal(count: Count): number {
  return Object.keys(count).reduce((sum, k) => sum + Number(k) * (count[Number(k)] ?? 0), 0)
}

/** One movement through the float during the session. Positive in, negative out. */
export interface Movement {
  readonly amount: number
  readonly reference?: string
}

/** A session: what it opened with, what moved, and what was physically counted at close. */
export interface Session {
  readonly opening: number
  readonly movements: readonly Movement[]
  readonly counted: Count
}

/** What the book says should be present: the opening float plus everything that moved. */
export function expectedClose(session: Session): number {
  return session.movements.reduce((sum, m) => sum + m.amount, session.opening)
}

export type FloatState = 'balanced' | 'over' | 'short'

export interface Verdict {
  readonly expected: number
  readonly counted: number
  /** counted − expected. SIGNED: over and short are different findings. */
  readonly variance: number
  readonly state: FloatState
  /** Units the count claims that this float does not deal in. Non-empty ⇒ the count is void. */
  readonly illegal: readonly number[]
}

/**
 * Reconcile a session against its unit set.
 *
 * The variance is SIGNED and never an absolute value. An over is not a smaller kind of short: a
 * short may be an error or a loss, while an over means value entered that no movement recorded —
 * the more interesting finding, and the one an absolute value erases.
 */
export function reconcile(session: Session, units: Units): Verdict {
  const expected = expectedClose(session)
  const counted = countTotal(session.counted)
  const variance = counted - expected
  return {
    expected,
    counted,
    variance,
    state: variance === 0 ? 'balanced' : variance > 0 ? 'over' : 'short',
    illegal: illegalUnits(session.counted, units),
  }
}

/**
 * Does this verdict go to an investigation? An illegal count always does, whatever it totals — a
 * count that agrees by accident with the book is still not evidence.
 */
export function investigable(verdict: Verdict, tolerance = 0): boolean {
  return verdict.illegal.length > 0 || Math.abs(verdict.variance) > tolerance
}

/** Four-eyes: a single movement at or above the threshold needs a second authoriser, either way. */
export function needsDualControl(amount: number, threshold: number): boolean {
  return Math.abs(amount) >= threshold
}
