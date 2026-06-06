/**
 * Registry soundness — the curated spine ⊕ normalized-ported standards must be a
 * closed, deduped set grounded to the payload `standards.family` enum. These are
 * the gates that keep `seed.ts`'s `as Standard['family']` cast provably safe and
 * stop copy-paste version-dupes from minting two rows for one standard.
 *
 * @standard ISO/IEC-29119:2022 software-testing (invariant coverage)
 * @standard ISO-19011:2018 §6.4 audit-evidence (no duplicate identity)
 */
import { describe, it, expect } from 'vitest'
import { STANDARDS_REGISTRY, normalizeFamily, STANDARD_FAMILIES } from './registry'
import collectionConfig from '@/standards'

// The allowed family set, DERIVED from the live collection config (not the
// registry's own constant) — the schema is the source of truth the registry is
// grounded to. If the two ever diverge, this is where it surfaces.
const familyField = (collectionConfig.fields as Array<{ name?: string; options?: Array<{ value: string }> }>)
  .find((f) => f.name === 'family')
const SCHEMA_FAMILIES = new Set((familyField?.options ?? []).map((o) => o.value))

describe('standards registry — grounded to the payload family enum', () => {
  it('every registered standard has a family in the schema-derived allowed set (fail-closed)', () => {
    expect(SCHEMA_FAMILIES.size).toBeGreaterThan(0)
    for (const s of STANDARDS_REGISTRY) {
      expect(SCHEMA_FAMILIES.has(s.family), `${s.id} has out-of-enum family "${s.family}"`).toBe(true)
    }
  })

  it("the registry's STANDARD_FAMILIES constant equals the live schema enum", () => {
    // The mirror in registry.ts must match the schema — so normalizeFamily can
    // never produce a value the schema rejects.
    expect(new Set(STANDARD_FAMILIES)).toEqual(SCHEMA_FAMILIES)
  })

  it('normalizeFamily maps every raw token into the enum and is idempotent on canonical values', () => {
    // canonical values pass through unchanged
    for (const f of STANDARD_FAMILIES) expect(normalizeFamily(f)).toBe(f)
    // representative raw tokens fold into the enum
    expect(normalizeFamily('eu-regulation')).toBe('eu')
    expect(normalizeFamily('eu-directive')).toBe('eu')
    expect(normalizeFamily('eidas')).toBe('eu')
    expect(normalizeFamily('emv')).toBe('eu')
    expect(normalizeFamily('treaty')).toBe('eu')
    expect(normalizeFamily('us-gaap')).toBe('us_gaap')
    expect(normalizeFamily('us-law')).toBe('us_gaap')
    expect(normalizeFamily('us-state-law')).toBe('us_gaap')
    expect(normalizeFamily('sec')).toBe('us_gaap')
    expect(normalizeFamily('pcaob')).toBe('sox')
    expect(normalizeFamily('un-cefact')).toBe('un')
    expect(normalizeFamily('ifrs-sustainability')).toBe('ifrs')
    // anything unmapped fails CLOSED to "other" — never escapes the enum
    expect(normalizeFamily('fatf')).toBe('other')
    expect(normalizeFamily('owasp')).toBe('other')
    expect(normalizeFamily('a-brand-new-unknown-token')).toBe('other')
    // the universal guarantee
    for (const raw of ['eu-regulation', 'fatf', 'us-gaap', 'pcaob', 'whatever']) {
      expect(SCHEMA_FAMILIES.has(normalizeFamily(raw))).toBe(true)
    }
  })
})

describe('standards registry — canonical identity is deduped', () => {
  it('has unique ids', () => {
    const ids = STANDARDS_REGISTRY.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('no two standards share a canonical sourceUrl, except the intentional shared-landing groups', () => {
    // Different standards that legitimately share ONE publisher landing page.
    // Same-standard-different-id duplicates are removed in ported.ts; only these
    // genuinely-distinct citations may share a URL.
    const SHARED_URL_ALLOWLIST: ReadonlyArray<ReadonlySet<string>> = [
      // FATF: distinct recommendations, one consolidated recommendations page.
      new Set(['FATF-R.10', 'FATF-R.16', 'FATF-Recommendations']),
      // GDPR: the whole regulation vs a specific article control.
      new Set(['EU-2016/679', 'GDPR-Art-32']),
    ]
    const byUrl = new Map<string, string[]>()
    for (const s of STANDARDS_REGISTRY) {
      if (!s.sourceUrl) continue
      const arr = byUrl.get(s.sourceUrl) ?? []
      arr.push(s.id)
      byUrl.set(s.sourceUrl, arr)
    }
    for (const [url, ids] of byUrl) {
      if (ids.length <= 1) continue
      const idSet = new Set(ids)
      const allowed = SHARED_URL_ALLOWLIST.some(
        (group) => idSet.size === group.size && [...idSet].every((id) => group.has(id)),
      )
      expect(allowed, `unexpected duplicate sourceUrl ${url} shared by ${ids.join(', ')}`).toBe(true)
    }
  })

  it('the GDPR whole regulation is a single canonical entry (no GDPR/EU-2016/679 split)', () => {
    // The bare `GDPR` id is gone; the regulation lives under one canonical id.
    expect(STANDARDS_REGISTRY.some((s) => s.id === 'GDPR')).toBe(false)
    // Exactly one whole-regulation entry for 2016/679, plus the distinct article.
    const refers2016679 = STANDARDS_REGISTRY.filter(
      (s) => /2016\/679/.test(s.id) || s.sourceUrl?.includes('reg/2016/679'),
    )
    expect(new Set(refers2016679.map((s) => s.id))).toEqual(new Set(['EU-2016/679', 'GDPR-Art-32']))
    // The word "GDPR" still resolves to the survivor (its match token), not a stale id.
    const survivor = STANDARDS_REGISTRY.find((s) => s.id === 'EU-2016/679')
    expect(survivor?.match).toMatch(/GDPR/)
    expect(survivor?.family).toBe('gdpr')
  })
})
