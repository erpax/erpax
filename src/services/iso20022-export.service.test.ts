/**
 * ISO 20022 export — pain.001 + pain.008 XML serializer tests.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-20022:2022 universal-financial-industry-message-scheme
 * @audit ISO-19011:2018 audit-trail
 * @see src/services/iso20022-export.service.ts
 */

import { describe, it, expect } from 'vitest'
import {
  renderPain001,
  renderPain008,
} from '@/iso20022/export.service'
import { escapeXml } from '@/xml/escape'
import type {
  Pain001Initiation,
  Pain008Initiation,
} from '@/iso/20022'

describe('ISO 20022 export — escapeXml', () => {
  it('escapes the five XML predefined entities', () => {
    expect(escapeXml('A & B')).toBe('A &amp; B')
    expect(escapeXml('<x>')).toBe('&lt;x&gt;')
    expect(escapeXml('"q"')).toBe('&quot;q&quot;')
    expect(escapeXml("It's")).toBe('It&apos;s')
  })
})

describe('pain.001 — Customer Credit Transfer Initiation', () => {
  const init: Pain001Initiation = {
    messageId: 'MSG-001',
    creationDateTime: new Date('2026-05-09T08:00:00Z'),
    numberOfTransactions: 2,
    controlSum: 1_500_00,
    initiatingParty: { name: 'Acme Holdings' },
    payments: [
      {
        paymentInformationId: 'PMT-001',
        paymentMethod: 'TRF',
        requestedExecutionDate: new Date('2026-05-10'),
        debtor: { name: 'Acme Holdings' },
        debtorAccount: { iban: 'BG80BNBG96611020345678', currency: 'EUR' },
        debtorAgentBic: 'BNBGBGSF',
        creditTransfers: [
          {
            endToEndId: 'E2E-A',
            amount: 1_000_00,
            currency: 'EUR',
            creditor: { name: 'Vendor A' },
            creditorAccount: { iban: 'DE89370400440532013000', currency: 'EUR' },
            creditorAgentBic: 'COBADEFFXXX',
            remittanceInformation: {
              structured: {
                creditorReference: { reference: 'RF18539007547034' },
              },
            },
          },
          {
            endToEndId: 'E2E-B',
            amount: 500_00,
            currency: 'EUR',
            creditor: { name: 'Vendor B' },
            creditorAccount: { iban: 'FR1420041010050500013M02606', currency: 'EUR' },
          },
        ],
      },
    ],
  }

  const xml = renderPain001(init)

  it('starts with XML prolog + Document root in pain.001 namespace', () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n')).toBe(
      true,
    )
    expect(xml).toContain(
      '<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.09">',
    )
    expect(xml.endsWith('</Document>')).toBe(true)
  })

  it('emits GrpHdr with MsgId + CreDtTm + NbOfTxs + CtrlSum + InitgPty', () => {
    expect(xml).toContain('<MsgId>MSG-001</MsgId>')
    expect(xml).toContain('<CreDtTm>2026-05-09T08:00:00.000Z</CreDtTm>')
    expect(xml).toContain('<NbOfTxs>2</NbOfTxs>')
    expect(xml).toContain('<CtrlSum>1500.00</CtrlSum>')
    expect(xml).toContain('<Nm>Acme Holdings</Nm>')
  })

  it('emits PmtInf with method TRF + execution date + debtor IBAN + agent BIC', () => {
    expect(xml).toContain('<PmtMtd>TRF</PmtMtd>')
    expect(xml).toContain('<ReqdExctnDt>2026-05-10</ReqdExctnDt>')
    expect(xml).toContain('<IBAN>BG80BNBG96611020345678</IBAN>')
    expect(xml).toContain('<BICFI>BNBGBGSF</BICFI>')
  })

  it('emits CdtTrfTxInf with EndToEndId + Amt(currencyId) + creditor IBAN + RmtInf', () => {
    expect(xml).toContain('<EndToEndId>E2E-A</EndToEndId>')
    expect(xml).toContain('<InstdAmt Ccy="EUR">1000.00</InstdAmt>')
    expect(xml).toContain('<EndToEndId>E2E-B</EndToEndId>')
    expect(xml).toContain('<InstdAmt Ccy="EUR">500.00</InstdAmt>')
    expect(xml).toContain('<IBAN>DE89370400440532013000</IBAN>')
    expect(xml).toContain('<IBAN>FR1420041010050500013M02606</IBAN>')
    expect(xml).toContain('<Ref>RF18539007547034</Ref>')
  })

  it('honors a namespace override for older / newer pain.001 versions', () => {
    const xmlOlder = renderPain001(init, {
      namespace: 'urn:iso:std:iso:20022:tech:xsd:pain.001.001.03',
    })
    expect(xmlOlder).toContain(
      '<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03">',
    )
  })
})

describe('pain.008 — Customer Direct Debit Initiation', () => {
  const init: Pain008Initiation = {
    messageId: 'MSG-DD-001',
    creationDateTime: new Date('2026-05-09T08:00:00Z'),
    numberOfTransactions: 1,
    controlSum: 99_99,
    initiatingParty: { name: 'Acme Holdings' },
    payments: [
      {
        paymentInformationId: 'PMT-DD-001',
        paymentMethod: 'DD',
        requestedCollectionDate: new Date('2026-05-15'),
        localInstrument: 'CORE',
        sequenceType: 'RCUR',
        creditor: { name: 'Acme Holdings' },
        creditorAccount: { iban: 'BG80BNBG96611020345678', currency: 'EUR' },
        creditorAgentBic: 'BNBGBGSF',
        directDebits: [
          {
            endToEndId: 'E2E-DD-A',
            amount: 99_99,
            currency: 'EUR',
            mandateId: 'MDT-2026-A',
            dateOfSignature: new Date('2026-01-15'),
            debtor: { name: 'Customer A' },
            debtorAccount: { iban: 'DE89370400440532013000', currency: 'EUR' },
          },
        ],
      },
    ],
  }

  const xml = renderPain008(init)

  it('Document root in pain.008 namespace', () => {
    expect(xml).toContain(
      '<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.08">',
    )
    expect(xml).toContain('<CstmrDrctDbtInitn>')
  })

  it('emits CORE local instrument + RCUR sequence type', () => {
    expect(xml).toContain('<Cd>CORE</Cd>')
    expect(xml).toContain('<SeqTp>RCUR</SeqTp>')
  })

  it('emits MndtId + DtOfSgntr in MndtRltdInf', () => {
    expect(xml).toContain('<MndtId>MDT-2026-A</MndtId>')
    expect(xml).toContain('<DtOfSgntr>2026-01-15</DtOfSgntr>')
  })

  it('emits ReqdColltnDt for direct-debit collection date', () => {
    expect(xml).toContain('<ReqdColltnDt>2026-05-15</ReqdColltnDt>')
  })

  it('emits PmtMtd DD + creditor IBAN + debtor IBAN', () => {
    expect(xml).toContain('<PmtMtd>DD</PmtMtd>')
    expect(xml).toContain('<IBAN>BG80BNBG96611020345678</IBAN>') // creditor
    expect(xml).toContain('<IBAN>DE89370400440532013000</IBAN>') // debtor
  })
})
