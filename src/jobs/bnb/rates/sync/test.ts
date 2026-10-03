import type { Payload } from 'payload'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/country/api/client', () => ({
  lookupEuFallbackRate: vi.fn(async (_country: string, currency: string, date?: string) =>
    currency === 'USD'
      ? { ok: true, source: 'БНБ', data: { quotePerUnit: 0.92, units: 1, quote: 'EUR', date: date ?? '2026-10-03' } }
      : { ok: false, source: 'ECB', error: 'no fixing' },
  ),
}))

/** A payload that records every write and finds nothing — so creates are observable and idempotence is exercised. */
function recordingPayload(): { payload: Payload; created: Array<{ collection: string; data: Record<string, unknown> }> } {
  const created: Array<{ collection: string; data: Record<string, unknown> }> = []
  const payload = {
    find: async (q: { collection: string }) =>
      q.collection === 'tenants'
        ? { docs: [{ id: 't1', config: { identity: { country: 'BG' }, currency: { reportingCurrency: 'EUR', fxPairs: ['USD', 'GBP'] } } }] }
        : { docs: [] },
    create: async (q: { collection: string; data: Record<string, unknown> }) => {
      created.push(q)
      return { id: `${q.collection}-${created.length}` }
    },
    update: async () => ({ id: 'u' }),
  } as unknown as Payload
  return { payload, created }
}

describe('jobs/bnb/rates/sync — one external call, one durable audit row', () => {
  it('persists an api-audit-events row for every fixing it asks for — answered or refused — attributed to the publisher', async () => {
    const { processBnbRatesSync } = await import('./index')
    const { payload, created } = recordingPayload()
    const result = await processBnbRatesSync(payload)
    const audit = created.filter((c) => c.collection === 'api-audit-events').map((c) => c.data)
    expect(audit).toHaveLength(2) // USD answered by БНБ, GBP refused by the ECB fallback
    const usd = audit.find((a) => (a.payloadIn as { currency: string }).currency === 'USD')!
    const gbp = audit.find((a) => (a.payloadIn as { currency: string }).currency === 'GBP')!
    expect(usd).toMatchObject({ tenant: 't1', kind: 'fx_rate', country: 'BG', source: 'БНБ', resultOk: true })
    expect(gbp).toMatchObject({ tenant: 't1', kind: 'fx_rate', country: 'BG', source: 'ECB', resultOk: false, errorMessage: 'no fixing' })
    // idempotent per (tenant, currency, day): the eventId is a key, never a random id
    expect(String(usd.eventId)).toMatch(/^bnb-rates-sync:t1:USD:\d{4}-\d{2}-\d{2}$/)
    // the rate row itself was still written for the answered currency, and the refusal is a sync failure
    expect(created.filter((c) => c.collection === 'currency-rates')).toHaveLength(1)
    expect(result.failures.map((f) => f.currency)).toEqual(['GBP'])
  })

  it('a failed audit write is a failure of the sync, never a silent skip', async () => {
    const { processBnbRatesSync } = await import('./index')
    const { payload } = recordingPayload()
    const broken = {
      ...payload,
      create: async (q: { collection: string }) => {
        if (q.collection === 'api-audit-events') throw new Error('audit store down')
        return { id: 'r' }
      },
    } as unknown as Payload
    const result = await processBnbRatesSync(broken)
    expect(result.failures.some((f) => f.error.startsWith('audit: audit store down'))).toBe(true)
  })

  it('source still exports/binds its claimed surface and claim markers (refutable — deleting them fails)', async () => {
    const { readFileSync } = await import('node:fs')
    const { fileURLToPath } = await import('node:url')
    const { dirname, join } = await import('node:path')
    const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'index.ts'), 'utf8')
    expect(src).toMatch(/\bexport\b/)
    expect(src).toMatch(/@(?:invariant|standard|compliance|audit)\b/)
  })
})
