/**
 * Peppol UBL import — XML parser tests.
 *
 * Asserts an inbound UBL 2.1 invoice parses into the canonical
 * PeppolBillingMessage shape. Round-trips against the export service
 * — render → parse → assert structural equivalence.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard Peppol-BIS-3.0 billing
 * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
 * @audit ISO-19011:2018 audit-trail
 * @see ./index.ts
 */

import { describe, it, expect } from 'vitest'
import { parsePeppolInvoice } from '@/peppol/import.service'
import { renderPeppolInvoice } from '@/peppol/export.service'
import { importStandards } from '@/export/standards-import'
import {
  PEPPOL_BIS_3_CUSTOMIZATION_ID,
  type PeppolBillingMessage,
} from '@/peppol/bis/3'

const SAMPLE_INBOUND = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>${PEPPOL_BIS_3_CUSTOMIZATION_ID}</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
  <cbc:ID>2026-001</cbc:ID>
  <cbc:IssueDate>2026-05-09</cbc:IssueDate>
  <cbc:DueDate>2026-06-08</cbc:DueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
  <cbc:BuyerReference>PO-42</cbc:BuyerReference>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cbc:EndpointID schemeID="9956">BG123456789</cbc:EndpointID>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cbc:EndpointID schemeID="9930">DE987654321</cbc:EndpointID>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="EUR">200.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="EUR">1000.00</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="EUR">200.00</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>20.00</cbc:Percent>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="EUR">1000.00</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="EUR">1000.00</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="EUR">1200.00</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="EUR">1200.00</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
  <cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:InvoicedQuantity unitCode="EA">10</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="EUR">1000.00</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Description>Widget Pro 2026</cbc:Description>
      <cbc:Name>Widget Pro 2026</cbc:Name>
      <cac:SellersItemIdentification>
        <cbc:ID>WIDGET-1</cbc:ID>
      </cac:SellersItemIdentification>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>20.00</cbc:Percent>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="EUR">100.00</cbc:PriceAmount>
      <cbc:BaseQuantity unitCode="EA">1</cbc:BaseQuantity>
    </cac:Price>
  </cac:InvoiceLine>
