/**
 * Standards export plugin — unified dispatch tests.
 *
 * Asserts the unified entry point dispatches to the correct underlying
 * service per format discriminator and produces the canonical MIME
 * type + filename.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard OECD SAF-T 2.0
 * @standard Peppol-BIS-3.0 billing
 * @standard UN-EDIFACT D.96A
 * @standard ISO-20022:2022
 * @audit ISO-19011:2018 audit-trail
 * @see src/plugins/export/standards-export.ts
 */

import { describe, it, expect } from 'vitest'
import {
  exportStandards,
  mimeTypeFor,
} from '@/plugins/export/standards-export'
import {
  PEPPOL_BIS_3_CUSTOMIZATION_ID,
  type PeppolBillingMessage,
} from '@/standards/peppol-bis-3'
import type { EdifactInterchange } from '@/standards/un-edifact'
import type {
  Pain001Initiation,
  Pain008Initiation,
} from '@/standards/iso-20022'

describe('Standards export — mimeTypeFor', () => {
  it('returns the canonical RFC 6838 type per format', () => {
    expect(mimeTypeFor('saf-t-xml')).toBe('application/xml')
    expect(mimeTypeFor('peppol-ubl')).toBe('application/xml')
    expect(mimeTypeFor('edifact')).toBe('application/edifact')
    expect(mimeTypeFor('pain-001-xml')).toBe('application/xml')
    expect(mimeTypeFor('pain-008-xml')).toBe('application/xml')
  })
})

describe('Standards export — saf-t-xml dispatch', () => {
  it('builds the audit file via mock Payload and renders XML', async () => {
    const mockPayload = {
      find: async () => ({ docs: [] }),
    } as unknown as Parameters<typeof exportStandards>[0] extends { payload: infer P }
      ? P
      : never
    const result = await exportStandards({
      format: 'saf-t-xml',
      payload: mockPayload as never,
      options: {
        tenantId: 't1',
        fiscalYear: 2026,
        startDate: '2026-04-01',
        endDate: '2026-04-30',
        companyID: 'BG123',
        taxRegistrationNumber: 'BG123456789',
        companyName: 'Acme',
        companyAddress: { city: 'Sofia', postalCode: '1000', country: 'BG' },
        currencyCode: 'EUR',
      },
    })
    expect(result.format).toBe('saf-t-xml')
    expect(result.mimeType).toBe('application/xml')
    expect(result.filename).toMatch(/^saft-BG123-\d{4}-\d{2}-\d{2}\.xml$/)
    expect(result.content).toContain('<?xml version="1.0"')
    expect(result.content).toContain(
      '<AuditFile xmlns="urn:OECD:StandardAuditFile-Tax:1.0">',
    )
  })
})

describe('Standards export — peppol-ubl dispatch', () => {
  it('renders UBL XML and uses invoice number in filename', async () => {
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
        invoiceNumber: '2026-001',
        issueDate: '2026-05-09',
        typeCode: '380',
        currencyCode: 'EUR',
      },
      lines: [
        {
          id: '1',
          quantity: 1,
          unitCode: 'EA',
          netAmount: 100_00,
          vat: { categoryCode: 'S', rate: 20 },
        },
      ],
      totals: {
        lineNetTotal: 100_00,
        taxExclusiveTotal: 100_00,
        vatTotal: 20_00,
        taxInclusiveTotal: 120_00,
        amountDue: 120_00,
      },
      vatBreakdown: [
        { taxableAmount: 100_00, taxAmount: 20_00, categoryCode: 'S', rate: 20 },
      ],
    }
    const result = await exportStandards({ format: 'peppol-ubl', message })
    expect(result.format).toBe('peppol-ubl')
    expect(result.mimeType).toBe('application/xml')
    expect(result.filename).toMatch(/^peppol-2026-001-\d{4}-\d{2}-\d{2}\.xml$/)
    expect(result.content).toContain(`<cbc:CustomizationID>${PEPPOL_BIS_3_CUSTOMIZATION_ID}</cbc:CustomizationID>`)
  })
})

describe('Standards export — edifact dispatch', () => {
  it('renders the EDIFACT interchange wire format with .edi filename', async () => {
    const interchange: EdifactInterchange = {
      unb: {
        syntaxIdentifier: 'UNOC',
        syntaxVersion: 4,
        sender: { id: 'A', qualifier: 'ZZZ' },
        receiver: { id: 'B', qualifier: 'ZZZ' },
        preparationDate: '260509',
        preparationTime: '1500',
        interchangeControlReference: 'REF001',
      },
      messages: [],
      unz: { numberOfMessages: 0, interchangeControlReference: 'REF001' },
    }
    const result = await exportStandards({ format: 'edifact', interchange })
    expect(result.format).toBe('edifact')
    expect(result.mimeType).toBe('application/edifact')
    expect(result.filename).toMatch(/^edifact-REF001-\d{4}-\d{2}-\d{2}\.edi$/)
    expect(result.content).toContain("UNB+UNOC:4")
    expect(result.content).toContain("UNZ+0+REF001'")
  })
})

describe('Standards export — pain.001 / pain.008 dispatch', () => {
  it('pain-001-xml uses messageId in filename', async () => {
    const initiation: Pain001Initiation = {
      messageId: 'MSG-001',
      creationDateTime: new Date('2026-05-09T08:00:00Z'),
      numberOfTransactions: 0,
      controlSum: 0,
      initiatingParty: { name: 'Acme' },
      payments: [],
    }
    const result = await exportStandards({
      format: 'pain-001-xml',
      initiation,
    })
    expect(result.format).toBe('pain-001-xml')
    expect(result.filename).toMatch(/^pain001-MSG-001-\d{4}-\d{2}-\d{2}\.xml$/)
    expect(result.content).toContain(
      '<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.09">',
    )
  })

  it('pain-008-xml honors namespace override', async () => {
    const initiation: Pain008Initiation = {
      messageId: 'DD-MSG-001',
      creationDateTime: new Date('2026-05-09T08:00:00Z'),
      numberOfTransactions: 0,
      controlSum: 0,
      initiatingParty: { name: 'Acme' },
      payments: [],
    }
    const result = await exportStandards({
      format: 'pain-008-xml',
      initiation,
      namespace: 'urn:iso:std:iso:20022:tech:xsd:pain.008.001.02',
    })
    expect(result.content).toContain(
      '<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02">',
    )
  })
})
