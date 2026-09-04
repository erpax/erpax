import { describe, expect, it } from 'vitest'
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { atomAddress } from '@/atom/address'
import { ERPAX_DOI, ERPAX_SPDX, ERPAX_VERSION_DOI, LICENSE_CONTACT, SOURCE_URL, assertPagesCited, citation, uncitedPages } from '.'

/** The one source. Everything this atom offers is read from here. */
const cff = readFileSync(join(process.cwd(), 'CITATION.cff'), 'utf8')

describe('algebra/license', () => {
  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('algebra/license')
  })

  it('agrees with CITATION.cff on every fact it offers', () => {
    // Refutable in both directions: edit the citation file without regenerating, or edit the
    // generated face by hand, and this reddens. That is the whole point of not typing it twice.
    expect(cff).toContain(`license: ${ERPAX_SPDX}`)
    expect(cff).toContain(`repository-code: "${SOURCE_URL}"`)
    expect(cff).toContain(`email: "${LICENSE_CONTACT}"`)
    expect(cff).toContain(`doi: "${ERPAX_DOI}"`)
    expect(cff).toContain(`value: "${ERPAX_VERSION_DOI}"`)
  })

  it('names one licence, so there is no path that decides which answer you get', () => {
    expect(ERPAX_SPDX).toBe('CC-BY-NC-ND-4.0')
    expect(cff.match(/^license:/gm) ?? []).toHaveLength(1)
  })

  it('distinguishes the concept doi from the version doi', () => {
    expect(ERPAX_DOI).not.toBe(ERPAX_VERSION_DOI)
  })
})

describe('algebra/license — a generated page reproduces corpus matter, so it must attribute', () => {
  const tree = (files: Record<string, string>): string => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-cite-'))
    for (const [rel, body] of Object.entries(files)) {
      const p = join(root, 'src', rel)
      mkdirSync(join(p, '..'), { recursive: true })
      writeFileSync(p, body)
    }
    return root
  }

  it('flags a generated page carrying no compliant citation', () => {
    const root = tree({ 'a/README.md': '# a\n\n<sub>content-uuid `x`</sub>\n' })
    expect(uncitedPages(root).map((p) => p.file)).toEqual(['src/a/README.md'])
    expect(() => assertPagesCited(root)).toThrow(/carry no compliant citation/)
  })

  it('accepts one carrying the licence, the source and the DOI', () => {
    const root = tree({ 'a/README.md': `# a\n\n<sub>${citation({ path: 'src/a', uuid: 'u' })}</sub>\n` })
    expect(uncitedPages(root)).toEqual([])
    expect(() => assertPagesCited(root)).not.toThrow()
  })

  it('a partial citation is NOT a citation — the DOI is what keeps it resolvable', () => {
    // the repo can move or be renamed; the deposit can only be superseded
    const root = tree({ 'a/README.md': '© erpax · CC-BY-NC-ND-4.0 · source https://github.com/erpax/erpax\n' })
    expect(uncitedPages(root)).toHaveLength(1)
  })

  it('judges only GENERATED faces — SKILL.md is authored source, and a sweep of it is a manifest', () => {
    const root = tree({ 'a/SKILL.md': '# a\n\nno citation here\n' })
    expect(uncitedPages(root)).toEqual([])
  })

  it('every generated page in the live corpus carries one — zero is a theorem', () => {
    expect(uncitedPages(process.cwd())).toEqual([])
  })
})
