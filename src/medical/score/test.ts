import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/score'

describe('medical/score — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('score')
    expect(CANONICAL).toBe('score')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/score')
    expect(reexportFrom).toBe('@/score')
  })
})
