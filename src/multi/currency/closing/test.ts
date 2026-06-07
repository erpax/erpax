import { describe, it, expect } from 'vitest'
import { CurrencyReconciliation } from '@/multi/currency/closing'

// Multi-currency closing: each currency's closing must balance (Σ revenues = Σ expenses
// per currency), foreign positions revalue at the period-end rate (the unrealized FX
// gain/loss is the rate delta on the net amount, IFRS-21/IFRS-9), and the reporting
// currency never revalues against itself. The whole reconciliation is content-addressed
// (chainLeafUuid) so a tampered figure breaks the leaf.
describe('multi/currency/closing — CurrencyReconciliation: per-currency balance + FX revaluation', () => {
  it('a currency balances only when its revenues equal its expenses (within tolerance)', () => {
    const balances = CurrencyReconciliation.validateClosingBalanceByCurrency([
      { currency: 'EUR', totalRevenuesClosed: 10000, totalExpensesClosed: 10000 },
      { currency: 'USD', totalRevenuesClosed: 5000, totalExpensesClosed: 4500 },
    ])
    const eur = balances.find((b) => b.currency === 'EUR')!
    const usd = balances.find((b) => b.currency === 'USD')!
    expect(eur.isBalanced).toBe(true)
    expect(eur.difference).toBe(0)
    expect(usd.isBalanced).toBe(false)
    expect(usd.difference).toBe(500)
  })

  it('balance check is the absolute revenue−expense gap (sign-independent)', () => {
    const [b] = CurrencyReconciliation.validateClosingBalanceByCurrency([
      { currency: 'EUR', totalRevenuesClosed: 9500, totalExpensesClosed: 10000 },
    ])
    expect(b.difference).toBe(500) // |9500 - 10000|
    expect(b.isBalanced).toBe(false)
  })

  it('unrealized FX gain/loss = net amount × (period-end rate − historical rate)', () => {
    // 1000 USD originally booked at 1.10, now revalued at 1.20 ⇒ +100 EUR gain
    const rev = CurrencyReconciliation.computeUnrealizedExchangeGainLoss('USD', 'EUR', 1.2, 1000, 1.1)
    expect(rev.originalAmountReportingCurrency).toBeCloseTo(1100)
    expect(rev.unrealizedGainLoss).toBeCloseTo(100)
    expect(rev.netAmount).toBe(1000)
    // a falling rate produces a loss (negative)
    const loss = CurrencyReconciliation.computeUnrealizedExchangeGainLoss('USD', 'EUR', 1.0, 1000, 1.1)
    expect(loss.unrealizedGainLoss).toBeCloseTo(-100)
  })

  it('no rate movement ⇒ zero unrealized gain/loss (historical defaults to period-end)', () => {
    const rev = CurrencyReconciliation.computeUnrealizedExchangeGainLoss('USD', 'EUR', 1.15, 1000)
    expect(rev.unrealizedGainLoss).toBeCloseTo(0)
  })

  it('reconcileMultiCurrency: reporting currency is never revalued against itself', () => {
    const result = CurrencyReconciliation.reconcileMultiCurrency(
      {
        closingEntries: [
          { currency: 'EUR', totalRevenuesClosed: 10000, totalExpensesClosed: 10000 },
          { currency: 'USD', totalRevenuesClosed: 5000, totalExpensesClosed: 5000, netAmount: 2000 },
        ],
        reconciliationDate: '2026-05-31',
      },
      'EUR',
      { USD: 1.2 },
    )
    expect(result.allBalanced).toBe(true)
    // only the non-reporting (USD) currency is revalued
    expect(result.revaluations).toHaveLength(1)
    expect(result.revaluations[0].transactionCurrency).toBe('USD')
    expect(result.errors).toHaveLength(0)
    expect(result.chainLeafUuid).toBeTruthy()
  })

  it('reconcileMultiCurrency: a missing exchange rate is reported as an error', () => {
    const result = CurrencyReconciliation.reconcileMultiCurrency(
      {
        closingEntries: [
          { currency: 'USD', totalRevenuesClosed: 1000, totalExpensesClosed: 1000, netAmount: 1000 },
        ],
        reconciliationDate: '2026-05-31',
      },
      'EUR',
      {}, // no rates supplied
    )
    expect(result.errors.some((e) => e.includes('Missing exchange rate'))).toBe(true)
    expect(result.revaluations).toHaveLength(0)
  })

  it('reconcileMultiCurrency: an unbalanced currency flags allBalanced=false with an error', () => {
    const result = CurrencyReconciliation.reconcileMultiCurrency(
      {
        closingEntries: [
          { currency: 'EUR', totalRevenuesClosed: 10000, totalExpensesClosed: 9000 },
        ],
        reconciliationDate: '2026-05-31',
      },
      'EUR',
      {},
    )
    expect(result.allBalanced).toBe(false)
    expect(result.errors.some((e) => e.includes('Unbalanced currencies'))).toBe(true)
  })

  it('the reconciliation is content-addressed — same input ⇒ same leaf; reporting currency distinguishes it', () => {
    const input = {
      closingEntries: [{ currency: 'EUR', totalRevenuesClosed: 100, totalExpensesClosed: 100 }],
      reconciliationDate: '2026-05-31',
    }
    const a = CurrencyReconciliation.reconcileMultiCurrency(input, 'EUR', {})
    const b = CurrencyReconciliation.reconcileMultiCurrency(input, 'EUR', {})
    expect(a.chainLeafUuid).toBe(b.chainLeafUuid)
    // a different reporting currency changes the content ⇒ changes the leaf
    const usdInput = {
      closingEntries: [{ currency: 'USD', totalRevenuesClosed: 100, totalExpensesClosed: 100 }],
      reconciliationDate: '2026-05-31',
    }
    const c = CurrencyReconciliation.reconcileMultiCurrency(usdInput, 'USD', {})
    expect(c.chainLeafUuid).not.toBe(a.chainLeafUuid)
  })

  it('validateCurrencyCode enforces ISO-4217 3-letter uppercase + decimal places', () => {
    expect(CurrencyReconciliation.validateCurrencyCode('EUR').isValid).toBe(true)
    expect(CurrencyReconciliation.validateCurrencyCode('EUR').decimals).toBe(2)
    expect(CurrencyReconciliation.validateCurrencyCode('BHD').decimals).toBe(3) // 3-decimal currency
    const bad = CurrencyReconciliation.validateCurrencyCode('eur')
    expect(bad.isValid).toBe(false)
    expect(bad.errors.length).toBeGreaterThan(0)
    expect(CurrencyReconciliation.validateCurrencyCode('EU').isValid).toBe(false) // wrong length
    expect(CurrencyReconciliation.validateCurrencyCode('US1').isValid).toBe(false) // non-alpha
  })
})
