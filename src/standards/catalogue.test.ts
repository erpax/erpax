/**
 * Invariant tests for the shared standards catalogue — the uuid-native index
 * where the dissolved @standard vocabulary meets (registry ⊕ banners). Co-located
 * with the atom it proves; the generator (scripts/standards-catalogue.ts) is held
 * to these by construction.
 *
 * @standard ISO/IEC-29119:2022 software-testing (invariant coverage)
 * @standard ISO/IEC-25010:2023 §5.4 reusability (one join, two frontends)
 * @rfc 9562 content-uuid (every standard is content-addressed)
 */
import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { STANDARDS_CATALOGUE, STANDARDS_COUNT } from './catalogue'
import { STANDARDS_REGISTRY } from './registry'
import collectionConfig from '@/standards'
import { uuid } from '@/integrity/content-uuid'
import { uuidColor } from '@/uuid/projection'

// The payload `standards.family` enum (mirrors src/standards/index.ts).
const FAMILIES = new Set([
  'ifrs', 'us_gaap', 'iso', 'iec', 'w3c', 'rfc', 'eu', 'oecd', 'nist',
  'etsi', 'wcag', 'sox', 'gdpr', 'un', 'upu', 'en', 'national', 'other',
])

describe('standards catalogue — the shared uuid-native index', () => {
  it('catalogues every registered standard, 1:1 (registry ≡ catalogue keys)', () => {
    expect(STANDARDS_CATALOGUE.length).toBe(STANDARDS_REGISTRY.length)
    expect(STANDARDS_COUNT).toBe(STANDARDS_CATALOGUE.length)
    const catIds = new Set(STANDARDS_CATALOGUE.map((e) => e.id))
    for (const r of STANDARDS_REGISTRY) expect(catIds.has(r.id)).toBe(true)
  })

  it('has unique standard ids', () => {
    const ids = STANDARDS_CATALOGUE.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('is uuid-native — each entry IS its canonical content-uuid (reproducible, tamper-evident)', () => {
    for (const e of STANDARDS_CATALOGUE) {
      // the stored uuid must equal a fresh uuid({ id, family, title }) — so a
      // hand-edit of catalogue.ts that desyncs the uuid is caught here.
      expect(e.uuid).toBe(uuid({ id: e.id, family: e.family, title: e.title }))
      // uuidv8 layout (RFC 9562 §5.8): version nibble 8, variant 10xx.
      expect(e.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
      // the colour is that uuid projected — the multi-modal signature.
      expect(e.color).toBe(uuidColor(e.uuid))
    }
  })

  it('uses only valid payload family enum values', () => {
    for (const e of STANDARDS_CATALOGUE) expect(FAMILIES.has(e.family)).toBe(true)
  })

  it('joins live banner usage — cited standards carry real citing modules', () => {
    const cited = STANDARDS_CATALOGUE.filter((e) => e.count > 0)
    expect(cited.length).toBeGreaterThan(0)
    for (const e of cited) {
      expect(e.modules.length).toBeGreaterThan(0)
      for (const m of e.modules) expect(m.path.startsWith('src/')).toBe(true)
    }
  })
})

// The fractal/holographic invariant: every file in the atom folder reflects the
// SAME whole, so any one particle reconstructs it. These catch drift BETWEEN the
// folder's files (the generator's two frontends + the schema) programmatically.
describe('standards folder — holographic consistency across its particles', () => {
  it('the vitepress page (SKILL.md) is the catalogue — same cited standards, in sync', () => {
    const md = readFileSync(new URL('./SKILL.md', import.meta.url), 'utf8')
    const cited = STANDARDS_CATALOGUE.filter((e) => e.count > 0)
    const header = md.match(/## Catalogue — (\d+) standards/)
    expect(header).toBeTruthy()
    expect(Number(header![1])).toBe(cited.length) // the page header count === the data
    for (const e of cited) {
      expect(md).toContain('`' + e.id + '`') // every cited id rendered
      expect(md).toContain('`' + e.uuid.slice(0, 8) + '`') // with its uuid — the page is uuid-native too
    }
    // the page reflects the WHOLE registry — uncited standards (the upstream
    // permaculture basis) surface in the "registered — awaiting citation" section.
    const uncited = STANDARDS_CATALOGUE.filter((e) => e.count === 0)
    if (uncited.length) {
      expect(md).toContain('registered — awaiting citation')
      for (const e of uncited) expect(md).toContain('`' + e.id + '`')
    }
  })

  it('the index.ts collection schema (family enum) covers every catalogue family', () => {
    const fields = collectionConfig.fields as Array<{ name?: string; options?: Array<{ value: string }> }>
    const familyField = fields.find((f) => f.name === 'family')
    expect(familyField?.options?.length).toBeGreaterThan(0)
    const allowed = new Set(familyField!.options!.map((o) => o.value))
    for (const e of STANDARDS_CATALOGUE) expect(allowed.has(e.family)).toBe(true) // schema ⊇ data
  })
})
