import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { acceptance, atomPath } from '@/acceptance'

describe('acceptance — vocabulary atom', () => {
  it('names the canonical atom path', () => {
    expect(acceptance).toBe(atomAddress(import.meta.url).path)
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })
})
