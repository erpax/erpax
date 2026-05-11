/**
 * Wallet exchange round-trip tests.
 *
 * Slice LLLLLLLLL-cut3 (2026-05-11). Pins the user's directive:
 * 'blank currency is exchangeable and holdable in wallets'.
 *
 * Five invariants:
 *
 *   1. XXX-wallet → real-wallet exchange settles at the identity
 *      rate, with target-currency decimals applied to the credit.
 *   2. Real-wallet → XXX-wallet exchange settles at identity, with
 *      XXX's 0-decimal rounding applied (1.00 EUR → 1 XXX).
 *   3. Real-wallet → real-wallet exchange routes through the rate
 *      provider; the journal entry's `rateSource` records the level.
 *   4. Insufficient balance returns `{ status: 'failed' }` and does
 *      NOT mutate either wallet.
 *   5. Cross-tenant wallet pair throws (tenant boundary enforced).
 *
 * Uses a fake Payload that records the find/update/create operations
 * so the test verifies the actual mutation sequence — not just the
 * return shape.
 *
 * @standard IFRS 9 §3.2 derecognition / reclassification
 * @standard IFRS 7 §22 fair-value-hierarchy disclosure (rateSource)
 * @audit Conservation Law 53 (blank currency as identity)
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { exchangeWalletBalance } from './index'
import {
  IdentityRateProvider, setDefaultRateProvider,
} from '../currency-fallback'

interface WalletRow {
  id: string
  tenant?: string
  currency?: string
  balanceMinor?: number
}

interface FakeStore {
  wallets: Record<string, WalletRow>
  journals: Array<{ id: string; data: Record<string, unknown> }>
}

function makeFakePayload(store: FakeStore) {
  return {
    findByID: vi.fn(async (args: { collection: string; id: string }) => {
      if (args.collection !== 'wallets') return null
      return store.wallets[args.id] ?? null
    }),
    update: vi.fn(async (args: { collection: string; id: string; data: Record<string, unknown> }) => {
      if (args.collection !== 'wallets') return null
      const w = store.wallets[args.id]
      if (w) Object.assign(w, args.data)
      return w
    }),
    create: vi.fn(async (args: { collection: string; data: Record<string, unknown> }) => {
      if (args.collection !== 'journal-entries') return null
      const id = `je-${store.journals.length + 1}`
      const row = { id, data: args.data }
      store.journals.push(row)
      return { id }
    }),
  }
}

describe('exchangeWalletBalance — blank currency is fully tradeable', () => {
  beforeEach(() => {
    setDefaultRateProvider(IdentityRateProvider)
  })

  it('XXX wallet → EUR wallet at identity rate, 2-decimal target rounding', async () => {
    const store: FakeStore = {
      wallets: {
        'w-xxx': { id: 'w-xxx', tenant: 't', currency: 'XXX', balanceMinor: 1000 },
        'w-eur': { id: 'w-eur', tenant: 't', currency: 'EUR', balanceMinor: 0 },
      },
      journals: [],
    }
    const payload = makeFakePayload(store) as never
    const out = await exchangeWalletBalance({
      payload, tenantId: 't',
      fromWalletId: 'w-xxx', toWalletId: 'w-eur',
      amountMinor: 100,                                // 100 XXX (0 decimals)
    })
    expect(out.status).toBe('settled')
    if (out.status !== 'settled') return
    expect(out.fromCurrency).toBe('XXX')
    expect(out.toCurrency).toBe('EUR')
    expect(out.quote.rate).toBe(1)
    expect(out.quote.source).toBe('identity')
    // 100 XXX (major=100) × 1 = 100 EUR (major) → 10000 EUR cents
    expect(out.toCreditMinor).toBe(10000)
    expect(out.fromBalanceAfterMinor).toBe(900)
    expect(out.toBalanceAfterMinor).toBe(10000)
    expect(store.journals).toHaveLength(1)
    expect((store.journals[0]!.data as { provider: string }).provider).toBe('erpax-wallet-exchange')
  })

  it('EUR wallet → XXX wallet rounds to XXX 0 decimals', async () => {
    const store: FakeStore = {
      wallets: {
        'w-eur': { id: 'w-eur', tenant: 't', currency: 'EUR', balanceMinor: 12345 }, // 123.45 EUR
        'w-xxx': { id: 'w-xxx', tenant: 't', currency: 'XXX', balanceMinor: 0 },
      },
      journals: [],
    }
    const payload = makeFakePayload(store) as never
    const out = await exchangeWalletBalance({
      payload, tenantId: 't',
      fromWalletId: 'w-eur', toWalletId: 'w-xxx',
      amountMinor: 12345,                              // 123.45 EUR
    })
    expect(out.status).toBe('settled')
    if (out.status !== 'settled') return
    // 123.45 × 1 = 123.45 → round to XXX 0 decimals = 123
    expect(out.toCreditMinor).toBe(123)
    expect(out.fromBalanceAfterMinor).toBe(0)
    expect(out.toBalanceAfterMinor).toBe(123)
  })

  it('real-currency pair routes through the configured rate provider', async () => {
    setDefaultRateProvider({
      async quote(from, to, ctx) {
        return {
          fromCurrency: from, toCurrency: to,
          rate: 170, source: 'observed',
          asOf: ctx.asOf ?? '2026-05-11T08:00:00.000Z',
          provenanceUuid: '00000000-0000-5000-8000-rate-prov',
        }
      },
    })
    const store: FakeStore = {
      wallets: {
        'w-eur': { id: 'w-eur', tenant: 't', currency: 'EUR', balanceMinor: 10000 },
        'w-jpy': { id: 'w-jpy', tenant: 't', currency: 'JPY', balanceMinor: 0 },
      },
      journals: [],
    }
    const payload = makeFakePayload(store) as never
    const out = await exchangeWalletBalance({
      payload, tenantId: 't',
      fromWalletId: 'w-eur', toWalletId: 'w-jpy',
      amountMinor: 10000,                              // 100.00 EUR
    })
    expect(out.status).toBe('settled')
    if (out.status !== 'settled') return
    // 100.00 EUR × 170 = 17000 JPY (0 decimals) → 17000 minor
    expect(out.toCreditMinor).toBe(17000)
    expect(out.quote.source).toBe('observed')
    expect(out.quote.provenanceUuid).toBe('00000000-0000-5000-8000-rate-prov')
    // Journal entry records the rate source for IFRS 7 §22 disclosure.
    const je = store.journals[0]!.data as { rateSource: string; rateProvenanceUuid: string }
    expect(je.rateSource).toBe('observed')
    expect(je.rateProvenanceUuid).toBe('00000000-0000-5000-8000-rate-prov')
  })

  it('insufficient balance returns failed status and leaves both wallets untouched', async () => {
    const store: FakeStore = {
      wallets: {
        'w-eur': { id: 'w-eur', tenant: 't', currency: 'EUR', balanceMinor: 500 },
        'w-usd': { id: 'w-usd', tenant: 't', currency: 'USD', balanceMinor: 0 },
      },
      journals: [],
    }
    const payload = makeFakePayload(store) as never
    const out = await exchangeWalletBalance({
      payload, tenantId: 't',
      fromWalletId: 'w-eur', toWalletId: 'w-usd',
      amountMinor: 1000,
    })
    expect(out.status).toBe('failed')
    if (out.status !== 'failed') return
    expect(out.reason).toMatch(/insufficient balance/)
    expect(store.wallets['w-eur']!.balanceMinor).toBe(500)
    expect(store.wallets['w-usd']!.balanceMinor).toBe(0)
    expect(store.journals).toHaveLength(0)
  })

  it('cross-tenant pair throws (tenant boundary enforced)', async () => {
    const store: FakeStore = {
      wallets: {
        'w-a': { id: 'w-a', tenant: 'tenant-A', currency: 'EUR', balanceMinor: 1000 },
        'w-b': { id: 'w-b', tenant: 'tenant-B', currency: 'EUR', balanceMinor: 0 },
      },
      journals: [],
    }
    const payload = makeFakePayload(store) as never
    await expect(
      exchangeWalletBalance({
        payload, tenantId: 'tenant-A',
        fromWalletId: 'w-a', toWalletId: 'w-b',
        amountMinor: 100,
      }),
    ).rejects.toThrow(/belongs to tenant tenant-B/)
  })

  it('XXX wallet → XXX wallet exchange settles 1:1 (identity within blank currency)', async () => {
    const store: FakeStore = {
      wallets: {
        'w-xxx-1': { id: 'w-xxx-1', tenant: 't', currency: 'XXX', balanceMinor: 500 },
        'w-xxx-2': { id: 'w-xxx-2', tenant: 't', currency: 'XXX', balanceMinor: 0 },
      },
      journals: [],
    }
    const payload = makeFakePayload(store) as never
    const out = await exchangeWalletBalance({
      payload, tenantId: 't',
      fromWalletId: 'w-xxx-1', toWalletId: 'w-xxx-2',
      amountMinor: 300,
    })
    expect(out.status).toBe('settled')
    if (out.status !== 'settled') return
    expect(out.fromCurrency).toBe('XXX')
    expect(out.toCurrency).toBe('XXX')
    expect(out.toCreditMinor).toBe(300)
    expect(out.quote.source).toBe('identity')
  })

  it('rejects zero / negative amounts and self-transfers (defensive guards)', async () => {
    const store: FakeStore = {
      wallets: {
        'w-eur': { id: 'w-eur', tenant: 't', currency: 'EUR', balanceMinor: 1000 },
        'w-jpy': { id: 'w-jpy', tenant: 't', currency: 'JPY', balanceMinor: 0 },
      },
      journals: [],
    }
    const payload = makeFakePayload(store) as never
    const zero = await exchangeWalletBalance({
      payload, tenantId: 't',
      fromWalletId: 'w-eur', toWalletId: 'w-jpy',
      amountMinor: 0,
    })
    expect(zero.status).toBe('failed')

    const self = await exchangeWalletBalance({
      payload, tenantId: 't',
      fromWalletId: 'w-eur', toWalletId: 'w-eur',
      amountMinor: 100,
    })
    expect(self.status).toBe('failed')
  })
})
