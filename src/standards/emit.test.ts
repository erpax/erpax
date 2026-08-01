/**
 * @standard ISO/IEC-29119:2022 software-testing (emit invariant coverage)
 */
import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { STANDARDS_REGISTRY } from '@/standards/registry'
import { matcherFor, jurisdictionOf, obligationsFor, consolidatedObligations, buildStandardsCatalogue, verifyStandardsCatalogue, citationsInComments } from './emit'

// The parser mind — a second, independent reading of the same source, crossed with the regex `scan` because a
// single mind breaks. A `@standard` banner is a citation only in a real COMMENT; the same sigil in a string
// literal is DATA. The regex cannot tell them apart (it counted 5 such false citations, agreeing on 5862/5867);
// the parser can. And the parser has its OWN blind spot — markdown is not TS comments — caught and fixed here.
describe('emit — the parser mind refutes a banner that only masquerades in a string', () => {
  const code = [
    '/**',
    ' * @standard ISO-4217:2015 currency-codes', // a REAL citation, in a comment
    ' */',
    "export const msg = '@standard FAKE-9999 not-a-citation'", // a string literal — DATA, not a claim
  ].join('\n')

  it('counts a banner in a COMMENT, refuses one in a STRING LITERAL (.ts)', () => {
    const found = citationsInComments('a.ts', code)
    expect(found.some((v) => /ISO-4217/.test(v))).toBe(true) // the comment banner is a citation
    expect(found.some((v) => /FAKE-9999/.test(v))).toBe(false) // the string-literal banner is not
  })

  it('a .md file is entirely prose — the whole text is the citation source (the parser mind’s own blind spot, fixed)', () => {
    const md = '# doc\n\n@standard ISO-27001 information-security\n'
    expect(citationsInComments('a.md', md).some((v) => /ISO-27001/.test(v))).toBe(true) // markdown is prose, not code
  })
})

