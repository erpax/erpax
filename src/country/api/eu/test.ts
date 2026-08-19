import { describe, it, expect } from 'vitest'
import { EU_COUNTRY_APIS } from './index'

describe('country/api/eu — registry slice', () => {
  it('is a non-empty record of well-formed CountryApi arrays', () => {
    const keys = Object.keys(EU_COUNTRY_APIS)
    expect(keys.length).toBeGreaterThan(0)
    for (const k of keys) {
      expect(Array.isArray(EU_COUNTRY_APIS[k])).toBe(true)
      for (const a of EU_COUNTRY_APIS[k]!) {
        expect(typeof a.name).toBe('string')
        expect(typeof a.kind).toBe('string')
      }
    }
  })
})