</Invoice>`

describe('parsePeppolInvoice — canonical shape', () => {
  const parsed = parsePeppolInvoice(SAMPLE_INBOUND)

  it('extracts CustomizationID + ProfileID correctly', () => {
    expect(parsed.envelope.customizationId).toBe(
      PEPPOL_BIS_3_CUSTOMIZATION_ID,
    )
    expect(parsed.envelope.profileId).toBe(
      'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
    )
  })

  it('parses sender + receiver participant ids with schemes', () => {
    expect(parsed.envelope.senderParticipantId).toEqual({
      scheme: '9956',
      value: 'BG123456789',
    })
    expect(parsed.envelope.receiverParticipantId).toEqual({
      scheme: '9930',
      value: 'DE987654321',
    })
  })

  it('parses invoice header fields (BT-1 / BT-2 / BT-3 / BT-5 / BT-9 / BT-10)', () => {
    expect(parsed.invoice.invoiceNumber).toBe('2026-001')
    expect(parsed.invoice.issueDate).toBe('2026-05-09')
    expect(parsed.invoice.typeCode).toBe('380')
    expect(parsed.invoice.currencyCode).toBe('EUR')
    expect(parsed.invoice.dueDate).toBe('2026-06-08')
    expect(parsed.invoice.buyerReference).toBe('PO-42')
  })

  it('parses LegalMonetaryTotal with all amounts in cents', () => {
    expect(parsed.totals.lineNetTotal).toBe(1_000_00)
    expect(parsed.totals.taxExclusiveTotal).toBe(1_000_00)
    expect(parsed.totals.taxInclusiveTotal).toBe(1_200_00)
    expect(parsed.totals.amountDue).toBe(1_200_00)
  })

  it('parses VAT breakdown with category code + rate + amounts', () => {
    expect(parsed.vatBreakdown).toHaveLength(1)
    expect(parsed.vatBreakdown[0].categoryCode).toBe('S')
    expect(parsed.vatBreakdown[0].rate).toBe(20)
    expect(parsed.vatBreakdown[0].taxableAmount).toBe(1_000_00)
    expect(parsed.vatBreakdown[0].taxAmount).toBe(200_00)
  })

  it('parses the invoice line with item, quantity, price, VAT', () => {
    expect(parsed.lines).toHaveLength(1)
    const line = parsed.lines[0]
    expect(line.id).toBe('1')
    expect(line.quantity).toBe(10)
    expect(line.unitCode).toBe('EA')
    expect(line.netAmount).toBe(1_000_00)
    expect(line.description).toBe('Widget Pro 2026')
    expect(line.itemId).toBe('WIDGET-1')
    expect(line.priceDetails?.itemNetPrice).toBe(100_00)
    expect(line.priceDetails?.baseQuantity).toBe(1)
    expect(line.priceDetails?.baseUnitCode).toBe('EA')
    expect(line.vat.categoryCode).toBe('S')
    expect(line.vat.rate).toBe(20)
  })
})

describe('Peppol round-trip — render then parse', () => {
  it('preserves the canonical structure across serialise → parse', () => {
    const original: PeppolBillingMessage = {
      envelope: {
        customizationId: PEPPOL_BIS_3_CUSTOMIZATION_ID,
        profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
        documentTypeId:
          'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1',
        senderParticipantId: { scheme: '9956', value: 'BG999' },
        receiverParticipantId: { scheme: '9930', value: 'DE111' },
        senderEndpointId: { scheme: '9956', value: 'BG999' },
        receiverEndpointId: { scheme: '9930', value: 'DE111' },
      },
      invoice: {
        invoiceNumber: 'RT-001',
        issueDate: '2026-05-09',
        typeCode: '380',
        currencyCode: 'EUR',
      },
      lines: [
        {
          id: '1',
          quantity: 5,
          unitCode: 'EA',
          netAmount: 500_00,
          vat: { categoryCode: 'S', rate: 20 },
        },
      ],
      totals: {
        lineNetTotal: 500_00,
        taxExclusiveTotal: 500_00,
        vatTotal: 100_00,
        taxInclusiveTotal: 600_00,
        amountDue: 600_00,
      },
      vatBreakdown: [
        {
          taxableAmount: 500_00,
          taxAmount: 100_00,
          categoryCode: 'S',
          rate: 20,
        },
      ],
    }

    const xml = renderPeppolInvoice(original)
    const parsed = parsePeppolInvoice(xml)

    expect(parsed.envelope.senderParticipantId).toEqual(
      original.envelope.senderParticipantId,
    )
    expect(parsed.envelope.receiverParticipantId).toEqual(
      original.envelope.receiverParticipantId,
    )
    expect(parsed.invoice.invoiceNumber).toBe(original.invoice.invoiceNumber)
    expect(parsed.invoice.typeCode).toBe(original.invoice.typeCode)
    expect(parsed.totals.amountDue).toBe(original.totals.amountDue)
    expect(parsed.lines).toHaveLength(1)
    expect(parsed.lines[0].netAmount).toBe(500_00)
    expect(parsed.vatBreakdown[0].rate).toBe(20)
  })
})

describe('importStandards dispatcher — peppol-ubl', () => {
  it('dispatches peppol-ubl format to parsePeppolInvoice', async () => {
    const result = await importStandards({
      format: 'peppol-ubl',
      xml: SAMPLE_INBOUND,
    })
    expect(result.format).toBe('peppol-ubl')
    const data = result.data as PeppolBillingMessage
    expect(data.invoice.invoiceNumber).toBe('2026-001')
  })
})

describe('CreditNote — invoiceTypeCode 381 → CreditNote document type id', () => {
  it('derives the CreditNote-2 document type id', () => {
    const cn = SAMPLE_INBOUND.replace(
      '<cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>',
      '<cbc:InvoiceTypeCode>381</cbc:InvoiceTypeCode>',
    )
    const parsed = parsePeppolInvoice(cn)
    expect(parsed.envelope.documentTypeId).toContain('CreditNote-2')
    expect(parsed.invoice.typeCode).toBe('381')
  })
})
