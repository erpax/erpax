import { describe, it, expect } from 'vitest'
import { atomPath, boundedWitness } from '@/witness/testing'
describe('witness/testing — reciprocal of testing/witness', () => {
  it('re-exports the bounded-witness helper and names its path', () => {
    expect(atomPath).toBe('witness/testing')
    expect(boundedWitness([1,2,3,4,5], 2)).toEqual([1,2])
  })
})
