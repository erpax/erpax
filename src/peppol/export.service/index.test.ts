/**
 * Peppol UBL 2.1 export — wire-format serializer tests.
 *
 * Asserts the rendered XML carries the BIS 3.0 customisation + profile,
 * the EN 16931 totals chain, and the cac:/cbc: namespaces every Peppol
 * gateway expects.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard Peppol-BIS-3.0 billing
 * @standard UBL-2.1 universal-business-language
 * @audit ISO-19011:2018 audit-trail
 * @see ./index.ts
 */

import { describe, it, expect } from 'vitest'
import { renderPeppolInvoice } from '@/peppol/export.service'
import { escapeXml } from '@/xml/escape'
import {
  PEPPOL_BIS_3_CUSTOMIZATION_ID,
  type PeppolBillingMessage,
} from '@/peppol/bis/3'

describe('Peppol export — escapeXml', () => {
  it('escapes the five XML predefined entities', () => {
    expect(escapeXml('a & b')).toBe('a &amp; b')
    expect(escapeXml('<tag>')).toBe('&lt;tag&gt;')
    expect(escapeXml('"quoted"')).toBe('&quot;quoted&quot;')
    expect(escapeXml("It's")).toBe('It&apos;s')
  })

  it('returns empty for null / undefined', () => {
    expect(escapeXml(undefined)).toBe('')
    expect(escapeXml(null as unknown as string)).toBe('')
  })
})

describe('Peppol UBL — single-line standard-rate invoice', () => {
  const minimalMessage: PeppolBillingMessage = {
    envelope: {
      customizationId: PEPPOL_BIS_3_CUSTOMIZATION_ID,
      profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
      documentTypeId:
        'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1',
      senderParticipantId: { scheme: '9956', value: 'BG123456789' },
      receiverParticipantId: { scheme: '9930', value: 'DE987654321' },
      senderEndpointId: { scheme: '9956', value: 'BG123456789' },
      receiverEndpointId: { scheme: '9930', value: 'DE987654321' },
    },
    invoice: {
      invoiceNumber: '2026-001',
      issueDate: '2026-05-09',
      dueDate: '2026-06-08',
      typeCode: '380',
      currencyCode: 'EUR',
      buyerReference: 'PO-42',
    },
    lines: [
      {
        id: '1',
        description: 'Widget Pro 2026',
        quantity: 10,
        unitCode: 'EA',
        netAmount: 1_000_00,
        priceDetails: {
          itemNetPrice: 100_00,
          baseQuantity: 1,
          baseUnitCode: 'EA',
        },
        vat: { categoryCode: 'S', rate: 20 },
        itemId: 'WIDGET-1',
      },
    ],
    totals: {
      lineNetTotal: 1_000_00,
      taxExclusiveTotal: 1_000_00,
      vatTotal: 200_00,
      taxInclusiveTotal: 1_200_00,
      amountDue: 1_200_00,
    },
    vatBreakdown: [
      {
        taxableAmount: 1_000_00,
        taxAmount: 200_00,
        categoryCode: 'S',
        rate: 20,
      },
    ],
  }

  it('starts with XML prolog + UBL Invoice element with three namespaces', () => {
    const xml = renderPeppolInvoice(minimalMessage)
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n')).toBe(true)
    expect(xml).toContain(
      'xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"',
    )
    expect(xml).toContain(
      'xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"',
    )
    expect(xml).toContain(
      'xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"',
    )
    expect(xml.endsWith('</Invoice>')).toBe(true)
  })

  it('emits the BIS 3.0 CustomizationID + ProfileID at the top', () => {
    const xml = renderPeppolInvoice(minimalMessage)
    expect(xml).toContain(
      `<cbc:CustomizationID>${PEPPOL_BIS_3_CUSTOMIZATION_ID}</cbc:CustomizationID>`,
    )
    expect(xml).toContain(
      '<cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>',
    )
  })

  it('emits invoice header fields (BT-1 / BT-2 / BT-3 / BT-5 / BT-9 / BT-10)', () => {
    const xml = renderPeppolInvoice(minimalMessage)
    expect(xml).toContain('<cbc:ID>2026-001</cbc:ID>') // BT-1
    expect(xml).toContain('<cbc:IssueDate>2026-05-09</cbc:IssueDate>') // BT-2
    expect(xml).toContain('<cbc:DueDate>2026-06-08</cbc:DueDate>') // BT-9
    expect(xml).toContain('<cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>') // BT-3
    expect(xml).toContain(
      '<cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>',
    ) // BT-5
    expect(xml).toContain('<cbc:BuyerReference>PO-42</cbc:BuyerReference>') // BT-10
  })

  it('emits supplier / customer EndpointID with schemeID attributes', () => {
    const xml = renderPeppolInvoice(minimalMessage)
    expect(xml).toContain('<cbc:EndpointID schemeID="9956">BG123456789</cbc:EndpointID>')
    expect(xml).toContain('<cbc:EndpointID schemeID="9930">DE987654321</cbc:EndpointID>')
  })

  it('emits TaxTotal + TaxSubtotal with categoryCode + rate + scheme', () => {
    const xml = renderPeppolInvoice(minimalMessage)
    expect(xml).toContain(
      '<cbc:TaxAmount currencyID="EUR">200.00</cbc:TaxAmount>',
    )
    expect(xml).toContain(
      '<cbc:TaxableAmount currencyID="EUR">1000.00</cbc:TaxableAmount>',
    )
    expect(xml).toContain('<cbc:ID>S</cbc:ID>')
    expect(xml).toContain('<cbc:Percent>20.00</cbc:Percent>')
    expect(xml).toContain('<cbc:ID>VAT</cbc:ID>')
  })

  it('emits LegalMonetaryTotal full chain (BT-106..BT-115)', () => {
    const xml = renderPeppolInvoice(minimalMessage)
    expect(xml).toContain(
      '<cbc:LineExtensionAmount currencyID="EUR">1000.00</cbc:LineExtensionAmount>',
    )
    expect(xml).toContain(
      '<cbc:TaxExclusiveAmount currencyID="EUR">1000.00</cbc:TaxExclusiveAmount>',
    )
    expect(xml).toContain(
      '<cbc:TaxInclusiveAmount currencyID="EUR">1200.00</cbc:TaxInclusiveAmount>',
    )
    expect(xml).toContain(
      '<cbc:PayableAmount currencyID="EUR">1200.00</cbc:PayableAmount>',
    )
  })

  it('emits InvoiceLine with quantity unitCode + price + item', () => {
    const xml = renderPeppolInvoice(minimalMessage)
    expect(xml).toContain('<cbc:InvoicedQuantity unitCode="EA">10</cbc:InvoicedQuantity>')
    expect(xml).toContain('<cbc:PriceAmount currencyID="EUR">100.00</cbc:PriceAmount>')
    expect(xml).toContain('<cbc:Name>Widget Pro 2026</cbc:Name>')
  })

  it('escapes invoice values with XML special characters', () => {
    const message: PeppolBillingMessage = {
      ...minimalMessage,
      invoice: { ...minimalMessage.invoice, buyerReference: 'PO #1 & #2 <draft>' },
    }
    const xml = renderPeppolInvoice(message)
    expect(xml).toContain(
      '<cbc:BuyerReference>PO #1 &amp; #2 &lt;draft&gt;</cbc:BuyerReference>',
    )
  })
})

