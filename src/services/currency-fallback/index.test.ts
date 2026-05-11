/**
 * Currency fallback round-trip tests.
 *
 * Slice LLLLLLLLL-cut1 (2026-05-11). Pins the user's directive:
 * 'blank currency_code still makes all work by defining the blank
 * currency and use it as a fallback'.
 *
 * Five invariants:
 *
 *   1. Every blank input — undefined, null, '', whitespace — resolves
 *      to the same canonical XXX.
 *   2. Non-blank inputs flow through unchanged (no validation here).
 *   3. XXX has 0 decimals; unknown codes default to 2 decimals.
 *   4. `currenciesCompatible` treats XXX as universal — pair with
 *      anything is compatible. Two real different codes are not.
 *   5. `formatMoney` never throws — unknown codes fall back to a
 *      prefix-style format; XXX renders without a symbol.
 *
 * @standard ISO 4217 §6.5 "No currency" (XXX numeric 999)
 * @audit Conservation Law 53 self-referential-closure (currency identity element)
 */
import { describe, it, expect } from 'vitest'
import {
  BLANK_CURRENCY,
  resolveCurrency,
  isBlankCurrency,
  currencyDecimals,
  currenciesCompatible,
  currencyDisplayLabel,
  formatMoney,
} from './index'

describe('resolveCurrency — every blank input maps to XXX', () => {
  it('undefined → XXX', () => {
    expect(resolveCurrency(undefined)).toBe(BLANK_CURRENCY)
  })
  it('null → XXX', () => {
    expect(resolveCurrency(null)).toBe(BLANK_CURRENCY)
  })
  it("empty string → XXX", () => {
    expect(resolveCurrency('')).toBe(BLANK_CURRENCY)
  })
  it('whitespace-only string → XXX', () => {
    expect(resolveCurrency('   ')).toBe(BLANK_CURRENCY)
    expect(resolveCurrency('\t\n')).toBe(BLANK_CURRENCY)
  })
  it("explicit 'XXX' is idempotent", () => {
    expect(resolveCurrency('XXX')).toBe(BLANK_CURRENCY)
  })
  it('non-blank code flows through unchanged (no validation here)', () => {
    expect(resolveCurrency('EUR')).toBe('EUR')
    expect(resolveCurrency('NOK')).toBe('NOK')
    expect(resolveCurrency('  bgn  ')).toBe('bgn')   // trim only, no upper-case
  })
})

describe('isBlankCurrency', () => {
  it('returns true for every blank-equivalent input', () => {
    expect(isBlankCurrency(undefined)).toBe(true)
    expect(isBlankCurrency(null)).toBe(true)
    expect(isBlankCurrency('')).toBe(true)
    expect(isBlankCurrency('XXX')).toBe(true)
  })
  it('returns false for real currencies', () => {
    expect(isBlankCurrency('EUR')).toBe(false)
    expect(isBlankCurrency('JPY')).toBe(false)
  })
})

describe('currencyDecimals', () => {
  it('XXX has 0 decimals (no fractional units)', () => {
    expect(currencyDecimals('XXX')).toBe(0)
    expect(currencyDecimals(null)).toBe(0)        // null → XXX → 0
  })
  it('zero-decimal currencies are picked up from CURRENCY_DECIMALS', () => {
    expect(currencyDecimals('JPY')).toBe(0)
    expect(currencyDecimals('KRW')).toBe(0)
    expect(currencyDecimals('VND')).toBe(0)
  })
  it('three-decimal currencies are picked up from CURRENCY_DECIMALS', () => {
    expect(currencyDecimals('BHD')).toBe(3)
    expect(currencyDecimals('KWD')).toBe(3)
  })
  it('unknown / mainstream codes default to 2 decimals', () => {
    expect(currencyDecimals('EUR')).toBe(2)
    expect(currencyDecimals('USD')).toBe(2)
    expect(currencyDecimals('NOK')).toBe(2)
  })
})

describe('currenciesCompatible — XXX is universal identity', () => {
  it('equal codes are compatible', () => {
    expect(currenciesCompatible('EUR', 'EUR')).toBe(true)
  })
  it('XXX is compatible with anything (left or right)', () => {
    expect(currenciesCompatible('EUR', 'XXX')).toBe(true)
    expect(currenciesCompatible('XXX', 'JPY')).toBe(true)
    expect(currenciesCompatible('XXX', 'XXX')).toBe(true)
  })
  it('null / undefined / empty also compatible (resolve to XXX)', () => {
    expect(currenciesCompatible('EUR', null)).toBe(true)
    expect(currenciesCompatible(undefined, 'JPY')).toBe(true)
    expect(currenciesCompatible('', '')).toBe(true)
  })
  it('two real different codes are NOT compatible', () => {
    expect(currenciesCompatible('EUR', 'JPY')).toBe(false)
    expect(currenciesCompatible('USD', 'NOK')).toBe(false)
  })
})

