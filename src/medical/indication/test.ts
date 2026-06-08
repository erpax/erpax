import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/indication'

describe('medical/indication — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('indication')
    expect(CANONICAL).toBe('indication')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/indication')
  })
})
