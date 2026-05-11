/**
 * ISO 9362 BIC / SWIFT validator tests.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-9362:2022 bic
 * @see src/standards/iso-9362/bic.ts
 */

import { describe, it, expect } from 'vitest'
import { isSwiftBic } from '@/standards/iso-9362'

describe('ISO 9362 SWIFT/BIC', () => {
  it('accepts 8-char BIC', () => {
    expect(isSwiftBic('DEUTDEFF')).toBe(true)
    expect(isSwiftBic('CHASUS33')).toBe(true)
  })
  it('accepts 11-char BIC with branch code', () => {
    expect(isSwiftBic('DEUTDEFF500')).toBe(true)
    expect(isSwiftBic('CHASUS33XXX')).toBe(true)
  })
  it('rejects wrong length', () => {
    expect(isSwiftBic('DEUTDE')).toBe(false)
    expect(isSwiftBic('DEUTDEFFFFFF')).toBe(false)
  })
  it('rejects lowercase', () => {
    expect(isSwiftBic('deutdeff')).toBe(false)
  })
})
