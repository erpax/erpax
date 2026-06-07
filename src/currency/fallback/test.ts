import { describe, it, expect } from 'vitest'
import {
  BLANK_CURRENCY,
  resolveCurrency,
  isBlankCurrency,
  currencyDecimals,
  currenciesCompatible,
  currencyDisplayLabel,
  realtimeRate,
  convertMoney,
  aggregateBalancesAcrossCurrencies,
} from '@/currency/fallback'

describe('currency/fallback — resolveCurrency (the identity element)', () => {
  it('normalises null/undefined to the blank currency', () => {
    expect(resolveCurrency(undefined)).toBe(BLANK_CURRENCY)
    expect(resolveCurrency(null)).toBe(BLANK_CURRENCY)
  })

  it('normalises empty + whitespace-only strings to the blank currency', () => {
    expect(resolveCurrency('')).toBe(BLANK_CURRENCY)
    expect(resolveCurrency('   ')).toBe(BLANK_CURRENCY)
  })

  it('passes real codes through, trimming whitespace', () => {
    expect(resolveCurrency('EUR')).toBe('EUR')
    expect(resolveCurrency('  JPY  ')).toBe('JPY')
  })

  it('is idempotent on the blank currency', () => {
    expect(resolveCurrency(BLANK_CURRENCY)).toBe(BLANK_CURRENCY)
  })
})

describe('currency/fallback — isBlankCurrency', () => {
  it('is true exactly for blank inputs', () => {
    expect(isBlankCurrency(null)).toBe(true)
    expect(isBlankCurrency('')).toBe(true)
    expect(isBlankCurrency('XXX')).toBe(true)
    expect(isBlankCurrency('EUR')).toBe(false)
  })
})

describe('currency/fallback — currencyDecimals', () => {
  it('blank currency has 0 decimals', () => {
    expect(currencyDecimals(BLANK_CURRENCY)).toBe(0)
    expect(currencyDecimals(null)).toBe(0)
  })

  it('unknown ISO codes default to 2 decimals', () => {
    expect(currencyDecimals('NOK')).toBe(2)
  })
})

describe('currency/fallback — compatibility (blank is universal)', () => {
  it('same real currency is compatible', () => {
    expect(currenciesCompatible('EUR', 'EUR')).toBe(true)
  })

  it('blank is compatible with anything', () => {
    expect(currenciesCompatible('EUR', 'XXX')).toBe(true)
    expect(currenciesCompatible('XXX', 'JPY')).toBe(true)
    expect(currenciesCompatible('EUR', null)).toBe(true)
  })

  it('distinct real currencies are not compatible', () => {
    expect(currenciesCompatible('EUR', 'JPY')).toBe(false)
  })
})

describe('currency/fallback — display label', () => {
  it('blank renders as the em-dash', () => {
    expect(currencyDisplayLabel(null)).toBe('—')
    expect(currencyDisplayLabel('XXX')).toBe('—')
  })

  it('real code renders as itself', () => {
    expect(currencyDisplayLabel('EUR')).toBe('EUR')
  })
})

describe('currency/fallback — realtimeRate identity short-circuit', () => {
  const ctx = { tenantId: 't1', asOf: '2026-06-07T00:00:00.000Z' }

  it('same currency yields identity rate', async () => {
    const q = await realtimeRate('EUR', 'EUR', ctx)
    expect(q.rate).toBe(1)
    expect(q.source).toBe('identity')
  })

  it('blank on either side yields identity rate', async () => {
    const a = await realtimeRate('EUR', 'XXX', ctx)
    const b = await realtimeRate('XXX', 'JPY', ctx)
    expect(a.rate).toBe(1)
    expect(a.source).toBe('identity')
    expect(b.rate).toBe(1)
    expect(b.source).toBe('identity')
  })

  it('attaches a stable provenance uuid', async () => {
    const a = await realtimeRate('EUR', 'XXX', ctx)
    const b = await realtimeRate('EUR', 'XXX', ctx)
    expect(a.provenanceUuid).toBeDefined()
    expect(a.provenanceUuid).toBe(b.provenanceUuid)
  })

  it('degrades to identity for distinct real currencies (default provider)', async () => {
    // Core ships the IdentityRateProvider, so EUR→JPY also resolves to 1.
    const q = await realtimeRate('EUR', 'JPY', ctx)
    expect(q.rate).toBe(1)
    expect(q.source).toBe('identity')
  })
})

describe('currency/fallback — convertMoney', () => {
  const ctx = { tenantId: 't1', asOf: '2026-06-07T00:00:00.000Z' }

  it('blank source converts at identity with target decimals applied', async () => {
    const out = await convertMoney(100, null, 'EUR', ctx)
    expect(out.amount).toBe(100)
    expect(out.currency).toBe('EUR')
    expect(out.quote.source).toBe('identity')
  })

  it('rounds to the target currency decimals (JPY → 0 dp)', async () => {
    const out = await convertMoney(1234.5, 'JPY', 'JPY', ctx)
    expect(out.currency).toBe('JPY')
    expect(Number.isInteger(out.amount)).toBe(true)
  })
})

describe('currency/fallback — portfolio aggregation', () => {
  const ctx = { tenantId: 't1', asOf: '2026-06-07T00:00:00.000Z' }

  it('sums wallets into the presentation currency and flags blank-leg fallback', async () => {
    const result = await aggregateBalancesAcrossCurrencies(
      [
        { id: 'w1', currency: 'EUR', balance: 1000 },
        { id: 'w2', currency: 'XXX', balance: 500 },
      ],
      'EUR',
      ctx,
    )
    expect(result.presentationCurrency).toBe('EUR')
    // identity rates throughout → straight sum.
    expect(result.totalBalance).toBe(1500)
    // the XXX leg is a real fallback (its currency !== presentation).
    expect(result.hasIdentityFallback).toBe(true)
    expect(result.perWallet).toHaveLength(2)
  })

  it('same-currency-only aggregation is not a fallback', async () => {
    const result = await aggregateBalancesAcrossCurrencies(
      [{ id: 'w1', currency: 'EUR', balance: 10 }],
      'EUR',
      ctx,
    )
    expect(result.hasIdentityFallback).toBe(false)
  })
})
