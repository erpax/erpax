import { describe, it, expect } from 'vitest'
import { asOf, isHistoricalQuery } from '@/beyond/bitemporal'
import type { BitemporalCoordinates } from '@/beyond/types'

// Law 14 — bitemporal: two clocks (system-time recordedAt × valid-time validAt).
// isHistoricalQuery is the pure past/future gate; asOf is the pending temporal read
// that refuses rather than fabricates.
describe('beyond/bitemporal — system-time × valid-time', () => {
  it('isHistoricalQuery is true when recordedAt is in the past', () => {
    const coords: BitemporalCoordinates = {
      recordedAt: new Date(Date.now() - 60_000).toISOString(),
      validAt: new Date().toISOString(),
    }
    expect(isHistoricalQuery(coords)).toBe(true)
  })

  it('isHistoricalQuery is false when recordedAt is in the future', () => {
    const coords: BitemporalCoordinates = {
      recordedAt: new Date(Date.now() + 60_000).toISOString(),
      validAt: new Date().toISOString(),
    }
    expect(isHistoricalQuery(coords)).toBe(false)
  })

  it('asOf refuses (ok:false) with a reason — the temporal read is a deliberate stub, never a guess', async () => {
    const res = await asOf({
      collection: 'invoices',
      id: 'inv-1',
      tenantId: 't-1',
      coords: {
        recordedAt: new Date().toISOString(),
        validAt: new Date().toISOString(),
      },
    })
    expect(res.ok).toBe(false)
    expect(typeof res.reason).toBe('string')
    expect(res.reason.length).toBeGreaterThan(0)
  })
})
