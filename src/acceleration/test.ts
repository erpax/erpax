import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { acceleration, atomPath } from '@/acceleration'

describe('acceleration — vocabulary atom', () => {
  it('names the canonical atom path', () => {
    expect(acceleration).toBe(atomAddress(import.meta.url).path)
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })
})
