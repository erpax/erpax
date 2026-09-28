/**
 * Invariant tests for the shared standards catalogue — the uuid-native index
 * where the dissolved @standard vocabulary meets (registry ⊕ banners). Co-located
 * with the atom it proves; the generator (src/standards/emit.ts) is held
 * to these by construction.
 *
 * @standard ISO/IEC-29119:2022 software-testing (invariant coverage)
 * @standard ISO/IEC-25010:2023 §5.4 reusability (one join, two frontends)
 * @rfc 9562 content-uuid (every standard is content-addressed)
 */
import { mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { emitCatalogueFace } from './emit'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { STANDARDS_CATALOGUE, STANDARDS_COUNT } from './catalogue'
import { STANDARDS_REGISTRY } from './registry'
import collectionConfig from '@/standards'
import { uuid } from '@/integrity'
import { uuidColor } from '@/uuid/projection'

// The payload `standards.family` enum — DERIVED from the live collection config
// (not hand-duplicated), so this test set can never drift from the schema.
const familyField = (collectionConfig.fields as Array<{ name?: string; options?: Array<{ value: string }> }>)
  .find((f) => f.name === 'family')
const FAMILIES = new Set((familyField?.options ?? []).map((o) => o.value))

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
  /**
   * The guarantee did not weaken, it MOVED. This test asserted that `SKILL.md` restates every cited id
   * and uuid — so it pinned a 60,733-byte duplication as a requirement, in the one face an agent loads
   * on every turn. The rows now live in `CATALOGUE.md`, which no agent loads, and the guarantee is
   * checked there. `docs/STANDARDS_INDEX.md` could not carry it: keyed on banner text, it holds 92 of
   * the 159 cited ids and no uuids, so asserting against it would pass while checking 58% of the claim.
   */
  it('the full face reflects the WHOLE registry — every id, every uuid', () => {
    // Emitted into a temp tree and read back, NOT read from `docs/` — that directory is gitignored, so a
    // test reading it passes locally on a file this session generated and fails in CI on a clean
    // checkout. Asserting the GENERATOR is also the stronger claim: reading a committed copy would only
    // prove that somebody once ran the emitter.
    const root = mkdtempSync(join(tmpdir(), 'erpax-stdface-'))
    try {
      mkdirSync(join(root, 'docs'), { recursive: true })
      emitCatalogueFace(STANDARDS_CATALOGUE, root)
      const md = readFileSync(join(root, 'docs/STANDARDS_CATALOGUE.md'), 'utf8')
      for (const e of STANDARDS_CATALOGUE) {
        expect(md).toContain('`' + e.id + '`') // cited AND registered — the whole registry
        expect(md).toContain('`' + e.uuid.slice(0, 8) + '`') // uuid-native, as the atom's law requires
      }
      const uncited = STANDARDS_CATALOGUE.filter((e) => e.count === 0)
      if (uncited.length) expect(md).toContain('registered — awaiting citation')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('the agent face (SKILL.md) carries the SHAPE, and never the rows', () => {
    const md = readFileSync(new URL('./SKILL.md', import.meta.url), 'utf8')
    const cited = STANDARDS_CATALOGUE.filter((e) => e.count > 0)
    const header = md.match(/## Catalogue — (\d+) standards, (\d+) citations/)
    expect(header).toBeTruthy()
    expect(Number(header![1])).toBe(cited.length)
    expect(Number(header![2])).toBe(cited.reduce((n, e) => n + e.count, 0))

    // every family, with counts that agree with the data — the shape is what a reader needs at a glance
    const families = new Map<string, { n: number; citations: number }>()
    for (const e of cited) {
      const f = families.get(e.family) ?? { n: 0, citations: 0 }
      families.set(e.family, { n: f.n + 1, citations: f.citations + e.count })
    }
    for (const [fam, { n, citations }] of families) {
      expect(md).toContain(`| ${fam} | ${n} | ${citations} |`)
    }
    expect(md).toContain(`Registered, awaiting citation: ${STANDARDS_CATALOGUE.filter((e) => e.count === 0).length}.`)

    // and it must NOT pay for the rows again: a per-turn face carries no swatch HTML
    expect(md).not.toContain('border-radius:50%')
    // the bound is the point of the fold, so it is asserted rather than described
    expect(md.length).toBeLessThan(8000)
    expect(md).toContain('docs/STANDARDS_CATALOGUE.md')
  })

  it('the index.ts collection schema (family enum) covers every catalogue family', () => {
    const fields = collectionConfig.fields as Array<{ name?: string; options?: Array<{ value: string }> }>
    const familyField = fields.find((f) => f.name === 'family')
    expect(familyField?.options?.length).toBeGreaterThan(0)
    const allowed = new Set(familyField!.options!.map((o) => o.value))
    for (const e of STANDARDS_CATALOGUE) expect(allowed.has(e.family)).toBe(true) // schema ⊇ data
  })
})
