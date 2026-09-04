import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { accommodation, atomPath } from '@/accommodation'

describe('accommodation — vocabulary atom', () => {
  it('names the canonical atom path', () => {
    expect(accommodation).toBe(atomAddress(import.meta.url).path)
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })
})
