import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { invisibleMatter, isLawfulSegment, assertMatterVisible } from './index'

const corpus = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-invisible-'))
  for (const [p, text] of Object.entries(files)) {
    mkdirSync(join(cwd, p, '..'), { recursive: true })
    writeFileSync(join(cwd, p), text)
  }
  return cwd
}

describe('rules/invisible — matter at an unaddressable path is outside the fold', () => {
  it('a lawful segment is one generic lowercase word — a uuid can fold from it', () => {
    expect(isLawfulSegment('reporting')).toBe(true)
    expect(isLawfulSegment('camt053')).toBe(true)
    expect(isLawfulSegment('reporting.service')).toBe(false) // the dot: no lawful path, no uuid
    expect(isLawfulSegment('address-formats')).toBe(false)
    expect(isLawfulSegment('configureEcommercePlugin')).toBe(false)
  })

  it('flags matter under a dotted path — this is where the second trial balance grew', () => {
    const cwd = corpus({
      'src/financial/reporting.service/index.ts': 'export const generateTrialBalance = () => 1',
    })
    const found = invisibleMatter(cwd)
    expect(found.map((i) => i.path)).toEqual(['src/financial/reporting.service'])
    expect(found[0]!.formless).toBe(true) // no SKILL — no form, no name, no identity
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a lawful path is visible — nothing to report', () => {
    const cwd = corpus({ 'src/financial/reporting/index.ts': 'export const x = 1' })
    expect(invisibleMatter(cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('an unlawful folder with NO matter is not this law — that is the naming axis, not invisibility', () => {
    // alphanumeric-name (ceiling 433) counts names. THIS counts matter the fold cannot see.
    const cwd = corpus({ 'src/some.folder/notes.md': 'prose only, no index.ts' })
    expect(invisibleMatter(cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the gate ratchets — fails only on getting worse', () => {
    const cwd = corpus({ 'src/a.b/index.ts': 'export const x = 1' })
    expect(() => assertMatterVisible(cwd, 1)).not.toThrow()
    expect(() => assertMatterVisible(cwd, 0)).toThrow(/unaddressable path/)
    rmSync(cwd, { recursive: true, force: true })
  })
})
