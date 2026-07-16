/**
 * @standard ISO/IEC-29119:2022 software-testing (emit invariant coverage)
 */
import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildStandardsCatalogue, verifyStandardsCatalogue } from './emit'

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
})
