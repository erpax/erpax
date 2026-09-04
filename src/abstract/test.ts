import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { abstract, atomPath } from '@/abstract'

describe('abstract — vocabulary atom', () => {
  it('names the canonical atom path', () => {
    expect(abstract).toBe(atomAddress(import.meta.url).path)
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })
})
