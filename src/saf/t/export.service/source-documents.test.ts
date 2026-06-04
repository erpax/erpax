/**
 * SAF-T SourceDocuments — completes section 4 of the audit file.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
 * @audit ISO-19011:2018 audit-trail
 * @see ./index.ts buildSourceDocuments
 */

import { describe, it, expect } from 'vitest'
import {
  buildSalesInvoices,
  buildPurchaseInvoices,
  buildPayments,
  buildMovementOfGoods,
  buildSourceDocuments,
  renderSafTXml,
} from '@/saf/t/export.service'
import type { SafTAuditFile } from '@/saf/t'

const mockPayload = (
  fixtures: Record<string, Record<string, unknown>[]>,
): unknown =>
  ({
    find: async (args: { collection: string }) => ({
      docs: fixtures[args.collection] ?? [],
    }),
  })

describe('SAF-T — buildSalesInvoices', () => {
  it('maps Invoices collection rows to SafTSalesInvoice', async () => {
    const payload = mockPayload({
      invoices: [
        {
          id: 'I1',
          number: 'INV-001',
          invoiceTypeCode: '380',
          invoiceType: 'invoice',
          issuedAt: '2026-04-15',
          buyer: 'CUST-1',
          createdAt: '2026-04-15T10:00:00Z',
          amounts: { netTotal: 1_000_00, taxTotal: 200_00, totalAmount: 1_200_00 },
          lines: [
            {
              code: 'L1',
              description: 'Widget',
              quantity: { quantity: 10, unit: 'EA' },
              pricing: { unitPrice: 100_00, itemTotal: 1_000_00 },
              taxation: {
                vatCategoryCode: 'STD',
                taxRate: 20,
                netTotal: 1_000_00,
              },
              items: { sellerItem: 'WIDGET-1' },
            },
          ],
        },
      ],
    }) as never
    const result = await buildSalesInvoices(
      payload,
      'tenant-1',
      '2026-04-01',
      '2026-04-30',
    )
    expect(result.numberOfEntries).toBe(1)
    expect(result.totalCredit).toBe(1_000_00)
    expect(result.invoices[0].invoiceNo).toBe('INV-001')
    expect(result.invoices[0].invoiceType).toBe('FT')
    expect(result.invoices[0].lines).toHaveLength(1)
    expect(result.invoices[0].lines[0].productCode).toBe('WIDGET-1')
    expect(result.invoices[0].documentTotals.netTotal).toBe(1_000_00)
    expect(result.invoices[0].documentTotals.grossTotal).toBe(1_200_00)
  })

  it('maps credit-note (BT-3 = 381) to PT InvoiceType "NC"', async () => {
    const payload = mockPayload({
      invoices: [
        {
          id: 'CN1',
          number: 'CN-001',
          invoiceTypeCode: '381',
          invoiceType: 'credit_note',
          issuedAt: '2026-04-20',
          buyer: 'CUST-1',
          amounts: { netTotal: 100_00, taxTotal: 20_00, totalAmount: 120_00 },
          lines: [],
        },
      ],
    }) as never
    const result = await buildSalesInvoices(
      payload,
      'tenant-1',
      '2026-04-01',
      '2026-04-30',
    )
    expect(result.invoices[0].invoiceType).toBe('NC')
  })
})

describe('SAF-T — buildPurchaseInvoices', () => {
  it('filters to invoiceType = bill', async () => {
    const payload = mockPayload({
      invoices: [
        {
          id: 'B1',
          number: 'BILL-001',
          invoiceType: 'bill',
          issuedAt: '2026-04-15',
          seller: 'VENDOR-1',
          amounts: { netTotal: 500_00 },
          lines: [],
        },
      ],
    }) as never
    const result = await buildPurchaseInvoices(
      payload,
      'tenant-1',
      '2026-04-01',
      '2026-04-30',
    )
    expect(result.numberOfEntries).toBe(1)
    expect(result.totalDebit).toBe(500_00) // purchases hit the debit side
  })
})

