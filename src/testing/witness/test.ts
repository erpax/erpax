import { describe, it, expect } from 'vitest'
import { boundedWitness, isFiniteComplete, spreadWitness, WITNESS_SIZE } from '@/testing/witness'

describe('testing/witness — bounded-witness vs finite-complete (ceccec proof taxonomy)', () => {
  const big = Array.from({ length: 100 }, (_, i) => i)

  it('a large domain yields a bounded sample of WITNESS_SIZE', () => {
    expect(boundedWitness(big)).toHaveLength(WITNESS_SIZE)
    expect(boundedWitness(big, 5)).toEqual([0, 1, 2, 3, 4])
  })

  it('a small domain IS finite-complete — the whole is the witness, verified exhaustively', () => {
    const small = [1, 2, 3]
    expect(boundedWitness(small)).toEqual(small)
    expect(isFiniteComplete(small)).toBe(true)
    expect(isFiniteComplete(big)).toBe(false)
  })

  it('spreadWitness touches the whole range, not just the head', () => {
    const s = spreadWitness(big, 10)
    expect(s).toHaveLength(10)
    expect(s[0]).toBe(0)
    expect(s[s.length - 1]).toBeGreaterThan(80) // reaches the tail — a prefix never would
  })
})
