import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { definedSymbols, deadSymbolsIn, assertProseCitesCode } from './index'

const corpus = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-prose-'))
  for (const [p, text] of Object.entries(files)) {
    mkdirSync(join(cwd, p, '..'), { recursive: true })
    writeFileSync(join(cwd, p), text)
  }
  return cwd
}

describe('rules/prose — prose that cites code which does not exist is fiction', () => {
  it('refuses a cited symbol nothing defines, and passes one that is real', () => {
    const cwd = corpus({
      'src/thing/index.ts': 'export function realFunction() { return 1 }',
      'src/thing/SKILL.md': '# thing\nUse `realFunction()`.\nAlso `generateInvoiceReport()` for the close.',
    })
    const dead = deadSymbolsIn([join(cwd, 'src/thing/SKILL.md')], cwd)
    expect(dead.map((d) => d.symbol)).toEqual(['generateInvoiceReport'])
    rmSync(cwd, { recursive: true, force: true })
  })

  it('finds a symbol defined ANYWHERE in src — a SKILL may cite another atom', () => {
    const cwd = corpus({
      'src/other/index.ts': 'export const computedBaseline = () => 1',
      'src/thing/index.ts': 'export const x = 1',
      'src/thing/SKILL.md': '# thing\nCeilings come from `computedBaseline()`.',
    })
    expect(deadSymbolsIn([join(cwd, 'src/thing/SKILL.md')], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a LEXICON atom is prose by design — no index.ts means it claims no code', () => {
    const cwd = corpus({ 'src/vocabulary/lease/SKILL.md': '# lease\nA `nonexistentThing()` word.' })
    expect(deadSymbolsIn([join(cwd, 'src/vocabulary/lease/SKILL.md')], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('short backticks are not claims about code — `id`, `ok`, a ratio', () => {
    const cwd = corpus({
      'src/thing/index.ts': 'export const x = 1',
      'src/thing/SKILL.md': '# thing\nThe `id` and `ok` fields; the ratio `9`.',
    })
    expect(deadSymbolsIn([join(cwd, 'src/thing/SKILL.md')], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('definedSymbols binds every declaration form — not just exported functions', () => {
    // my first measurement counted only `export function|const` and called 42% MORE symbols fake
    const cwd = corpus({
      'src/thing/index.ts':
        'export class Ledger {}\nexport interface Entry {}\nexport type Money = number\nfunction helper() {}\nconst local = 1',
    })
    const d = definedSymbols(cwd)
    for (const s of ['Ledger', 'Entry', 'Money', 'helper', 'local']) expect(d.has(s)).toBe(true)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a language KEYWORD is not a claim — prose naming a declaration form talks about TypeScript', () => {
    // this gate blocked its own SKILL over `function` and `class`; they are not symbols erpax defines
    const cwd = corpus({
      'src/thing/index.ts': 'export const x = 1',
      'src/thing/SKILL.md': '# thing\nBinds every form: `function` · `const` · `class` · `interface` · `type`.',
    })
    expect(deadSymbolsIn([join(cwd, 'src/thing/SKILL.md')], cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the gate ratchets — fails only on getting worse', () => {
    const cwd = corpus({
      'src/thing/index.ts': 'export const x = 1',
      'src/thing/SKILL.md': '# thing\n`madeUpFunction()`',
    })
    expect(() => assertProseCitesCode(cwd, 1)).not.toThrow()
    expect(() => assertProseCitesCode(cwd, 0)).toThrow(/do not exist/)
    rmSync(cwd, { recursive: true, force: true })
  })
})
