import { describe, expect, it } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { assertNoForgery, forgedIdentifiers } from '.'

const tree = (body: string): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-forge-'))
  mkdirSync(join(root, 'src', 'a'), { recursive: true })
  writeFileSync(join(root, 'src', 'a', 'index.ts'), body)
  return root
}

describe('rules/forge', () => {
  it('catches the exact line this gate was written for', () => {
    // Verbatim from src/wave/index.ts before the fix. A gate that reports zero must be shown to
    // fire on the defect it exists for, or the zero is unearned.
    const root = tree('const doi = `10.5281/zenodo.${Math.floor(Math.random() * 1000000)}`\n')
    const found = forgedIdentifiers(root)
    expect(found).toHaveLength(1)
    expect(found[0]!.registry).toBe('DOI')
    expect(found[0]!.source).toMatch(/Math/)
  })

  it('catches a counter as readily as randomness — both are locally decided', () => {
    const root = tree('let n = 0\nconst doi = `10.5281/zenodo.${++n}`\n')
    expect(forgedIdentifiers(root)).toHaveLength(1)
  })

  it('catches a timestamp-derived identifier', () => {
    const root = tree('const doi = `10.5281/zenodo.${Date.now()}`\n')
    expect(forgedIdentifiers(root)).toHaveLength(1)
  })

  it('does NOT flag a REAL doi interpolated from a value it was given', () => {
    const root = tree('export const url = (doi: string) => `https://doi.org/${doi}`\n')
    expect(forgedIdentifiers(root)).toEqual([])
  })

  it('does NOT flag a registered identifier written as a literal', () => {
    const root = tree("export const ERPAX_DOI = '10.5281/zenodo.22237698'\n")
    expect(forgedIdentifiers(root)).toEqual([])
  })

  it('does NOT flag a comment that QUOTES a forgery to explain it', () => {
    // Three sibling repos each hit this shape today: a finding that flags the prose describing the
    // defect. A comment is not a ts.TemplateExpression, so the grammar excludes it for free.
    const root = tree('// it used to be `10.5281/zenodo.${Math.random()}` and that was a forgery\nexport const ok = 1\n')
    expect(forgedIdentifiers(root)).toEqual([])
  })

  it('does NOT flag local randomness with no registry shape', () => {
    const root = tree('const id = `session-${Math.random()}`\n')
    expect(forgedIdentifiers(root)).toEqual([])
  })

  it('zero is a theorem — assertNoForgery throws on one and passes on none', () => {
    expect(() => assertNoForgery(tree('const d = `10.5281/zenodo.${Math.random()}`\n'))).toThrow(/forge — 1 identifier/)
    expect(() => assertNoForgery(tree('export const ok = 1\n'))).not.toThrow()
  })

  it('the live corpus forges no registered identifier', () => {
    expect(forgedIdentifiers(process.cwd())).toEqual([])
  })
})
