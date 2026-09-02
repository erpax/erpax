import { describe, it, expect } from 'vitest'
import { severityRank, atLeast, violationKey } from './index'
import type { ViolationEvent } from './index'

const v = (over: Partial<ViolationEvent> = {}): ViolationEvent =>
  ({
    id: 'v1',
    source: 'rules',
    atomPath: 'a/b',
    accountCode: 'a/b',
    detail: 'detail',
    severity: 'warning',
    scannedAt: '2026-01-01T00:00:00.000Z',
    ...over,
  }) as ViolationEvent

describe('monitor/violation — the singular model beside the plural store', () => {
  it('orders severities info < warning < error', () => {
    expect(severityRank('info')).toBeLessThan(severityRank('warning'))
    expect(severityRank('warning')).toBeLessThan(severityRank('error'))
  })

  it('an UNKNOWN severity ranks lowest — a typo may not manufacture an error', () => {
    expect(severityRank('shouty' as never)).toBe(0)
    expect(atLeast(v({ severity: 'shouty' as never }), 'error')).toBe(false)
  })

  it('atLeast clears its floor and REFUSES below it', () => {
    expect(atLeast(v({ severity: 'error' }), 'warning')).toBe(true)
    expect(atLeast(v({ severity: 'info' }), 'warning')).toBe(false)
  })

  it('the same finding twice is ONE row; a different detail is not', () => {
    expect(violationKey(v())).toBe(violationKey(v({ id: 'v2', severity: 'error' })))
    expect(violationKey(v())).not.toBe(violationKey(v({ detail: 'other' })))
  })
})
