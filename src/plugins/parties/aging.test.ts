/**
 * Unit tests for the shared parties/aging module.
 *
 * Covers:
 *   • daysBetween — date arithmetic
 *   • computeAgingBuckets — the canonical bucket algorithm used by both
 *     A/R and A/P aging calculators
 *   • filterOpenDocuments — pre-filter helper
 *
 * No Payload, no DB — these are pure functions over plain inputs.
 *
 * @standard ISO/IEC-29119:2022 software-testing unit-test-level
 * @standard ISO-8601-1:2019 date-time days-between
 * @accounting IFRS IFRS-9 expected-credit-loss aging-buckets
 * @accounting US-GAAP ASC-326 ASC-310 ASC-405
 * @see docs/STANDARDS.md §5 §7
 */

import { describe, it, expect } from 'vitest'
import {
  daysBetween,
  computeAgingBuckets,
  filterOpenDocuments,
  DEFAULT_AGING_BUCKETS,
} from '@/plugins/parties'

const day = (n: number) => new Date(2026, 0, 1 + n)

describe('parties/aging — daysBetween', () => {
  it('returns 0 for the same date', () => {
    expect(daysBetween(day(0), day(0))).toBe(0)
  })

  it('returns positive when `to` is later', () => {
    expect(daysBetween(day(0), day(7))).toBe(7)
  })

  it('returns negative when `to` is earlier', () => {
    expect(daysBetween(day(7), day(0))).toBe(-7)
  })

  it('accepts ISO 8601 strings', () => {
    expect(daysBetween('2026-01-01', '2026-01-15')).toBe(14)
  })

  it('floors to whole days (no rounding up on partial-day fractions)', () => {
    const a = new Date('2026-01-01T00:00:00Z')
    const b = new Date('2026-01-02T23:00:00Z')
    expect(daysBetween(a, b)).toBe(1)
  })
})

describe('parties/aging — computeAgingBuckets', () => {
  const asOf = day(100)

  it('returns 4 default buckets even when input is empty', () => {
    const r = computeAgingBuckets([], asOf)
    expect(r.buckets).toHaveLength(4)
    expect(r.totalOutstanding).toBe(0)
    expect(r.documentCount).toBe(0)
    expect(r.buckets.map((b) => b.name)).toEqual([
      'Current',
      '31-60 days',
      '61-90 days',
      '90+ days',
    ])
  })

  it('places a not-yet-due doc into "Current"', () => {
    const docs = [{ id: 'a', dueDate: day(110), balance: 1000, status: 'open' }]
    const r = computeAgingBuckets(docs, asOf)
    const current = r.buckets.find((b) => b.name === 'Current')!
    expect(current.totalAmount).toBe(1000)
    expect(current.count).toBe(1)
    expect(current.documentIds).toEqual(['a'])
  })

  it('places 45-day-overdue into "31-60 days"', () => {
    const docs = [{ id: 'b', dueDate: day(55), balance: 500, status: 'open' }] // overdue 45d
    const r = computeAgingBuckets(docs, asOf)
    const sixty = r.buckets.find((b) => b.name === '31-60 days')!
    expect(sixty.count).toBe(1)
    expect(sixty.totalAmount).toBe(500)
  })

  it('places 100-day-overdue into "90+ days"', () => {
    const docs = [{ id: 'c', dueDate: day(0), balance: 200, status: 'open' }] // overdue 100d
    const r = computeAgingBuckets(docs, asOf)
    const ninety = r.buckets.find((b) => b.name === '90+ days')!
    expect(ninety.count).toBe(1)
  })

  it('aggregates totals across docs in the same bucket', () => {
    const docs = [
      { id: 'a', dueDate: day(95), balance: 100, status: 'open' },
      { id: 'b', dueDate: day(98), balance: 200, status: 'open' },
      { id: 'c', dueDate: day(99), balance: 300, status: 'open' },
    ]
    const r = computeAgingBuckets(docs, asOf)
    const current = r.buckets.find((b) => b.name === 'Current')!
    expect(current.count).toBe(3)
    expect(current.totalAmount).toBe(600)
    expect(current.documentIds).toEqual(['a', 'b', 'c'])
  })

  it('skips zero/negative balances', () => {
    const docs = [
      { id: 'a', dueDate: day(0), balance: 0, status: 'open' },
      { id: 'b', dueDate: day(0), balance: -50, status: 'open' },
      { id: 'c', dueDate: day(0), balance: 100, status: 'open' },
    ]
    const r = computeAgingBuckets(docs, asOf)
    expect(r.totalOutstanding).toBe(100)
    expect(r.buckets.flatMap((b) => b.documentIds)).toEqual(['c'])
  })

  it('totalOutstanding equals sum of all bucket totals', () => {
    const docs = [
      { id: '1', dueDate: day(105), balance: 100, status: 'open' }, // current
      { id: '2', dueDate: day(60), balance: 200, status: 'open' }, // 31-60
      { id: '3', dueDate: day(20), balance: 300, status: 'open' }, // 61-90
      { id: '4', dueDate: day(0), balance: 400, status: 'open' }, // 90+
    ]
    const r = computeAgingBuckets(docs, asOf)
    const sum = r.buckets.reduce((s, b) => s + b.totalAmount, 0)
    expect(sum).toBe(r.totalOutstanding)
    expect(r.totalOutstanding).toBe(1000)
  })

  it('honors a custom bucket definition', () => {
    const docs = [
      { id: 'a', dueDate: day(95), balance: 1, status: 'open' },
      { id: 'b', dueDate: day(85), balance: 2, status: 'open' },
    ]
    const customBuckets = [
      { name: '0-7', dayMin: 0, dayMax: 7 },
      { name: '8+', dayMin: 8, dayMax: Infinity },
    ]
    const r = computeAgingBuckets(docs, asOf, customBuckets)
    expect(r.buckets).toHaveLength(2)
    expect(r.buckets[0].name).toBe('0-7')
    expect(r.buckets[1].name).toBe('8+')
  })

  it('default buckets equal DEFAULT_AGING_BUCKETS export', () => {
    expect(DEFAULT_AGING_BUCKETS).toHaveLength(4)
    expect(DEFAULT_AGING_BUCKETS.map((b) => b.name)).toEqual([
      'Current',
      '31-60 days',
      '61-90 days',
      '90+ days',
    ])
  })
})

describe('parties/aging — filterOpenDocuments', () => {
  it('drops paid', () => {
    const docs = [
      { id: 'a', dueDate: day(0), balance: 100, status: 'paid' },
      { id: 'b', dueDate: day(0), balance: 100, status: 'open' },
    ]
    expect(filterOpenDocuments(docs).map((d) => d.id)).toEqual(['b'])
  })

  it('drops zero/negative balances', () => {
    const docs = [
      { id: 'a', dueDate: day(0), balance: 0, status: 'open' },
      { id: 'b', dueDate: day(0), balance: -1, status: 'open' },
      { id: 'c', dueDate: day(0), balance: 1, status: 'open' },
    ]
    expect(filterOpenDocuments(docs).map((d) => d.id)).toEqual(['c'])
  })

  it('keeps non-paid statuses with positive balance', () => {
    const docs = [
      { id: 'a', dueDate: day(0), balance: 100, status: 'partial' },
      { id: 'b', dueDate: day(0), balance: 100, status: 'overdue' },
      { id: 'c', dueDate: day(0), balance: 100, status: 'issued' },
    ]
    expect(filterOpenDocuments(docs)).toHaveLength(3)
  })
})