describe('standards/emit — catalogue generator', () => {
  it('builds entries aligned with registry', () => {
    const { entries } = buildStandardsCatalogue()
    expect(entries.length).toBeGreaterThan(0)
    expect(entries.every((e) => e.uuid && e.color)).toBe(true)
  })

  it('verify passes when catalogue.ts is fresh', () => {
    expect(verifyStandardsCatalogue()).toBe(true)
  })

  // The scan reads raw text via rg, so a banner sigil counted WHEREVER it appeared — including inside a
  // string literal, and including prose ABOUT banners. It filed confirm/matter.ts as implementing an "RFC"
  // whose title was the rest of a refusal message, and this file as citing its own SKILL template. Measured
  // on the live tree: 24 of 5,881 hits were not prose at all (0.4% — the corpus's banner discipline is
  // 99.6% honest). rg still picks the FILES (it honours .gitignore, keeping the generated faces that
  // restate every banner out); proseOf decides which hits are CITATIONS.
  describe('a string is DATA, not a citation', () => {
    const fixture = (files: Record<string, string>): string => {
      const dir = mkdtempSync(join(tmpdir(), 'erpax-emit-'))
      for (const [p, body] of Object.entries(files)) {
        mkdirSync(join(dir, p, '..'), { recursive: true })
        writeFileSync(join(dir, p), body)
      }
      return dir
    }
    const citing = (cwd: string, id: string): number =>
      buildStandardsCatalogue(cwd).entries.find((e) => e.id === id)?.count ?? 0

    it('counts a banner in a comment', () => {
      const d = fixture({ 'src/a/index.ts': '/**\n * @standard ISO-4217:2015 currency-codes\n */\nexport const x = 1' })
      expect(citing(d, 'ISO-4217')).toBeGreaterThan(0)
      rmSync(d, { recursive: true, force: true })
    })

    it('does NOT count the same banner inside a string literal', () => {
      const sigil = '@' + 'standard' // assembled: writing it literally would file a citation FROM this test
      const d = fixture({ 'src/a/index.ts': `export const msg = '${sigil} ISO-4217:2015 currency-codes'` })
      expect(citing(d, 'ISO-4217')).toBe(0)
      rmSync(d, { recursive: true, force: true })
    })

    it('counts the comment and ignores the string in the same file', () => {
      const sigil = '@' + 'standard'
      const d = fixture({
        'src/a/index.ts': `/**\n * ${sigil} ISO-4217:2015 currency-codes\n */\nexport const msg = '${sigil} ISO-4217:2015 currency-codes'`,
      })
      expect(citing(d, 'ISO-4217')).toBe(1) // one file, one citation — not two
      rmSync(d, { recursive: true, force: true })
    })
  })

  describe('standardImplementation — how well each standard is implemented + fused (bounded witness on the live corpus)', () => {
    it('scores every registered standard on the depth ladder and co-citation fusion, ranked by score', async () => {
      const { standardImplementation } = await import('@/standards/emit')
      const s = standardImplementation()
      expect(s.length).toBeGreaterThan(50)
      // sorted descending by score
      for (let i = 1; i < s.length; i++) expect(s[i - 1]!.score).toBeGreaterThanOrEqual(s[i]!.score)
      // every entry is well-formed
      for (const x of s) {
        expect(['uncited', 'prose', 'coded', 'gated']).toContain(x.depth)
        expect(x.fusionDegree).toBeGreaterThanOrEqual(0)
        if (x.depth === 'uncited') expect(x.citations).toBe(0)
        if (x.depth === 'uncited') expect(x.score).toBe(0)
      }
      // a GATED standard (enforced in rules/law/access) is the deepest and outscores an uncited one
      const gated = s.find((x) => x.depth === 'gated')
      const uncited = s.find((x) => x.depth === 'uncited')
      if (gated && uncited) expect(gated.score).toBeGreaterThan(uncited.score)
    })

    it('assertStandardsGated is the ENFORCEMENT ratchet — a mandatory standard cited-but-ungated fails closed', async () => {
      const { ungatedMandatory, assertStandardsGated, MUST_GATE } = await import('@/standards/emit')
      const u = ungatedMandatory()
      // every flagged standard is enforcement-mandatory, cited, and NOT gated
      for (const x of u) {
        expect(MUST_GATE.test(x.id)).toBe(true)
        expect(x.citations).toBeGreaterThan(0)
        expect(x.depth).not.toBe('gated')
      }
      // the ratchet: at/above the live count passes; below it (demanding fewer walls missing) fails closed
      expect(() => assertStandardsGated(process.cwd(), u.length)).not.toThrow()
      expect(() => assertStandardsGated(process.cwd(), u.length - 1)).toThrow(/NOT gated \(fail-closed\)/)
    })

    it('gates allow only prose is a VIOLATION — depth=gated requires .ts under rules|law|access, never markdown alone', async () => {
      const {
        standardImplementation,
        proseInGateFolderViolations,
        assertNoProseOnlyGates,
      } = await import('@/standards/emit')
      // ZDDS was the live false wall (SKILL.md only); heal moved the banner into rules/reference/index.ts
      const zdds = standardImplementation().find((x) => x.id === 'ZDDS')
      if (zdds) expect(zdds.depth).toBe('gated')
      for (const x of standardImplementation().filter((s) => s.depth === 'gated')) {
        // every gated standard must have at least one .ts citation under the gate tree —
        // proven indirectly: proseInGateFolderViolations excludes anything with gate .ts,
        // and no gated id may appear there.
        expect(proseInGateFolderViolations().some((v) => v.id === x.id)).toBe(false)
      }
      // the violation inventory is the fail-closed wall: if any remain, assert throws
      const v = proseInGateFolderViolations()
      if (v.length === 0) {
        expect(() => assertNoProseOnlyGates()).not.toThrow()
      } else {
        expect(() => assertNoProseOnlyGates()).toThrow(/gates allow only prose = VIOLATION/)
      }
    })
  })
})

describe('matcherFor — a compliance catalogue must not over-report coverage', () => {
  const re = (id: string, family = 'ilo', title = 't') => matcherFor({ id, family, title } as never)

  it('a LETTERED instrument number matches only itself', () => {
    expect(re('ILO-C001').test('@standard ILO C001 hours-of-work presence-minutes')).toBe(true)
    expect(re('ILO-C001').test('@standard ILO-C001 anything')).toBe(true)
    // THE BUG: ILO-C001 fell through to the digit-run fallback and became /001/i, so it matched
    // ISO 27001 — 120 fabricated citations for a convention the corpus cites once. An audit tool
    // that INVENTS coverage manufactures assurance for whoever signs; under-reporting is survivable.
    expect(re('ILO-C001').test('@standard ISO 27001 A.5.10 access-control-policy')).toBe(false)
    expect(re('ILO-C001').test('@standard ISO 9001 quality')).toBe(false)
    expect(re('ILO-C182').test('@standard ISO/IEC 25010 §5.6')).toBe(false)
  })

  it('a bare digit run is bounded on BOTH sides — it is a substring of every longer number', () => {
    // 800 must not match 25010, 18004, or 8000-series ids that merely contain it
    const eight = re('SP-800', 'nist')
    expect(eight.test('@standard NIST SP 800-162 ABAC')).toBe(true)
    expect(eight.test('@standard ISO 18004 qr-code')).toBe(false)
  })

  it('real standards are untouched by the fix', () => {
    expect(re('EN-16931', 'en').test('@standard EN 16931 §BT-151')).toBe(true)
    expect(re('ISO-27002', 'iso').test('@standard ISO 27002 8.24')).toBe(true)
  })
})

