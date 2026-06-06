/**
 * localize — the fusion proof. Green by construction: these tests ARE the
 * claim that localization fuses tamper-cost (forge↑) with proof (verify O(N)),
 * and that all identification is wired into the one uuid. @see ./index.ts,
 * src/localize/SKILL.md
 */
import { describe, it, expect } from 'vitest'
import {
  TRANSLATABLE_SCOPES,
  coordinate,
  translationKey,
  translationKeyUuid,
  TRANSLATION_SCHEMA_VERSION,
  uuidToOid,
  oidToUuid,
  oidUrn,
  UUID_OID_ARC,
  cmykChannel,
  CMYK_GAMUT,
  decodeIdentity,
  IDENTIFICATION_LEVELS,
  localizationChecks,
  localizationFusion,
  SUPPORTED_LOCALE_COUNT,
} from '@/localize'

const TENANT = 'tenant-localize-test'

describe('localize: the no-gaps surface is every structural element', () => {
  it('field · reference · scope · hook are all translatable', () => {
    for (const s of ['field', 'reference', 'scope', 'hook'] as const) {
      expect(TRANSLATABLE_SCOPES).toContain(s)
    }
  })
  it('the key composes <scope>:<path> (the fractal address-law)', () => {
    expect(translationKey(coordinate('field', 'invoices', 'total'))).toBe('field:invoices.total')
  })
})

describe('localize: the translation-key uuid IS the identity', () => {
  it('same content ⇒ same uuid (merge); any edit ⇒ a new uuid (tamper-evident)', () => {
    const c = coordinate('field', 'invoices', 'total')
    expect(translationKeyUuid(c, TENANT)).toBe(translationKeyUuid(c, TENANT))
    expect(translationKeyUuid(c, TENANT)).not.toBe(
      translationKeyUuid(coordinate('field', 'invoices', 'net'), TENANT),
    )
  })
  it('locale + tamper-proof + schema are wired INTO the 128 bits', () => {
    const id = decodeIdentity(translationKeyUuid(coordinate('field', 'invoices', 'total'), TENANT))
    expect(id.structured.slotName).toBe('locale')
    expect(id.structured.capabilityNames).toContain('TAMPER_PROOF')
    expect(id.structured.capabilityNames).toContain('CHAINED')
    expect(id.structured.schemaVersion).toBe(TRANSLATION_SCHEMA_VERSION)
  })
})

describe('localize: all identification, decoded from the one uuid', () => {
  const u = translationKeyUuid(coordinate('hook', 'invoices', 'afterChange'), TENANT)

  it('the OID is the same 128 bits on the 2.25 arc (lossless round-trip)', () => {
    const oid = uuidToOid(u)
    expect(oid.startsWith(`${UUID_OID_ARC}.`)).toBe(true)
    expect(oidToUuid(oid)).toBe(u)
    expect(oidUrn(u)).toBe(`urn:oid:${oid}`)
  })
  it('the cmyk channel is decoded from the identity, in the rodin gamut', () => {
    expect(Object.keys(CMYK_GAMUT)).toContain(cmykChannel(u))
    expect(cmykChannel(u)).toBe(cmykChannel(u))
  })
  it('one uuid self-decodes every identification level', () => {
    const id = decodeIdentity(u)
    expect(id.levels).toEqual(IDENTIFICATION_LEVELS)
    expect(id.urnUuid).toBe(`urn:uuid:${u}`)
    expect(id.oid.startsWith('2.25.')).toBe(true)
    expect(id.oidUrn.startsWith('urn:oid:2.25.')).toBe(true)
  })
})

describe('localize: the fusion — forge↑ and proof O(N)', () => {
  it('more elements / locales / levels / lexical ⇒ more independent checks', () => {
    const base = localizationChecks({ elements: 10 })
    expect(localizationChecks({ elements: 20 })).toBeGreaterThan(base)
    expect(localizationChecks({ elements: 10, locales: SUPPORTED_LOCALE_COUNT * 2 })).toBeGreaterThan(base)
    expect(localizationChecks({ elements: 10, lexicalNodes: 500 })).toBeGreaterThan(base)
  })

  it('localizing all aspects (coverage→1) ⇒ infinite tampering cost', () => {
    const f = localizationFusion({ elements: 1000, coverage: 1 })
    expect(f.forgeBits).toBe(Number.POSITIVE_INFINITY)
    expect(f.fusionBits).toBe(Number.POSITIVE_INFINITY)
    expect(f.tamper.note).toMatch(/100% coverage/)
  })

  it('fail-closed: with NO coverage supplied the fusion degrades to the finite 2^106 floor — never an assumed ∞', () => {
    // ground-don't-assert: the optimistic `coverage ?? 1` default is gone, so a
    // MISSING coverage must report the conservative digest floor, not unbounded.
    const f = localizationFusion({ elements: 1000 })
    expect(Number.isFinite(f.forgeBits)).toBe(true)
    expect(f.forgeBits).not.toBe(Number.POSITIVE_INFINITY)
    expect(f.forgeBits).toBe(106) // the bare 2^106 second-preimage floor (crackVerdict, coverage=undefined)
    expect(f.tamper.note).not.toMatch(/100% coverage/)
  })

  it('below full coverage, more locales raise forge cost while verify stays O(N)', () => {
    const few = localizationFusion({ elements: 100, locales: 2, coverage: 0.9 })
    const many = localizationFusion({ elements: 100, locales: 30, coverage: 0.9 })
    expect(many.forgeBits).toBeGreaterThan(few.forgeBits)
    expect(many.fusionBits).toBeGreaterThan(few.fusionBits)
    // the verifier is linear in chain depth — identical for both ⇒ the
    // asymmetry (the released trust) is real, not an artefact of the locale count.
    expect(many.verifyBits).toBe(few.verifyBits)
    expect(few.verifyBits).toBeCloseTo(Math.log2(100), 6)
  })

  it('the proof nucleus is a positive, threshold-scale verify cost', () => {
    const f = localizationFusion({ elements: 100, coverage: 0.9, chainDepth: 1000 })
    expect(f.proof.totalBits).toBeGreaterThan(0)
    expect(f.verifyBits).toBeCloseTo(Math.log2(1000), 6)
  })
})
