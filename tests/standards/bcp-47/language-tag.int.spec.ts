/**
 * BCP 47 language-tag validator tests.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BCP-47 language-tag
 * @rfc 5646 tags-for-identifying-languages
 * @rfc 4647 matching-of-language-tags
 * @see src/standards/bcp-47/language-tag.ts
 */

import { describe, it, expect } from 'vitest'
import { isBcp47 } from '@/standards/bcp-47'

describe('BCP 47 language tags', () => {
  it('accepts simple language', () => {
    expect(isBcp47('en')).toBe(true)
    expect(isBcp47('fr')).toBe(true)
  })
  it('accepts language-region', () => {
    expect(isBcp47('en-US')).toBe(true)
    expect(isBcp47('de-DE')).toBe(true)
    expect(isBcp47('zh-CN')).toBe(true)
  })
  it('rejects invalid tags', () => {
    expect(isBcp47('EN')).toBe(false) // language must be lowercase
    expect(isBcp47('english')).toBe(false) // too long
  })
})
