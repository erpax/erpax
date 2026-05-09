/**
 * Peppol BIS Billing 3.0 — canonical envelope types tests.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard Peppol-BIS-3.0 billing
 * @standard ISO-6523-1:1998 participant-identifier-scheme
 * @audit ISO-19011:2018 audit-trail
 */

import { describe, it, expect } from 'vitest'
import {
  PEPPOL_BIS_3_CUSTOMIZATION_ID,
  isPeppolParticipantIdentifierScheme,
  isPeppolDocumentTypeId,
  isPeppolProfileId,
  formatPeppolParticipantId,
  parsePeppolParticipantId,
  type PeppolBillingMessage,
  type PeppolEnvelope,
  type PeppolParticipantIdentifier,
} from '@/standards/peppol-bis-3'

describe('Peppol BIS 3.0 — runtime guards', () => {
  it('isPeppolParticipantIdentifierScheme accepts canonical ISO 6523 codes', () => {
    expect(isPeppolParticipantIdentifierScheme('0088')).toBe(true) // GLN
    expect(isPeppolParticipantIdentifierScheme('9930')).toBe(true) // DE VAT
    expect(isPeppolParticipantIdentifierScheme('9925')).toBe(true) // BE VAT
    expect(isPeppolParticipantIdentifierScheme('9956')).toBe(true) // BG VAT
    expect(isPeppolParticipantIdentifierScheme('9999')).toBe(false)
    expect(isPeppolParticipantIdentifierScheme('GLN')).toBe(false)
  })

  it('isPeppolDocumentTypeId accepts Invoice + CreditNote variants', () => {
    expect(
      isPeppolDocumentTypeId(
        'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1',
      ),
    ).toBe(true)
    expect(
      isPeppolDocumentTypeId(
        'urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2::CreditNote##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1',
      ),
    ).toBe(true)
    expect(isPeppolDocumentTypeId('Invoice')).toBe(false)
  })

  it('isPeppolProfileId accepts the BIS billing profiles', () => {
    expect(
      isPeppolProfileId('urn:fdc:peppol.eu:2017:poacc:billing:01:1.0'),
    ).toBe(true)
    expect(
      isPeppolProfileId('urn:fdc:peppol.eu:2017:poacc:billing:02:1.0'),
    ).toBe(true)
    expect(isPeppolProfileId('urn:fdc:peppol.eu:2017:poacc:billing:99:1.0')).toBe(
      false,
    )
  })
})

describe('Peppol BIS 3.0 — participant id formatting', () => {
  it('formatPeppolParticipantId renders the iso6523-actorid-upis prefix', () => {
    const id: PeppolParticipantIdentifier = { scheme: '9930', value: 'DE123456789' }
    expect(formatPeppolParticipantId(id)).toBe(
      'iso6523-actorid-upis::9930:DE123456789',
    )
  })

  it('parsePeppolParticipantId accepts both prefixed + bare forms', () => {
    expect(parsePeppolParticipantId('iso6523-actorid-upis::9930:DE123')).toEqual({
      scheme: '9930',
      value: 'DE123',
    })
    expect(parsePeppolParticipantId('9930:DE123')).toEqual({
      scheme: '9930',
      value: 'DE123',
    })
  })

  it('parsePeppolParticipantId returns null for unknown scheme or malformed', () => {
    expect(parsePeppolParticipantId('9999:X')).toBeNull()
    expect(parsePeppolParticipantId('not-a-participant')).toBeNull()
    expect(parsePeppolParticipantId(null)).toBeNull()
  })

  it('round-trips: format → parse', () => {
    const id: PeppolParticipantIdentifier = { scheme: '9956', value: 'BG123456789' }
    const formatted = formatPeppolParticipantId(id)
    const parsed = parsePeppolParticipantId(formatted)
    expect(parsed).toEqual(id)
  })
})

describe('Peppol BIS 3.0 — envelope', () => {
  it('CustomizationID matches the BIS 3.0 mandated string', () => {
    expect(PEPPOL_BIS_3_CUSTOMIZATION_ID).toBe(
      'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
    )
  })

  it('builds a complete envelope', () => {
    const env: PeppolEnvelope = {
      customizationId: PEPPOL_BIS_3_CUSTOMIZATION_ID,
      profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
      documentTypeId:
        'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1',
      senderParticipantId: { scheme: '9956', value: 'BG123456789' },
      receiverParticipantId: { scheme: '9930', value: 'DE987654321' },
      senderEndpointId: { scheme: '9956', value: 'BG123456789' },
      receiverEndpointId: { scheme: '9930', value: 'DE987654321' },
    }
    expect(env.profileId).toContain('billing:01')
    expect(env.senderParticipantId.scheme).toBe('9956')
  })

  it('PeppolBillingMessage composes envelope + EN 16931 body', () => {
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
          id: 'L1',
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
        {
          taxableAmount: 100_00,
          taxAmount: 20_00,
          categoryCode: 'S',
          rate: 20,
        },
      ],
    }
    expect(message.invoice.typeCode).toBe('380')
    expect(message.envelope.customizationId).toBe(
      PEPPOL_BIS_3_CUSTOMIZATION_ID,
    )
    expect(message.totals.amountDue).toBe(120_00)
  })
})