describe('SAF-T — buildPayments', () => {
  it('maps incoming payments → CustomerID + creditAmount; outgoing → SupplierID + debitAmount', async () => {
    const payload = mockPayload({
      payments: [
        {
          id: 'P1',
          paymentNumber: 'PMT-001',
          paymentType: 'incoming',
          paymentDate: '2026-04-15',
          paymentMethod: 'bank_transfer',
          partyId: 'CUST-1',
          amount: 500_00,
          currency: 'EUR',
          invoiceId: 'INV-001',
        },
        {
          id: 'P2',
          paymentNumber: 'PMT-002',
          paymentType: 'outgoing',
          paymentDate: '2026-04-20',
          paymentMethod: 'wire',
          partyId: 'VENDOR-1',
          amount: 300_00,
          currency: 'EUR',
          billId: 'BILL-001',
        },
      ],
    }) as never
    const result = await buildPayments(
      payload,
      'tenant-1',
      '2026-04-01',
      '2026-04-30',
    )
    expect(result.numberOfEntries).toBe(2)
    expect(result.totalCredit).toBe(500_00)
    expect(result.totalDebit).toBe(300_00)
    // Both bank-transfer methods map to 'TB' SAF-T payment mechanism.
    expect(result.payments[0].paymentMethod.paymentMechanism).toBe('TB')
    expect(result.payments[0].customerID).toBe('CUST-1')
    expect(result.payments[1].supplierID).toBe('VENDOR-1')
  })

  it('falls back to "OU" (other) for unknown payment methods', async () => {
    const payload = mockPayload({
      payments: [
        {
          id: 'P3',
          paymentDate: '2026-04-15',
          paymentMethod: 'crypto', // unknown — falls back
          paymentType: 'incoming',
          partyId: 'CUST',
          amount: 100_00,
          invoiceId: 'INV',
        },
      ],
    }) as never
    const result = await buildPayments(
      payload,
      'tenant-1',
      '2026-04-01',
      '2026-04-30',
    )
    expect(result.payments[0].paymentMethod.paymentMechanism).toBe('OU')
  })
})

describe('SAF-T — buildMovementOfGoods', () => {
  it('aggregates inventory-movements with line-count + total-quantity rollups', async () => {
    const payload = mockPayload({
      'inventory-movements': [
        {
          id: 'M1',
          movementId: 'MV-001',
          kind: 'shipment',
          movementAt: '2026-04-15',
          item: { id: 'i1', itemNumber: 'WIDGET-1', itemName: 'Widget' },
          quantity: 10,
          unitOfMeasure: 'UN',
          customer: 'CUST-1',
        },
        {
          id: 'M2',
          movementId: 'MV-002',
          kind: 'transfer',
          movementAt: '2026-04-20',
          item: 'WIDGET-1',
          quantity: -5, // counts as 5 in absolute terms
        },
      ],
    }) as never
    const result = await buildMovementOfGoods(
      payload,
      'tenant-1',
      '2026-04-01',
      '2026-04-30',
    )
    expect(result.numberOfMovementLines).toBe(2)
    expect(result.totalQuantityIssued).toBe(15)
    expect(result.movements[0].movementType).toBe('GR') // shipment → GR
    expect(result.movements[1].movementType).toBe('GT') // transfer → GT
  })
})

describe('SAF-T — buildSourceDocuments orchestrator + XML rendering', () => {
  it('returns undefined when every sub-section is empty (OECD optional-wrapper)', async () => {
    // Per the OECD SAF-T 2.0 §SourceDocuments contract documented on
    // buildSourceDocuments, the top-level wrapper is OPTIONAL — when
    // every sub-builder returns 0 entries, the orchestrator returns
    // undefined so consumers (and the XML renderer) don't have to
    // special-case empty placeholders. Once a sub-builder lands real
    // data the populated shape comes back automatically.
    const payload = mockPayload({
      invoices: [],
      payments: [],
      'inventory-movements': [],
    }) as never
    const src = await buildSourceDocuments(
      payload,
      'tenant-1',
      '2026-04-01',
      '2026-04-30',
    )
    expect(src).toBeUndefined()

    // Rendering a file with no SourceDocuments must omit the wrapper —
    // not emit an empty one.
    const file: SafTAuditFile = {
      header: {
        auditFileVersion: '2.00',
        companyID: 'BG123',
        taxRegistrationNumber: 'BG123456789',
        taxAccountingBasis: 'F',
        companyName: 'Acme',
        companyAddress: { city: 'Sofia', postalCode: '1000', country: 'BG' },
        fiscalYear: 2026,
        startDate: '2026-04-01',
        endDate: '2026-04-30',
        currencyCode: 'EUR',
        dateCreated: '2026-05-09',
        productID: 'erpax',
        productVersion: '1.0',
      },
      masterFiles: {
        generalLedgerAccounts: [],
        customers: [],
        suppliers: [],
        products: [],
        taxTable: [],
      },
      sourceDocuments: src,
    }
    const xml = renderSafTXml(file)
    expect(xml).not.toContain('<SourceDocuments>')
    expect(xml).not.toContain('<SalesInvoices>')
    expect(xml).not.toContain('<PurchaseInvoices>')
    expect(xml).not.toContain('<Payments>')
    expect(xml).not.toContain('<MovementOfGoods>')
  })
})
