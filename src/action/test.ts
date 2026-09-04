import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { action, atomPath } from '@/action'

describe('action — vocabulary atom', () => {
  it('names the canonical atom path', () => {
    expect(action).toBe(atomAddress(import.meta.url).path)
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })
})