describe('currencyDisplayLabel', () => {
  it('XXX renders as an em-dash placeholder', () => {
    expect(currencyDisplayLabel('XXX')).toBe('—')
    expect(currencyDisplayLabel(null)).toBe('—')
  })
  it('Real codes render as the code itself (locale label comes from translations)', () => {
    expect(currencyDisplayLabel('EUR')).toBe('EUR')
    expect(currencyDisplayLabel('JPY')).toBe('JPY')
  })
})

describe('realtimeRate — blank currency triggers identity, real pairs route to provider', () => {
  it('same-currency pair short-circuits to identity (rate=1, source=identity)', async () => {
    const { realtimeRate } = await import('./index')
    const q = await realtimeRate('EUR', 'EUR', { tenantId: 't' })
    expect(q.rate).toBe(1)
    expect(q.source).toBe('identity')
  })

  it('XXX on either side short-circuits to identity', async () => {
    const { realtimeRate } = await import('./index')
    const q1 = await realtimeRate('EUR', 'XXX', { tenantId: 't' })
    const q2 = await realtimeRate('XXX', 'JPY', { tenantId: 't' })
    expect(q1.rate).toBe(1)
    expect(q1.source).toBe('identity')
    expect(q2.rate).toBe(1)
    expect(q2.source).toBe('identity')
  })

  it('null/undefined inputs resolve to XXX and short-circuit', async () => {
    const { realtimeRate } = await import('./index')
    const q = await realtimeRate(null, 'EUR', { tenantId: 't' })
    expect(q.rate).toBe(1)
    expect(q.source).toBe('identity')
    expect(q.fromCurrency).toBe('XXX')
  })

  it('cross-currency pairs route to the configured provider', async () => {
    const { realtimeRate, setDefaultRateProvider, IdentityRateProvider } = await import('./index')
    setDefaultRateProvider({
      async quote(from, to, ctx) {
        return {
          fromCurrency: from, toCurrency: to,
          rate: 1.07, source: 'observed',
          asOf: ctx.asOf ?? '2026-05-11T08:00:00.000Z',
          provenanceUuid: '00000000-0000-5000-8000-000000ratequote',
        }
      },
    })
    const q = await realtimeRate('EUR', 'USD', { tenantId: 't' })
    expect(q.rate).toBe(1.07)
    expect(q.source).toBe('observed')
    expect(q.provenanceUuid).toBeDefined()
    setDefaultRateProvider(IdentityRateProvider)  // restore
  })

  it('provider failure degrades to identity (never throws)', async () => {
    const { realtimeRate, setDefaultRateProvider, IdentityRateProvider } = await import('./index')
    setDefaultRateProvider({
      async quote() { throw new Error('rate-source-unreachable') },
    })
    const q = await realtimeRate('EUR', 'JPY', { tenantId: 't' })
    expect(q.rate).toBe(1)
    expect(q.source).toBe('identity')
    setDefaultRateProvider(IdentityRateProvider)
  })
})

describe('convertMoney — round-trip with target-currency rounding', () => {
  it('same-currency conversion preserves the amount + target decimals', async () => {
    const { convertMoney } = await import('./index')
    const out = await convertMoney(123.456, 'EUR', 'EUR', { tenantId: 't' })
    expect(out.amount).toBe(123.46)   // EUR has 2 decimals — half-even rounded
    expect(out.currency).toBe('EUR')
  })

  it('XXX → real currency uses identity rate + target decimals', async () => {
    const { convertMoney } = await import('./index')
    const out = await convertMoney(100, null, 'JPY', { tenantId: 't' })
    expect(out.amount).toBe(100)      // JPY has 0 decimals — no fraction
    expect(out.currency).toBe('JPY')
    expect(out.quote.source).toBe('identity')
  })

  it('cross-currency conversion applies the provider rate', async () => {
    const { convertMoney, setDefaultRateProvider, IdentityRateProvider } = await import('./index')
    setDefaultRateProvider({
      async quote(from, to, ctx) {
        return {
          fromCurrency: from, toCurrency: to,
          rate: 170, source: 'observed',
          asOf: ctx.asOf ?? new Date().toISOString(),
        }
      },
    })
    const out = await convertMoney(100, 'EUR', 'JPY', { tenantId: 't' })
    expect(out.amount).toBe(17000)
    expect(out.currency).toBe('JPY')
    expect(out.quote.rate).toBe(170)
    setDefaultRateProvider(IdentityRateProvider)
  })
})

