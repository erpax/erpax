import { describe, expect, it } from 'vitest'

import { datesError, nextLifecycle, periodLabel } from '@/hooks/collections/fiscal-periods/lifecycle'

const base = { stored: {}, actor: 'u2', creator: 'u1', isAdmin: false, now: '2026-11-15T00:00:00.000Z' }

describe('fiscal period lifecycle — every rule reads the field where it is', () => {
  it('derives the label and checks the date order', () => {
    expect(periodLabel({ fiscalYear: 2026, periodNumber: 3 })).toBe('FY2026-P03')
    expect(periodLabel({ fiscalYear: 2026 })).toBeUndefined()
    expect(datesError({ startDate: '2026-03-01', endDate: '2026-03-31' })).toBe(true)
    expect(datesError({ startDate: '2026-03-31', endDate: '2026-03-01' })).toMatch(/ends on or after/)
  })

  it('only an admin locks or unlocks', () => {
    expect(() => nextLifecycle({ ...base, prev: 'closed', next: 'locked' })).toThrow()
    expect(() => nextLifecycle({ ...base, prev: 'locked', next: 'open' })).toThrow()
    expect(nextLifecycle({ ...base, isAdmin: true, prev: 'closed', next: 'locked' })).toMatchObject({ status: 'locked', lockedAt: base.now, lockedBy: 'u2' })
  })

  it('four eyes: the creator neither closes nor locks', () => {
    expect(() => nextLifecycle({ ...base, actor: 'u1', prev: 'open', next: 'closed' })).toThrow(/Four eyes/)
    expect(() => nextLifecycle({ ...base, actor: 'u1', isAdmin: true, prev: 'closed', next: 'locked' })).toThrow(/Four eyes/)
  })

  it('stamps the transition and keeps stored stamps, whatever a caller sends', () => {
    const closed = nextLifecycle({ ...base, prev: 'open', next: 'closed' })
    expect(closed).toMatchObject({ status: 'closed', closedAt: base.now, closedBy: 'u2', lockedAt: null })
    const reopened = nextLifecycle({ ...base, isAdmin: true, prev: 'locked', next: 'open', stored: { closedAt: '2026-04-01T00:00:00.000Z', lockedAt: '2026-04-02T00:00:00.000Z' } })
    expect(reopened).toMatchObject({ status: 'open', closedAt: '2026-04-01T00:00:00.000Z', lockedAt: '2026-04-02T00:00:00.000Z', reopenedAt: base.now })
    expect(nextLifecycle({ ...base, prev: 'open', next: 'open' })).toMatchObject({ closedAt: null, lockedAt: null })
  })
})
