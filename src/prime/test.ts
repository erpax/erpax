import { describe, it, expect } from 'vitest'
import { isPrime, factor, FIRST_PRIMES, atomPath } from './index'

describe('prime — the multiplicative basis, factoring is the decode fold', () => {
  it('names its path', () => {
    expect(atomPath).toBe('prime')
  })

  it('isPrime is deterministic and exact — the small primes and their neighbours', () => {
    for (const p of FIRST_PRIMES) expect(isPrime(p)).toBe(true)
    for (const c of [1, 4, 6, 8, 9, 15, 21, 25, 100]) expect(isPrime(c)).toBe(false)
    expect(isPrime(0)).toBe(false)
    expect(isPrime(-7)).toBe(false)
  })

  it('catches a large composite and a large prime — not a small-number trick', () => {
    expect(isPrime(1_000_003)).toBe(true) // a genuine prime
    expect(isPrime(1_000_000)).toBe(false)
    expect(isPrime(2_147_483_647)).toBe(true) // 2^31 − 1, the 8th Mersenne prime
  })

  // THE DECODE ∘ ENCODE = IDENTITY. Factoring takes n to its generators; multiplying them returns n. This
  // is the fundamental theorem of arithmetic, and it is the fold's decode leg made exact.
  it('factor decodes to the basis, and the product re-encodes n', () => {
    for (const n of [2, 12, 360, 1024, 999983, 2 * 3 * 5 * 7 * 11 * 13]) {
      const f = factor(n)
      expect(f.reduce((a, b) => a * b, 1)).toBe(n) // decode ∘ encode = identity
      for (const p of f) expect(isPrime(p)).toBe(true) // every generator is irreducible
    }
  })

  it('a prime decodes to itself — it is already a generator', () => {
    expect(factor(37)).toEqual([37])
    expect(factor(999983)).toEqual([999983])
  })

  it('multiplicity is kept — 360 = 2³·3²·5', () => {
    expect(factor(360)).toEqual([2, 2, 2, 3, 3, 5])
  })

  it('the empty cases decode to nothing — no basis below 2', () => {
    expect(factor(1)).toEqual([])
    expect(factor(0)).toEqual([])
  })
})
