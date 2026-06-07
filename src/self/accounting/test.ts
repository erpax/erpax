import { describe, it, expect } from 'vitest'
import {
  bookRevenue,
  bookCost,
  scheduleFiling,
  scheduleObligation,
  listRevenues,
  listCosts,
  listFilings,
  listObligations,
  checkSelfAccountingComplete,
} from '@/self/accounting'

// self-accounting — erpax books itself (Conservation Law 26). The module holds
// per-tenant ledgers in module-scope Maps, so every test uses a UNIQUE tenant id
// to stay deterministic and isolated. We assert the REAL invariants the matter
// computes: bookings accumulate per tenant, and checkSelfAccountingComplete is
// GREEN only when no revenue is unbooked, no filing overdue, no obligation overdue.
let seq = 0
const tenant = (): string => `erpax-platform-test-${Date.now()}-${seq++}`

describe('self/accounting — double-entry gateway (Law 26)', () => {
  it('bookRevenue appends to the tenant ledger and stamps bookedAt', () => {
    const t = tenant()
    expect(listRevenues(t)).toHaveLength(0)
    const r = bookRevenue(t, {
      source: 'stripe',
      tenantId: 'customer-1',
      amountCents: 5000,
      currency: 'EUR',
      recognitionMethod: 'over-time',
      performanceObligationsSatisfied: ['hosting'],
      journalEntryId: 'JE-1',
    })
    expect(typeof r.bookedAt).toBe('string')
    expect(Date.parse(r.bookedAt)).not.toBeNaN()
    expect(r.amountCents).toBe(5000)
    expect(listRevenues(t)).toHaveLength(1)
    expect(listRevenues(t)[0]).toBe(r)
  })

  it('bookCost / scheduleFiling / scheduleObligation each accumulate per tenant', () => {
    const t = tenant()
    bookCost(t, {
      source: 'cloudflare',
      category: 'infra',
      amountCents: 100,
      currency: 'EUR',
      periodStart: '2026-01-01',
      periodEnd: '2026-01-31',
    })
    scheduleFiling(t, {
      framework: 'VAT',
      periodEnd: '2026-01-31',
      jurisdiction: 'BG',
      dueAt: '2026-02-15T00:00:00.000Z',
    })
    scheduleObligation(t, {
      kind: 'vat-remittance',
      amountCents: 200,
      currency: 'EUR',
      dueAt: '2026-02-15T00:00:00.000Z',
      creditor: 'tax-authority',
    })
    expect(listCosts(t)).toHaveLength(1)
    expect(listFilings(t)).toHaveLength(1)
    expect(listObligations(t)).toHaveLength(1)
  })

  it('list* return [] for an unknown tenant', () => {
    const t = tenant()
    expect(listRevenues(t)).toEqual([])
    expect(listCosts(t)).toEqual([])
    expect(listFilings(t)).toEqual([])
    expect(listObligations(t)).toEqual([])
  })

  it('a fresh tenant with nothing booked is OK (vacuously balanced)', () => {
    const v = checkSelfAccountingComplete(tenant())
    expect(v.ok).toBe(true)
    expect(v.unbookedRevenues).toBe(0)
    expect(v.overdueFilings).toHaveLength(0)
    expect(v.overdueObligations).toHaveLength(0)
  })

  it('revenue without a journalEntryId counts as unbooked → gate RED', () => {
    const t = tenant()
    bookRevenue(t, {
      source: 'manual',
      tenantId: 'customer-2',
      amountCents: 1,
      currency: 'EUR',
      recognitionMethod: 'point-in-time',
      performanceObligationsSatisfied: [],
      // journalEntryId intentionally omitted → unbooked
    })
    const v = checkSelfAccountingComplete(t)
    expect(v.unbookedRevenues).toBe(1)
    expect(v.ok).toBe(false)
  })

  it('an unfiled filing past its dueAt is overdue → gate RED', () => {
    const t = tenant()
    scheduleFiling(t, {
      framework: 'FINREP',
      periodEnd: '2020-01-01',
      jurisdiction: 'BG',
      dueAt: '2020-02-01T00:00:00.000Z', // long past
    })
    const v = checkSelfAccountingComplete(t)
    expect(v.overdueFilings).toHaveLength(1)
    expect(v.overdueFilings[0].framework).toBe('FINREP')
    expect(v.ok).toBe(false)
  })

  it('an unpaid obligation past its dueAt is overdue → gate RED', () => {
    const t = tenant()
    scheduleObligation(t, {
      kind: 'payroll',
      amountCents: 999,
      currency: 'EUR',
      dueAt: '2020-02-01T00:00:00.000Z', // long past
      creditor: 'staff',
    })
    const v = checkSelfAccountingComplete(t)
    expect(v.overdueObligations).toHaveLength(1)
    expect(v.overdueObligations[0].kind).toBe('payroll')
    expect(v.ok).toBe(false)
  })

  it('a future, unfiled/unpaid filing+obligation is NOT yet overdue → gate GREEN', () => {
    const t = tenant()
    const future = new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString()
    scheduleFiling(t, { framework: 'CSRD', periodEnd: '2026-12-31', jurisdiction: 'BG', dueAt: future })
    scheduleObligation(t, {
      kind: 'regulator-fee',
      amountCents: 10,
      currency: 'EUR',
      dueAt: future,
      creditor: 'regulator',
    })
    const v = checkSelfAccountingComplete(t)
    expect(v.overdueFilings).toHaveLength(0)
    expect(v.overdueObligations).toHaveLength(0)
    expect(v.ok).toBe(true)
  })
})
