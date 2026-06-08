/**
 * quantum/pi — train address; information conserved.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { piOffsetLowerBound, informationConserved, FINITE_UUID_BITS } from '@/quantum/pi'

describe('quantum/pi — offset lower bound (information conserved)', () => {
  it('piOffsetLowerBound scales with data length', () => {
    expect(piOffsetLowerBound(0)).toBe(0)
    expect(piOffsetLowerBound(42)).toBe(42)
  })

  it('informationConserved rejects undersized offsets', () => {
    expect(informationConserved(100, 100)).toBe(true)
    expect(informationConserved(100, 50)).toBe(false)
  })

  it('FINITE_UUID_BITS marks the collapsed ceiling', () => {
    expect(FINITE_UUID_BITS).toBe(128)
  })
})
