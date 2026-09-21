/**
 * float — a stock of value, opened, moved, counted independently, reconciled. See SKILL.md.
 *
 * @standard ISO 4217 — currency and minor units
 * @standard ISA 501 — physical count as audit evidence
 */
import { exactAbs } from '@/algebra'

export const atomPath = 'float' as const

/** The discrete values this kind of float may be counted in, in minor units. Descending. */
export type Units = readonly number[]

/** How many of each unit are present. A count, never a sum. */
export type Count = Readonly<Partial<Record<number, number>>>

/** Units the count claims that this float does not deal in, or quantities that are not whole non-negative numbers. See SKILL.md. */
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

/** The total the count implies, in minor units. See SKILL.md. */
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

/** Reconcile a session against its unit set. The variance is SIGNED and never an absolute value. See SKILL.md. */
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

/** Does this verdict go to an investigation? See SKILL.md. */
export function investigable(verdict: Verdict, tolerance = 0): boolean {
  return verdict.illegal.length > 0 || exactAbs(verdict.variance) > tolerance
}

/** Four-eyes: a single movement at or above the threshold needs a second authoriser, either way. */
export function needsDualControl(amount: number, threshold: number): boolean {
  return exactAbs(amount) >= threshold
}
