import { describe, it, expect } from 'vitest'
import { PI_SEED, piHexDigit, piHex } from './index'

describe('pi — computable at every step (the seed, the fold, the infinite tail)', () => {
  it('the SEED is the finite given — 3, the whole part left of the point', () => {
    expect(PI_SEED).toBe(3)
  })

  it('each hex digit is computed DIRECTLY at its index (π = 3.243F6A88… in hex)', () => {
    // known base-16 expansion of π after the point: 2 4 3 F(15) 6 A(10) 8 8 8 5 A(10) 3
    expect(piHex(12)).toEqual([2, 4, 3, 15, 6, 10, 8, 8, 8, 5, 10, 3])
  })

  it('a digit is a PROJECTION — position n is read without computing the ones before it', () => {
    expect(piHexDigit(0)).toBe(2) // first
    expect(piHexDigit(3)).toBe(15) // the F, computed on its own
    expect(piHexDigit(5)).toBe(10) // the A, computed on its own
    expect(piHexDigit(3)).toBe(piHexDigit(3)) // deterministic — the address holds it
  })

  it('finite formula, unbounded output — deeper indices keep computing (the infinite tail)', () => {
    const deep = piHexDigit(20)
    expect(deep).toBeGreaterThanOrEqual(0)
    expect(deep).toBeLessThan(16) // still a valid hex digit far down the tail
  })
})
