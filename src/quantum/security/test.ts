/**
 * quantum/security — bidirectional blue/red findings.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { balancedFinding, bidirectionalVerdict, conjugateHolds } from '@/quantum/security'

describe('quantum/security — bidirectional findings', () => {
  const finding = { control: 'sandbox-gate', blueHolds: true, forgeCostLog2: 64 }

  it('balancedFinding requires control name and finite forge price', () => {
    expect(balancedFinding(finding)).toBe(true)
    expect(balancedFinding({ ...finding, forgeCostLog2: -1 })).toBe(false)
  })

  it('bidirectionalVerdict returns verify ⊕ price pair', () => {
    expect(bidirectionalVerdict(finding)).toEqual({ verify: true, priceLog2: 64 })
    expect(bidirectionalVerdict({ ...finding, blueHolds: false }).verify).toBe(false)
  })

  it('conjugateHolds — forge cost bounded below by compression depth', () => {
    expect(conjugateHolds(128, 128)).toBe(true)
    expect(conjugateHolds(128, 64)).toBe(false)
  })
})