describe('jurisdiction — the tax-residence join', () => {
  const rows = STANDARDS_REGISTRY as unknown as Array<{ id: string; family: string; title?: string; jurisdiction?: string }>

  it('a PUBLISHER is never returned as a jurisdiction', () => {
    // the registry records `ISO` as a jurisdiction on 4 rows. ISO is a body, not a territory —
    // a residence query returning "ISO" as a place files against somewhere that does not exist
    expect(jurisdictionOf({ id: 'ISO-30414', family: 'iso', jurisdiction: 'ISO' })).toBe('international')
    for (const body of ['IEC', 'W3C', 'NIST', 'ETSI']) {
      expect(jurisdictionOf({ id: 'X-1', family: 'other', jurisdiction: body })).toBe('international')
    }
  })

  it('a national instrument names its own territory — READ, not assumed', () => {
    expect(jurisdictionOf({ id: 'ZDDS', family: 'national', title: 'BG Value Added Tax Act' })).toBe('BG')
    expect(jurisdictionOf({ id: 'ZKPO', family: 'national', title: 'BG Corporate Income Tax Act' })).toBe('BG')
    // a hardcoded national→BG would mis-file the first non-Bulgarian statute added after this
    expect(jurisdictionOf({ id: 'UStG', family: 'national', title: 'DE Umsatzsteuergesetz' })).toBe('DE')
  })

  it('every registry row resolves — none is left undefined', () => {
    for (const r of rows) expect(jurisdictionOf(r).length).toBeGreaterThan(1)
    expect(rows.filter((r) => jurisdictionOf(r) === 'BG').map((r) => r.id).sort()).toEqual(['Naredba-N-18', 'ZDDS', 'ZKPO'])
  })

  it('a residence carries its own territory PLUS international — never its territory alone', () => {
    const bg = obligationsFor('BG', rows)
    expect(bg).toContain('ZDDS')
    expect(bg).toContain('ILO-C029') // international binds everywhere it is adopted
    expect(bg).not.toContain('SOX') // and US statute does not reach a BG resident
    // international is NOT a synonym for "none" — collapsing them loses the labour obligations
    expect(bg.length).toBeGreaterThan(rows.filter((r) => jurisdictionOf(r) === 'BG').length)
  })

  it('a GROUP carries the UNION, never the intersection', () => {
    const g = consolidatedObligations(['BG', 'US'], rows)
    const most = Math.max(...Object.values(g.perResidence).map((v) => v.length))
    expect(g.all.length).toBeGreaterThanOrEqual(most) // a superset of every member
    expect(g.all).toContain('ZDDS') // BG-only, still carried by the group
    expect(g.all).toContain('SOX') // US-only, still carried by the group
    // and the attribution survives — a consolidated total nobody can trace is not auditable
    expect(g.perResidence.BG).toContain('ZDDS')
    expect(g.perResidence.US).not.toContain('ZDDS')
    expect(g.uniqueToOne.length).toBeGreaterThan(0) // the group's single points of exposure
  })

  it('an empty group carries NOTHING, not everything', () => {
    const g = consolidatedObligations([], rows)
    expect(g.all).toEqual([])
    expect(g.uniqueToOne).toEqual([]) // and one member has no "unique to one" — there is no other
    expect(consolidatedObligations(['BG'], rows).uniqueToOne).toEqual([])
  })

  it('THE BOUNDARY: the mechanism covers any residence; the REGISTRY covers three', () => {
    // structural coverage is total — any ISO 3166-1 code resolves and queries
    expect(obligationsFor('JP', rows).length).toBeGreaterThan(0) // international still applies
    // substantive coverage is not: no Japanese statute is loaded, so the JP answer is
    // international-only. Reporting that as "covered" would be the fabricated-assurance failure
    expect(obligationsFor('JP', rows)).toEqual(obligationsFor('international', rows))
    expect(rows.filter((r) => /^[A-Z]{2}$/.test(jurisdictionOf(r)) && jurisdictionOf(r) !== 'EU').length).toBeLessThan(20)
  })
})
