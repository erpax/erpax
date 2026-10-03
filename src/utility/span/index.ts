/**
 * utility/span — a span of time, measured once. One divisor, the units derived from it, the
 * roundings a caller must choose between, and the cue-timing codec. Argued in ./SKILL.md.
 *
 * @standard ISO 80000-3 — time: the day as a unit of measure
 * @standard ISO-8601-1:2019 — date-time days-between arithmetic
 * @standard W3C WebVTT — cue timings `HH:MM:SS.mmm`
 */
import { exactAbs, exactCeil, exactFloor, exactMax } from '@/algebra'

// Module-private: a caller asks for a span, never for the divisor. The smaller units are DERIVED,
// so one literal seeds the family and no other appears in the corpus ([[rules]]/unit).
const MS_PER_DAY = 86_400_000
const MS_PER_HOUR = MS_PER_DAY / 24
const MS_PER_MINUTE = MS_PER_HOUR / 60
const MS_PER_SECOND = MS_PER_MINUTE / 60

const msBetween = (from: Date | string, to: Date | string): number =>
  (to instanceof Date ? to : new Date(to)).getTime() - (from instanceof Date ? from : new Date(from)).getTime()

/** `to − from` in whole days, FLOORED — the established face, used by aging buckets. */
export const daysBetween = (from: Date | string, to: Date | string): number =>
  exactFloor(msBetween(from, to) / MS_PER_DAY)

/** `to − from` in whole days, CEILED — the AP/AR reading. They differ by one on a partial day. */
export const daysBetweenCeil = (from: Date | string, to: Date | string): number =>
  exactCeil(msBetween(from, to) / MS_PER_DAY)

/** Unrounded, for a caller that divides again — rounding belongs at the END of a calculation. */
export const daysExact = (from: Date | string, to: Date | string): number =>
  msBetween(from, to) / MS_PER_DAY

/** The distance, never signed. `abs` goes INSIDE the floor, or a negative part-day rounds wrong. */
export const daysApart = (a: Date | string, b: Date | string): number =>
  exactFloor(exactAbs(msBetween(a, b)) / MS_PER_DAY)

/** Never negative: a bill not yet due is zero days overdue, not minus five. */
export const daysOverdue = (dueDate: Date | string, asOfDate: Date | string = new Date()): number =>
  exactMax(0, daysBetweenCeil(dueDate, asOfDate))

export const daysUntil = (dueDate: Date | string, asOfDate: Date | string = new Date()): number =>
  daysBetweenCeil(asOfDate, dueDate)

export const addDays = (date: Date | string, days: number): Date =>
  new Date((date instanceof Date ? date : new Date(date)).getTime() + days * MS_PER_DAY)

export const hoursFromMs = (ms: number): number => ms / MS_PER_HOUR

export const msFromMinutes = (minutes: number): number => minutes * MS_PER_MINUTE

/** The canonical cue timing. Its parser half lived in `transcript`; together they round-trip. */
export const formatClock = (ms: number): string => {
  const pad = (n: number, w = 2): string => String(n).padStart(w, '0')
  return (
    `${pad(exactFloor(ms / MS_PER_HOUR))}:${pad(exactFloor((ms % MS_PER_HOUR) / MS_PER_MINUTE))}` +
    `:${pad(exactFloor((ms % MS_PER_MINUTE) / MS_PER_SECOND))}.${pad(ms % MS_PER_SECOND, 3)}`
  )
}

/** More permissive than {@link formatClock} emits — hours optional, SRT's comma — so both parse. */
export const parseClock = (stamp: string): number => {
  const m = /^(?:(\d+):)?(\d{1,2}):(\d{2})[.,](\d{1,3})$/.exec(stamp.trim())
  if (!m) return Number.NaN
  const [, h, min, sec, frac] = m
  return (
    Number(h ?? 0) * MS_PER_HOUR +
    Number(min) * MS_PER_MINUTE +
    Number(sec) * MS_PER_SECOND +
    Number(frac!.padEnd(3, '0'))
  )
}