describe('Peppol UBL — multi-rate invoice with reverse charge', () => {
  it('renders separate TaxSubtotal blocks per VAT category', () => {
    const message: PeppolBillingMessage = {
      envelope: {
        customizationId: PEPPOL_BIS_3_CUSTOMIZATION_ID,
        profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
        documentTypeId:
          'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1',
        senderParticipantId: { scheme: '9956', value: 'BG123' },
        receiverParticipantId: { scheme: '9930', value: 'DE987' },
        senderEndpointId: { scheme: '9956', value: 'BG123' },
        receiverEndpointId: { scheme: '9930', value: 'DE987' },
      },
      invoice: {
        invoiceNumber: '2026-002',
        issueDate: '2026-05-09',
        typeCode: '380',
        currencyCode: 'EUR',
      },
      lines: [
        {
          id: '1',
          quantity: 1,
          unitCode: 'EA',
          netAmount: 80_000_00,
          vat: { categoryCode: 'S', rate: 20 },
        },
        {
          id: '2',
          quantity: 1,
          unitCode: 'EA',
          netAmount: 20_000_00,
          vat: { categoryCode: 'AE', exemptionReasonCode: 'VATEX-EU-AE' },
        },
      ],
      totals: {
        lineNetTotal: 100_000_00,
        taxExclusiveTotal: 100_000_00,
        vatTotal: 16_000_00,
        taxInclusiveTotal: 116_000_00,
        amountDue: 116_000_00,
      },
      vatBreakdown: [
        {
          taxableAmount: 80_000_00,
          taxAmount: 16_000_00,
          categoryCode: 'S',
          rate: 20,
        },
        {
          taxableAmount: 20_000_00,
          taxAmount: 0,
          categoryCode: 'AE',
          exemptionReasonCode: 'VATEX-EU-AE',
          exemptionReason: 'Reverse charge',
        },
      ],
    }
    const xml = renderPeppolInvoice(message)
    // Two TaxSubtotal blocks.
    const subtotalCount = (xml.match(/<cac:TaxSubtotal>/g) ?? []).length
    expect(subtotalCount).toBe(2)
    // Reverse-charge category emits exemption reason code.
    expect(xml).toContain(
      '<cbc:TaxExemptionReasonCode>VATEX-EU-AE</cbc:TaxExemptionReasonCode>',
    )
    expect(xml).toContain(
      '<cbc:TaxExemptionReason>Reverse charge</cbc:TaxExemptionReason>',
    )
  })
})
