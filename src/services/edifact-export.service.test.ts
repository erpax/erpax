/**
 * EDIFACT export service — wire-format serializer tests.
 *
 * Asserts the segment-by-segment wire format against ISO 9735 syntax
 * rules (segment ' / composite + / element : / release ?).
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard UN-EDIFACT D.96A
 * @standard ISO-9735:2002 edifact-syntax-rules
 * @audit ISO-19011:2018 audit-trail
 * @see src/services/edifact-export.service.ts
 */

import { describe, it, expect } from 'vitest'
import {
  escapeEdifact,
  composite,
  segment,
  serializeUNB,
  serializeUNH,
  serializeBGM,
  serializeDTM,
  serializeNAD,
  serializeLIN,
  serializeIMD,
  serializeQTY,
  serializePRI,
  serializeMOA,
  serializeTAX,
  serializeInvoic,
  serializeDesadv,
  serializeInterchange,
  serializeInterchangeAsString,
} from '@/edifact/export.service'
import type {
  EdifactInvoic,
  EdifactDesadv,
  EdifactInterchange,
} from '@/un/edifact'

describe('EDIFACT — escapeEdifact', () => {
  it('escapes ? first then + : and the segment terminator', () => {
    expect(escapeEdifact('Acme+Co.')).toBe('Acme?+Co.')
    expect(escapeEdifact('A:B')).toBe('A?:B')
    expect(escapeEdifact("It's")).toBe("It?'s")
    expect(escapeEdifact('A?B')).toBe('A??B')
  })

  it('returns empty string for null / undefined', () => {
    expect(escapeEdifact(undefined)).toBe('')
    expect(escapeEdifact(null as unknown as string)).toBe('')
  })

  it('handles all four specials in sequence', () => {
    expect(escapeEdifact("?+:'")).toBe("???+?:?'")
  })
})

describe('EDIFACT — composite + segment renderers', () => {
  it('composite joins with `:` and strips trailing empties', () => {
    expect(composite('A', 'B', 'C')).toBe('A:B:C')
    expect(composite('A', '', 'C')).toBe('A::C')
    expect(composite('A', 'B', '', '')).toBe('A:B')
  })

  it('segment renders TAG+composite+...+terminator', () => {
    expect(segment('BGM', '380', '2026-001', '9')).toBe(
      "BGM+380+2026-001+9'",
    )
    expect(segment('UNS', 'S')).toBe("UNS+S'")
  })
})

describe('EDIFACT — UNB / UNH / UNT / UNZ', () => {
  it('UNB renders correctly with sender/receiver qualifiers', () => {
    expect(
      serializeUNB({
        syntaxIdentifier: 'UNOC',
        syntaxVersion: 4,
        sender: { id: 'SENDER', qualifier: 'ZZZ' },
        receiver: { id: 'RECEIVER', qualifier: 'ZZZ' },
        preparationDate: '260509',
        preparationTime: '1500',
        interchangeControlReference: 'REF001',
      }),
    ).toBe("UNB+UNOC:4+SENDER:ZZZ+RECEIVER:ZZZ+260509:1500+REF001'")
  })

  it('UNH renders with version composite', () => {
    expect(
      serializeUNH({
        messageReferenceNumber: '1',
        messageType: 'INVOIC',
        version: 'D',
        release: '96A',
        controllingAgency: 'UN',
      }),
    ).toBe("UNH+1+INVOIC:D:96A:UN'")
  })
})

