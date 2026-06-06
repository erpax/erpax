/**
 * Multi-currency GL service — wiring gate (the FX gain/loss + IAS-21/ASC-830
 * revaluation path is reachable and BALANCED). The service composes the canonical
 * journalEntryService; here we spy on that singleton so the test is pure (no DB)
 * while still proving the posting path emits a balanced journal entry.
 *
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
 * @accounting US-GAAP ASC-830 foreign-currency-matters
 * @see ./index.ts ; src/agents/mcp/tool-defs.ts (erpax.accounting.currencyRevalue)
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { multiCurrencyService } from '@/multi/currency.service'
import { journalEntryService } from '@/journal/entry/service'
import type { MonthEndCurrencyAdjustment } from '@/types/multi-currency'

const TENANT = 'tenant-fx-test'

// Capture every journal entry the service hands to the canonical ledger, so we
// can assert Σdebit == Σcredit (double-entry, the balance law) without a DB.
type CapturedLine = { accountId: string; description: string; debit: number; credit: number }
let createdEntries: Array<{ lines: CapturedLine[] }>

beforeEach(() => {
  multiCurrencyService.clearAllData()
  createdEntries = []
  vi.spyOn(journalEntryService, 'createEntry').mockImplementation(
    async (_tenantId, request) => {
      createdEntries.push({ lines: request.lines as unknown as CapturedLine[] })
      return { id: `je-${createdEntries.length}`, status: 'draft' } as never
    },
  )
  vi.spyOn(journalEntryService, 'postEntry').mockResolvedValue({ id: 'je-1', status: 'posted' } as never)
})

afterEach(() => {
  vi.restoreAllMocks()
  multiCurrencyService.clearAllData()
})

describe('multi-currency service: the FX path is reachable + balanced (wiring gate)', () => {
  it('convertAmount applies the supplied exchange rate', async () => {
    await multiCurrencyService.setupCurrencyConfig(TENANT, { tenantId: TENANT, baseCurrency: 'EUR' as never })
    const r = multiCurrencyService.convertAmount('USD' as never, 'EUR' as never, 100, 0.9, new Date('2026-06-30'))
    expect(r.convertedAmount).toBeCloseTo(90, 6)
    expect(r.exchangeRate).toBe(0.9)
    expect(r.originalCurrency).toBe('USD')
    expect(r.baseCurrency).toBe('EUR')
  })

  it('setExchangeRate + getExchangeRate round-trips the rate for a pair/date', async () => {
    const date = new Date('2026-06-30')
    await multiCurrencyService.setExchangeRate(TENANT, 'USD' as never, 'EUR' as never, 0.92, date)
    expect(multiCurrencyService.getExchangeRate(TENANT, 'USD' as never, 'EUR' as never, date)).toBe(0.92)
  })

  it('createMultiCurrencyEntry converts non-base lines by the rate and posts a balanced base-currency entry', async () => {
    await multiCurrencyService.setupCurrencyConfig(TENANT, { tenantId: TENANT, baseCurrency: 'EUR' as never })
    const id = await multiCurrencyService.createMultiCurrencyEntry(
      TENANT,
      new Date('2026-06-30'),
      'invoice in USD',
      [
        { accountId: 'ar', accountName: 'A/R', debit: 100, credit: 0, currency: 'USD' as never, originalAmount: 100, exchangeRate: 0.9 },
        { accountId: 'rev', accountName: 'Revenue', debit: 0, credit: 100, currency: 'USD' as never, originalAmount: 100, exchangeRate: 0.9 },
      ],
      'EUR' as never,
    )
    expect(id).toBe('je-1')
    expect(createdEntries).toHaveLength(1)
    const lines = createdEntries[0].lines
    // 100 USD × 0.9 ⇒ 90 EUR on both legs — converted by the rate.
    expect(lines[0].debit).toBeCloseTo(90, 6)
    expect(lines[1].credit).toBeCloseTo(90, 6)
    const sumD = lines.reduce((s, l) => s + l.debit, 0)
    const sumC = lines.reduce((s, l) => s + l.credit, 0)
    expect(sumD).toBeCloseTo(sumC, 6)
  })

  it('postCurrencyAdjustments emits a BALANCED gain/loss journal entry and marks the adjustment posted', async () => {
    await multiCurrencyService.setupCurrencyConfig(TENANT, {
      tenantId: TENANT,
      baseCurrency: 'EUR' as never,
      unrealizedGainAccountId: 'unrealized-fx',
    })
    // The calculate step is stubbed in the service (empty adjustments) — the gate
    // proves the POSTING path is balanced + reachable, so we hand it a concrete
    // gain/loss adjustment (per the architects' devNote: posting path, not balances).
    const adjustment: MonthEndCurrencyAdjustment = {
      tenantId: TENANT,
      adjustmentDate: new Date('2026-06-30'),
      baseCurrency: 'EUR' as never,
      adjustments: [],
      totalGain: 100,
      totalLoss: 30,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const je = await multiCurrencyService.postCurrencyAdjustments(TENANT, adjustment)
    expect(je).toBe('je-1')
    expect(adjustment.status).toBe('posted')
    expect(createdEntries).toHaveLength(1)
    const lines = createdEntries[0].lines
    const sumD = lines.reduce((s, l) => s + l.debit, 0)
    const sumC = lines.reduce((s, l) => s + l.credit, 0)
    expect(sumD).toBeCloseTo(sumC, 6) // Σdebit == Σcredit — double-entry holds
    expect(sumD).toBeGreaterThan(0)
  })

  it('throws when revaluing a tenant with no currency config (fail-closed)', async () => {
    await expect(
      multiCurrencyService.calculateMonthEndCurrencyAdjustments(TENANT, new Date('2026-06-30')),
    ).rejects.toThrow(/No currency config/)
  })
})
