import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { atomPath, boundedWitness } from '@/witness/testing'
describe('witness/testing — reciprocal of testing/witness', () => {
  it('re-exports the bounded-witness helper and names its path', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
    expect(boundedWitness([1,2,3,4,5], 2)).toEqual([1,2])
  })
})