describe('EDIFACT — INVOIC body segments', () => {
  it('BGM with UN/CEFACT 1001 doc-name code', () => {
    expect(
      serializeBGM({
        documentNameCode: '380',
        documentNumber: '2026-001',
        messageFunctionCode: '9',
      }),
    ).toBe("BGM+380+2026-001+9'")
  })

  it('DTM with format qualifier 102 (CCYYMMDD)', () => {
    expect(
      serializeDTM({
        qualifier: '137',
        value: '20260509',
        formatQualifier: '102',
      }),
    ).toBe("DTM+137:20260509:102'")
  })

  it('NAD seller with tax id', () => {
    expect(
      serializeNAD({
        partyQualifier: 'SE',
        name: 'Acme Lda',
        taxId: 'PT500000000',
        city: 'Lisboa',
        postalCode: '1250-145',
        country: 'PT',
      }),
    ).toBe("NAD+SE+++Acme Lda:PT500000000++Lisboa++1250-145+PT'")
  })

  it('LIN with item id + scheme', () => {
    expect(
      serializeLIN({
        lineNumber: 1,
        itemId: { id: 'WIDGET-1', codeListIdentifier: 'SA' },
      }),
    ).toBe("LIN+1++WIDGET-1:SA'")
  })

  it('IMD free-form description', () => {
    expect(
      serializeIMD({
        descriptionFormat: 'F',
        description: 'Widget Pro 2026',
      }),
    ).toBe("IMD+F++:::Widget Pro 2026'")
  })

  it('QTY with qualifier 47 (invoiced) and unit code', () => {
    expect(
      serializeQTY({ qualifier: '47', value: 10, unitCode: 'EA' }),
    ).toBe("QTY+47:10:EA'")
  })

  it('PRI renders cents as decimal', () => {
    expect(serializePRI({ qualifier: 'AAA', value: 100_00 })).toBe(
      "PRI+AAA:100.00'",
    )
    expect(serializePRI({ qualifier: 'AAA', value: 12_34 })).toBe(
      "PRI+AAA:12.34'",
    )
  })

  it('MOA with currency', () => {
    expect(
      serializeMOA({ qualifier: '125', value: 1_000_00, currency: 'EUR' }),
    ).toBe("MOA+125:1000.00:EUR'")
  })

  it('TAX with VAT 20% standard category', () => {
    expect(
      serializeTAX({
        functionQualifier: '7',
        type: 'VAT',
        rate: 20,
        categoryCode: 'S',
      }),
    ).toBe("TAX+7+VAT++++:::20+S'")
  })
})

describe('EDIFACT — full INVOIC d96a serialization', () => {
  it('renders an 11-segment invoice with UNT count reconciled', () => {
    const invoic: EdifactInvoic = {
      unh: {
        messageReferenceNumber: '1',
        messageType: 'INVOIC',
        version: 'D',
        release: '96A',
        controllingAgency: 'UN',
      },
      bgm: { documentNameCode: '380', documentNumber: '2026-001', messageFunctionCode: '9' },
      dates: [
        { qualifier: '137', value: '20260509', formatQualifier: '102' },
      ],
      parties: [
        { partyQualifier: 'SE', name: 'Acme Lda', taxId: 'PT500000000' },
        { partyQualifier: 'BY', name: 'Customer S.A.', taxId: 'PT600000000' },
      ],
      lines: [
        {
          lin: { lineNumber: 1, itemId: { id: 'WIDGET-1', codeListIdentifier: 'SA' } },
          description: { descriptionFormat: 'F', description: 'Widget Pro 2026' },
          quantity: { qualifier: '47', value: 10, unitCode: 'EA' },
          price: { qualifier: 'AAA', value: 100_00 },
          lineNetAmount: { qualifier: '125', value: 1_000_00 },
          tax: { functionQualifier: '7', type: 'VAT', rate: 20, categoryCode: 'S' },
        },
      ],
      documentTotals: {
        netAmount: { qualifier: '125', value: 1_000_00 },
        taxAmount: { qualifier: '124', value: 200_00 },
        grossAmount: { qualifier: '128', value: 1_200_00 },
        amountDue: { qualifier: '9', value: 1_200_00 },
      },
      unt: { numberOfSegments: 0, messageReferenceNumber: '1' }, // reconciled
    }
    const segments = serializeInvoic(invoic)

    expect(segments[0]).toBe("UNH+1+INVOIC:D:96A:UN'")
    expect(segments[1]).toBe("BGM+380+2026-001+9'")
    expect(segments[2]).toBe("DTM+137:20260509:102'")
    // Total segment count =
    //     UNH + BGM + 1 DTM + 2 NAD
    //   + 1 LIN + 1 IMD + 1 QTY + 1 PRI + 1 MOA(line) + 1 TAX
    //   + UNS + 4 MOA(totals) + UNT
    //   = 1+1+1+2 + 1+1+1+1+1+1 + 1+4+1 = 17
    // (Original comment said `= 16` — that was an arithmetic slip; the
    // structure called out matches the EDIFACT D96A INVOIC profile and
    // sums to 17.)
    expect(segments).toHaveLength(17)
    // The last segment's UNT should reflect the actual count.
    expect(segments[segments.length - 1]).toBe("UNT+17+1'")
  })
})

