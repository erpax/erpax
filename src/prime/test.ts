import { describe, it, expect } from 'vitest'
import { sampleHex } from '@/quantum/hexbit'
import { atomAddress } from '@/atom/address'
import { isPrime, factor, FIRST_PRIMES, atomPath, coversBits, join, piPrimes, split } from './index'

describe('prime — the multiplicative basis, factoring is the decode fold', () => {
  it('names its path', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
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

describe('prime — the split: an astronomical value as residues in moduli drawn from π, recomposed exactly', () => {
  const moduli = piPrimes(5)
  const sample = (i: number): bigint => BigInt(`0x${sampleHex(i)}`)

  it('the moduli are primes read off π — each above 2^30, none chosen, five of them cover 128 bits', () => {
    expect(moduli).toHaveLength(5)
    for (const m of moduli) {
      expect(m > 1n << 30n).toBe(true)
      expect(isPrime(Number(m))).toBe(true)
    }
    expect(new Set(moduli).size).toBe(5)
    expect(coversBits(moduli, 128)).toBe(true)
    expect(coversBits(moduli.slice(0, 4), 128)).toBe(false) // four 31-bit moduli reach only 2^124
  })

  it('join ∘ split is the identity on 20,000 sampled 128-bit values and both edges', () => {
    for (let i = 0; i < 20_000; i++) {
      const x = sample(i)
      expect(join(split(x, moduli), moduli)).toBe(x)
    }
    expect(join(split(0n, moduli), moduli)).toBe(0n)
    const max = (1n << 128n) - 1n
    expect(join(split(max, moduli), moduli)).toBe(max)
  })

  it('the split is a ring homomorphism — a 256-bit product is five small products, recomposed when nine moduli cover it', () => {
    const nine = piPrimes(9)
    expect(coversBits(nine, 256)).toBe(true)
    for (let i = 0; i < 200; i++) {
      const a = sample(i)
      const b = sample(i + 7)
      const ra = split(a, nine)
      const rb = split(b, nine)
      const prod = nine.map((m, k) => ((ra[k] as bigint) * (rb[k] as bigint)) % m)
      expect(join(prod, nine)).toBe(a * b)
    }
  })
})
