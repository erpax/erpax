/**
 * ISO 13616 IBAN validator tests (with ISO 7064 mod-97 checksum).
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-7064:2003 check-character-systems mod-97-10
 * @see src/standards/iso-13616/iban.ts
 */

import { describe, it, expect } from 'vitest'
import { isIban } from '@/iso/13616'

describe('ISO 13616 IBAN with mod-97 checksum', () => {
  it('accepts known-valid IBANs', () => {
    expect(isIban('GB82WEST12345698765432')).toBe(true) // UK example
    expect(isIban('DE89370400440532013000')).toBe(true) // German example
    expect(isIban('FR1420041010050500013M02606')).toBe(true) // French
  })
  it('rejects IBAN with bad checksum', () => {
    expect(isIban('GB82WEST12345698765431')).toBe(false) // last digit changed
    expect(isIban('DE89370400440532013001')).toBe(false)
  })
  it('rejects malformed strings', () => {
    expect(isIban('not-an-iban')).toBe(false)
    expect(isIban('GB')).toBe(false)
    expect(isIban('1234567890')).toBe(false)
  })
  it('accepts spaces in input (normalizes them)', () => {
    expect(isIban('GB82 WEST 1234 5698 7654 32')).toBe(true)
  })
  it('accepts lowercase (uppercases internally)', () => {
    expect(isIban('gb82west12345698765432')).toBe(true)
  })
})