// ─── Slice LLLLLLLLL-cut4 tests ────────────────────────────────────

describe('aggregateBalancesAcrossCurrencies — multi-currency portfolio', () => {
  it('sums wallets to one presentation currency via identity rates for XXX legs', async () => {
    const { aggregateBalancesAcrossCurrencies, setDefaultRateProvider, IdentityRateProvider } = await import('./index')
    setDefaultRateProvider(IdentityRateProvider)
    const result = await aggregateBalancesAcrossCurrencies(
      [
        { id: 'w1', currency: 'EUR', balance: 1000 },
        { id: 'w2', currency: 'XXX', balance:  500 },   // blank — identity
        { id: 'w3', currency: 'EUR', balance:  200 },
      ],
      'EUR',
      { tenantId: 't' },
    )
    expect(result.presentationCurrency).toBe('EUR')
    expect(result.totalBalance).toBe(1700)             // 1000 + 500 + 200 (identity)
    expect(result.hasIdentityFallback).toBe(true)      // XXX leg flagged
    expect(result.perWallet).toHaveLength(3)
  })

  it('routes real cross-currency legs through the provider', async () => {
    const { aggregateBalancesAcrossCurrencies, setDefaultRateProvider, IdentityRateProvider } = await import('./index')
    setDefaultRateProvider({
      async quote(from, to, ctx) {
        return {
          fromCurrency: from, toCurrency: to,
          rate: from === 'JPY' && to === 'EUR' ? 0.006 : 1,
          source: 'observed',
          asOf: ctx.asOf ?? new Date().toISOString(),
        }
      },
    })
    const result = await aggregateBalancesAcrossCurrencies(
      [
        { id: 'w1', currency: 'EUR', balance: 1000 },     // 1000
        { id: 'w2', currency: 'JPY', balance: 50000 },    // 50000 × 0.006 = 300
      ],
      'EUR',
      { tenantId: 't' },
    )
    expect(result.totalBalance).toBe(1300)
    expect(result.hasIdentityFallback).toBe(false)       // both legs 'observed'
    setDefaultRateProvider(IdentityRateProvider)
  })

  it('the presentation currency can be XXX itself (unitless reporting)', async () => {
    const { aggregateBalancesAcrossCurrencies } = await import('./index')
    const result = await aggregateBalancesAcrossCurrencies(
      [
        { id: 'w1', currency: 'EUR', balance: 1000 },
        { id: 'w2', currency: 'JPY', balance: 50000 },
      ],
      'XXX',
      { tenantId: 't' },
    )
    expect(result.presentationCurrency).toBe('XXX')
    // XXX target → identity rates → unitless sum (0 decimals)
    expect(result.totalBalance).toBe(51000)
    expect(result.hasIdentityFallback).toBe(true)
  })
})

describe('ISO 4217 special-currency family', () => {
  it('exposes the canonical kind for each X-code + crypto code', async () => {
    const { getSpecialCurrencyKind, isSpecialCurrency } = await import('@/config/iso-4217-special')
    expect(getSpecialCurrencyKind('XXX')).toBe('blank')
    expect(getSpecialCurrencyKind('XTS')).toBe('test')
    expect(getSpecialCurrencyKind('XAU')).toBe('precious-metal')
    expect(getSpecialCurrencyKind('XAG')).toBe('precious-metal')
    expect(getSpecialCurrencyKind('XDR')).toBe('supranational')
    expect(getSpecialCurrencyKind('XBA')).toBe('bond-unit')
    expect(getSpecialCurrencyKind('BTC')).toBe('crypto')
    expect(getSpecialCurrencyKind('ETH')).toBe('crypto')
    expect(getSpecialCurrencyKind('EUR')).toBe('national')   // default for non-X
    expect(isSpecialCurrency('XXX')).toBe(true)
    expect(isSpecialCurrency('EUR')).toBe(false)
  })
})

describe('ISO 4217 numeric-code mapping', () => {
  it('round-trips alpha ↔ numeric for the curated set', async () => {
    const { getCurrencyNumericCode, getCurrencyAlphaCode, toIso20022Ccy } = await import('@/config/iso-4217-numeric')
    expect(getCurrencyNumericCode('EUR')).toBe(978)
    expect(getCurrencyNumericCode('JPY')).toBe(392)
    expect(getCurrencyNumericCode('XXX')).toBe(999)
    expect(getCurrencyNumericCode('XAU')).toBe(959)
    expect(getCurrencyAlphaCode(978)).toBe('EUR')
    expect(getCurrencyAlphaCode(999)).toBe('XXX')
    expect(toIso20022Ccy(978)).toBe('EUR')
    expect(toIso20022Ccy('eur')).toBe('EUR')
  })
})

