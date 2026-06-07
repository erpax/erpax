import { describe, it, expect } from 'vitest'
import { isBcp47 } from '@/bcp/47'

// Law: a language tag is valid only if it matches the BCP 47 (RFC 5646)
// subtag structure — language[-script][-region][-variant].
describe('bcp/47 — isBcp47 structural language-tag guard', () => {
  it('accepts the common subset forms', () => {
    expect(isBcp47('en')).toBe(true)
    expect(isBcp47('eng')).toBe(true)
    expect(isBcp47('en-US')).toBe(true)
    expect(isBcp47('de-DE')).toBe(true)
    expect(isBcp47('zh-Hans-CN')).toBe(true)
  })

  it('accepts numeric (UN M.49) region subtags', () => {
    expect(isBcp47('es-419')).toBe(true)
  })

  it('rejects malformed or non-string input', () => {
    expect(isBcp47('')).toBe(false)
    expect(isBcp47('e')).toBe(false) // language must be 2-3 letters
    expect(isBcp47('english-too-long-language')).toBe(false)
    expect(isBcp47(42)).toBe(false)
    expect(isBcp47(null)).toBe(false)
    expect(isBcp47(undefined)).toBe(false)
  })

  it('narrows the type to string', () => {
    const v: unknown = 'fr-FR'
    if (isBcp47(v)) {
      // type-narrowed to string — calling a string method must compile
      expect(v.toUpperCase()).toBe('FR-FR')
    } else {
      throw new Error('expected fr-FR to be a valid BCP 47 tag')
    }
  })
})
