import { describe, it, expect } from 'vitest'
import {
  PEPPOL_BIS_3_CUSTOMIZATION_ID,
  isPeppolParticipantIdentifierScheme,
  isPeppolDocumentTypeId,
  isPeppolProfileId,
  formatPeppolParticipantId,
  parsePeppolParticipantId,
} from '@/peppol/bis/3'

// Peppol BIS Billing 3.0: ISO-6523 participant ids, the BIS profile/doc-type
// urns, and the canonical `iso6523-actorid-upis::<scheme>:<value>` wire form.
describe('peppol/bis/3 — BIS Billing 3.0 envelope guards + id codec', () => {
  it('pins the BIS 3.0 CustomizationID urn', () => {
    expect(PEPPOL_BIS_3_CUSTOMIZATION_ID).toBe(
      'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
    )
  })

  it('isPeppolParticipantIdentifierScheme accepts ISO-6523 cited schemes', () => {
    for (const s of ['0088', '9930', '9925', '9946', '9956', '0007']) {
      expect(isPeppolParticipantIdentifierScheme(s)).toBe(true)
    }
    expect(isPeppolParticipantIdentifierScheme('0000')).toBe(false)
    expect(isPeppolParticipantIdentifierScheme('88')).toBe(false)
    expect(isPeppolParticipantIdentifierScheme(88)).toBe(false)
    expect(isPeppolParticipantIdentifierScheme(null)).toBe(false)
  })

  it('isPeppolProfileId accepts the two BIS billing process ids', () => {
    expect(isPeppolProfileId('urn:fdc:peppol.eu:2017:poacc:billing:01:1.0')).toBe(true)
    expect(isPeppolProfileId('urn:fdc:peppol.eu:2017:poacc:billing:02:1.0')).toBe(true)
    expect(isPeppolProfileId('urn:fdc:peppol.eu:2017:poacc:billing:99:1.0')).toBe(false)
    expect(isPeppolProfileId('')).toBe(false)
  })

  it('isPeppolDocumentTypeId accepts the Invoice/CreditNote doc-type urns', () => {
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
    expect(isPeppolDocumentTypeId('urn:something:else')).toBe(false)
    expect(isPeppolDocumentTypeId(undefined)).toBe(false)
  })

  it('formatPeppolParticipantId emits the SMP iso6523 wire form', () => {
    expect(formatPeppolParticipantId({ scheme: '9930', value: 'DE123456789' })).toBe(
      'iso6523-actorid-upis::9930:DE123456789',
    )
    expect(formatPeppolParticipantId({ scheme: '0088', value: '7300010000001' })).toBe(
      'iso6523-actorid-upis::0088:7300010000001',
    )
  })

  it('parsePeppolParticipantId round-trips both prefixed and bare forms', () => {
    const id = { scheme: '9956', value: 'BG123456789' } as const
    expect(parsePeppolParticipantId('iso6523-actorid-upis::9956:BG123456789')).toEqual(id)
    expect(parsePeppolParticipantId('9956:BG123456789')).toEqual(id)
    // format → parse is identity
    expect(parsePeppolParticipantId(formatPeppolParticipantId(id))).toEqual(id)
  })

  it('parsePeppolParticipantId rejects malformed input or unknown schemes', () => {
    expect(parsePeppolParticipantId('0000:X')).toBe(null) // unknown scheme
    expect(parsePeppolParticipantId('no-colon')).toBe(null)
    expect(parsePeppolParticipantId('99:X')).toBe(null) // not 4 digits
    expect(parsePeppolParticipantId(42)).toBe(null)
    expect(parsePeppolParticipantId(null)).toBe(null)
  })
})
