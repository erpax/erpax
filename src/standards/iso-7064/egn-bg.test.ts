/**
 * BG ЕГН validator + decoder — pin the check-digit algorithm + birth-date
 * encoding round-trip.
 *
 * The fixtures use the publicly-known structural pattern (no real EGNs);
 * the check digit is computed and the date-encoding is round-tripped so
 * any drift in the algorithm fails the test deterministically.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-7064:2003 mod-11 check-digit
 * @standard BG ЕГН Закон за гражданската регистрация
 * @audit ISO-19011:2018 audit-trail
 * @compliance GDPR Art.9 special-category-data
 * @see src/standards/iso-7064/egn-bg.ts
 */

import { describe, expect, it } from 'vitest'
import { decodeBgEgn, isBgEgn } from '@/standards/iso-7064'

const EGN_WEIGHTS = [2, 4, 8, 5, 10, 9, 7, 3, 6]

/** Build a synthetic EGN with a valid check digit for testing. */
function buildEgn(yy: number, mmEncoded: number, dd: number, sequence: number): string {
  const base =
    String(yy).padStart(2, '0') +
    String(mmEncoded).padStart(2, '0') +
    String(dd).padStart(2, '0') +
    String(sequence).padStart(3, '0')
  let sum = 0
  for (let i = 0; i < 9; i++) sum += Number(base[i]) * EGN_WEIGHTS[i]
  const check = sum % 11 === 10 ? 0 : sum % 11
  return base + String(check)
}

describe('isBgEgn — accepts valid', () => {
  it('1990s birth, female sequence (odd) — month encoded 1-12', () => {
    const egn = buildEgn(95, 6, 15, 123) // 1995-06-15, sequence 123 (odd → female)
    expect(isBgEgn(egn)).toBe(true)
  })
  it('1800s birth — month encoded 21-32', () => {
    const egn = buildEgn(85, 21, 1, 200) // 1885-01-01
    expect(isBgEgn(egn)).toBe(true)
  })
  it('2000s birth — month encoded 41-52', () => {
    const egn = buildEgn(10, 53 - 1, 31, 444) // 2010-12-31, mmEncoded=52
    expect(isBgEgn(egn)).toBe(true)
  })
})

describe('isBgEgn — rejects invalid', () => {
  it('non-string input', () => {
    expect(isBgEgn(1234567890)).toBe(false)
    expect(isBgEgn(null)).toBe(false)
    expect(isBgEgn(undefined)).toBe(false)
  })
  it('wrong length', () => {
    expect(isBgEgn('123456789')).toBe(false)
    expect(isBgEgn('12345678901')).toBe(false)
  })
  it('non-digits', () => {
    expect(isBgEgn('1234A56789')).toBe(false)
  })
  it('invalid month encoding (13-20 / 33-40 / 53+)', () => {
    expect(isBgEgn(buildEgn(95, 13, 15, 123))).toBe(false)
    expect(isBgEgn(buildEgn(95, 33, 15, 123))).toBe(false)
    expect(isBgEgn(buildEgn(95, 53, 15, 123))).toBe(false)
  })
  it('calendar-invalid date (Feb 30)', () => {
    expect(isBgEgn(buildEgn(95, 2, 30, 123))).toBe(false)
  })
  it('mismatched check digit', () => {
    const valid = buildEgn(95, 6, 15, 123)
    const tampered = valid.slice(0, 9) + (Number(valid[9]) === 9 ? '0' : '9')
    expect(isBgEgn(tampered)).toBe(false)
  })
})

describe('decodeBgEgn', () => {
  it('extracts birth date + sex + sequence for 20th-century EGN', () => {
    const egn = buildEgn(95, 6, 15, 124) // 1995-06-15, sequence 124 (even → male)
    expect(decodeBgEgn(egn)).toEqual({
      birthDate: '1995-06-15',
      sex: 'male',
      sequence: 124,
    })
  })
  it('decodes 19th-century encoding (21-32)', () => {
    const egn = buildEgn(85, 21, 1, 201) // 1885-01-01, sequence 201 (odd → female)
    expect(decodeBgEgn(egn)).toEqual({
      birthDate: '1885-01-01',
      sex: 'female',
      sequence: 201,
    })
  })
  it('decodes 21st-century encoding (41-52)', () => {
    const egn = buildEgn(10, 41, 5, 100)
    expect(decodeBgEgn(egn)).toEqual({
      birthDate: '2010-01-05',
      sex: 'male',
      sequence: 100,
    })
  })
  it('returns null on invalid input', () => {
    expect(decodeBgEgn('invalid')).toBeNull()
    expect(decodeBgEgn(null)).toBeNull()
  })
})
