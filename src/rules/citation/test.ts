import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterAll, describe, expect, it } from 'vitest'

import {
  type CitationSurface,
  assertCitationsPreserved,
  citationLosses,
  citationToken,
  citationsIn,
  corpusCitations,
} from './index'

const root = mkdtempSync(join(tmpdir(), 'erpax-citation-'))
const atom = (path: string, files: Record<string, string>): void => {
  mkdirSync(join(root, 'src', path), { recursive: true })
  for (const [name, body] of Object.entries(files)) writeFileSync(join(root, 'src', path, name), body)
}

describe('rules/citation — the identifier', () => {
  it('keeps a namespace word with the statute it namespaces', () => {
    expect(citationToken('BG ЗПУПС payment-services')).toBe('BG ЗПУПС')
    expect(citationToken('ISO/IEC 9075-2:2016 §4.15.10')).toBe('ISO/IEC 9075-2')
  })

  it('a Cyrillic statute is a standard — an ASCII letter class drops the whole BG surface', () => {
    expect(citationToken('BG ЗДДС §118')).toBe('BG ЗДДС')
    expect(citationToken('Наредба-Н-18 §чл.3')).toBe('Наредба-Н-18')
  })

  it('two editions of one standard are one standard', () => {
    expect(citationToken('ISO-19011:2018 §6.4 audit-evidence')).toBe('ISO-19011')
    expect(citationToken('ISO-19011` audit')).toBe('ISO-19011')
  })

  it('a namespace with nothing usable after it still cites its body', () => {
    expect(citationToken('SOX §302')).toBe('SOX')
    expect(citationToken('US')).toBe('US')
    expect(citationToken('IFRS 1 first-time-adoption')).toBe('IFRS 1')
  })

  it('refuses prose ABOUT a citation — the defect standards/emit paid 5,881 → 5,857 for', () => {
    expect(citationToken('banner')).toBeUndefined()
    expect(citationToken('banners.')).toBeUndefined()
    expect(citationToken('35 of them')).toBeUndefined()
  })
})

describe('rules/citation — the surface', () => {
  afterAll(() => rmSync(root, { recursive: true, force: true }))

  it('a marker inside a STRING LITERAL is data, never a citation', () => {
    const file = join(root, 'literal.ts')
    const text = "export const help = '@standard ISO-9999 not-a-citation'\n/** @standard ISO-1111 real */\n"
    writeFileSync(file, text)
    const cited = citationsIn(file, text)
    expect(cited.has('ISO-1111')).toBe(true)
    expect(cited.has('ISO-9999')).toBe(false)
  })

  it('a citation that MOVED between files is not a loss — the evidence is still reachable', () => {
    const before: CitationSurface = { 'BG ЗПУПС': ['naredba/n/18/scope/index.ts'] }
    const after: CitationSurface = { 'BG ЗПУПС': ['payment/scope/index.ts'] }
    expect(citationLosses(before, after)).toEqual([])
  })

  it('a standard cited nowhere after is a loss, and naming where it WAS is the fix list', () => {
    const before: CitationSurface = { 'BG ЗПУПС': ['naredba/n/18/scope/index.ts'], 'ISO-19011': ['a.ts'] }
    const losses = citationLosses(before, { 'ISO-19011': ['a.ts'] })
    expect(losses).toEqual([{ standard: 'BG ЗПУПС', was: ['naredba/n/18/scope/index.ts'] }])
    expect(() => assertCitationsPreserved(before, { 'ISO-19011': ['a.ts'] })).toThrow(/BG ЗПУПС/)
    expect(() => assertCitationsPreserved(before, before)).not.toThrow()
  })

  it('reads a tree, and an atom citing nothing contributes nothing', () => {
    atom('cited', { 'index.ts': '/** @standard EN-16931:2017 §BG-4 */\nexport const a = 1\n' })
    atom('silent', { 'index.ts': 'export const b = 2\n' })
    const surface = corpusCitations(root)
    expect(surface['EN-16931']).toEqual(['cited/index.ts'])
    expect(Object.keys(surface)).toHaveLength(1)
  })
})

describe('rules/citation — the live corpus', () => {
  it('ЗПУПС is cited: the purge dropped it, and this is what says so if it goes again', () => {
    const surface = corpusCitations()
    const cited = surface['BG ЗПУПС'] ?? []
    expect(cited).toContain('naredba/n/18/scope/index.ts')
  })

  it('the statutory surface the compliance-officer traces is present', () => {
    const surface = corpusCitations()
    for (const statute of ['BG ЗДДС', 'BG Наредба-Н-18']) {
      expect(Object.keys(surface)).toContain(statute)
    }
  })
})
