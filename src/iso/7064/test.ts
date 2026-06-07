import { describe, it, expect } from 'vitest'
import { isBgEgn, decodeBgEgn } from '@/iso/7064'

// ISO-7064 law: integrity is embedded in the identifier — the trailing check
// digit is computed from the body (mod-11), so a single-digit error is caught
// by the number itself, not by a lookup.
describe('iso/7064 — BG EGN mod-11 check-digit embeds integrity', () => {
  // 0041010002: yy=00 mmRaw=41(→2000-01) dd=01 seq=000; weights·body=46, 46%11=2.
  const VALID = '0041010002'

  it('accepts a structurally + checksum-valid EGN', () => {
    expect(isBgEgn(VALID)).toBe(true)
  })

  it('rejects a single-digit corruption of the check digit (mod-11 catches it)', () => {
    expect(isBgEgn('0041010003')).toBe(false)
  })

  it('rejects non-strings, wrong length, and non-digits', () => {
    expect(isBgEgn(VALID as unknown as number)).toBe(true) // baseline string
    expect(isBgEgn(123 as unknown)).toBe(false)
    expect(isBgEgn('004101000')).toBe(false) // 9 digits
    expect(isBgEgn('00410100020')).toBe(false) // 11 digits
    expect(isBgEgn('00410100AB')).toBe(false)
  })

  it('rejects an impossible month encoding (no century pinned)', () => {
    expect(isBgEgn('0099010001')).toBe(false) // mmRaw=99 invalid
  })

  it('rejects a calendar-invalid day (Feb 30 does not round-trip)', () => {
    // 0042300000-ish: pick mmRaw=42 (→2000-02), dd=30 — invalid date.
    expect(isBgEgn('0042300000')).toBe(false)
  })

  it('decodeBgEgn returns birth date, sex, sequence for a valid EGN', () => {
    expect(decodeBgEgn(VALID)).toEqual({
      birthDate: '2000-01-01',
      sex: 'male', // sequence 000 is even → male
      sequence: 0,
    })
  })

  it('decodeBgEgn returns null for an invalid EGN', () => {
    expect(decodeBgEgn('0041010003')).toBe(null)
  })
})
