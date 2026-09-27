import { describe, it, expect } from 'vitest'
import { exactAbs, exactFloor, exactMax } from '@/algebra'
import {
  daysBetween,
  daysBetweenCeil,
  daysApart,
  daysExact,
  daysOverdue,
  daysUntil,
  addDays,
  hoursFromMs,
  msFromMinutes,
  formatClock,
  parseClock,
} from './index'

/**
 * The unit family — one divisor, at one address, seeded by one literal.
 *
 * The day stood at 24 addresses in four notations and the hour and minute at eleven more, while
 * `daysBetween` called itself the single source of truth and three files used it ([[rules]]/unit).
 */
describe('utility — one day, and the roundings that travel with it', () => {
  const t0 = new Date('2026-01-01T00:00:00.000Z')

  it('floor and ceil DISAGREE on a partial day, which is why both are named', () => {
    const half = new Date('2026-01-01T12:00:00.000Z')
    expect(daysBetween(t0, half)).toBe(0)
    expect(daysBetweenCeil(t0, half)).toBe(1)
    // One day of difference moves an invoice across the 0-30 / 31-60 aging boundary, so the choice
    // is accounting policy and is made at the call site rather than buried in a divisor.
  })

  it('daysApart cannot be composed from daysBetween — abs belongs INSIDE the floor', () => {
    const back = new Date('2025-12-31T12:00:00.000Z') // half a day BEFORE t0
    expect(daysApart(t0, back)).toBe(0)
    expect(daysApart(back, t0)).toBe(0) // symmetric
    expect(exactAbs(daysBetween(t0, back))).toBe(1) // the composition a caller would reach for
  })

  it('daysExact keeps the fraction, because rounding belongs at the END of a calculation', () => {
    expect(daysExact(t0, new Date('2026-01-01T06:00:00.000Z'))).toBeCloseTo(0.25, 9)
  })

  it('overdue and remaining floor at zero in opposite directions', () => {
    const later = new Date('2026-01-11T00:00:00.000Z')
    expect(daysOverdue(t0, later)).toBe(10)
    expect(daysOverdue(later, t0)).toBe(0) // not yet due is zero overdue, never minus ten
    expect(daysUntil(later, t0)).toBe(10)
    // "days remaining" is this floored at zero, written at the one site that wants it rather than
    // carried as a second name for the same arithmetic.
    expect(exactMax(0, daysUntil(t0, later))).toBe(0)
  })

  it('addDays is the inverse of a difference, through the same one divisor', () => {
    expect(daysBetween(t0, addDays(t0, 30))).toBe(30)
    expect(addDays(t0, -1).toISOString()).toBe('2025-12-31T00:00:00.000Z')
  })

  it('the smaller units are DERIVED, so one literal seeds the family', () => {
    expect(msFromMinutes(60)).toBe(msFromMinutes(1) * 60)
    expect(hoursFromMs(msFromMinutes(90))).toBe(1.5) // fractional on purpose
    expect(hoursFromMs(msFromMinutes(24 * 60))).toBe(24)
  })

  it('daysApart COMPOSES from daysExact — the order of abs and floor is the whole point', () => {
    const back = new Date('2025-12-31T12:00:00.000Z')
    expect(exactFloor(exactAbs(daysExact(t0, back)))).toBe(daysApart(t0, back))
    // and flooring first does not: that is what makes the composition order load-bearing
    expect(exactAbs(daysBetween(t0, back))).not.toBe(daysApart(t0, back))
  })
})

/**
 * The codec whose two halves lived apart: `capture/media` formatted and `transcript` parsed, each
 * with its own inline unit arithmetic. Together they can state the round-trip.
 */
describe('utility — the cue-timing codec round-trips', () => {
  it('formats the WebVTT canonical form', () => {
    expect(formatClock(0)).toBe('00:00:00.000')
    expect(formatClock(3_723_456)).toBe('01:02:03.456')
  })

  it('parses both dialects — SRT writes the fraction with a comma', () => {
    expect(parseClock('01:02:03.456')).toBe(3_723_456)
    expect(parseClock('01:02:03,456')).toBe(3_723_456)
    expect(parseClock('02:03.456')).toBe(123_456) // hours optional
    expect(parseClock('nonsense')).toBeNaN()
  })

  it('parse ∘ format is the identity — the invariant neither half could state alone', () => {
    for (const ms of [0, 1, 999, 1_000, 61_000, 3_599_999, 3_723_456, 86_399_999]) {
      expect(parseClock(formatClock(ms))).toBe(ms)
    }
  })
})
