import { describe, it, expect } from 'vitest'
import {
  floorFamily,
  floorLog2,
  digestFromFloor,
  floorsFromOne,
  secondPreimageLog2,
  birthdayLog2,
  groverPreimageLog2,
  bhtCollisionLog2,
  harmonicFloors,
} from '@/cost/bits'

describe('the floors are one family — symmetric and asymmetric, each proving the others', () => {
  const D = 256

  it('SYMMETRISING halves the exponent: free the target and the work is its square root', () => {
    // asymmetric: the target digest is FIXED, so only one side may vary.
    // symmetric: ANY two of the set collide, so both sides vary and the pairs square.
    expect(secondPreimageLog2(D)).toBe(D)
    expect(birthdayLog2(D)).toBe(D / 2)
    expect(secondPreimageLog2(D)).toBe(2 * birthdayLog2(D))
    // stated as work rather than exponent: 2^(d/2) squared is 2^d
    expect(2 ** birthdayLog2(D) * 2 ** birthdayLog2(D)).toBe(2 ** secondPreimageLog2(D))
  })

  it('QUANTUM-asymmetric lands exactly on CLASSICAL-symmetric — one exponent, two arguments', () => {
    // Grover is a quadratic speedup on the asymmetric problem: d -> d/2.
    // The birthday bound is a combinatorial fact about the symmetric problem: d/2.
    // Neither derives the other; they MEET, which is why both names must survive.
    expect(groverPreimageLog2(D)).toBe(birthdayLog2(D))
    expect(groverPreimageLog2(D)).toBe(secondPreimageLog2(D) / 2)
    const g = floorFamily().find((f) => f.name === 'groverPreimageLog2')!
    const b = floorFamily().find((f) => f.name === 'birthdayLog2')!
    expect(g.harmonic).toBe(b.harmonic)
    expect(g.symmetry).not.toBe(b.symmetry) // same floor, opposite symmetry
    expect(g.quantum).toBe(true)
    expect(b.quantum).toBe(false)
  })

  it('the quantum SYMMETRIC floor is NOT a second quadratic speedup — it is 2/3, not 1/4', () => {
    // A naive reading would make BHT d/4 (Grover applied inside the birthday problem).
    // It is d/3: BHT balances queries against quantum MEMORY, so the gain is smaller.
    expect(bhtCollisionLog2(D)).toBe(D / 3)
    expect(bhtCollisionLog2(D)).not.toBe(birthdayLog2(D) / 2)
    expect(bhtCollisionLog2(D)).toBeCloseTo((2 / 3) * birthdayLog2(D), 10)
  })

  it('each floor PROVES the others: d = k·floor, so any one recovers the family', () => {
    for (const f of floorFamily()) {
      const one = floorLog2(D, f.harmonic)
      expect(digestFromFloor(one, f.harmonic)).toBe(D)
      const family = floorsFromOne(one, f.harmonic)
      expect(family['secondPreimageLog2']).toBe(secondPreimageLog2(D))
      expect(family['birthdayLog2']).toBe(birthdayLog2(D))
      expect(family['groverPreimageLog2']).toBe(groverPreimageLog2(D))
      expect(family['bhtCollisionLog2']).toBe(bhtCollisionLog2(D))
    }
  })

  it('the classification is exhaustive over the 2×2, minus the cell that does not exist', () => {
    // asymmetric×classical, symmetric×classical, asymmetric×quantum, symmetric×quantum — all four,
    // and the harmonic indices are exactly the first three: 1, 2, 2, 3.
    expect(floorFamily()).toHaveLength(4)
    expect(new Set(floorFamily().map((f) => `${f.symmetry}|${f.quantum}`)).size).toBe(4)
    expect(floorFamily().map((f) => f.harmonic)).toEqual([1, 2, 2, 3])
    expect(harmonicFloors(D)).toEqual([secondPreimageLog2(D), birthdayLog2(D), bhtCollisionLog2(D)])
  })
})
