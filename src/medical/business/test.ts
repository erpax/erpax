import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/business'

describe('medical/business — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('business')
    expect(CANONICAL).toBe('business')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/business')
    expect(reexportFrom).toBe('@/business')
  })
})
