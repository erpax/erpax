/**
 * trading/api/client — the trust wrapper + first-wave clients.
 *
 * Proves the MAX-tamper-cost contract: guardedTradingFetch fails closed on a
 * non-sanctioned host and on an ungranted capability, brokers the per-tenant
 * secret only by granted handle, and emits a uuid-chained receipt pair that
 * `verifyReceiptChain` accepts end-to-end. Plus a no-auth client parse (mocked fetch).
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 * @audit ISO-19011:2018 audit-trail (the receipt chain is the evidence)
 */
import { afterEach, describe, expect, it, vi } from 'vitest'

import { verifyReceiptChain } from '@/receipt'
import {
  guardedTradingFetch,
  tradingGrantFor,
  sanctionedOrigins,
  fetchFrankfurterRates,
  type ApiResult,
} from '@/trading/api/client'

const NOW = '2026-06-07T00:00:00.000Z'
const okPerform = <T,>(data: T) => async (): Promise<ApiResult<T>> => ({ ok: true, data, source: 'test' })

describe('tradingGrantFor / sanctionedOrigins', () => {
  it('seeds allowedHosts from the registry (Frankfurter is an EU FX feed)', () => {
    const origins = sanctionedOrigins('Frankfurter', 'EU')
    expect(origins).toContain('https://api.frankfurter.dev')
    const grant = tradingGrantFor({ provider: 'Frankfurter', region: 'EU', capabilities: ['api'] })
    expect(grant.allowedHosts).toContain('https://api.frankfurter.dev')
    expect(grant.toolUuid).toBe('trading:Frankfurter')
  })

  it('is fail-closed for an unknown provider (no origins)', () => {
    expect(sanctionedOrigins('NoSuchProvider', 'EU')).toHaveLength(0)
  })
})

describe('guardedTradingFetch — gate ⊕ receipt', () => {
  it('allows a sanctioned host and emits a verifiable 2-leaf receipt chain', async () => {
    const grant = tradingGrantFor({ provider: 'Frankfurter', region: 'EU', capabilities: ['api'] })
    const guarded = await guardedTradingFetch({
      provider: 'Frankfurter',
      region: 'EU',
      capability: 'api',
      endpoint: 'https://api.frankfurter.dev/v1/latest',
      grant,
      actor: 'actor-1',
      perform: okPerform({ rate: 1 }),
      nowIso: NOW,
    })
    expect(guarded.result.ok).toBe(true)
    expect(guarded.receipts).toHaveLength(2) // decision + outcome
    expect(guarded.decisions).toHaveLength(2)
    expect(guarded.decisions[1]!.outcome).toBe('allow') // ok ⇒ allow
    expect(guarded.receipt).toBe(guarded.receipts[1]) // tail = outcome leaf
    const verdict = await verifyReceiptChain(guarded.receipts, guarded.decisions)
    expect(verdict.ok).toBe(true)
  })

  it('fails closed on a non-sanctioned host (no fetch, refusal receipted)', async () => {
    const grant = tradingGrantFor({ provider: 'Frankfurter', region: 'EU', capabilities: ['api'] })
    const perform = vi.fn(okPerform({ rate: 1 }))
    const guarded = await guardedTradingFetch({
      provider: 'Frankfurter',
      region: 'EU',
      endpoint: 'https://evil.example.com/steal',
      grant,
      actor: 'actor-1',
      perform,
      nowIso: NOW,
    })
    expect(guarded.result.ok).toBe(false)
    expect(guarded.result.error).toMatch(/not sanctioned/)
    expect(perform).not.toHaveBeenCalled() // never reached the network
    expect(guarded.receipts).toHaveLength(1)
    expect(guarded.decisions[0]!.outcome).toBe('block')
  })

  it('fails closed when the capability is not granted (sanctioned host, wrong verb)', async () => {
    const grant = tradingGrantFor({ provider: 'Frankfurter', region: 'EU', capabilities: ['read'] })
    const perform = vi.fn(okPerform({ rate: 1 }))
    const guarded = await guardedTradingFetch({
      provider: 'Frankfurter',
      region: 'EU',
      capability: 'api', // not in grant.capabilities (['read'])
      endpoint: 'https://api.frankfurter.dev/v1/latest',
      grant,
      actor: 'actor-1',
      perform,
      nowIso: NOW,
    })
    expect(guarded.result.ok).toBe(false)
    expect(perform).not.toHaveBeenCalled()
    expect(guarded.receipts).toHaveLength(1) // decision leaf only
    expect(guarded.decisions[0]!.outcome).toBe('block')
  })

  it('brokers the credential by granted handle and hands it only to perform', async () => {
    const grant = tradingGrantFor({
      provider: 'Frankfurter',
      region: 'EU',
      capabilities: ['api'],
      credentialHandles: ['fx:key'],
    })
    let seen: string | undefined
    const guarded = await guardedTradingFetch({
      provider: 'Frankfurter',
      region: 'EU',
      capability: 'api',
      endpoint: 'https://api.frankfurter.dev/v1/latest',
      grant,
      actor: 'actor-1',
      credentialHandle: 'fx:key',
      resolveSecret: (h) => (h === 'fx:key' ? 'S3CRET' : undefined),
      perform: async (secret) => {
        seen = secret
        return { ok: true, data: { rate: 1 }, source: 'test' }
      },
      nowIso: NOW,
    })
    expect(guarded.result.ok).toBe(true)
    expect(seen).toBe('S3CRET') // brokered to perform
    // The secret must NOT appear in any receipted decision.
    expect(JSON.stringify(guarded.decisions)).not.toContain('S3CRET')
  })

  it('records an err outcome as escalate (failed fetch still receipted)', async () => {
    const grant = tradingGrantFor({ provider: 'Frankfurter', region: 'EU', capabilities: ['api'] })
    const guarded = await guardedTradingFetch({
      provider: 'Frankfurter',
      region: 'EU',
      capability: 'api',
      endpoint: 'https://api.frankfurter.dev/v1/latest',
      grant,
      actor: 'actor-1',
      perform: async () => ({ ok: false, error: 'boom', source: 'test' }),
      nowIso: NOW,
    })
    expect(guarded.result.ok).toBe(false)
    expect(guarded.decisions[1]!.outcome).toBe('escalate')
    const verdict = await verifyReceiptChain(guarded.receipts, guarded.decisions)
    expect(verdict.ok).toBe(true) // an err outcome is still a valid, verifiable receipt
  })
})

describe('first-wave client parse (mocked fetch)', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('fetchFrankfurterRates parses the rates envelope', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        status: 200,
        json: async () => ({ amount: 1, base: 'USD', date: '2026-06-05', rates: { EUR: 0.859, GBP: 0.742 } }),
      })),
    )
    const r = await fetchFrankfurterRates('USD', ['EUR', 'GBP'])
    expect(r.ok).toBe(true)
    expect(r.data?.base).toBe('USD')
    expect(r.data?.rates.EUR).toBeCloseTo(0.859)
    expect(r.source).toBe('Frankfurter')
  })

  it('fetchFrankfurterRates surfaces an HTTP error as a closed ApiResult', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 503, json: async () => ({}) })))
    const r = await fetchFrankfurterRates('USD')
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/503/)
  })
})
