import { describe, it, expect } from 'vitest'
import { STANDARDS_CATALOGUE } from '@/standards/seed'
import { standardMarkdown, standardPath, standardRows, standardSlug, type StandardEntry } from '@/standards/document'

const entry = (id: string, family: string, modules: StandardEntry['modules'] = []): StandardEntry => ({ id, family, title: `Title of ${id}`, count: modules.length, modules })
const A = entry('EN-16931', 'en', [{ path: 'src/a.ts', section: '§BT-151' }, { path: 'src/b.ts', section: '' }])
const B = entry('ISO/IEC 25010:2023', 'iso')
const C = entry('ISO-4217', 'iso')

describe('standards/document — a standard is a page under its family', () => {
  it('addresses a standard by family and id, as path segments', () => {
    expect(standardSlug('ISO/IEC 25010:2023')).toBe('iso-iec-25010-2023')
    expect(standardPath(A)).toBe('standards/en/en-16931')
  })

  it('writes what the standard is and exactly the modules the seed records, with a dash for no section', () => {
    const md = standardMarkdown(A)
    expect(md.startsWith('# EN-16931 — Title of EN-16931\n\nTitle of EN-16931. Cited by 2 module(s) of the corpus.')).toBe(true)
    expect(md).toContain('| `src/a.ts` | §BT-151 |')
    expect(md).toContain('| `src/b.ts` | — |')
    expect(standardMarkdown(B)).not.toContain('| Module |')
  })

  it('nests the register, each family and each standard, parents first, one page each', () => {
    const rows = standardRows([A, B, C])
    expect(rows.map((r) => [r.slug, r.parent])).toEqual([
      ['standards', null],
      ['standards-en', 'standards'],
      ['standards-iso', 'standards'],
      ['standards-en-en-16931', 'standards-en'],
      ['standards-iso-iso-4217', 'standards-iso'],
      ['standards-iso-iso-iec-25010-2023', 'standards-iso'],
    ])
    expect(rows[0]!.markdown).toContain('3 standard(s) in 2 families')
    expect(rows[2]!.markdown).toContain('[ISO-4217](/standards-iso-iso-4217)')
  })

  it('the live seed becomes one page per standard, none lost and none sharing an address', () => {
    const rows = standardRows(STANDARDS_CATALOGUE)
    const families = new Set(STANDARDS_CATALOGUE.map((e) => e.family))
    expect(rows.length).toBe(1 + families.size + STANDARDS_CATALOGUE.length)
    expect(new Set(rows.map((r) => r.slug)).size).toBe(rows.length)
    expect(rows.every((r) => r.description.length > 0)).toBe(true)
  })
})
