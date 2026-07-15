import { describe, it, expect } from 'vitest'
import { PHI, goldenFold, isFixedPoint, phiByFixedPoint, fibRatio } from './index'

describe('phi — the self-address constant (the number that is its own fold)', () => {
  it('φ is the positive root of x² = x + 1 ≈ 1.618', () => {
    expect(PHI).toBeCloseTo(1.6180339887, 9)
    expect(PHI * PHI).toBeCloseTo(PHI + 1, 12) // φ² = φ + 1
  })

  it('SELF-ADDRESS: φ is its own fold — φ = 1 + 1/φ (content equal to its own transform)', () => {
    expect(goldenFold(PHI)).toBeCloseTo(PHI, 12)
    expect(isFixedPoint()).toBe(true)
  })

  it('the fold x ↦ 1 + 1/x converges to φ from ANY seed — the attractor', () => {
    expect(phiByFixedPoint(1)).toBeCloseTo(PHI, 10)
    expect(phiByFixedPoint(1000)).toBeCloseTo(PHI, 10) // wherever it starts, it folds to φ
    expect(phiByFixedPoint(0.01)).toBeCloseTo(PHI, 10)
  })

  it('finite seed, infinite computable: Fibonacci ratios sharpen toward φ at every step', () => {
    expect(fibRatio(5)).not.toBeCloseTo(PHI, 6) // early — rough
    expect(fibRatio(40)).toBeCloseTo(PHI, 10) // deeper — converged; each step a better digit
  })
})
