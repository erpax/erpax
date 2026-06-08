import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/intangible'

describe('medical/intangible — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('intangible')
    expect(CANONICAL).toBe('intangible')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/intangible')
    expect(reexportFrom).toBe('@/intangible')
  })
})
