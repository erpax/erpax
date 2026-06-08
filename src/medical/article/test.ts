import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/article'

describe('medical/article — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('article')
    expect(CANONICAL).toBe('article')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/article')
    expect(reexportFrom).toBe('@/article')
  })
})
