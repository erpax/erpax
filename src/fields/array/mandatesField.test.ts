import { describe, expect, it } from 'vitest'

import { addMonths, mandateError, mandateExpiry, mandatesField, sequenceStateOf } from '@/fields/array/mandatesField'

describe('mandatesField — a customer carries its own SEPA mandates (EPC130-08)', () => {
  it('is one array on the party', () => {
    expect(mandatesField()).toMatchObject({ name: 'mandates', type: 'array' })
  })

  it('adds calendar months, clamping the day to the month end', () => {
    expect(addMonths('2026-01-31T00:00:00.000Z', 1)).toBe('2026-02-28T00:00:00.000Z')
    expect(addMonths('2024-02-29T00:00:00.000Z', 36)).toBe('2027-02-28T00:00:00.000Z')
    expect(addMonths('not a date', 1)).toBeNull()
  })

  it('expires 36 months after the last collection, or after signature if never collected', () => {
    expect(mandateExpiry(null, '2026-03-10T00:00:00.000Z')).toBe('2029-03-10T00:00:00.000Z')
    expect(mandateExpiry('2027-05-01T00:00:00.000Z', '2026-03-10T00:00:00.000Z')).toBe('2030-05-01T00:00:00.000Z')
    expect(mandateExpiry(null, null)).toBeNull()
  })

  it('its sequence state follows the dates, and a submitted final collection stays', () => {
    const now = '2026-11-15T00:00:00.000Z'
    expect(sequenceStateOf({ signatureDate: '2026-01-01T00:00:00.000Z' }, now)).toBe('pending_first')
    expect(sequenceStateOf({ signatureDate: '2026-01-01T00:00:00.000Z', lastCollectionAt: '2026-06-01T00:00:00.000Z' }, now)).toBe('active_recurring')
    expect(sequenceStateOf({ signatureDate: '2020-01-01T00:00:00.000Z' }, now)).toBe('expired')
    expect(sequenceStateOf({ signatureDate: '2020-01-01T00:00:00.000Z', sequenceState: 'final_submitted' }, now)).toBe('final_submitted')
  })

  it('a direct debit collects only against an active, unexpired mandate of the tenant', () => {
    const on = '2026-11-20T00:00:00.000Z'
    const active = { mandateId: 'M-1', status: 'active', expiryDate: '2029-01-01T00:00:00.000Z' }
    expect(mandateError(undefined, undefined, on)).toMatch(/names the mandate/)
    expect(mandateError('M-9', undefined, on)).toMatch(/No mandate M-9/)
    expect(mandateError('M-1', { ...active, status: 'revoked' }, on)).toMatch(/is revoked/)
    expect(mandateError('M-1', { ...active, expiryDate: '2026-01-01T00:00:00.000Z' }, on)).toMatch(/expired on 2026-01-01/)
    expect(mandateError('M-1', active, on)).toBe(true)
  })
})

describe('mandatesField — a mandate id is used once', () => {
  it('refuses an id repeated on the party or held by another party', async () => {
    const { mandateIdError } = await import('@/fields/array/mandatesField')
    expect(mandateIdError('M-1', 1, 0)).toBe(true)
    expect(mandateIdError('M-1', 2, 0)).toMatch(/already in use/)
    expect(mandateIdError('M-1', 1, 1)).toMatch(/already in use/)
    expect(mandateIdError(undefined, 0, 0)).toBe(true)
  })
})
