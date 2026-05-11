/**
 * EN 16931 — collection-to-canonical-type alignment tests.
 *
 * Asserts that InvoiceLines + Invoices project cleanly onto the
 * canonical InvoiceLine + InvoiceHeader + DocumentTotals + VatBreakdown
 * types in `@/standards/en-16931`. Mapping is documented in each
 * collection's banner; this spec is the executable verification.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
 * @audit ISO-19011:2018 audit-trail
 * @see src/collections/InvoiceLines/index.ts
 * @see src/collections/Invoices/index.ts
 */

import { describe, it, expect } from 'vitest'
import {
  isInvoiceTypeCode,
  isVatCategoryCode,
  type InvoiceLine,
  type InvoiceHeader,
  type DocumentTotals,
  type VatBreakdown,
  type InvoiceTypeCode,
  type VatCategoryCode,
} from '@/standards/en-16931'

// ─── Doc shapes — Payload returns for each row ────────────────────────

interface PayloadInvoiceLineDoc {
  id: string
  invoice: string | { id: string }
  code?: string
  description: string
  lineNote?: string
  objectIdentifier?: string
  quantity: { quantity: number; unit?: string }
  pricing: { unitPrice: number; itemTotal: number }
  discounting?: { discountTotal?: number }
  taxation: {
    vatCategoryCode?: VatCategoryCode
    taxRate?: number
    netTotal: number
    taxTotal?: number
    vatExemptionReasonCode?: string
    vatExemptionReason?: string
  }
  items?: { sellerItem?: string | { id: string } }
}

interface PayloadInvoiceDoc {
  id: string
  number: string
  invoiceTypeCode?: InvoiceTypeCode
  dates: { issuedAt: string; dueAt?: string }
  billingTax?: { currencyCode?: string }
  amounts: {
    itemTotal: number
    allowancesTotal?: number
    chargesTotal?: number
    netTotal: number
    taxTotal?: number
    totalAmount: number
    prepaidAmount?: number
    roundingAmount?: number
    totalDue: number
  }
  vatBreakdown?: Array<{
    categoryCode: VatCategoryCode
    rate?: number
    taxableAmount: number
    taxAmount: number
    exemptionReasonCode?: string
    exemptionReason?: string
  }>
  parties?: { buyer?: { buyerReference?: string } }
}

// ─── Mappers ──────────────────────────────────────────────────────────

const idOf = (rel: string | { id: string } | undefined): string | undefined =>
  typeof rel === 'string' ? rel : rel?.id

const toCanonicalInvoiceLine = (doc: PayloadInvoiceLineDoc): InvoiceLine => ({
  id: doc.code ?? doc.id,
  note: doc.lineNote,
  objectIdentifier: doc.objectIdentifier,
  quantity: doc.quantity.quantity,
  unitCode: doc.quantity.unit ?? 'EA',
  netAmount: doc.taxation.netTotal,
  description: doc.description,
  priceDetails: {
    itemNetPrice: doc.pricing.unitPrice,
    itemPriceDiscount: doc.discounting?.discountTotal,
  },
  vat: {
    categoryCode: doc.taxation.vatCategoryCode ?? 'S',
    rate: doc.taxation.taxRate,
    exemptionReasonCode: doc.taxation.vatExemptionReasonCode,
    exemptionReason: doc.taxation.vatExemptionReason,
  },
  itemId: idOf(doc.items?.sellerItem),
})

const toCanonicalInvoiceHeader = (doc: PayloadInvoiceDoc): InvoiceHeader => ({
  invoiceNumber: doc.number,
  issueDate: doc.dates.issuedAt,
  typeCode: doc.invoiceTypeCode ?? '380',
  currencyCode: doc.billingTax?.currencyCode ?? 'EUR',
  dueDate: doc.dates.dueAt,
  buyerReference: doc.parties?.buyer?.buyerReference,
})

