import { describe, it, expect } from 'vitest'
import { BANK_APIS } from './index'

describe('country/api/bank — registry slice', () => {
  it('is a non-empty record of well-formed CountryApi arrays', () => {
    const keys = Object.keys(BANK_APIS)
    expect(keys.length).toBeGreaterThan(0)
    for (const k of keys) {
      expect(Array.isArray(BANK_APIS[k])).toBe(true)
      for (const a of BANK_APIS[k]!) {
        expect(typeof a.name).toBe('string')
        expect(typeof a.kind).toBe('string')
      }
    }
  })
})
