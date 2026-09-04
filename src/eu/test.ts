import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { WORD, atomPath } from './index'

describe('eu', () => {
  it('hub constants', () => {
    expect(WORD).toBe(atomAddress(import.meta.url).path)
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })
})
