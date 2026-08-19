import { describe, it, expect } from 'vitest'
import {
  rational,
  add,
  multiply,
  lte,
  gte,
  eq,
  CONVERGENCE_THRESHOLD,
  isConverged,
  incrementConfidence,
  INITIAL_CONFIDENCE,
  proveConfidence,
} from './index'

describe('exact', () => {
  it('creates rationals exactly', () => {
    const r = rational(19n, 20n)
    expect(r.numerator).toBe(19n)
    expect(r.denominator).toBe(20n)
  })

  it('reduces rationals to lowest terms', () => {
    const r = rational(38n, 40n)
    expect(r.numerator).toBe(19n)
    expect(r.denominator).toBe(20n)
  })

  it('adds rationals exactly', () => {
    const a = rational(1n, 4n)
    const b = rational(1n, 4n)
    const sum = add(a, b)
    expect(sum).toEqual(rational(1n, 2n))
  })

  it('multiplies rationals exactly', () => {
    const a = rational(2n, 3n)
    const b = rational(3n, 4n)
    const prod = multiply(a, b)
    expect(prod).toEqual(rational(1n, 2n))
  })

  it('compares rationals exactly', () => {
    const a = rational(1n, 2n)
    const b = rational(2n, 3n)
    expect(lte(a, b)).toBe(true)
    expect(gte(b, a)).toBe(true)
    expect(eq(a, a)).toBe(true)
  })

  it('convergence threshold is exact 19/20', () => {
    expect(CONVERGENCE_THRESHOLD.numerator).toBe(19n)
    expect(CONVERGENCE_THRESHOLD.denominator).toBe(20n)
  })

  it('detects convergence at exact threshold', () => {
    const conf = proveConfidence(CONVERGENCE_THRESHOLD)
    expect(isConverged(conf)).toBe(true)
  })

  it('increments confidence by exact step', () => {
    const c1 = proveConfidence(INITIAL_CONFIDENCE)
    const c2 = proveConfidence(incrementConfidence(c1.value))
    expect(c2.value).toEqual(rational(3n, 20n))
  })

  it('convergence after exact steps', () => {
    let conf = INITIAL_CONFIDENCE
    for (let i = 0; i < 19; i++) {
      conf = incrementConfidence(conf)
    }
    const converged = proveConfidence(conf)
    expect(isConverged(converged)).toBe(true)
  })
})
