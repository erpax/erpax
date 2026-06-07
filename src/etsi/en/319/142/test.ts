import { describe, expect, it } from 'vitest'
import {
  buildPadesSignatureDictionary,
  PADES_DEFAULT_LEVEL,
  PADES_DEFAULT_SUBFILTER,
  padesLevelOid,
  type PadesLevel,
} from '@/etsi/en/319/142'

// ETSI EN 319 142 PAdES — declares the /Sig dictionary shape for the
// two-pass sign flow. This module owns the shape, not the cryptography.
describe('etsi/en/319/142 — PAdES baseline profile + /Sig dictionary builder', () => {
  it('the eIDAS-archival defaults are B-LT / ETSI.CAdES.detached', () => {
    expect(PADES_DEFAULT_LEVEL).toBe('B-LT')
    expect(PADES_DEFAULT_SUBFILTER).toBe('ETSI.CAdES.detached')
  })

  it('every baseline level maps to its distinct ETSI level OID', () => {
    expect(padesLevelOid('B-B')).toBe('0.4.0.19142.1.1')
    expect(padesLevelOid('B-T')).toBe('0.4.0.19142.1.2')
    expect(padesLevelOid('B-LT')).toBe('0.4.0.19142.1.3')
    expect(padesLevelOid('B-LTA')).toBe('0.4.0.19142.1.4')
    const levels: PadesLevel[] = ['B-B', 'B-T', 'B-LT', 'B-LTA']
    expect(new Set(levels.map(padesLevelOid)).size).toBe(4)
  })

  it('builds a /Sig cos-dict applying the module defaults', () => {
    const sig = buildPadesSignatureDictionary()
    expect(sig.level).toBe(PADES_DEFAULT_LEVEL)
    expect(sig.subFilter).toBe(PADES_DEFAULT_SUBFILTER)
    expect(sig.cosDictionary).toContain('/Type /Sig')
    expect(sig.cosDictionary).toContain('/Filter /Adobe.PPKLite')
    expect(sig.cosDictionary).toContain(`/SubFilter /${PADES_DEFAULT_SUBFILTER}`)
  })

  it('reserves a zero-padded /Contents placeholder of placeholderBytes hex chars', () => {
    const sig = buildPadesSignatureDictionary({ placeholderBytes: 256 })
    expect(sig.placeholderBytes).toBe(256)
    expect(sig.contentsPlaceholder).toBe('<' + '0'.repeat(256) + '>')
    expect(sig.cosDictionary).toContain(`/Contents ${sig.contentsPlaceholder}`)
  })

  it('default placeholder is 16384 hex chars (8 KiB for B-LT material)', () => {
    const sig = buildPadesSignatureDictionary()
    expect(sig.placeholderBytes).toBe(16384)
    expect(sig.contentsPlaceholder.length).toBe(16384 + 2) // angle brackets
  })

  it('emits the placeholder /ByteRange for second-pass back-patching', () => {
    const sig = buildPadesSignatureDictionary()
    expect(sig.cosDictionary).toContain('/ByteRange [0 0 0 0]')
  })

  it('declares the claimed PAdES level + its OID via Prop_Build', () => {
    const sig = buildPadesSignatureDictionary({ level: 'B-LTA' })
    expect(sig.level).toBe('B-LTA')
    expect(sig.cosDictionary).toContain('/PAdES.Level (B-LTA)')
    expect(sig.cosDictionary).toContain(`/PAdES.LevelOID (${padesLevelOid('B-LTA')})`)
  })

  it('normalizes signedAt into a UTC PDF date string', () => {
    const sig = buildPadesSignatureDictionary({ signedAt: '2026-06-07T12:34:56Z' })
    expect(sig.cosDictionary).toContain("/M (D:20260607123456+00'00')")
  })

  it('an invalid signedAt collapses to the sentinel PDF date', () => {
    const sig = buildPadesSignatureDictionary({ signedAt: 'not-a-date' })
    expect(sig.cosDictionary).toContain("/M (D:00000000000000+00'00')")
  })

  it('escapes PDF string metacharacters in reason / location', () => {
    const sig = buildPadesSignatureDictionary({
      reason: 'audit (final)',
      location: 'Sofia (BG)',
    })
    expect(sig.cosDictionary).toContain('/Reason (audit \\(final\\))')
    expect(sig.cosDictionary).toContain('/Location (Sofia \\(BG\\))')
  })

  it('omits optional /Reason and /Location when not provided', () => {
    const sig = buildPadesSignatureDictionary()
    expect(sig.cosDictionary).not.toContain('/Reason')
    expect(sig.cosDictionary).not.toContain('/Location')
  })

  it('defaults /Name to erpax, overridable by contactInfo', () => {
    expect(buildPadesSignatureDictionary().cosDictionary).toContain('/Name (erpax)')
    expect(
      buildPadesSignatureDictionary({ contactInfo: 'ceci@psg.bg' }).cosDictionary,
    ).toContain('/Name (ceci@psg.bg)')
  })
})