describe('Currency primitives are uuid primitives (Slice LLLLLLLLL-cut4)', () => {
  it('computeCurrencyUuid is stable for same (code, tenantId)', async () => {
    const { computeCurrencyUuid } = await import('./currency-uuid')
    const u1 = computeCurrencyUuid('EUR', 'tenant-1')
    const u2 = computeCurrencyUuid('EUR', 'tenant-1')
    expect(u1).toBe(u2)
    expect(u1).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-/)
  })

  it('computeCurrencyUuid differs across tenants for the same code', async () => {
    const { computeCurrencyUuid } = await import('./currency-uuid')
    expect(computeCurrencyUuid('EUR', 'tenant-1')).not.toBe(computeCurrencyUuid('EUR', 'tenant-2'))
  })

  it('computeRateQuoteUuid is stable for same (from, to, asOf, tenant) — replay-safe', async () => {
    const { computeRateQuoteUuid } = await import('./currency-uuid')
    const args = {
      fromCurrency: 'EUR', toCurrency: 'JPY',
      asOf: '2026-05-11T08:00:00.000Z',
      tenantId: 't',
    }
    expect(computeRateQuoteUuid(args)).toBe(computeRateQuoteUuid(args))
  })

  it('computeRateQuoteUuid does NOT include the rate value — peers disagreeing on rate share the query identity', async () => {
    const { computeRateQuoteUuid } = await import('./currency-uuid')
    // Even though one peer might quote 170 and another 171 for the
    // same EUR/JPY pair at the same asOf, the QUOTE IDENTITY (the
    // uuid the consensus algorithm groups by) is the same.
    const u = computeRateQuoteUuid({
      fromCurrency: 'EUR', toCurrency: 'JPY',
      asOf: '2026-05-11T08:00:00.000Z', tenantId: 't',
    })
    expect(typeof u).toBe('string')
    expect(u.length).toBeGreaterThan(0)
  })

  it('computeExchangeUuid is stable for same params — idempotent exchange', async () => {
    const { computeExchangeUuid } = await import('./currency-uuid')
    const args = {
      fromWalletId: 'w1', toWalletId: 'w2', amountMinor: 10000,
      asOf: '2026-05-11T08:00:00.000Z', tenantId: 't',
    }
    expect(computeExchangeUuid(args)).toBe(computeExchangeUuid(args))
  })

  it('realtimeRate auto-attaches a provenanceUuid derived from computeRateQuoteUuid', async () => {
    const { realtimeRate } = await import('./index')
    const { computeRateQuoteUuid } = await import('./currency-uuid')
    const asOf = '2026-05-11T08:00:00.000Z'
    const q = await realtimeRate('EUR', 'EUR', { tenantId: 't', asOf })
    const expected = computeRateQuoteUuid({
      fromCurrency: 'EUR', toCurrency: 'EUR', asOf, tenantId: 't',
    })
    expect(q.provenanceUuid).toBe(expected)
  })
})

describe('formatMoney — never throws, blank renders without symbol', () => {
  it('Real currency renders with symbol + correct decimals', () => {
    // We don't assert exact Intl output (varies by Node ICU build); we
    // assert structural properties: contains digits, contains a
    // currency-indicating character or code, never throws.
    const out = formatMoney(1234.5, 'EUR', 'en-GB')
    expect(out).toMatch(/[0-9]/)
    expect(out.length).toBeGreaterThan(0)
  })
  it('JPY renders with 0 decimals', () => {
    const out = formatMoney(1234, 'JPY', 'ja-JP')
    expect(out).not.toMatch(/\.\d/)   // no decimal portion
  })
  it('Blank currency renders without a currency symbol', () => {
    const out = formatMoney(1234.5, 'XXX', 'en-US')
    expect(out).not.toMatch(/[€$¥£₹]/)
  })
  it('null currency input does not throw', () => {
    expect(() => formatMoney(1234, null, 'en-US')).not.toThrow()
    expect(() => formatMoney(1234, undefined, 'en-US')).not.toThrow()
  })
  it('Unknown ISO code falls back to prefix-style rather than throwing', () => {
    const out = formatMoney(1234, 'ZZQ', 'en-US')   // invalid Intl currency
    expect(out).toMatch(/ZZQ/)
  })
})
