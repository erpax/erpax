import { describe, it, expect } from 'vitest'
import {
  DEFAULT_AGING_BUCKETS,
  computeAgingBuckets,
  filterOpenDocuments,
  canTransition,
  transitionOrThrow,
  reachableStates,
  terminalStates,
  daysBetween,
} from '@/party'

describe('party', () => {
  // ── DEFAULT_AGING_BUCKETS ────────────────────────────────────────────────
  it('DEFAULT_AGING_BUCKETS has 4 canonical keys in order', () => {
    const keys = DEFAULT_AGING_BUCKETS.map((b) => b.key)
    expect(keys).toEqual(['current', 'aging', 'overdue', 'stale'])
  })

  it('DEFAULT_AGING_BUCKETS day-ranges are contiguous from 0 to Infinity', () => {
    const buckets = DEFAULT_AGING_BUCKETS
    expect(buckets[0].dayMin).toBe(0)
    expect(buckets[3].dayMax).toBe(Infinity)
    for (let i = 1; i < buckets.length; i++) {
      expect(buckets[i].dayMin).toBe(buckets[i - 1].dayMax + 1)
    }
  })

  // ── filterOpenDocuments ──────────────────────────────────────────────────
  it('filterOpenDocuments removes paid and zero-balance documents', () => {
    const docs = [
      { id: '1', dueDate: new Date(), balance: 100, status: 'open' },
      { id: '2', dueDate: new Date(), balance: 0, status: 'open' },
      { id: '3', dueDate: new Date(), balance: 200, status: 'paid' },
    ]
    const open = filterOpenDocuments(docs)
    expect(open).toHaveLength(1)
    expect(open[0].id).toBe('1')
  })

  // ── computeAgingBuckets ──────────────────────────────────────────────────
  it('computeAgingBuckets places a 0-day-past-due doc in the current bucket', () => {
    const asOf = new Date('2024-03-01')
    const doc = { id: 'a', dueDate: new Date('2024-03-01'), balance: 500, status: 'open' }
    const { buckets, totalOutstanding, documentCount } = computeAgingBuckets([doc], asOf)
    const current = buckets.find((b) => b.key === 'current')!
    expect(current.totalAmount).toBe(500)
    expect(current.documentIds).toContain('a')
    expect(totalOutstanding).toBe(500)
    expect(documentCount).toBe(1)
  })

  it('computeAgingBuckets places a 45-day-past-due doc in the aging bucket', () => {
    const asOf = new Date('2024-03-01')
    const doc = { id: 'b', dueDate: new Date('2024-01-16'), balance: 300, status: 'open' }
    const { buckets } = computeAgingBuckets([doc], asOf)
    const aging = buckets.find((b) => b.key === 'aging')!
    expect(aging.totalAmount).toBe(300)
  })

  it('computeAgingBuckets skips docs with zero or negative balance', () => {
    const asOf = new Date('2024-03-01')
    const docs = [
      { id: 'z', dueDate: new Date('2024-01-01'), balance: 0, status: 'open' },
    ]
    const { totalOutstanding } = computeAgingBuckets(docs, asOf)
    expect(totalOutstanding).toBe(0)
  })

  // ── canTransition / transitionOrThrow ────────────────────────────────────
  const table = {
    draft: ['pending', 'cancelled'] as const,
    pending: ['approved', 'rejected'] as const,
    approved: ['paid'] as const,
    paid: [] as const,
    rejected: [] as const,
    cancelled: [] as const,
  } as const

  it('canTransition returns true for a legal edge', () => {
    expect(canTransition(table, 'draft', 'pending')).toBe(true)
  })

  it('canTransition returns false for an illegal edge', () => {
    expect(canTransition(table, 'paid', 'draft')).toBe(false)
  })

  it('transitionOrThrow returns the target state on a legal transition', () => {
    expect(transitionOrThrow(table, 'pending', 'approved')).toBe('approved')
  })

  it('transitionOrThrow throws with the allowed set on an illegal transition', () => {
    expect(() => transitionOrThrow(table, 'paid', 'draft', 'invoice')).toThrow(
      /terminal state/,
    )
  })

  // ── reachableStates / terminalStates ─────────────────────────────────────
  it('reachableStates from draft includes all non-dead-end states', () => {
    const reachable = reachableStates(table, 'draft')
    expect(reachable.has('draft')).toBe(true)
    expect(reachable.has('pending')).toBe(true)
    expect(reachable.has('paid')).toBe(true)
  })

  it('terminalStates are states with no outgoing transitions', () => {
    const terminals = terminalStates(table)
    expect(terminals.sort()).toEqual(['cancelled', 'paid', 'rejected'].sort())
  })

  // ── daysBetween (re-exported from @/utility/calculations) ────────────────
  it('daysBetween computes whole-day difference correctly', () => {
    const a = new Date('2024-01-01')
    const b = new Date('2024-01-31')
    expect(daysBetween(a, b)).toBe(30)
  })
})
