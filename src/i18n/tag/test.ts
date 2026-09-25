import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { assertTagsWellFormed, isCanonicalTag, localeLiteralsIn, malformedLocaleTags } from './index'

describe('i18n — BCP 47: a tag no registry can parse selects no language', () => {
  it('the live corpus writes only canonical tags — zero is a theorem, not a ratchet', () => {
    expect(malformedLocaleTags(process.cwd())).toEqual([])
    expect(() => assertTagsWellFormed(process.cwd())).not.toThrow()
  })

  it('FIRES on a planted tag — a green gate over an empty population proves nothing', () => {
    const dir = mkdtempSync(join(tmpdir(), 'erpax-bcp47-'))
    mkdirSync(join(dir, 'src', 'probe'), { recursive: true })
    writeFileSync(join(dir, 'src', 'probe', 'index.ts'), "export const page = { locale: 'not a tag' }\n")
    expect(malformedLocaleTags(dir)).toEqual(['not a tag'])
    expect(() => assertTagsWellFormed(dir)).toThrow(/not a tag/)
    rmSync(dir, { recursive: true, force: true })
  })

  it('refuses a NON-CANONICAL spelling — one locale may not exist at two names', () => {
    expect(isCanonicalTag('en-US')).toBe(true)
    expect(isCanonicalTag('en-us')).toBe(false) // well-formed, same locale, second spelling
    expect(isCanonicalTag('')).toBe(false)
  })

  it('reads a locale PROPERTY, never any short string', () => {
    const text = [
      "const note = 'the en of it'",
      "export const a = { locale: 'bg' }",
      "export const b = { defaultLocale: 'en' }",
      "export const c = { name: 'de' }",
    ].join('\n')
    expect(localeLiteralsIn('probe.ts', text)).toEqual(['bg', 'en'])
  })
})
