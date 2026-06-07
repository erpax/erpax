import { describe, it, expect } from 'vitest'
import { validateAddress, type AddressLike } from '@/address/validation'

// Matter (./index.ts): country-aware required-component + postal-pattern check.
// Empty country ⇒ draft ⇒ valid; errors[] empty ⇒ valid.

const usAddress: AddressLike = {
  street1: '1 Infinite Loop',
  locality: 'Cupertino',
  subdivision: 'CA',
  postalCode: '95014',
  country: 'US',
}

describe('address/validation — validateAddress', () => {
  it('a complete US address is valid (no errors, nothing missing)', () => {
    const r = validateAddress(usAddress)
    expect(r.valid).toBe(true)
    expect(r.errors).toEqual([])
    expect(r.missing).toEqual([])
  })

  it('blank country is draft-state — skipped and valid', () => {
    const r = validateAddress({ street1: '', locality: '' })
    expect(r.valid).toBe(true)
    expect(r.errors).toEqual([])
    expect(r.missing).toEqual([])
  })

  it('fallbackCountry forces validation when no country is set', () => {
    const r = validateAddress({ street1: '', locality: '' }, 'US')
    expect(r.valid).toBe(false)
    expect(r.missing.length).toBeGreaterThan(0)
  })

  it('US requires subdivision; BG does not (country-aware required set)', () => {
    const noState: AddressLike = { ...usAddress, subdivision: '' }
    const us = validateAddress(noState)
    expect(us.valid).toBe(false)
    expect(us.missing).toContain('subdivision')

    const bg = validateAddress({
      street1: 'ul. Vitosha 1',
      locality: 'Sofia',
      postalCode: '1000',
      country: 'BG',
    })
    expect(bg.valid).toBe(true)
  })

  it('coalesces plugin aliases (addressLine1/city/state) to canonical components', () => {
    const aliased: AddressLike = {
      addressLine1: '1 Infinite Loop',
      city: 'Cupertino',
      state: 'CA',
      postalCode: '95014',
      country: 'US',
    }
    expect(validateAddress(aliased).valid).toBe(true)
  })

  it('rejects a postal code that does not match the country pattern', () => {
    const r = validateAddress({ ...usAddress, postalCode: 'ABCDE' })
    expect(r.valid).toBe(false)
    expect(r.errors.some((e) => e.includes('postal-code format'))).toBe(true)
  })

  it('accepts the ZIP+4 form for US', () => {
    expect(validateAddress({ ...usAddress, postalCode: '95014-1234' }).valid).toBe(true)
  })

  it('HK has no postal code system — a missing/any postal is fine', () => {
    const r = validateAddress({
      street1: '8 Finance St',
      locality: 'Central',
      country: 'HK',
    })
    expect(r.valid).toBe(true)
  })

  it('errors name the country in upper case', () => {
    const r = validateAddress({ country: 'us', street1: '', locality: '', subdivision: '', postalCode: '' })
    expect(r.errors.every((e) => e.includes('US'))).toBe(true)
  })
})