const toCanonicalDocumentTotals = (doc: PayloadInvoiceDoc): DocumentTotals => ({
  lineNetTotal: doc.amounts.itemTotal,
  allowancesTotal: doc.amounts.allowancesTotal,
  chargesTotal: doc.amounts.chargesTotal,
  taxExclusiveTotal: doc.amounts.netTotal,
  vatTotal: doc.amounts.taxTotal,
  taxInclusiveTotal: doc.amounts.totalAmount,
  prepaidAmount: doc.amounts.prepaidAmount,
  roundingAmount: doc.amounts.roundingAmount,
  amountDue: doc.amounts.totalDue,
})

const toCanonicalVatBreakdown = (doc: PayloadInvoiceDoc): VatBreakdown[] =>
  (doc.vatBreakdown ?? []).map((b) => ({
    categoryCode: b.categoryCode,
    rate: b.rate,
    taxableAmount: b.taxableAmount,
    taxAmount: b.taxAmount,
    exemptionReasonCode: b.exemptionReasonCode,
    exemptionReason: b.exemptionReason,
  }))

// ─── Tests ─────────────────────────────────────────────────────────────

describe('EN 16931 — InvoiceLines collection ↔ canonical InvoiceLine', () => {
  it('standard-rate goods line projects cleanly', () => {
    const doc: PayloadInvoiceLineDoc = {
      id: 'IL-1',
      invoice: 'INV-1',
      code: 'L-001',
      description: 'Widget Pro 2026',
      lineNote: 'Includes 1-year warranty',
      objectIdentifier: 'GTIN-12345678901234',
      quantity: { quantity: 10, unit: 'EA' },
      pricing: { unitPrice: 1_000, itemTotal: 10_000 },
      discounting: { discountTotal: 500 },
      taxation: {
        vatCategoryCode: 'S',
        taxRate: 20,
        netTotal: 9_500,
        taxTotal: 1_900,
      },
    }
    const canonical = toCanonicalInvoiceLine(doc)
    expect(canonical.id).toBe('L-001')
    expect(canonical.note).toBe('Includes 1-year warranty')
    expect(canonical.netAmount).toBe(9_500)
    expect(canonical.vat.categoryCode).toBe('S')
    expect(canonical.vat.rate).toBe(20)
    expect(isVatCategoryCode(canonical.vat.categoryCode)).toBe(true)
    expect(canonical.priceDetails?.itemPriceDiscount).toBe(500)
  })

  it('reverse-charge line carries exemption reason code', () => {
    const doc: PayloadInvoiceLineDoc = {
      id: 'IL-2',
      invoice: 'INV-2',
      description: 'Cross-border B2B service',
      quantity: { quantity: 1, unit: 'C62' }, // UN/ECE Rec 20 unit-of-measure
      pricing: { unitPrice: 100_000, itemTotal: 100_000 },
      taxation: {
        vatCategoryCode: 'AE',
        netTotal: 100_000,
        vatExemptionReasonCode: 'VATEX-EU-AE',
        vatExemptionReason: 'Reverse charge',
      },
    }
    const canonical = toCanonicalInvoiceLine(doc)
    expect(canonical.vat.categoryCode).toBe('AE')
    expect(canonical.vat.exemptionReasonCode).toBe('VATEX-EU-AE')
    expect(canonical.vat.rate).toBeUndefined() // reverse-charge has no rate
  })
})