describe('EDIFACT — DESADV serialization', () => {
  it('renders despatch advice with QTY 12 (despatched)', () => {
    const desadv: EdifactDesadv = {
      unh: {
        messageReferenceNumber: '2',
        messageType: 'DESADV',
        version: 'D',
        release: '96A',
        controllingAgency: 'UN',
      },
      bgm: { documentNameCode: '351', documentNumber: 'SHIP-001', messageFunctionCode: '9' },
      dates: [
        { qualifier: '11', value: '20260510', formatQualifier: '102' },
      ],
      parties: [{ partyQualifier: 'SU', name: 'Supplier' }],
      lines: [
        {
          lin: { lineNumber: 1, itemId: { id: 'WIDGET-1', codeListIdentifier: 'SA' } },
          quantity: { qualifier: '12', value: 10, unitCode: 'EA' },
        },
      ],
      unt: { numberOfSegments: 0, messageReferenceNumber: '2' },
    }
    const segments = serializeDesadv(desadv)
    expect(segments[0]).toMatch(/^UNH\+2\+DESADV/)
    expect(segments).toContain("QTY+12:10:EA'")
    expect(segments[segments.length - 1]).toMatch(/^UNT\+\d+\+2'$/)
  })
})

describe('EDIFACT — Interchange wrapping + UNZ reconciliation', () => {
  it('wraps two messages with consistent UNB/UNZ control reference', () => {
    const inv: EdifactInvoic = {
      unh: {
        messageReferenceNumber: '1',
        messageType: 'INVOIC',
        version: 'D',
        release: '96A',
        controllingAgency: 'UN',
      },
      bgm: { documentNameCode: '380', documentNumber: 'X', messageFunctionCode: '9' },
      dates: [],
      parties: [{ partyQualifier: 'SE', name: 'A' }],
      lines: [
        {
          lin: { lineNumber: 1 },
          quantity: { qualifier: '47', value: 1 },
          price: { qualifier: 'AAA', value: 100_00 },
          lineNetAmount: { qualifier: '125', value: 100_00 },
        },
      ],
      documentTotals: {
        netAmount: { qualifier: '125', value: 100_00 },
        taxAmount: { qualifier: '124', value: 0 },
        grossAmount: { qualifier: '128', value: 100_00 },
        amountDue: { qualifier: '9', value: 100_00 },
      },
      unt: { numberOfSegments: 0, messageReferenceNumber: '1' },
    }
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
      messages: [inv, inv],
      unz: { numberOfMessages: 0, interchangeControlReference: 'REF001' },
    }
    const segments = serializeInterchange(interchange)
    expect(segments[0]).toMatch(/^UNB\+UNOC:4/)
    // Last segment is UNZ, count reconciled to 2 messages.
    expect(segments[segments.length - 1]).toBe("UNZ+2+REF001'")

    // String form is newline-joined for readability.
    const wire = serializeInterchangeAsString(interchange)
    expect(wire.split('\n')).toHaveLength(segments.length)
  })
})
