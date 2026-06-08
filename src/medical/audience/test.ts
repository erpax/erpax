import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/audience'

describe('medical/audience — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('audience')
    expect(CANONICAL).toBe('audience')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/audience')
    expect(reexportFrom).toBe('@/audience')
  })
})
