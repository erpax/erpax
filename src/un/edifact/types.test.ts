/**
 * UN/EDIFACT D.96A — canonical message types tests.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard UN-EDIFACT D.96A
 * @standard ISO-9735:2002 edifact-syntax-rules
 * @audit ISO-19011:2018 audit-trail
 */

import { describe, it, expect } from 'vitest'
import {
  isEdifactSyntaxId,
  isEdifactMessageType,
  isBalancedInvoicNet,
  type EdifactInvoic,
  type EdifactInterchange,
  type EdifactDesadv,
  type EdifactPaymul,
} from '@/un/edifact'

describe('UN/EDIFACT — runtime guards', () => {
  it('isEdifactSyntaxId accepts UNOA / UNOB / UNOC / UNOD / UNOY', () => {
    for (const s of ['UNOA', 'UNOB', 'UNOC', 'UNOD', 'UNOY']) {
      expect(isEdifactSyntaxId(s)).toBe(true)
    }
    expect(isEdifactSyntaxId('UNOZ')).toBe(false)
  })

  it('isEdifactMessageType accepts the cited subset', () => {
    expect(isEdifactMessageType('INVOIC')).toBe(true)
    expect(isEdifactMessageType('DESADV')).toBe(true)
    expect(isEdifactMessageType('PAYMUL')).toBe(true)
    expect(isEdifactMessageType('ORDERS')).toBe(false) // not yet covered
  })

  it('isBalancedInvoicNet checks Σ line nets ≈ document net', () => {
    expect(isBalancedInvoicNet([100_00, 200_00, 300_00], 600_00)).toBe(true)
    expect(isBalancedInvoicNet([100_00, 200_00, 300_00], 700_00)).toBe(false)
    // 1-cent rounding tolerance is allowed.
    expect(isBalancedInvoicNet([33_33, 33_33, 33_34], 100_00)).toBe(true)
  })
})

describe('UN/EDIFACT — INVOIC d96a structure', () => {
  it('builds a complete invoice message with envelope + body + trailer', () => {
    const invoic: EdifactInvoic = {
      unh: {
        messageReferenceNumber: '1',
        messageType: 'INVOIC',
        version: 'D',
        release: '96A',
        controllingAgency: 'UN',
      },
      bgm: {
        documentNameCode: '380', // commercial invoice
        documentNumber: '2026-001',
        messageFunctionCode: '9', // original
      },
      dates: [
        { qualifier: '137', value: '20260509', formatQualifier: '102' },
      ],
      parties: [
        {
          partyQualifier: 'SE',
          name: 'Acme Lda',
          taxId: 'PT500000000',
          city: 'Lisboa',
          postalCode: '1250-145',
          country: 'PT',
        },
        {
          partyQualifier: 'BY',
          name: 'Customer S.A.',
          taxId: 'PT600000000',
          city: 'Porto',
          postalCode: '4000-100',
          country: 'PT',
        },
      ],
      currency: { code: 'EUR', qualifier: '4' }, // 4 = invoicing currency
      lines: [
        {
          lin: { lineNumber: 1, itemId: { id: 'WIDGET-1', codeListIdentifier: 'SA' } },
          description: { descriptionFormat: 'F', description: 'Widget Pro 2026' },
          quantity: { qualifier: '47', value: 10, unitCode: 'EA' },
          price: { qualifier: 'AAA', value: 100_00 },
          lineNetAmount: { qualifier: '125', value: 1_000_00, currency: 'EUR' },
          tax: { functionQualifier: '7', type: 'VAT', rate: 20, categoryCode: 'S' },
        },
      ],
      documentTotals: {
        netAmount: { qualifier: '125', value: 1_000_00 },
        taxAmount: { qualifier: '124', value: 200_00 },
        grossAmount: { qualifier: '128', value: 1_200_00 },
        amountDue: { qualifier: '9', value: 1_200_00 },
      },
      unt: { numberOfSegments: 11, messageReferenceNumber: '1' },
    }

    expect(invoic.unh.messageType).toBe('INVOIC')
    expect(invoic.bgm.documentNameCode).toBe('380')
    expect(invoic.lines).toHaveLength(1)
    expect(invoic.lines[0].quantity.value).toBe(10)
    expect(invoic.unt.messageReferenceNumber).toBe(invoic.unh.messageReferenceNumber)
    expect(
      isBalancedInvoicNet(
        invoic.lines.map((l) => l.lineNetAmount.value),
        invoic.documentTotals.netAmount.value,
      ),
    ).toBe(true)
  })

  it('DESADV carries despatched-quantity QTY 12', () => {
    const desadv: EdifactDesadv = {
      unh: {
        messageReferenceNumber: '2',
        messageType: 'DESADV',
        version: 'D',
        release: '96A',
        controllingAgency: 'UN',
      },
      bgm: {
        documentNameCode: '351', // despatch advice
        documentNumber: 'SHIP-001',
        messageFunctionCode: '9',
      },
      dates: [
        { qualifier: '11', value: '20260510', formatQualifier: '102' }, // despatch date
      ],
      parties: [
        { partyQualifier: 'SU', name: 'Supplier' },
        { partyQualifier: 'CN', name: 'Consignee' },
      ],
      lines: [
        {
          lin: { lineNumber: 1, itemId: { id: 'WIDGET-1', codeListIdentifier: 'SA' } },
          quantity: { qualifier: '12', value: 10, unitCode: 'EA' }, // despatched
        },
      ],
      unt: { numberOfSegments: 7, messageReferenceNumber: '2' },
    }
    expect(desadv.unh.messageType).toBe('DESADV')
    expect(desadv.lines[0].quantity.qualifier).toBe('12')
  })

  it('PAYMUL carries one or more payment legs', () => {
    const paymul: EdifactPaymul = {
      unh: {
        messageReferenceNumber: '3',
        messageType: 'PAYMUL',
        version: 'D',
        release: '96A',
        controllingAgency: 'UN',
      },
      bgm: {
        documentNameCode: '450', // payment order
        documentNumber: 'PAY-001',
        messageFunctionCode: '9',
      },
      dates: [
        { qualifier: '203', value: '202605091500', formatQualifier: '203' },
      ],
      legs: [
        {
          payee: {
            partyQualifier: 'BE',
            name: 'Vendor A',
            taxId: 'PT700000000',
          },
          amount: { qualifier: '9', value: 1_000_00, currency: 'EUR' },
          paymentMeans: { code: '30' }, // credit transfer
          remittanceReference: 'INV-001',
        },
      ],
      unt: { numberOfSegments: 6, messageReferenceNumber: '3' },
    }
    expect(paymul.legs).toHaveLength(1)
    expect(paymul.legs[0].paymentMeans.code).toBe('30')
  })

  it('Interchange wraps 1..N messages between UNB / UNZ', () => {
    const interchange: EdifactInterchange = {
      unb: {
        syntaxIdentifier: 'UNOC',
        syntaxVersion: 4,
        sender: { id: 'SENDER', qualifier: 'ZZZ' },
        receiver: { id: 'RECEIVER', qualifier: 'ZZZ' },
        preparationDate: '260509',
        preparationTime: '1500',
        interchangeControlReference: 'REF001',
      },
      messages: [],
      unz: { numberOfMessages: 0, interchangeControlReference: 'REF001' },
    }
    expect(interchange.unb.interchangeControlReference).toBe(
      interchange.unz.interchangeControlReference,
    )
  })
})