describe('EN 16931 — Invoices collection ↔ canonical InvoiceHeader', () => {
  it('commercial invoice (BT-3 = 380) projects to canonical header', () => {
    const doc: PayloadInvoiceDoc = {
      id: 'INV-1',
      number: '2026-001',
      invoiceTypeCode: '380',
      dates: { issuedAt: '2026-05-09', dueAt: '2026-06-08' },
      billingTax: { currencyCode: 'EUR' },
      amounts: {
        itemTotal: 100_000_00,
        netTotal: 98_500_00,
        totalAmount: 118_200_00,
        totalDue: 100_000_00,
      },
    }
    const canonical = toCanonicalInvoiceHeader(doc)
    expect(canonical.invoiceNumber).toBe('2026-001')
    expect(canonical.typeCode).toBe('380')
    expect(canonical.currencyCode).toBe('EUR')
    expect(isInvoiceTypeCode(canonical.typeCode)).toBe(true)
  })

  it('credit note (BT-3 = 381) is recognised', () => {
    const doc: PayloadInvoiceDoc = {
      id: 'INV-CN-1',
      number: 'CN-2026-007',
      invoiceTypeCode: '381',
      dates: { issuedAt: '2026-05-15' },
      amounts: {
        itemTotal: 1_000_00,
        netTotal: 1_000_00,
        totalAmount: 1_200_00,
        totalDue: 1_200_00,
      },
    }
    const canonical = toCanonicalInvoiceHeader(doc)
    expect(canonical.typeCode).toBe('381')
  })
})

describe('EN 16931 — Invoices collection ↔ canonical DocumentTotals', () => {
  it('full BT-106..BT-115 chain round-trips and the arithmetic balances', () => {
    const doc: PayloadInvoiceDoc = {
      id: 'INV-2',
      number: '2026-002',
      invoiceTypeCode: '380',
      dates: { issuedAt: '2026-05-09' },
      amounts: {
        itemTotal: 100_000_00,
        allowancesTotal: 2_000_00,
        chargesTotal: 500_00,
        netTotal: 98_500_00, // 100,000 − 2,000 + 500
        taxTotal: 19_700_00,
        totalAmount: 118_200_00,
        prepaidAmount: 18_200_00,
        roundingAmount: 0,
        totalDue: 100_000_00,
      },
    }
    const totals = toCanonicalDocumentTotals(doc)
    // BG-22 chain:
    //   taxExclusive = lineNet − allowances + charges
    expect(
      totals.lineNetTotal -
        (totals.allowancesTotal ?? 0) +
        (totals.chargesTotal ?? 0),
    ).toBe(totals.taxExclusiveTotal)
    //   taxInclusive = taxExclusive + vatTotal
    expect(
      totals.taxExclusiveTotal + (totals.vatTotal ?? 0),
    ).toBe(totals.taxInclusiveTotal)
    //   amountDue = taxInclusive − prepaid + rounding
    expect(
      totals.taxInclusiveTotal -
        (totals.prepaidAmount ?? 0) +
        (totals.roundingAmount ?? 0),
    ).toBe(totals.amountDue)
  })
})

describe('EN 16931 — Invoices collection ↔ canonical VatBreakdown[]', () => {
  it('multi-rate VAT breakdown with one reverse-charge category', () => {
    const doc: PayloadInvoiceDoc = {
      id: 'INV-3',
      number: '2026-003',
      invoiceTypeCode: '380',
      dates: { issuedAt: '2026-05-09' },
      amounts: {
        itemTotal: 100_000_00,
        netTotal: 100_000_00,
        totalAmount: 116_000_00,
        totalDue: 116_000_00,
      },
      vatBreakdown: [
        {
          categoryCode: 'S',
          rate: 20,
          taxableAmount: 80_000_00,
          taxAmount: 16_000_00,
        },
        {
          categoryCode: 'AE',
          taxableAmount: 20_000_00,
          taxAmount: 0,
          exemptionReasonCode: 'VATEX-EU-AE',
          exemptionReason: 'Reverse charge',
        },
      ],
    }
    const canonical = toCanonicalVatBreakdown(doc)
    expect(canonical).toHaveLength(2)
    expect(canonical[0].categoryCode).toBe('S')
    expect(canonical[0].taxAmount).toBe(16_000_00)
    expect(canonical[1].categoryCode).toBe('AE')
    expect(canonical[1].exemptionReasonCode).toBe('VATEX-EU-AE')
    // Sum of taxAmounts equals doc.amounts.taxTotal would (when set)
    const sumTax = canonical.reduce((s, b) => s + b.taxAmount, 0)
    expect(sumTax).toBe(16_000_00)
  })
})
