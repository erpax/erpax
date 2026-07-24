/**
 * @standard ISO/IEC-29119:2022 software-testing (emit invariant coverage)
 */
import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildStandardsCatalogue, verifyStandardsCatalogue, citationsInComments } from './emit'

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
  })
})
