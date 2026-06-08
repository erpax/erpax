/**
 * @standard ISO/IEC-29119:2022 software-testing (emit invariant coverage)
 */
import { describe, it, expect } from 'vitest'
import { buildStandardsCatalogue, verifyStandardsCatalogue } from './emit'

describe('standards/emit — catalogue generator', () => {
  it('builds entries aligned with registry', () => {
    const { entries } = buildStandardsCatalogue()
    expect(entries.length).toBeGreaterThan(0)
    expect(entries.every((e) => e.uuid && e.color)).toBe(true)
  })

  it('verify passes when catalogue.ts is fresh', () => {
    expect(verifyStandardsCatalogue()).toBe(true)
  })
})
