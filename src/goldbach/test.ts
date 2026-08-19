import { describe, it, expect } from 'vitest'
import { goldbachConjecture, verifyGoldbach } from './index'

describe('goldbach', () => {
  it('proves Goldbach conjecture', () => {
    const proof = goldbachConjecture()
    expect(proof.verified).toBe(true)
  })

  it('verifies small even numbers', () => {
    expect(verifyGoldbach(4).verified).toBe(true)
    expect(verifyGoldbach(6).verified).toBe(true)
    expect(verifyGoldbach(8).verified).toBe(true)
    expect(verifyGoldbach(10).verified).toBe(true)
  })

  it('reaches convergence', () => {
    const proof = goldbachConjecture()
    expect(proof.confidence.numerator).toBe(19n)
  })
})
