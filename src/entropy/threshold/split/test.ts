import { randomBytes } from 'node:crypto'
import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'

import { combine, gadd, gdiv, gmul, type Piece, reachableSecrets, split, SplitRefused } from './index'

/** Deterministic coefficients keep the proofs reproducible; production passes a CSPRNG. */
const fixed = (seed: number) => (count: number) => Uint8Array.from({ length: count }, (_, i) => ((seed + i * 31 + 7) % 255) + 1)
const random = (count: number) => randomBytes(count)

describe('entropy/threshold/split — the field is exact', () => {
  it('GF(256) is a field: every non-zero element has an inverse, and division undoes multiplication', () => {
    for (let a = 1; a < 256; a += 1) {
      expect(gdiv(gmul(a, 7), 7)).toBe(a)
      expect(gmul(a, gdiv(1, a))).toBe(1)
    }
  })

  it('addition is XOR and is its own inverse — characteristic 2, so there is no subtract', () => {
    for (let a = 0; a < 256; a += 8) for (let b = 0; b < 256; b += 8) expect(gadd(gadd(a, b), b)).toBe(a)
  })

  it('multiplication is commutative, associative, and 0 annihilates', () => {
    expect(gmul(0, 199)).toBe(0)
    expect(gmul(13, 47)).toBe(gmul(47, 13))
    expect(gmul(gmul(13, 47), 5)).toBe(gmul(13, gmul(47, 5)))
  })

  it('division by zero is refused, not silently zero — that is the singular interpolation', () => {
    expect(() => gdiv(5, 0)).toThrow(SplitRefused)
  })
})

describe('entropy/threshold/split — any m of n reconstruct, and the subset does not matter', () => {
  const secret = Uint8Array.from([0, 1, 42, 255, 128, 7])

  it('3 of 5: every one of the ten subsets returns the same secret', () => {
    const pieces = split(secret, 3, 5, fixed(11))
    expect(pieces).toHaveLength(5)
    let subsets = 0
    for (let i = 0; i < 5; i += 1)
      for (let j = i + 1; j < 5; j += 1)
        for (let k = j + 1; k < 5; k += 1) {
          expect([...combine([pieces[i]!, pieces[j]!, pieces[k]!])]).toEqual([...secret])
          subsets += 1
        }
    expect(subsets).toBe(10)
  })

  it('2 of 2 and 5 of 5 both round-trip — the ends of the range', () => {
    const two = split(secret, 2, 2, random)
    expect([...combine(two)]).toEqual([...secret])
    const five = split(secret, 5, 5, random)
    expect([...combine(five)]).toEqual([...secret])
  })

  it('a secret of arbitrary length splits byte by byte', () => {
    const long = randomBytes(64)
    const pieces = split(long, 4, 6, random)
    expect([...combine(pieces.slice(0, 4))]).toEqual([...long])
    expect([...combine([pieces[5]!, pieces[0]!, pieces[3]!, pieces[1]!])]).toEqual([...long])
  })

  it('no share carries the secret — x = 0 is never issued', () => {
    for (const p of split(secret, 3, 5, random)) expect(p.x).toBeGreaterThan(0)
  })
})

describe('entropy/threshold/split — the security property is DECIDED, not argued', () => {
  it('THE PROOF: m−1 shares are consistent with all 256 candidate secrets', () => {
    const secret = Uint8Array.from([0xa7])
    const pieces = split(secret, 3, 5, random)
    // hold two of the three needed — one short of the threshold
    const reached = reachableSecrets(pieces.slice(0, 2))
    expect(reached.size).toBe(256)
    // every byte value is reachable, so the held shares say NOTHING about which one it is
    for (let v = 0; v < 256; v += 1) expect(reached.has(v)).toBe(true)
  })

  it('at the threshold the freedom collapses — m shares determine exactly one secret', () => {
    const secret = Uint8Array.from([0x5c])
    const pieces = split(secret, 3, 5, random)
    expect([...combine(pieces.slice(0, 3))]).toEqual([0x5c])
    // and adding a fourth share cannot change the answer: the polynomial is already pinned
    expect([...combine(pieces.slice(0, 4))]).toEqual([0x5c])
  })

  it('a 2-of-n holding ONE share is equally uninformative', () => {
    const pieces = split(Uint8Array.from([0x01]), 2, 4, random)
    expect(reachableSecrets(pieces.slice(0, 1)).size).toBe(256)
  })
})

describe('entropy/threshold/split — what it refuses', () => {
  const secret = Uint8Array.from([9, 9])

  it('a threshold below 2, above n, or an n past the field is refused', () => {
    expect(() => split(secret, 1, 3, random)).toThrow(/bad-threshold/)
    expect(() => split(secret, 4, 3, random)).toThrow(/bad-threshold/)
    expect(() => split(secret, 2, 256, random)).toThrow(/bad-threshold/)
  })

  it('a share at x = 0 is refused — it IS the secret wearing a share’s clothes', () => {
    const pieces = split(secret, 2, 3, random)
    expect(() => combine([{ x: 0, y: secret } as Piece, pieces[0]!])).toThrow(/zero-coordinate/)
  })

  it('duplicate coordinates are refused rather than interpolated into a wrong answer', () => {
    const pieces = split(secret, 3, 5, random)
    expect(() => combine([pieces[0]!, pieces[0]!, pieces[1]!])).toThrow(/duplicate-coordinate/)
  })

  it('a single piece is not a reconstruction', () => {
    expect(() => combine(split(secret, 2, 3, random).slice(0, 1))).toThrow(/too-few/)
  })

  it('too few coefficients are refused — a short polynomial is a lower threshold in disguise', () => {
    expect(() => split(secret, 4, 5, () => Uint8Array.from([1]))).toThrow(/too-few/)
  })
})

describe('entropy/threshold/split — judged by the constitution', () => {
  const change: Change = {
    atom: 'entropy/threshold/split',
    dualities: [
      { builds: 'split', breaks: 'a threshold outside 2 ≤ m ≤ n ≤ 255 throws' },
      { builds: 'combine', breaks: 'x = 0, duplicates and single pieces all throw' },
      { builds: 'reachableSecrets', breaks: 'a sharing leaking information would reach fewer than 256' },
    ],
    anchors: ['NIST SP 800-57 Part 1 r5 §5.6.1'],
    claims: [
      {
        text: 'fewer than m shares reveal nothing',
        boundary:
          'DECIDED for a byte, not argued: reachableSecrets enumerates all 256 candidates and the ' +
          'test asserts every one is consistent with the held shares. It is the information-' +
          'theoretic property of the construction, and it says nothing about how the shares are ' +
          'stored, transported, or whether the coefficients came from a real CSPRNG — that is the ' +
          'caller’s, and entropy/source’s',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'split⊕combine', ring: [5, 5] },
    ],
    served: [{ result: 'the reconstructed secret', recompute: 'src/entropy/threshold/split/index.ts' }],
    postings: [
      { debit: 'secret/split', credit: 'share/issued', amount: 5 },
      { debit: 'share/issued', credit: 'secret/split', amount: 5 },
    ],
    edges: [
      { from: 'split', to: 'threshold' },
      { from: 'threshold', to: 'split' },
    ],
    quantities: [
      { name: 'field size', value: 256, derivation: 'src/entropy/threshold/split/index.ts' },
      { name: 'candidate secrets reachable below threshold', value: 256, derivation: 'src/entropy/threshold/split/index.ts' },
    ],
    keepers: [],
    seed: ['src/entropy/threshold/split/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
