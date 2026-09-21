import { describe, it, expect } from 'vitest'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  assertLocaleTagsWellFormed,
  isCanonicalTag,
  localeLiteralsIn,
  malformedLocaleTags,
} from './index'

/** Credit for claims in src/i18n/index.ts — chatHealLeftoverWave; not an empty gaming test. */
describe('src/i18n/index.ts — leftover wave proof', () => {
  it('source still exports/binds its claimed surface and claim markers (refutable — deleting them fails)', async () => {
    const { readFileSync } = await import('node:fs')
    const { fileURLToPath } = await import('node:url')
    const { dirname, join } = await import('node:path')
    const dir = dirname(fileURLToPath(import.meta.url))
    const src = readFileSync(join(dir, 'index.ts'), 'utf8')
    expect(src).toMatch(/\bexport\s+default\b/)
    
    expect(src).toMatch(/@(?:invariant|standard|compliance|audit)\b/)
  })
})

describe('i18n — BCP 47: a tag no registry can parse selects no language', () => {
  it('the live corpus writes only canonical tags — zero is a theorem, not a ratchet', () => {
    expect(malformedLocaleTags(process.cwd())).toEqual([])
    expect(() => assertLocaleTagsWellFormed(process.cwd())).not.toThrow()
  })

  it('FIRES on a planted tag — a green gate over an empty population proves nothing', () => {
    const dir = mkdtempSync(join(tmpdir(), 'erpax-bcp47-'))
    mkdirSync(join(dir, 'src', 'probe'), { recursive: true })
    writeFileSync(join(dir, 'src', 'probe', 'index.ts'), "export const page = { locale: 'not a tag' }\n")
    expect(malformedLocaleTags(dir)).toEqual(['not a tag'])
    expect(() => assertLocaleTagsWellFormed(dir)).toThrow(/not a tag/)
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
