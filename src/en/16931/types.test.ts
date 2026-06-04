/**
 * EN 16931 — canonical e-invoice types tests.
 *
 * Exercises the runtime guards and asserts the BG / BT field set covers
 * what the project's events / reports / collections need.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
 * @audit ISO-19011:2018 audit-trail
 */

import { describe, it, expect } from 'vitest'
import {
  isInvoiceTypeCode,
  isVatCategoryCode,
  isPaymentMeansCode,
  type InvoiceLine,
  type VatBreakdown,
  type DocumentTotals,
  type DocumentLevelAllowance,
  type DocumentLevelCharge,
  type InvoiceTypeCode,
  type VatCategoryCode,
  type PaymentMeansCode,
} from '@/en/16931'

describe('EN 16931 — code-list guards', () => {
  it('isInvoiceTypeCode accepts canonical UN/CEFACT 1001 codes', () => {
    expect(isInvoiceTypeCode('380')).toBe(true) // commercial invoice
    expect(isInvoiceTypeCode('381')).toBe(true) // credit note
    expect(isInvoiceTypeCode('384')).toBe(true) // corrected
    expect(isInvoiceTypeCode('999')).toBe(false)
    expect(isInvoiceTypeCode(380)).toBe(false) // must be string
  })

  it('isVatCategoryCode accepts the EN 16931 EU subset of UN/CEFACT 5305', () => {
    const valid: VatCategoryCode[] = ['S', 'Z', 'E', 'AE', 'K', 'G', 'O', 'L', 'M']
    for (const c of valid) expect(isVatCategoryCode(c)).toBe(true)
    expect(isVatCategoryCode('X')).toBe(false)
    expect(isVatCategoryCode('s')).toBe(false) // case-sensitive
  })

  it('isPaymentMeansCode accepts UN/CEFACT 4461 subset', () => {
    const valid: PaymentMeansCode[] = [
      '10', '20', '30', '42', '48', '49', '57', '58', '59', '97',
    ]
    for (const c of valid) expect(isPaymentMeansCode(c)).toBe(true)
    expect(isPaymentMeansCode('99')).toBe(false)
  })
})

describe('EN 16931 — BG-25 invoice line', () => {
  it('builds a minimal valid line', () => {
    const line: InvoiceLine = {
      id: 'L-001',
      quantity: 2,
      unitCode: 'EA', // each
      netAmount: 20_000, // 200.00 EUR in cents
      vat: { categoryCode: 'S', rate: 20 },
    }
    expect(line.netAmount).toBe(20_000)
    expect(line.vat.categoryCode).toBe('S')
  })

  it('carries optional BG-29 price details + BG-27 / BG-28 line allowances/charges', () => {
    const line: InvoiceLine = {
      id: 'L-002',
      description: 'Widget',
      quantity: 10,
      unitCode: 'EA',
      netAmount: 9_500,
      priceDetails: {
        itemNetPrice: 1_000,
        itemGrossPrice: 1_100,
        itemPriceDiscount: 100,
        baseQuantity: 1,
        baseUnitCode: 'EA',
      },
      allowances: [{ amount: 500, reasonCode: '95', reason: 'Volume discount' }],
      charges: [{ amount: 0 }],
      vat: { categoryCode: 'S', rate: 20 },
      costAmount: 6_000,
    }
    expect(line.priceDetails?.itemNetPrice).toBe(1_000)
    expect(line.allowances?.[0].amount).toBe(500)
    expect(line.costAmount).toBe(6_000)
  })
})

describe('EN 16931 — BG-22 totals + BG-23 VAT breakdown', () => {
  it('document totals chain (BT-106..BT-115) round-trips', () => {
    const totals: DocumentTotals = {
      lineNetTotal: 100_000,
      allowancesTotal: 2_000,
      chargesTotal: 500,
      taxExclusiveTotal: 98_500, // 100,000 - 2,000 + 500
      vatTotal: 19_700,
      taxInclusiveTotal: 118_200,
      prepaidAmount: 18_200,
      amountDue: 100_000,
    }
    expect(
      totals.lineNetTotal -
        (totals.allowancesTotal ?? 0) +
        (totals.chargesTotal ?? 0),
    ).toBe(totals.taxExclusiveTotal)
    expect(
      totals.taxExclusiveTotal + (totals.vatTotal ?? 0),
    ).toBe(totals.taxInclusiveTotal)
    expect(
      totals.taxInclusiveTotal - (totals.prepaidAmount ?? 0),
    ).toBe(totals.amountDue)
  })

  it('VAT breakdown carries category × rate × amounts', () => {
    const breakdown: VatBreakdown[] = [
      { taxableAmount: 80_000, taxAmount: 16_000, categoryCode: 'S', rate: 20 },
      {
        taxableAmount: 18_500,
        taxAmount: 0,
        categoryCode: 'AE',
        exemptionReasonCode: 'VATEX-EU-AE',
        exemptionReason: 'Reverse charge',
      },
    ]
    expect(breakdown[0].taxAmount).toBe(16_000)
    expect(breakdown[1].categoryCode).toBe('AE')
    expect(breakdown[1].exemptionReasonCode).toBe('VATEX-EU-AE')
  })
})

describe('EN 16931 — BG-20 / BG-21 document-level allowances + charges', () => {
  it('builds an allowance with percentage', () => {
    const a: DocumentLevelAllowance = {
      amount: 1_000,
      baseAmount: 100_000,
      percentage: 1,
      vatCategoryCode: 'S',
      vatRate: 20,
      reasonCode: '95',
      reason: 'Loyalty discount',
    }
    expect(a.percentage).toBe(1)
    expect(a.amount).toBe(1_000)
  })

  it('builds a flat-amount charge', () => {
    const c: DocumentLevelCharge = {
      amount: 500,
      vatCategoryCode: 'S',
      vatRate: 20,
      reason: 'Handling fee',
    }
    expect(c.amount).toBe(500)
  })
})

describe('EN 16931 — InvoiceTypeCode', () => {
  it('lists the canonical subset', () => {
    const codes: InvoiceTypeCode[] = [
      '326',
      '380',
      '381',
      '384',
      '386',
      '388',
      '389',
      '393',
      '395',
      '751',
    ]
    expect(codes).toHaveLength(10)
  })
})
