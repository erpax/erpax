import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/enumeration'

describe('medical/enumeration — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('enumeration')
    expect(CANONICAL).toBe('enumeration')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/enumeration')
    expect(reexportFrom).toBe('@/enumeration')
  })
})
