/**
 * quantum/digit — word ⊕ digit symmetric address-law.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import {
  wordDigitDualityHolds,
  digitTrace,
  offSequence,
  digitAddress,
  interact64,
  architectureBond,
  architectureBondStable,
} from '@/quantum/digit'
import { offSequence as coreOffSequence } from '@/digit'

describe('quantum/digit — word ⊕ digit duality on the live matrix', () => {
  it('wordDigitDualityHolds mirrors zero off-sequence atoms', () => {
    expect(wordDigitDualityHolds()).toBe(coreOffSequence().length === 0)
  })

  it('digitTrace folds every atom into horo/digital-root cells', () => {
    const trace = digitTrace()
    const total = [...trace.values()].reduce((s, a) => s + a.length, 0)
    expect(total).toBeGreaterThan(1000)
  })

  it('digitAddress is the digit dual of a word address', () => {
    expect(digitAddress('digit')).toMatch(/^\d+\/\d+$/)
    expect(digitAddress('no/such/atom')).toBeUndefined()
  })

  it('offSequence re-exports the live anomaly list', () => {
    expect(offSequence()).toEqual(coreOffSequence())
  })

  it('interact64 and architectureBond re-export from quantum/word (64-bit pair)', () => {
    expect(interact64(0xffn, 0x0fn)).toBe(0x0fn)
    expect(architectureBondStable()).toBe(true)
    expect(architectureBond()).toMatch(/^[0-9a-f-]{36}$/i)
  })
})
