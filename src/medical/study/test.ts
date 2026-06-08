import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/study'

describe('medical/study — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('study')
    expect(CANONICAL).toBe('study')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/study')
    expect(reexportFrom).toBe('@/study')
  })
})
