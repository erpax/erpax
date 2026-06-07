import { describe, it, expect } from 'vitest'
import { isIban, isBgIban, parseBgIban } from '@/iso/13616'

// ISO 13616-1:2020 — IBAN self-validates via the ISO 7064 mod-97-10 check digits.
describe('iso/13616 — IBAN mod-97 self-validation', () => {
  it('accepts known-good IBANs (whitespace tolerant, case-insensitive)', () => {
    expect(isIban('GB82WEST12345698765432')).toBe(true)
    expect(isIban('DE89 3704 0044 0532 0130 00')).toBe(true)
    expect(isIban('de89370400440532013000')).toBe(true)
  })

  it('a single-digit typo fails the checksum, not the shape', () => {
    expect(isIban('GB82WEST12345698765433')).toBe(false)
  })

  it('rejects malformed and non-string input', () => {
    expect(isIban('GB82')).toBe(false)
    expect(isIban('1234WEST12345698765432')).toBe(false)
    expect(isIban(42)).toBe(false)
  })
})

describe('iso/13616 — BG-22 IBAN decomposition', () => {
  const bg = 'BG80BNBG96611020345678'

  it('isBgIban requires the BG-22 shape and a valid mod-97 check', () => {
    expect(isBgIban(bg)).toBe(true)
    expect(isBgIban('GB82WEST12345698765432')).toBe(false) // valid IBAN, wrong country/shape
    expect(isBgIban('BG80BNBG96611020345679')).toBe(false) // bad check digits
  })

  it('parseBgIban lifts each BBAN field by position', () => {
    const parts = parseBgIban(bg)
    expect(parts).not.toBeNull()
    expect(parts).toEqual({
      country: 'BG',
      checkDigits: '80',
      bankCode: 'BNBG',
      branchCode: '9661',
      accountType: '10',
      accountId: '20345678',
    })
  })

  it('parseBgIban returns null for anything that is not a valid BG IBAN', () => {
    expect(parseBgIban('GB82WEST12345698765432')).toBeNull()
    expect(parseBgIban(null)).toBeNull()
  })
})
