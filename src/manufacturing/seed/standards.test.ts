import { describe, it, expect } from 'vitest'
import { STANDARD_REGISTRY, ESCO_API, NACE_RAMON, standardFor, standardApis } from '@/manufacturing/seed/standards'

describe('manufacturing/seeds/standards — standards pinned + their related APIs wired', () => {
  it('every standard is pinned to a version + authority (a true @standard banner)', () => {
    for (const s of STANDARD_REGISTRY) {
      expect(s.code).toBeTruthy()
      expect(s.version).toBeTruthy()
      expect(s.authority).toBeTruthy()
    }
    expect(standardFor('ISCO-08')?.relatedApi).toBe(ESCO_API)
    expect(standardFor('NACE Rev.2.1')?.relatedApi).toBe(NACE_RAMON)
    expect(standardFor('IEC 62264-1:2013')?.relatedApi).toBeNull() // a paper standard, no live API
  })

  it('the classification APIs reuse the CountryApi model (one model, no parallel structure)', () => {
    expect(ESCO_API.kind).toBe('classification')
    expect(ESCO_API.endpoint).toBe('https://ec.europa.eu/esco/api')
    expect(ESCO_API.auth).toBe('none') // public EU endpoint
    expect(NACE_RAMON.kind).toBe('classification')
    expect(NACE_RAMON.authority).toBe('Eurostat')
  })

  it('the related-API surface is the distinct set of live endpoints', () => {
    const apis = standardApis()
    expect(apis).toHaveLength(2) // ESCO + NACE (ISCO/ESCO/НКПД all resolve through ESCO ⇒ deduped)
    expect(apis.map((a) => a.endpoint).sort()).toEqual(
      [ESCO_API.endpoint, NACE_RAMON.endpoint].sort(),
    )
  })
})
