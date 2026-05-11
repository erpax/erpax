/**
 * PAdES signature-dictionary builder tests — pin the cos-dict shape
 * downstream PDF mutators consume.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
 * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
 * @audit ISO-19011:2018 audit-trail signature-evidence
 * @compliance EU 910/2014 eidas qualified-electronic-signature
 * @see src/standards/etsi-en-319-142/signature-dictionary.ts
 */

import { describe, expect, it } from 'vitest'
import {
  buildPadesSignatureDictionary,
  PADES_DEFAULT_LEVEL,
  PADES_DEFAULT_SUBFILTER,
  padesLevelOid,
} from '@/standards/etsi-en-319-142'

describe('PAdES profile constants', () => {
  it('default level is B-LT (long-term archival)', () => {
    expect(PADES_DEFAULT_LEVEL).toBe('B-LT')
  })

  it('default subfilter is the ETSI baseline', () => {
    expect(PADES_DEFAULT_SUBFILTER).toBe('ETSI.CAdES.detached')
  })

  it.each([
    ['B-B', '0.4.0.19142.1.1'],
    ['B-T', '0.4.0.19142.1.2'],
    ['B-LT', '0.4.0.19142.1.3'],
    ['B-LTA', '0.4.0.19142.1.4'],
  ] as const)('%s OID is %s', (level, oid) => {
    expect(padesLevelOid(level)).toBe(oid)
  })
})

describe('buildPadesSignatureDictionary', () => {
  it('emits a /Sig dict with /Type /Filter /SubFilter /ByteRange /Contents /M', () => {
    const dict = buildPadesSignatureDictionary({
      reason: 'НАП SAF-T submission',
      location: 'Sofia',
      signedAt: '2026-05-09T12:00:00Z',
    })
    expect(dict.cosDictionary).toContain('/Type /Sig')
    expect(dict.cosDictionary).toContain('/Filter /Adobe.PPKLite')
    expect(dict.cosDictionary).toContain('/SubFilter /ETSI.CAdES.detached')
    expect(dict.cosDictionary).toContain('/ByteRange [0 0 0 0]') // placeholder
    expect(dict.cosDictionary).toContain('/Contents <')
    expect(dict.cosDictionary).toContain('/M (D:20260509120000+00\'00\')')
    expect(dict.cosDictionary).toContain('/Reason (НАП SAF-T submission)')
    expect(dict.cosDictionary).toContain('/Location (Sofia)')
  })

  it('reserves the placeholderBytes hex chars for /Contents', () => {
    const dict = buildPadesSignatureDictionary({ placeholderBytes: 4096 })
    expect(dict.placeholderBytes).toBe(4096)
    // Placeholder is `<` + 4096 zeros + `>`.
    expect(dict.contentsPlaceholder.length).toBe(4096 + 2)
    expect(dict.cosDictionary).toContain(dict.contentsPlaceholder)
  })

  it('declares the PAdES level + OID in /Prop_Build', () => {
    const dict = buildPadesSignatureDictionary({ level: 'B-LTA' })
    expect(dict.cosDictionary).toContain('/PAdES.Level (B-LTA)')
    expect(dict.cosDictionary).toContain('/PAdES.LevelOID (0.4.0.19142.1.4)')
  })

  it('escapes parens in PDF strings (Reason / Location)', () => {
    const dict = buildPadesSignatureDictionary({
      reason: 'Test (paren)',
      location: 'Sofia (BG)',
    })
    expect(dict.cosDictionary).toContain('/Reason (Test \\(paren\\))')
    expect(dict.cosDictionary).toContain('/Location (Sofia \\(BG\\))')
  })

  it('formats invalid signedAt as the zero-date sentinel', () => {
    const dict = buildPadesSignatureDictionary({ signedAt: 'not-a-date' })
    expect(dict.cosDictionary).toContain("D:00000000000000+00'00'")
  })
})
